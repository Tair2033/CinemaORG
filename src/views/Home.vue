<template>
  <div class="home">
    <div class="container home-inside">
      <div class="video">

        <div class="video-info">
          <img class="video-img" src="https://horrorzone.ru/uploads/_trailers/105738/screenshot_29.jpg" alt="">
          <p class="video-par">
            Американский художественный фильм 2022 года режиссёра
            Мэтта Ривза с Робертом Паттинсоном в главной роли. Перезапуск
            серии фильмов о Бэтмене.
          </p>
          <span class="video-about">
            В ролях:
            <strong class="video-about__text">
              Роберт Паттинсон, Зоя Кравиц, Колин Фаррелл
            </strong>
          </span>
          <br>
          <span class="video-about">
            Режиссер:
            <strong class="video-about__text">
              Мэтт Ривз
            </strong>
          </span>
        </div>

        <iframe width="600" height="270"
          src="https://www.youtube.com/embed/hbnx6DJQ3xU?controls=0&showinfo=0&loop=1&modestbranding=1" frameborder="0"
          allow="accelerometer; autoplay; gyroscope; picture-in-picture" allowfullscreen ref="video"
          @mousemove="videoAction">
        </iframe>
      </div>

      <div class="premiere-films">
        <h3 class="title">Премьеры</h3>
        <div class="films">
          <app-slider :data="premiereList"></app-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSlider from "../components/AppSlider.vue";

export default {
  components: { AppSlider },
  name: "Home",
  data () {
    return {
      url: "",
      premiereList: []
    };
  },
  methods: {
    async getPremereFilm () {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=JANUARY`;

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
          this.premiereList.push(...json.items);
        })
        .catch((err) => console.log(err));
    },
    videoAction () {

    }
  },
  mounted () {
    this.getPremereFilm();

  },
};
</script>

<style scoped>
.video-about {
  font-size: 12px;
  color: #b2b2b2;
}

.video-about__text {
  color: #f31111;
  text-align: start;
}

.video-info {
  background-color: black;
  padding: 20px 105px;
  color: white;
  text-align: center;
  max-width: 500px;
}

.video-img {
  max-width: 150px;
}

.video-par {
  display: inline-block;
  font-size: 13px;
}

.home-inside {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.video {
  display: flex;
  justify-content: space-between;
}

.home {
  height: 100vh;
  padding-top: 100px;
}


.title {
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  margin-top: 20px;
  margin-left: 70px;
  margin-bottom: 15px;
}

.premiere-films {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.films {
  display: flex;
  justify-content: center;
}
</style>
