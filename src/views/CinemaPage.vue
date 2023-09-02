<template>
  <div class="title">
    <loader style="padding-top: 50px" v-if="$store.state.loading.titlePage"></loader>
    <div class="title" v-if="!$store.state.loading.titlePage">
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
                <div class="title-center__originalname">
                  {{ currentPageData.nameOriginal || "" }}
                  <div class="min-age">
                    {{ getMinAge }}
                  </div>
                </div>
              </div>
              <div class="title-center__line" v-if="!currentPageData.ratingKinopoisk">
                -
                <div class="raiting-count">
                  {{ countRating }}
                </div>
              </div>
              <div :style="{ color: ratingColor }" class="title-center__rating" v-if="currentPageData.ratingKinopoisk">
                {{ currentPageData.ratingKinopoisk }}
                <div class="raiting-count">
                  {{ countRating }}
                </div>
              </div>
            </div>

            <div class="title-center__center">
              <div class="title-center__buttons">
                <div class="title-center__tickets">
                  Расписание и билеты
                </div>
                <div class="title-center__status">
                  <span>
                    ...
                  </span>
                </div>
              </div>

              <span class="title-center__heading">
                О фильме
              </span>

              <div class="title-center__info">
                <div class="title-center__infoblock">
                  <div class="title-center__points">
                    <div v-for="(point, id) in points" :key="id" class="point">
                      {{ point }}
                    </div>
                  </div>
                  <div class="title-center__values">
                    <div v-for="(val, id) in about" :key="id" class="value">
                      {{ val || "-" }}
                    </div>
                  </div>
                </div>

                <div class="title-center__actors">
                  <span> В главных ролях </span>
                  <ul v-for="(actor, id) in actors" :key="id">
                    <li v-if="actor.professionKey ==
                      'ACTOR' && id < 15
                      " class="actor">
                      {{ actor.nameRu }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="title-bottom">
          <ul class="title-bottom__menu">
            <li :style="menuStatus[id] == 'true' ? activeStyle : null
              " v-for="(section, id) in sections" :key="id" @click="menuAction(id)">
              {{ section }}
            </li>
          </ul>

          <div class="title-bottom__description">
            {{ currentPageData.description }}
          </div>

          <div class="title-bottom__ratingsection">
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

          <div class="title-bottom__reviews">
            <app-review v-for="(review, id) in reviews.items" :data="review" :key="id"></app-review>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppReview from "../components/UI/AppReview.vue";
import Loader from "../components/UI/Loader.vue";
import { key } from "../APIKEY.json"

export default {
  components: { Loader, AppReview },
  data () {
    return {
      key,
      menuStatus: ["true", "false", "false"],
      activeStyle: {
        "font-weight": 500,
        "border-bottom": "1px solid orange",
        "z-index": 5,
      },
      points: [
        "Год производства",
        "Страна",
        "Жанр",
        "Слоган",
        "Возраст",
        "Время",
      ],
      currentPageData: {},
      values: [],
      about: {},
      reviews: {},
      actors: [],
      ratingColor: "",
      sections: ["Обзор", "Изображения"],
    };
  },
  props: [""],
  methods: {
    async getReviews (id) {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`;

      await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": key,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.reviews = { ...json }
        })
        .catch((err) => console.log(err));
    },
    async getTitle (id) {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`;

      await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": key,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.currentPageData = { ...json };

          this.about = {
            year: this.currentPageData.year,
            countries: [
              ...this.currentPageData.countries.map((i) => i.country),
            ].join(", "),
            genre: [
              ...this.currentPageData.genres.map((i) => i.genre),
            ].join(", "),
            slogan: this.currentPageData.slogan,
            minAge: this.getMinAge || 0,
            time: this.currentPageData.filmLength + " мин.",
          };

          this.getRatingColor(json.ratingKinopoisk);

          this.getActors(id);
        })
        .catch((err) => console.log(err));
    },
    async getActors (id) {
      const url = `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`;

      await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": key,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.actors.push(...json);

          this.$store.state.loading.titlePage = false;
        })
        .catch((err) => console.log(err));
    },
    getRatingColor (score) {
      if (score > 7.0) {
        this.ratingColor = "green";
      }

      if (score < 7.0 && score > 4.0) {
        this.ratingColor = "grey";
      }

      if (score < 4.0) {
        this.ratingColor = "red";
      }
    },
    menuAction (id) {
      this.menuStatus[0] = "false";
      this.menuStatus[1] = "false";
      this.menuStatus[2] = "false";
      this.menuStatus[id] = "true";

      this.$forceUpdate();
    },
  },
  computed: {
    getMinAge () {
      const count = this.currentPageData.ratingAgeLimits;

      if (count === null) {
        return ""
      }

      return count.match(/[\d]/gi).join("").trim() + "+";
    },
    countRating () {
      const votes = this.currentPageData.ratingKinopoiskVoteCount;

      if (votes < 1000) {
        return votes;
      }

      if (votes > 1000) {
        return Math.floor(votes / 1000) + "K";
      }

      return "";
    },
  },
  mounted () {
    this.getTitle(this.$route.params.id);
    this.getReviews(this.$route.params.id);
  },
};
</script>

<style scoped lang="scss">
.scores {
  display: flex;

  &__positive {
    color: green;
  }

  &__neutral {}

  &__negative {
    color: red;
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

.score__item:hover {
  background-color: rgb(207, 205, 205);
}

.scores__title {
  color: black;
  font-size: calc(1.2vw);
}

.scores__counter {
  font-weight: 600;
  font-size: calc(1.5vw);
}

.title {
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-title {
  max-width: 1200px;
  margin: 0 auto;
}

.title-center__originalname {
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  vertical-align: middle;
  letter-spacing: -0.2px;
  font-weight: 200;
  color: rgba(31, 31, 31, 0.6);
}

.title-main {
  display: flex;
}

.title-left__poster {
  width: 300px;
  height: 400px;
  border-radius: 4px;
}

.title-left__poster img {
  border: 1px solid rgb(229, 226, 226);
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
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
  width: 580px;
}

.title-center__rating {
  width: 240px;
  display: flex;
  justify-content: end;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
}

.title-center__line {
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
}

.title-center__line:after {
  content: "Недостаточно оценок, \A рейтинг формируется";
  white-space: pre;
  color: rgba(0, 0, 0, 0.4);
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
  color: rgba(31, 31, 31, 0.4);
  border: 1px solid rgba(31, 31, 31, 0.4);
  padding: 1px 3px 0;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  border-radius: 3px;
  margin-left: 10px;
}

.raiting-count {
  color: rgba(0, 0, 0, 0.4);
  margin-left: 6px;
  font-size: 32px;
  font-weight: 200;
}

.title-center__info {
  display: flex;
  justify-content: space-between;
}

.title-center__heading {
  color: #1f1f1f;
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
}

.point {
  color: rgba(0, 0, 0, 0.4);
  width: 160px;
  font-size: 15px;
  line-height: 18px;
  padding: 8px 0;
}

.value {
  padding: 8px 0;
  color: #333;
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
  font-size: 15px;
  line-height: 18px;
  cursor: pointer;
  transition: all 0.4s;
  border-radius: 52px;
}

.title-center__tickets:hover {
  background: rgb(70, 95, 252);
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
  background-color: rgba(234, 229, 229, 0.746);
}

.title-center__status span {
  width: 100%;
  height: 100%;
  text-align: center;
}

.title-center__status:hover {
  background-color: rgb(219, 215, 215);
}

.title-center__actors span {
  font-size: 20px;
  line-height: 18px;
  font-weight: bolder;
  color: #1f1f1f;
}

.actor {
  cursor: pointer;
  list-style: none;
  font-size: 15px;
  font-weight: lighter;
  margin: 3px 0;
}

.actor:hover {
  color: orange;
}

.title-bottom {
  padding-top: 70px;
}

.title-bottom__ratingsection span {
  display: inline-block;
  color: #1f1f1f;
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  padding: 20px 0;
  margin-right: 25px;
}

.title-bottom__description {
  font-size: 16px;
  line-height: 1.38;
  color: #393939;
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
}

.write-btn:hover {
  background: rgb(221, 220, 220);
  border-color: rgba(42, 42, 42, 0.1);
}

.write-btn:before {
  content: "+";
  margin-right: 6px;
}

.title-bottom__menu {
  display: inline-flex;
  border-bottom: 1px solid rgb(214, 212, 212);
  margin-bottom: 25px;
  padding-top: 3px;
}

.title-bottom__menu li {
  list-style: none;
  color: #1f1f1f;
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
</style>