<template>
  <div class="title">
    <loader style="padding-top: 50px" v-if="$store.state.loading.titlePage"></loader>
    <div class="title" v-if="!$store.state.loading.titlePage">
      <div class="container-title">
        <div class="title-main">
          <div class="title-left">
            <div class="title-left__poster">
              <img :src="title[0].posterUrl || ''" alt="" />
            </div>
          </div>
          <div class="title-center">
            <div class="title-center__top">
              <div class="title-center__heading">
                <div class="title-center__name">
                  {{ title[0].nameRu }}
                </div>
                <div class="title-center__originalname">
                  {{ title[0].nameOriginal || "" }}
                  <div class="min-age">
                    {{ getMinAge }}
                  </div>
                </div>
              </div>
              <div class="title-center__line" v-if="!title[0].ratingKinopoisk">
                -
                <div class="raiting-count">
                  {{ countRating }}
                </div>
              </div>
              <div :style="{ color: ratingColor }" class="title-center__rating" v-if="title[0].ratingKinopoisk">
                {{ title[0].ratingKinopoisk }}
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
                <div class="title-center__status">...</div>
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
                    <div v-for="(val, id) in values[0]" :key="id" class="value">
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
              " v-for="(item, id) in items" :key="id" @click="menuAction(id)">
              {{ item }}
            </li>
          </ul>

          <div class="title-bottom__description">
            {{ title[0].description }}
          </div>

          <div class="title-bottom__ratingsection">
            <span>Рейтинг фильма</span>
            <div class="title-bottom__rating">
              <div :style="{ color: ratingColor }" class="title-bottom__ratingKinopoisk">
                {{ title[0].ratingKinopoisk }}
              </div>
              <div class="title-bottom__ratingImdb">
                Imdb: {{ title[0].ratingImdb }}
              </div>
            </div>
          </div>
          <div class="write-btn">Написать рецензию</div>

          <div class="title-bottom__reviews">
            <!-- TODO: Реализовать -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../components/UI/Loader.vue";
export default {
  components: { Loader },
  data () {
    return {
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
      values: [],
      title: [],
      actors: [],
      ratingColor: "",
      items: ["Обзор", "Изображения", "Рецензии"],
    };
  },
  props: [""],
  methods: {
    async getTitle (id) {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`;

      const api = "c3ee5da4-a7c1-41a4-af57-146b16d229d2";

      await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": api,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.title.push(json);

          this.values.push({
            year: this.title[0].year,
            countries: [
              ...this.title[0].countries.map((i) => i.country),
            ].join(", "),
            genre: [
              ...this.title[0].genres.map((i) => i.genre),
            ].join(", "),
            slogan: this.title[0].slogan,
            minAge: this.getMinAge,
            time: this.title[0].filmLength + " мин.",
          });

          this.getRatingColor(json.ratingKinopoisk);

          this.getActors(id);
        })
        .catch((err) => console.log(err));
    },
    async getActors (id) {
      const url = `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`;

      const api = "c3ee5da4-a7c1-41a4-af57-146b16d229d2";

      await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": api,
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
      const count = this.title[0].ratingAgeLimits;
      return count.match(/[\d]/gi).join("").trim() + "+";
    },
    countRating () {
      const votes = this.title[0].ratingKinopoiskVoteCount;

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
  },
};
</script>

<style scoped>
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

.title-left__poster img {
  max-width: 300px;
  max-height: 400px;
  border-radius: 4px;
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
  align-items: center;
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
  align-items: center;
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
  border-radius: 52px;
}

.title-center__tickets:hover {
  background: rgb(252, 81, 2);
}

.title-center__status {
  cursor: pointer;
  font-size: 25px;
  margin-left: 25px;
  margin-bottom: 10px;
  border-radius: 50%;
  padding-bottom: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
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
}

.title-bottom__description {
  font-size: 16px;
  line-height: 1.38;
  color: #393939;
}

.title-bottom__rating {
  display: flex;
  align-items: center;
}

.title-bottom__ratingKinopoisk {
  font-size: 46px;
  line-height: 1;
  font-weight: 500;
  display: inline-block;
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
  background: #fff;
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
  margin-bottom: 40px;
}

.write-btn:hover {
  background: rgb(221, 220, 220);
}

.write-btn:before {
  content: "+";
  margin-right: 6px;
}

.title-bottom {}

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