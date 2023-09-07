<template>
  <div @click="goToPage" class="title-item">
    <div class="title-counter" v-if="currentPage == 1">{{ id + 1 }}</div>
    <div class="title-counter" v-if="currentPage > 1">{{ (id + 1) + (10 * currentPage) }}</div>

    <div class="title-image">
      <img :src="item.posterUrlPreview" alt="">
    </div>

    <div class="title-about">
      <div class="title-about__left">
        <div class="title-about__name">{{ item.nameRu }}</div>
        <div class="title-about__undername">
          {{ item.nameEn || '' }} {{ item.year }} {{ item.filmLength }}
        </div>
        <div class="title-about__subinfo">
          {{ item.countries[0].country }}
          {{ genres }}
        </div>
      </div>

      <div class="title-about__right">
        <div class="">
          <div class="title-about__rating">
            <div class="score">{{ item.rating }}</div>
            <div class="user-count">{{ item.ratingVoteCount }}</div>
          </div>
        </div>
        <div class="title-about__button">
          <div class="bookmarks" v-if="!status" @click="status = true">Буду смотреть
          </div>
          <div class="watching" v-if="status">
            Вы смотрите &#10004;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: false,
      genres: [
        ...this.item.genres.map((i) => i.genre),
      ].join(", ")
    }
  },
  methods: {
    goToPage (e) {
      console.log(e);
      if (!e.target.classList.contains('watching')) {
        this.$router.push('/film/' + this.item.filmId)
      }
    }
  },
  props: ['item', 'id', 'currentPage'],
}

</script>

<style scoped>
.title-item {
  display: flex;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  transition-property: box-shadow;
  transition-duration: 0.3s;
  text-decoration: none;
  background-color: #2222225b;
}

.title-item:hover {
  box-shadow: -1px 3px 22px 11px rgba(62, 62, 62, 0.449);
}

.title-image {
  margin-left: 20px;
}

.title-image img {
  width: 64px;
  min-width: 64px;
  height: 96px;
  border-radius: 6px;
}

.title-about__right {
  display: flex;
  align-items: center;
}

.title-about__rating {
  margin-right: 16px;
  display: flex;
  align-items: center;
}

.title-about {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 20px;
}

.title-about__undername {
  padding-bottom: 4px;
  font-size: 13px;
  font-weight: 300;
  color: #8e8c8c;
}

.title-about__name {
  color: #cecece;
  font-weight: 500;
  font-size: 18px;
}

.title-about__subinfo {
  font-size: 13px;
  line-height: 16px;
  color: #8a8a8a;
}

.watching {
  background-color: #3bb33b;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  font-style: normal;
  line-height: 16px;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  color: #333;
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 4px;
  outline: none;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 4%);
  transition: trasnform .2s ease, background-color .2s ease;

}


.bookmarks {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  font-style: normal;
  line-height: 16px;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  color: #333;
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 4px;
  outline: none;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 4%);
  transition: trasnform .2s ease, background-color .2s ease;
}

.bookmarks:hover {
  background-color: #de8447;
}

.title-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 24px;
  text-align: center;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #cecece;
  align-self: center;
}

.score {
  color: #3bb33b;
  font-weight: 500;
  font-size: 18px;
  margin-right: 10px;
}

.user-count {
  font-size: 12px;
  color: #777;
}

.top-rating {
  margin-bottom: 4px;
  font: 500 12px Graphik Kinopoisk LC Web, Arial, Tahoma, Verdana, sans-serif;
  color: #f60;
  font-size: 12px;
  font-weight: 600;
  margin-top: 3px;
}
</style>