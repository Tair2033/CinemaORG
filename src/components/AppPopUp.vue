<template>
  <div class="popup-wrapper">
    <div class="popup-search" v-if="!$store.state.popup.search">
      <div style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 30px;
              " v-if="$store.state.loading.popupSearch">
        <loader></loader>
      </div>

      <div v-for="(item, id) in data" :key="id" @click="goToPage">
        <router-link class="popup-item" :to="'/film/' + item.filmId">
          <div class="popup-item__counter">{{ id + 1 }}</div>
          <div class="popup-item__img">
            <img :src="item.posterUrlPreview" alt="" />
          </div>

          <div class="popup-item__info">
            <div class="popup-item__name">
              {{ item.nameRu }}
            </div>
          </div>

          <div class="popup-item__rating">
            <div class="popup-item__kinopoisk">
              {{ item.rating }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/UI/Loader";

export default {
  components: { Loader },
  props: ["data"],
  methods: {
    goToPage () {
      this.$store.state.popup.search = true;
    },
  },
};
</script>

<style scoped>
.popup-wrapper {
  position: absolute;
  min-width: 100%;
  max-height: 300px;
  background-color: white;
  overflow: auto;
  z-index: 20;
}

.popup-user {
  background-color: white;
}

.popup-item {
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: black;
}

.popup-item:hover {
  background-color: #b2b2b2;
}

.popup-item__counter {
  margin-right: 10px;
}

.popup-search {
  position: relative;
}

.popup-item__img {
  margin-right: 10px;
}

.popup-item__img img {
  max-width: 60px;
  border-radius: 4px;
}

.popup-item__rating {
  position: absolute;
  right: 10px;
  top: 50%;
}

.popup-item__name {
  font-size: 13px;
}
</style>