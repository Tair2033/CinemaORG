<template>
  <div class="film-top">
    <div class="container">
      <div class="nav">
        <div class="nav-all">
          <router-link to="/movies" class="nav__element">
            Все списки
          </router-link>
        </div>

        <ul class="nav-right">
          <li class="nav__li">
            <router-link to="/movies/top250" class="nav__element">
              Топ 250 фильмов
            </router-link>
          </li>
          <li class="nav__li">
            <router-link to="/movies/popular" class="nav__element">
              Популярные фильмы
            </router-link>
          </li>
          <li class="nav__li">
            <router-link to="/movies/awaiting" class="nav__element">
              Ожидаемые фильмы
            </router-link>
          </li>
          <li class="nav__li">
            <router-link to="/" class="nav__element">
              Онлайн кинотеатр
            </router-link>
          </li>
        </ul>
      </div>

      <div class="line"></div>

      <div v-if="$route.params.name === 'top250'" class="top-wrapper">
        <div class="top">
          <div>
            <h1 class="top__title">250 лучших фильмов</h1>
            <p class="top__paragraph">Рейтинг составлен по результатам
              голосования посетителей сайта. Любой желающий может принять
              в нем участие, проголосовав за свой любимый фильм.
            </p>
          </div>
          <div class="top-img">
            <img class="top-img__element"
              src="https://avatars.mds.yandex.net/get-bunker/56833/3ee361778f24483f04a6819bc6d84bcfba9030e4/384x384"
              alt="" />
          </div>
        </div>

        <h1 class="top__title">Список</h1>

        <div style="display: flex; justify-content: center;">
          <loader v-if="$store.state.loading.top"></loader>
        </div>

        <div v-if="!$store.state.loading.top">
          <div class="list">
            <app-title-item v-for="(item, id) in top250" :item="item" :key="id" :id="id"></app-title-item>
          </div>
        </div>


        <app-pagination :active="$store.state.Top250PageCount" :len="5" :change="getTop250">
        </app-pagination>
      </div>

      <div v-if="$route.params.name === 'popular'" class="top-wrapper">
        <div class="top">
          <div>
            <h1 class="top__title">Популярные фильмы</h1>
            <p class="top__paragraph">
              Рейтинг составлен на основе посещаемости страниц фильмов, а также
              запросов к поисковой системе сайта. Список обновляется один раз в сутки.
            </p>
          </div>
          <div class="top-img">
            <img class="top-img__element"
              src="https://avatars.mds.yandex.net/get-kinopoisk-image/9784475/54a13e1e-d898-4528-9466-c8b404ef2a47/192x192"
              alt="" />
          </div>
        </div>

        <div style="display: flex; justify-content: center;">
          <loader v-if="$store.state.loading.popular"></loader>
        </div>

        <div v-if="!$store.state.loading.popular">
          <div class="list">
            <app-title-item v-for="(item, id) in popular" :item="item" :key="id" :id="id"></app-title-item>
          </div>
        </div>

        <app-pagination :active="$store.state.Top250PageCount" :len="5" :change="getPopular">
        </app-pagination>
      </div>

      <div v-if="$route.params.name === 'awaiting'" class="top-wrapper">
        <div class="top">
          <div>
            <h1 class="top__title">Ожидаемые фильмы</h1>
            <p class="top__paragraph">
              Рейтинг составлен на основе пользовательских голосов, любой
              зарегистрированный посетитель сайта может легко принять в нём участие.
            </p>
          </div>
          <div class="top-img">
            <img class="top-img__element" src="/img/wait.png" alt="" />
          </div>
        </div>

        <div style="display: flex; justify-content: center;">
          <loader v-if="$store.state.loading.awaiting"></loader>
        </div>

        <div v-if="!$store.state.loading.awaiting">
          <div class="list">
            <app-title-item v-for="(item, id) in awaiting" :item="item" :key="id" :id="id"></app-title-item>
          </div>
        </div>

        <app-pagination :active="$store.state.Top250PageCount" :len="5" :change="getAwaiting">
        </app-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import AppTitleItem from "@/components/AppTitleItem";
import AppPagination from "@/components/UI/AppPagination";
import Loader from "@/components/UI/Loader";
export default {
  components: { Loader, AppPagination, AppTitleItem },
  data () {
    return {
      top250: [],
      awaiting: [],
      popular: []
    }
  },
  methods: {
    async getTop250 (page) {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`;

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
          this.top250 = [...json.films]
          this.$store.state.loading.top = false;
        })
        .catch((err) => console.log(err));
    },
    async getPopular (page) {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${page}`;

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
          this.popular = [...json.films]
          this.$store.state.loading.popular = false;
        })
        .catch((err) => console.log(err));
    },
    async getAwaiting (page) {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=${page}`;

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
          this.awaiting = [...json.films]
          this.$store.state.loading.awaiting = false;
        })
        .catch((err) => console.log(err));
    }
  },
  beforeMount () {
    if (this.$route.params.name === "top250") {
      this.getTop250(this.$store.state.Top250PageCount);
    }

    if (this.$route.params.name === 'popular') {
      this.getPopular(this.$store.state.popularPageCount);
    }

    if (this.$route.params.name === 'awaiting') {
      this.getAwaiting(this.$store.state.awaitingPageCount);
    }
  },
};
</script>

<style scoped>
.top-wrapper {
  padding: 0 30px;
}

.line {
  width: 100%;
  height: 1px;
  background-color: #c5c3c3;
  margin: 23px 0;
}

.film-top {
  padding-top: 80px;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}

.nav-all {
  float: left;
}


.nav-right {
  display: flex;
  align-items: center;
}

.nav__li {
  list-style: none;
  margin-left: 10px;
}

.nav__element {
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  color: #777;
  transition-timing-function: ease-out;
  transition-duration: .1s;
  transition-property: color;
}

.nav__element:hover {
  color: black;
}

.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.top-img {
  flex-shrink: 0;
  width: 160px;
  min-width: 160px;
  height: 160px;
  min-height: 160px;
  filter: drop-shadow(0 16px 32px rgba(0, 0, 0, .15));
}

.top-img__element {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.top__title {
  margin: 0 0 20px;
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
  color: #222;
}

.top__paragraph {
  margin: 0;
  line-height: 22px;
  font-weight: 300;
  color: #333;
}
</style>