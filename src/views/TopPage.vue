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
          <li class="nav__li" @click="reload">
            <router-link to="/movies/top250" class="nav__element">
              Топ 250 фильмов
            </router-link>
          </li>
          <li class="nav__li" @click="reload">
            <router-link to="/movies/top100" class="nav__element">
              Популярные фильмы
            </router-link>
          </li>
          <li class="nav__li" @click="reload">
            <router-link to="/movies/awaiting" class="nav__element">
              Ожидаемые фильмы
            </router-link>
          </li>
        </ul>
      </div>

      <div class="line"></div>

      <div class="top-wrapper">
        <div class="top">
          <div>
            <h1 class="top__title">{{ currrentSection.title }}</h1>
            <p class="top__paragraph">
              {{ currrentSection.description }}
            </p>
          </div>
          <div class="top-img">
            <img
              class="top-img__element"
              :src="currrentSection.logo || null"
              alt="img"
            />
          </div>
        </div>

        <div style="display: flex; justify-content: center">
          <loader v-if="$store.state.loading.topPage"></loader>
        </div>

        <div v-if="!$store.state.loading.topPage">
          <div class="list">
            <app-title-item
              v-for="(item, id) in content"
              :currentPage="$store.state.pageCounter"
              :item="item"
              :key="id"
              :id="id"
            ></app-title-item>
          </div>
        </div>

        <div v-if="!$store.state.loading.topPage">
          <app-pagination :settings="settings" :callback="getContent">
          </app-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppTitleItem from '@/components/AppTitleItem';
  import AppPagination from '@/components/UI/AppPagination';
  import Loader from '@/components/UI/Loader';
  import { key } from '../APIKEY.json';

  export default {
    components: { Loader, AppPagination, AppTitleItem },
    data() {
      return {
        key,
        pageType: '',
        content: [],
        awaiting: [],
        settings: {
          totalPages: 15
        },
        currrentSection: {
          title: '',
          description: '',
          logo: ''
        }
      };
    },
    computed: {
      getContentType() {
        return true;
      }
    },
    methods: {
      reload() {
        location.reload();
      },
      async getContent(page) {
        let type = '';

        switch (this.pageType) {
          case 'top250':
            type = 'TOP_250_BEST_FILMS';
            break;
          case 'top100':
            type = 'TOP_100_POPULAR_FILMS';
            break;
          case 'awaiting':
            type = 'TOP_AWAIT_FILMS';
            break;
          default:
            break;
        }

        const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${type}&page=${page}`;

        this.$store.state.loading.topPage = true;

        await fetch(url, {
          method: 'GET',
          headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json'
          }
        })
          .then((res) => res.json())
          .then((json) => {
            this.content = [...json.films];

            // this.settings.totalPages = json.pagesCount;

            this.$store.state.loading.topPage = false;
          })
          .catch((err) => console.log(err));
      }
    },
    beforeUpdate() {
      window.scrollTo({
        top: 0
      });
    },
    beforeMount() {
      this.$store.state.pageCounter = 1;
      this.pageType = this.$route.params.name;

      switch (this.pageType) {
        case 'top250':
          this.currrentSection = {
            title: '250 лучших фильмов',
            description:
              'Рейтинг составлен по результатам голосования посетителей сайта. Любой желающий может принять в нем участие, проголосовав за свой любимый фильм.',
            logo: 'https://avatars.mds.yandex.net/get-bunker/56833/3ee361778f24483f04a6819bc6d84bcfba9030e4/384x384'
          };
          break;
        case 'top100':
          this.currrentSection = {
            title: 'Популярные фильмы',
            description:
              'Рейтинг составлен на основе посещаемости страниц фильмов, а также запросов к поисковой системе сайта. Список обновляется один раз в сутки.',
            logo: 'https://avatars.mds.yandex.net/get-kinopoisk-image/9784475/54a13e1e-d898-4528-9466-c8b404ef2a47/192x192'
          };
          break;
        case 'awaiting':
          this.currrentSection = {
            title: 'Ожидаемые фильмы',
            description:
              'Рейтинг составлен на основе пользовательских голосов, любой зарегистрированный посетитель сайта может легко принять в нём участие.',
            logo: 'https://n1s1.hsmedia.ru/47/d7/1b/47d71bd6cb89912518d5d688017d1449/600x600_1_082b572772aec9155b3ad28970bc34e5@1200x1200_0xac120004_4674534611680099044.png'
          };
          break;
        default:
          break;
      }
      this.getContent(this.$store.state.pageCounter);
    }
  };
</script>

<style scoped>
  .active {
    border-bottom: 2px solid orange;
  }

  .active:focus {
    border-bottom: 2px solid orange;
  }

  .nav__element {
    transition: all 0.4s;
  }

  .nav__element:hover {
    border-bottom: 2px solid rgba(248, 186, 70, 0.478);
  }

  .top__loader {
    display: flex;
    justify-content: center;
  }

  .top-wrapper {
    padding: 0 30px;
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: #676666;
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
    transition-duration: 0.1s;
    transition-property: color;
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
    filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.15));
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
    color: #cecece;
  }

  .top__paragraph {
    margin: 0;
    line-height: 22px;
    font-weight: 300;
    color: #a5a5a5;
  }
</style>
