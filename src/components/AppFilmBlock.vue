<template>
  <div class="cinema__wrapper">
    <div class="cinema" @click="goToPage">
      <div class="cinema__image">
        <div class="cinema__image-inside">
          <img loading="lazy" :src="item.posterUrlPreview" alt="">

          <div class="cinema__raiting"
            :style="{ backgroundColor: ratingColorChanger(item.ratingKinopoisk), display: checkRating(item.ratingKinopoisk) }">
            {{ item.ratingKinopoisk }}
          </div>

          <div class="cinema__bookmark">
            <div class="cinema__bookmark-default" @click="toggleBookmark" v-if="!isSelected">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px"
                viewBox="-5 0 20 20" version="1.1">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-305.000000, -2639.000000)"
                    class="btn__book-default">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M257,2486 L255,2486 L255,2488 L253,2488 L253,2486 L251,2486 L251,2484 L253,2484 L253,2482 L255,2482 L255,2484 L257,2484 L257,2486 Z M249,2479 L249,2499 L254,2494 L259,2499 L259,2479 L249,2479 Z"
                        id="bookmark_plus_fill-[#1236]">
                      </path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <div class="cinema__bookmark-selected" @click="toggleBookmark" v-if="isSelected">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px"
                viewBox="-5 0 20 20" version="1.1">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-145.000000, -2639.000000)"
                    class="btn__book-selected">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M91,2486 L97,2486 L97,2484 L91,2484 L91,2486 Z M89,2479 L89,2499 L94,2494 L99,2499 L99,2479 L89,2479 Z"
                        id="bookmark_minus_fill-[#1240]">
                      </path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="cinema__title">
        <span>
          <!-- {{ item.nameRu.slice(0, 18) }} -->
          {{ containsName(item) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFilmBlock",
  data () {
    return {
      isSelected: false
    };
  },
  methods: {
    goToPage (e) {
      if (e.target.nodeName !== "path") {
        this.$router.push(`/film/${this.item.kinopoiskId}`)
      }
    },
    toggleBookmark () {
      this.isSelected = !this.isSelected
    },
    containsName (item) {
      if (item.nameRu == null) {
        return item.nameOriginal;
      }

      return item.nameRu;
    },
    checkRating (rating) {
      if (rating === null) {
        return 'none'
      }

      return "flex"
    },
    ratingColorChanger (rating) {
      if (rating >= 7.0) {
        return "rgba(121, 233, 9, 0.598)"
      }

      if (rating <= 7.0 && rating > 4.0) {
        return "rgba(190, 190, 190, 0.743)"
      }

      if (rating <= 4.0) {
        return "rgba(247, 81, 81, 0.743)"
      }
    }
  },
  props: ["item"]
}
</script>

<style scoped lang="scss">
.cinema__wrapper {
  cursor: pointer;
  transition: all 0.4s;
  filter: brightness(85%);
  border-radius: 5px;
  min-height: 300px;
}

.cinema__wrapper:hover {
  background-color: rgb(178, 179, 179);
  filter: brightness(110%);
}

.cinema {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background-color: none;
  padding: 10px;
  max-width: 190px;


  &__image {
    position: relative;
  }

  &__image-inside {
    overflow: hidden;
    width: 170px;
    max-height: 240px;
    position: relative;
    border-radius: 5px;
  }

  &__image-inside img {
    width: 100%;
    height: auto;
    object-fit: contain;
    z-index: 5;
    transition: all 0.4s;
  }


  &__raiting {
    position: absolute;
    z-index: 10;
    bottom: 10px;
    right: 5px;
    border-radius: 50%;
    font-size: 20px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    color: rgb(0, 0, 0);
    box-shadow: 0px 5px 51px 20px rgba(23, 40, 53, 0.376);
  }

  &__bookmark {
    position: absolute;
    z-index: 10;
    top: 0;
    right: -5px;
  }

  &__title {
    color: black;
    font-weight: 600;
    word-break: keep-all;
    font-size: calc(1.1vw);
    // color: rgba(190, 190, 190, 0.743);
    text-align: center;
    margin-top: 4px;
  }
}

.btn__book-selected {
  transition: all 0.4s;
  cursor: pointer;
  fill: rgb(255, 102, 6);
}

.btn__book-default:hover {
  fill: rgb(145, 145, 21);
}

.btn__book-default {
  transition: all 0.4s;
  cursor: pointer;
  fill: rgb(255, 255, 255);
}


@media (max-width: 829px) {
  .cinema__wrapper {
    min-height: 205px;
  }

  .cinema {
    max-width: 120px;
  }

  .cinema__image-inside {
    width: 100px;
    max-height: 150px;
  }
}

@media (max-width: 687px) {
  .cinema__wrapper {
    max-height: 280px;
  }

  .cinema {
    max-width: 190px;
  }

  .cinema__image-inside {
    width: 170px;
    max-height: 220px;
  }
}

@media (max-width: 520px) {
  .cinema {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .cinema__wrapper {
    width: 92vw;
    min-height: 160px;
    border: 1px solid rgb(228, 228, 228);
    margin-bottom: 10px;
  }

  .cinema__image-inside {
    width: 100px;
    max-height: 140px;
  }

  .cinema__title {
    margin-left: 50px;
    white-space: nowrap;
  }
}
</style>