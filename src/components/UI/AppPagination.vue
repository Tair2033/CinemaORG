<template>
  <div class="pagination-wrapper">
    <div class="pagination">
      <div
        :style="{ visibility: checkCurrentPage('LEFT') }"
        class="arrow"
        @click="previous"
      >
        &larr;
      </div>
      <div
        :style="getStyle(id)"
        v-for="(page, id) in settings.totalPages"
        :key="id"
        class="pagination-item"
        @click="goToPage(page)"
      >
        {{ page }}
      </div>
      <div
        :style="{ visibility: checkCurrentPage('RIGHT') }"
        class="arrow"
        @click="next"
      >
        &rarr;
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../store';

  export default {
    data() {
      return {
        activeStyle: {
          backgroundColor: '#3f3f3fa7',
          color: 'white'
        }
      };
    },
    props: {
      settings: {
        totalPages: Number
      },
      callback: Function
    },
    methods: {
      checkCurrentPage(arrow) {
        if (arrow == 'LEFT') {
          if (this.$store.state.pageCounter == 1) {
            return 'hidden';
          }
        }

        if (arrow == 'RIGHT') {
          if (this.$store.state.pageCounter == this.settings.totalPages) {
            return 'hidden';
          }
        }
      },
      goToPage(page) {
        store.dispatch('changePage', page);
        this.callback(this.$store.state.pageCounter);

        window.scrollTo({
          top: 0
        });
      },
      getStyle(page) {
        if (this.$store.state.pageCounter == page + 1) {
          return this.activeStyle;
        }

        return null;
      },
      previous() {
        store.dispatch('previousPage');
        this.callback(this.$store.state.pageCounter);

        window.scrollTo({
          top: 0
        });
      },
      next() {
        store.dispatch('nextPage');
        this.callback(this.$store.state.pageCounter);

        window.scrollTo({
          top: 0
        });
      }
    }
  };
</script>

<style scoped>
  .arrow {
    font-size: 28px;
    margin-left: 20px;
    cursor: pointer;
    color: white;
    background-color: #3f3f3f6f;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s;
  }

  .arrow:hover {
    color: orange;
    background-color: #3f3f3fa7;
  }

  .pagination-wrapper {
    padding: 10px;
    display: flex;
    justify-content: center;
  }

  .pagination {
    display: flex;
    align-items: center;
  }

  .pagination-item {
    transition: all 0.4s;
    margin-left: 10px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #4c4c4c1d;
  }

  .pagination-item:hover {
    background-color: #6e6d6d;
    color: orange;
  }

  .pagination-item:first-child {
    margin-left: 0px;
  }
</style>
