<template>
  <div class="home">
    <div class="container home-inside">

      <section class="main__section">
        <div class="main__title">
          <div class="main__image">
            <img loading="lazy" src="https://images.hdqwalls.com/download/daenerys-targaryen-4k-iu-2560x1024.jpg" alt="">

            <div class="main__about">
              <div class="main__about-logo">
                <img src="https://i.servimg.com/u/f62/19/77/94/54/mbr8wj10.png" alt="">
              </div>

              <div class="main__about-description">
                К концу подходит время благоденствия, и лето, длившееся почти десятилетие, угасает. Вокруг средоточия
                власти
                Семи королевств, Железного трона, зреет заговор, и в это непростое время король решает искать поддержки у
                друга юности Эддарда Старка.
                Рыцари, мертвецы и драконы — в эпической битве за судьбы мира. Сериал, который навсегда изменил
                телевидение
              </div>

              <div class="main__about-button">
                <router-link to="/film/464963">
                  На страницу
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="slider__section">
        <h3 class="title">Премьеры</h3>
        <div class="films">
          <app-slider :data="premiereList"></app-slider>
        </div>
      </section>

      <section class="content__section">

        <div class="content__info content__batman">
          <img class="content__img" src="https://horrorzone.ru/uploads/_trailers/105738/screenshot_29.jpg" alt="">
          <p class="content__par">
            Американский художественный фильм 2022 года режиссёра
            Мэтта Ривза c Робертом Паттинсоном в главной роли. Перезапуск
            серии фильмов c Бэтмене.
          </p>
          <span class="content__about">
            B ролях:
            <strong class="content__about-text content__batman-text">
              Роберт Паттинсон, Зоя Кравиц, Колин Фаррелл
            </strong>
          </span>
          <br>
          <span class="content__about content__batman-about">
            Режиссер:
            <strong class="content__about-text">
              Мэтт Ривз
            </strong>
          </span>
        </div>

        <iframe width="600" src="https://www.youtube-nocookie.com/embed/hbnx6DJQ3xU?si=P0WyrSMpD6D_DPyf&amp;controls=0"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen ref="video" @mousemove="videoAction"></iframe>
      </section>

      <section class="slider__section">
        <h3 class="title">Цифровые релизы</h3>
        <div class="films">
          <app-slider :data="releases"></app-slider>
        </div>
      </section>

      <!-- Факты шутки -->

      <section class="content__section">

        <div class="content__info content__bad">
          <img class="content__img" src="https://logodix.com/logo/315391.png" alt="">
          <p class="content__par">
            Школьный учитель химии Уолтер Уайт узнаёт, что болен раком лёгких. Уолтер решает заняться изготовлением
            метамфетамина. Для этого он привлекает своего бывшего ученика Джесси Пинкмана, когда-то исключённого из школы
            при активном содействии Уайта.
          </p>
          <span class="content__about content__bad-about">
            B ролях:
            <strong class="content__about-text">
              Брайан Крэнстон, Анна Ганн, Аарон Пол
            </strong>
          </span>
        </div>

        <iframe width="600" src="https://www.youtube-nocookie.com/embed/ceqOTZnhgY8?si=_Q7I2PGd13sMf310&amp;controls=0"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen @mousemove="videoAction"></iframe>
      </section>


    </div>
  </div>
</template>

<script>
import AppSlider from "../components/AppSlider.vue";
import { key } from "../APIKEY.json"

export default {
  components: { AppSlider },
  name: "Home",
  data () {
    return {
      url: "",
      premiereList: [],
      releases: [],
      months: [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
      ]
    };
  },
  methods: {
    async getReleases () {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();

      const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${year}&month=${this.months[month]}&page=1`;

      await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": key,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.releases = [...json.releases];
        })
        .catch((err) => console.log(err));
    },
    async getPremereFilms () {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();

      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${this.months[month]}`;

      await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": key,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.premiereList.push(...json.items);
        })
        .catch((err) => console.log(err));
    },
    videoAction () {

    }
  },
  mounted () {
    this.getPremereFilms();
    this.getReleases();
  },
};
</script>

<style scoped lang="scss">
.main {
  &__section {}

  &__title {
    position: relative;
  }

  &__image {
    position: relative;
    display: flex;
    justify-content: center;
    max-width: 1100px;
    max-height: 500px;
  }

  &__image img {
    width: 100%;
    height: auto;
  }

  &__about {
    color: white;
    background: linear-gradient(90deg, rgba(0, 0, 0, 1) 58%, rgba(0, 0, 0, 0) 86%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    padding-left: 30px;
    left: 0px;
    height: 100%;
    width: 50%;
  }

  &__about-logo {
    margin-left: 40px;
    width: 240px;
  }

  &__about-logo img {
    display: block;
    width: 100%;
    height: auto;
  }

  &__about-description {
    font-size: 15px;
  }

  &__about-button {
    margin-top: 35px;
  }

  &__about-button a {
    color: white;
    font-size: 17px;
    text-decoration: none;
    background-color: rgb(1, 1, 87);
    padding: 10px 15px;
    border-radius: 18px;
    transition: all 0.4s;
  }

  &__about-button a:hover {
    color: rgb(191, 190, 190);
    background-color: rgb(6, 6, 114);
  }
}


.content__about {
  font-size: 12px;
}

.content__bad-about {
  font-weight: 700;
}

.content__batman-about {
  color: #b2b2b2;
}

.content__about-text {
  text-align: start;
}

.content__batman-text {
  color: #f31111;
}

.content__batman {
  background-color: black;
  color: white;
  padding: 20px 105px;
}

.content__bad {
  background-color: rgba(167, 168, 168, 0.743);
  color: black;
  padding: 20px 60px;
}

.content__info {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: center;
  max-width: 500px;
}

.content__img {
  max-width: 150px;
}

.content__par {
  display: inline-block;
  font-size: 13px;
  margin-bottom: 10px;
  font-weight: 500;
}

.home-inside {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.content__section iframe {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.content__section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.home {
  height: 100vh;
  padding-top: 100px;
  margin: 0 20px;
}


.title {
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  margin-top: 20px;
  margin-left: 70px;
  margin-bottom: 15px;
}

.slider__section {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.films {
  display: flex;
  justify-content: center;
  min-height: 312px;
}

@media (max-width: 1100px) {
  .content__section {
    flex-direction: column;
  }

  .content__info {
    max-width: 100%;
    border-bottom-left-radius: 0;
    border-top-right-radius: 10px;
  }

  .content__section iframe {
    width: 100%;
    height: 260px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 0px;
  }
}
</style>
