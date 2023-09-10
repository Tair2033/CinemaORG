<template>
  <div class="title">
    <div class="loader__wrapper" v-if="!$store.state.loading.actorPage">
      <Loader></Loader>
    </div>

    <div class="title" v-show="$store.state.loading.actorPage">
      <div class="container-title">
        <div class="title-main">
          <div class="title-content">
            <div class="title-left">
              <div class="title-left__poster">
                <img
                  loading="lazy"
                  width="100%"
                  height="100%"
                  :src="actor.posterUrl || ''"
                  alt=""
                />
              </div>
            </div>
            <div class="title-center">
              <div class="title-center__top">
                <div class="title-center__heading">
                  <div class="title-center__name">
                    {{ actor.name }}
                  </div>
                  <div class="title-center__originalname">
                    {{ actor.nameEn || '' }}
                  </div>
                </div>
              </div>

              <div class="title-center__center">
                <div class="title-center__info">
                  <span class="title-center__heading"> Об актёре </span>
                  <div class="title-center__infoblock">
                    <div class="title-center__points">
                      <div
                        class="title-center__item"
                        v-for="(point, id) in points"
                        :key="id"
                      >
                        <div class="point">
                          {{ id }}
                        </div>

                        <div class="value">
                          {{ point }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="title__films">
                  <div class="title__text">Фильмы</div>
                  <div
                    v-for="(film, id) in actor.films"
                    :key="id"
                    class="title__films-film"
                  >
                    <router-link :to="'/film/' + film.filmId">
                      {{ film.nameRu }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="facts__wrapper">
            <div class="facts__title">Факты</div>
            <div
              class="facts__fact"
              v-for="(fact, id) in actor.facts"
              :key="id"
            >
              {{ id + 1 }}. {{ fact }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { key } from '../APIKEY.json';
  import Loader from '../components/UI/Loader.vue';

  export default {
    data() {
      return {
        actor: {
          posterUrl: '',
          name: '',
          nameEn: '',
          facts: [],
          films: []
        },
        points: {
          Пол: '',
          Карьера: '',
          Рост: '',
          'Дата рождения': '',
          Возраст: '',
          Жанры: ''
        }
      };
    },
    methods: {
      async getActorData() {
        const actorId = this.$route.params.id;
        const url = `https://kinopoiskapiunofficial.tech/api/v1/staff/${actorId}`;
        await fetch(url, {
          method: 'GET',
          headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json'
          }
        })
          .then((res) => res.json())
          .then((json) => {
            let films = [];

            json.films.every((film, id) => {
              if (id >= 10) {
                return false;
              }

              films.push(film);

              return true;
            });

            this.actor = {
              posterUrl: json.posterUrl,
              name: json.nameRu,
              nameEn: json.nameEn,
              facts: [...json.facts],
              films: [...films]
            };

            let birth = json.birthday.split('-').reverse().join('-');

            this.points = {
              Пол: this.getSex(json.sex),
              Карьера: json.profession,
              Рост: json.growth + ' см.',
              'Дата рождения': birth,
              Возраст: json.age,
              'Место рождения': json.birthplace
            };

            if (json.death !== null) {
              this.points = { ...this.points, 'Дата смерти': json.death };
            }

            this.$store.state.loading.actorPage = true;
          })
          .catch((err) => console.log(err));
      },
      getSex(sex) {
        return sex === 'MALE' ? 'Мужской' : 'Женский';
      }
    },
    beforeMounted() {
      window.scrollTo({
        top: 0
      });
    },
    mounted() {
      this.getActorData();
    },
    components: { Loader }
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
    margin-bottom: 10px;
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

  .title-content {
    display: flex;
    justify-content: space-around;
  }

  .title-center__center {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
  }

  .title-center__originalname {
    display: inline-flex;
    align-items: center;
    font-size: 18px;
    vertical-align: middle;
    letter-spacing: -0.2px;
    font-weight: 200;
    color: rgb(11, 9, 9);
  }

  .title__films-film {
    margin: 5px 0;
  }

  .title__films-film a {
    word-wrap: break-word;
    color: rgba(201, 200, 200, 0.889);
    text-decoration: none;
    font-size: 15px;
    transition: all 0.2s;
  }

  .title__films-film a:hover {
    color: #f79c3b;
  }

  .title-left__poster {
    height: 400px;
    width: 300px;
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

  .facts {
    &__wrapper {
      margin-top: 80px;
      margin-bottom: 40px;
      border: 1px solid rgb(95, 94, 94);
      padding: 15px 20px;
      border-radius: 10px;
    }

    &__title {
      color: rgba(251, 249, 249, 0.889);
      font-size: 24px;
      line-height: 30px;
      font-weight: 700;
    }

    &__fact {
      margin: 10px 0;
      color: rgba(201, 200, 200, 0.889);
      font-weight: 500;
    }
  }

  .title__text {
    color: rgba(251, 249, 249, 0.889);
    font-size: 24px;
    line-height: 30px;
    font-weight: 700;
  }

  .title__films {
    max-width: 250px;
  }

  .title-center {
    margin-left: 35px;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title-center__top {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .title-center__name {
    white-space: normal;
    font-size: 40px;
    font-weight: 700;
    line-height: 35px;
  }

  .title-center__originalname {
    white-space: normal;
    font-size: 32px;
    font-weight: 700;
    line-height: 30px;
    color: #757474;
    margin-top: 25px;
  }

  .title-center__line {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 700;
    line-height: 48px;
  }

  .title-center__info {
    display: flex;
    flex-direction: column;
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

  .point {
    color: rgba(251, 249, 249, 0.889);
    font-size: 15px;
    min-width: 150px;
    line-height: 18px;
    padding: 8px 0;
  }

  .value {
    padding: 8px 0;
    color: rgba(139, 138, 138, 0.889);
    font-size: 13px;
    line-height: 18px;
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

  @media (max-width: 1100px) {
    .title-center__top {
      display: flex;
      flex-direction: column;
      justify-content: start;
    }
  }

  @media (max-width: 950px) {
    .title__films {
      display: none;
    }
  }

  @media (max-width: 680px) {
    .title-content {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .title-center {
      margin-left: 0;
      width: 100%;
      margin-top: 50px;
    }

    .title-center__item {
      width: auto;
    }

    .title-center__status {
      margin-left: 4px;
    }

    .title-center__top {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
