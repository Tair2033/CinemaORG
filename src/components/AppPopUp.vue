<template>
  <div class="wrapper">

    <!-- Search section -->
    <div class="search__wrapper" v-if="type === 'SEARCH'">
      <div class="popup__section search__section">
        <div style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 30px;
          " v-if="$store.state.loading.popupSearch">
          <loader></loader>
        </div>

        <div v-show="!$store.state.loading.popupSearch">
          <div class="empty" v-if="data.length === 0">
            Ничего не найдено :(
          </div>

          <div v-if="data.length > 0">
            <div class="popup__list" v-for="(item, id) in  data" :key="id" @click="hideFinded">
              <router-link class="popup__item" :to="'/film/' + item.filmId">
                <div class="popup__item-img">
                  <img loading="lazy" :src="item.posterUrlPreview" alt="" />
                </div>

                <div class="popup__item-info">
                  <div class="popup__item-name">
                    {{ item.nameRu }}
                  </div>
                </div>

                <div class="popup__item-rating">
                  <div class="popup__item-kinopoisk" :style="{ color: ratingColorChanger(item.rating) }">
                    {{ item.rating }}
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User section -->
    <div class="user__wrapper" v-if="type === 'USER'">
      <div class="popup__section user__section">
        <div class="popup__list">
          <div v-for="(item, id) in  userItems" :key="id">
            <div class="user__item">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/UI/Loader";

export default {
  components: { Loader },
  data () {
    return {
      isEmpty: false,
      userItems: [
        "Настройки",
        "Выход"
      ]
    }
  },
  props: ["data", "type"],
  methods: {
    hideFinded () {
      this.$store.state.popup.search = true;
      location.reload()
    },
    ratingColorChanger (rating) {
      if (rating >= 7.0) {
        return "green"
      }

      if (rating <= 7.0 && rating > 4.0) {
        return "grey"
      }

      if (rating <= 4.0) {
        return "red"
      }

    }
  },
  computed: {}
};
</script>

<style scoped>
.wrapper {
  position: relative;
  z-index: 40;
}

.search__wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
  position: absolute;
  top: -5px;
  width: 100%;
  max-height: 300px;
  background-color: rgb(239, 239, 239);
  border: 1px solid rgb(200, 198, 198);
  overflow: auto;
  box-shadow: -1px -3px 37px 0px rgba(34, 60, 80, 0.259);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  min-height: 300px;
}

.search__wrapper::-webkit-scrollbar {
  display: none;
}

.empty {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40%;
}

.user__wrapper {
  top: 36px;
  left: -100px;
  min-width: 160px;
  position: absolute;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(184, 183, 183);
  overflow: auto;
  box-shadow: -1px -0px 37px 0px rgba(21, 32, 41, 0.497);
  border-radius: 10px;
}

.popup__list {
  display: flex;
  flex-direction: column;
}

.popup__user {
  background-color: white;
}

.popup__item {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: black;
}

.user__item {
  justify-content: center;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
  transition: all 0.4s;
}

.user__item:hover {
  color: white;
  background-color: black;
}

.popup__item:hover {
  background-color: #b2b2b2;
}

.popup__item-counter {
  margin-right: 10px;
  font-size: 9px;
}

.popup__section {
  position: relative;
}

.popup__item-img {
  margin-right: 10px;
  min-height: 90px;
  width: 60px;
}

.popup__item-img img {
  border-radius: 6px;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.popup__item-rating {}

.popup__item-info {
  width: 100%;
  text-align: start;
}

.popup__item-name {
  font-size: 14px;
  font-weight: 500;
}
</style>