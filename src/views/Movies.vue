<template>
  <div class="movies">
    <div class="container">
      <h3 class="movies-titles">Списки</h3>
      <div class="list">
        <app-list-item v-for="(title, id) in titles" :title="title" :key="id"></app-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import AppListItem from "../components/AppListItem.vue";
import { FilmsCategories } from "../mocks/data"

export default {
  data () {
    return {
      titles: FilmsCategories
    };
  },
  components: {
    AppListItem,
  },
  methods: {
    async top250 () {
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1`;

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
          console.log(json);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped> .movies {
   padding-top: 80px;
 }

 .movies-titles {
   font-size: 29px;
   margin-top: 36px;
 }

 .list {
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
 }
</style>