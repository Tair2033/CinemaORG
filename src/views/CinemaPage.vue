<template>
  <div class="title">
    <div class="loader__wrapper" v-if="$store.state.loading.titlePage">
      <loader></loader>
    </div>
    <div class="title" v-show="!$store.state.loading.titlePage">
      <div class="container-title">
        <div class="title-main">
          <div class="title-left">
            <div class="title-left__poster">
              <img loading="lazy" width="100%" height="100%" :src="currentPageData.posterUrl || ''" alt="" />
            </div>
          </div>
          <div class="title-center">
            <div class="title-center__top">
              <div class="title-center__heading">
                <div class="title-center__name">
                  {{ currentPageData.nameRu }}
                </div>
                <div class="title-center__originalname" :style="{ fontSize: isOriginalName }">
                  {{ currentPageData.nameOriginal || '' }}
                  <div class="min-age">
                    {{ getMinAge }}
                  </div>
                </div>
              </div>
              <div class="title-center__line" v-show="!currentPageData.ratingKinopoisk">
                -
                <div class="raiting-count">
                  {{ countRating }}
                </div>
              </div>
              <div :style="{ color: ratingColor }" class="title-center__rating" v-show="currentPageData.ratingKinopoisk">
                {{ currentPageData.ratingKinopoisk }}
                <div class="raiting-count">
                  {{ countRating }}
                </div>
              </div>
            </div>

            <div class="title-center__center">
              <div class="title-center__buttons">
                <div class="title-center__tickets" v-if="!currentPageData.serial">
                  Расписание и билеты
                </div>
                <div class="title-center__status" v-if="!currentPageData.serial">
                  <span> ... </span>
                </div>
              </div>

              <span class="title-center__heading"> О фильме </span>

              <div class="title-center__info">
                <div class="title-center__infoblock">
                  <div class="title-center__points">
                    <div class="title-center__item" v-for="(point, id) in points" :key="id">
                      <div class="point">
                        {{ id }}
                      </div>

                      <div class="value">
                        {{ point }}
                      </div>
                    </div>

                    <div class="title-center__values">
                      <div v-for="(val, id) in about" :key="id" class="value">
                        {{ val || '-' }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="title-center__actors">
                  <span> В главных ролях </span>
                  <ul v-for="(actor, id) in actors" :key="id">
                    <li class="actor">
                      <router-link :to="'/name/' + actor.staffId">
                        {{ actor.nameRu }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="title-bottom">
          <ul class="title-bottom__menu">
            <li :style="id == selectedMenuItemId ? activeStyle : null" v-for="(section, id) in sections" :key="id"
              @click="menuAction(id)">
              {{ section }}
            </li>
          </ul>

          <div class="title-bottom__description" v-if="selectedMenuItemId !== 1">
            {{ currentPageData.description }}
          </div>

          <div class="title-bottom__ratingsection" v-if="selectedMenuItemId !== 1">
            <div class="title-raiting">
              <span>Рейтинг фильма</span>
              <div :style="{ color: ratingColor }" class="title-bottom__ratingKinopoisk">
                {{ currentPageData.ratingKinopoisk }}
              </div>
              <div class="title-bottom__ratingImdb">
                Imdb: {{ currentPageData.ratingImdb }}
              </div>
            </div>
            <div class="title-bottom__rating">
              <div class="scores">
                <div class="scores__positive score__item">
                  <div class="scores__counter">
                    {{ reviews.totalPositiveReviews }}
                  </div>
                  <div class="scores__title">Положительных</div>
                </div>
                <div class="scores__neutral score__item">
                  <div class="scores__counter">
                    {{ reviews.totalNeutralReviews }}
                  </div>
                  <div class="scores__title">Нейтральных</div>
                </div>
                <div class="scores__negative score__item">
                  <div class="scores__counter">
                    {{ reviews.totalNegativeReviews }}
                  </div>
                  <div class="scores__title">Отрицательных</div>
                </div>
              </div>
              <div class="write-btn">Написать рецензию</div>
            </div>
          </div>

          <div v-if="selectedMenuItemId !== 0" class="images">
            <div class="images__image-wrapper" v-for="(image, id) in images" :key="id">
              <div class="images__image-image">
                <img :src="image.previewUrl" alt="" />
              </div>
            </div>
          </div>

          <div class="title-bottom__reviews">
            <app-review v-for="(review, id) in reviews.items" :data="review" :key="id"></app-review>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppReview from '../components/UI/AppReview.vue';
import Loader from '../components/UI/Loader.vue';
import { key } from '../APIKEY.json';

export default {
  components: { Loader, AppReview },
  data () {
    return {
      key,
      selectedMenuItemId: 0,
      activeStyle: {
        'font-weight': 500,
        'border-bottom': '1px solid orange',
        'z-index': 5
      },
      points: {
        'Год производства': '',
        Страна: '',
        Жанр: '',
        Слоган: '',
        Возраст: '',
        Время: ''
      },
      currentPageData: {},
      values: [],
      about: {},
      reviews: {},
      actors: [],
      images: [],
      ratingColor: '',
      sections: ['Обзор', 'Изображения']
    };
  },
  methods: {
    async getImages (id) {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?page=1`;

      await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-KEY': key,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((json) => {
          json.items.every((image, id) => {
            if (id < 6) {
              this.images.push(image);
              return true;
            }

            return false;
          });
        })
        .catch((err) => console.log(err));
    },
    async getReviews (id) {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`;

      await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-KEY': key,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((json) => {
          this.reviews = { ...json };
        })
        .catch((err) => console.log(err));
    },
    async getTitle (id) {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`;

      await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-KEY': key,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((json) => {
          this.currentPageData = { ...json };

          this.points = {
            'Год производства': this.currentPageData.year,
            Страна: [
              ...this.currentPageData.countries.map((i) => i.country)
            ].join(', '),
            Жанр: [...this.currentPageData.genres.map((i) => i.genre)].join(
              ', '
            ),
            Слоган: this.currentPageData.slogan,
            Возраст: this.getMinAge || 0,
            Время: this.currentPageData.filmLength + ' мин.'
          };

          this.getRatingColor(json.ratingKinopoisk);

          this.getActors(id);
        })
        .catch((err) => console.log(err));
    },
    async getActors (id) {
      const url = `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`;

      await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-KEY': key,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((json) => {
          let actorCounter = 0;

          json.every((staff) => {
            if (actorCounter > 10) {
              return false;
            }

            if (staff.professionKey === 'ACTOR') {
              actorCounter++;
              this.actors.push(staff);
            }

            return true;
          });

          this.$store.state.loading.titlePage = false;
        })
        .catch((err) => console.log(err));
    },
    getRatingColor (score) {
      if (score > 7.0) {
        this.ratingColor = 'green';
      }

      if (score < 7.0 && score > 4.0) {
        this.ratingColor = 'grey';
      }

      if (score < 4.0) {
        this.ratingColor = 'red';
      }
    },
    menuAction (id) {
      this.selectedMenuItemId = id;

      this.getImages(this.$route.params.id);
    }
  },
  computed: {
    isOriginalName () {
      if (this.currentPageData.nameRu == null) {
        return '30px';
      }

      return null;
    },
    getMinAge () {
      const count = this.currentPageData.ratingAgeLimits;

      if (count == null) {
        return 'возраст не установлен';
      }

      let age = count.replace('age', '') + '+';

      return age;
    },
    countRating () {
      const votes = this.currentPageData.ratingKinopoiskVoteCount;

      if (votes < 1000) {
        return votes;
      }

      if (votes > 1000) {
        return Math.floor(votes / 1000) + 'K';
      }

      return '';
    }
  },
  mounted () {
    this.getTitle(this.$route.params.id);
    this.getReviews(this.$route.params.id);
  },
  beforeMounted () {
    window.scrollTo({
      top: 0
    });
  }
};
</script>

<style scoped lang="scss">
.loader__wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 200px;
}

.title-center__item {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 40vw;
  margin-bottom: 10px;
}

.title-center__name {
  color: rgba(251, 249, 249, 0.889);
}

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &__image-wrapper {
    margin: 5px;
  }
}

.scores {
  display: flex;
  color: rgba(251, 249, 249, 0.889);

  &__positive {
    background-color: #3c3c3c53;
    color: green;
  }

  &__neutral {
    color: rgb(166, 166, 166);
    background-color: #3c3c3c53;
  }

  &__negative {
    color: red;
    background-color: #3c3c3c53;
  }

  &__title {
    color: rgba(251, 249, 249, 0.889);
    font-size: calc(1.2vw);
    font-weight: 600;
  }
}

.score__item {
  cursor: pointer;
  margin-right: 40px;
  border-radius: 7px;
  padding: 10px;
  transition: all 0.4s;
  text-align: center;
}

.score__item:last-child {
  margin-right: 20px;
}

.score__item:hover {
  background-color: #63636353;
}

.scores__counter {
  font-weight: 600;
  font-size: calc(1.5vw);
}

.title {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 60px;
}

.container-title {
  max-width: 1200px;
  margin: 0 auto;
}

.title-left {
  height: 100%;
}

.title-center__originalname {
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  vertical-align: middle;
  letter-spacing: -0.2px;
  font-weight: 200;
  color: rgba(173, 171, 171, 0.889);
}

.title-main {
  display: flex;
  justify-content: space-evenly;
}

.title-left__poster {
  height: 400px;
  width: 300px;
  border-radius: 4px;
  display: flex;
}

.title-left__poster img {
  border: 1px solid rgb(67, 67, 67);
  width: 100%;
  height: auto;
  object-fit: cover;
  overflow: hidden;
  border-radius: 10px;
}

.title-center {
  margin-left: 35px;
}

.title-center__top {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.title-center__name {
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
}

.title-center__rating {
  display: flex;
  justify-content: end;
  font-size: calc(10px + 3vw);
  font-weight: 700;
  line-height: 48px;
  margin-left: 20px;
}

.title-center__line {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
}

.title-center__line:after {
  content: 'Недостаточно оценок, \A рейтинг формируется';
  color: rgba(251, 249, 249, 0.889);
  font-size: 13px;
  line-height: normal;
  margin-left: 15px;
}

.title-bottom__rating {
  display: flex;
  align-items: center;
  cursor: default;
}

.min-age {
  display: inline-block;
  color: rgba(185, 182, 182, 0.889);
  border: 1px solid rgba(185, 182, 182, 0.889);
  padding: 1px 3px 0;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  border-radius: 3px;
  margin-left: 10px;
}

.raiting-count {
  color: rgba(88, 87, 87, 0.909);
  margin-left: 6px;
  font-size: calc(6px + 2.2vw);
  font-weight: 200;
}

.title-center__info {
  display: flex;
  justify-content: space-between;
}

.title-center__heading {
  color: rgba(251, 249, 249, 0.889);
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
}

.title-center__infoblock {
  display: flex;
  padding-right: 20px;
  margin-top: 25px;
}

.title-bottom__reviews {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.point {
  color: rgba(251, 249, 249, 0.889);
  font-size: 15px;
  min-width: 150px;
  line-height: 18px;
  padding: 8px 0;
}

.value {
  padding: 8px 0;
  color: rgba(187, 186, 186, 0.889);
  font-size: 13px;
  line-height: 18px;
}

.title-center__buttons {
  display: flex;
  align-items: center;
  padding: 15px 0;
}

.title-center__tickets {
  color: #fff;
  background: rgb(18, 2, 136);
  min-width: 44px;
  min-height: 44px;
  padding: 13px 24px;
  font-size: calc(10px + 0.8vw);
  line-height: 18px;
  cursor: pointer;
  transition: all 0.4s;
  border-radius: 52px;
}

.title-center__tickets:hover {
  background: rgb(43, 69, 240);
}

.title-center__status {
  cursor: pointer;
  font-size: 25px;
  margin-left: 25px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(251, 249, 249, 0.889);
  background-color: rgba(59, 59, 59, 0.424);
  transition: all 0.4s;
}

.title-center__status span {
  width: 100%;
  height: 100%;
  text-align: center;
}

.title-center__status:hover {
  background-color: rgb(72, 71, 71);
}

.title-center__actors span {
  font-size: 20px;
  line-height: 18px;
  font-weight: bolder;
  color: rgba(251, 249, 249, 0.889);
}

.actor {
  cursor: pointer;
  list-style: none;
  font-size: 15px;
  font-weight: lighter;
  margin: 5px 0;
}

.actor a {
  text-decoration: none;
  color: #adadad;
  font-weight: 600;
  transition: all 0.2s;
}

.actor a:hover {
  color: orange;
}

.title-bottom {
  padding-top: 70px;
}

.title-bottom__ratingsection span {
  display: inline-block;
  color: rgba(251, 249, 249, 0.889);
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  padding: 20px 0;
  margin-right: 25px;
}

.title-bottom__description {
  font-size: 16px;
  line-height: 1.38;
  color: rgba(251, 249, 249, 0.889);
}

.title-raiting {
  display: flex;
  align-items: center;
}

.title-bottom__rating {
  display: flex;
  align-items: center;
}

.title-bottom__ratingKinopoisk {
  font-size: 36px;
  line-height: 1;
  font-weight: 500;
  display: block;
  margin-top: 8px;
  margin-bottom: 6px;
  line-height: 1;
  text-decoration: none;
}

.title-bottom__ratingImdb {
  margin-left: 25px;
  color: rgba(181, 180, 180, 0.889);
}

.write-btn {
  display: inline-flex;
  align-items: center;
  color: #333;
  border-color: rgba(0, 0, 0, 0.1);
  background: #cfcdcd;
  box-shadow: 0 1px 2px rgb(0 0 0 / 4%);
  padding: 8px 9px;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  line-height: 16px;
  cursor: pointer;
  text-decoration: none;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  outline: none;
  margin-left: 10px;
}

.write-btn:hover {
  background: rgb(221, 220, 220);
  border-color: rgba(42, 42, 42, 0.1);
}

.write-btn:before {
  content: '+';
  margin-right: 6px;
}

.title-bottom__menu {
  display: inline-flex;
  border-bottom: 1px solid rgba(214, 212, 212, 0.473);
  margin-bottom: 25px;
  padding-top: 3px;
}

.title-bottom__menu li {
  list-style: none;
  color: rgba(251, 249, 249, 0.889);
  z-index: 1;
  padding-bottom: 13px;
  font-size: 16px;
  font-weight: 400;
  margin-left: 20px;
  cursor: pointer;
  user-select: none;
}

.title-bottom__menu li:first-child {
  margin-left: 0;
}

.title-bottom__menu li:hover {
  color: orange;
}

@media (max-width: 1100px) {
  .title-center__actors {
    display: none;
  }

  .title-center__top {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  .title-center__rating {
    justify-content: start;
  }
}

@media (max-width: 680px) {
  .title-main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title-center {
    margin-top: 60px;
    margin-left: 0;
  }

  .title-center__item {
    width: auto;
  }

  .title-bottom__rating {
    flex-direction: column;
  }

  .write-btn {
    margin-top: 15px;
  }

  .title-center__status {
    margin-left: 4px;
  }

  .title-center__tickets {
    padding: 7px 14px;
    display: flex;
    align-items: center;
  }

  .title-center__top {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
