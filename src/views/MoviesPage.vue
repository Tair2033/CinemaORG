<template>
  <div class="movies__wrapper">
    <!--  -->
    <div class="movies__main">

      <div class="movies__content">
        <form class="movies__filters">

          <div class="movies__filters-item filter">
            <label>Сортировка по</label>

            <select name="sort" ref="sortSelect" @change="changeFilterStatus">
              <option value="rating">Рейтингу</option>
              <option value="year">Году</option>
            </select>
          </div>
          <div class="movies__filters-item filter">
            <label>Рейтинг</label>

            <div class="filter__inputs">

              <div class="filter__value">
                <div class="filter__text">от</div>
                <input type="number" @change="changeFilterStatus" v-model="filterItems.minRating">
              </div>

              <input type="range" @change="changeFilterStatus" v-model="filterItems.minRating" max="9" min="0"
                class="filter__input">

              <div class="filter__value">
                <div class="filter__text">до</div>
                <input type="number" @input="changeFilterStatus" v-model="filterItems.maxRating">
              </div>

              <input type="range" @change="changeFilterStatus" max="10" min="1" v-model="filterItems.maxRating"
                class="filter__input">
            </div>
          </div>
          <div class="movies__filters-item filter">
            <label>По году</label>

            <div class="filter__inputs">

              <div class="filter__value">
                <div class="filter__text">от</div>
                <input type="number" @input="changeFilterStatus" v-model="filterItems.minYear">
              </div>

              <input type="range" @change="changeFilterStatus" :max="new Date().getFullYear()" min="1900"
                v-model="filterItems.minYear" class="filter__input">

              <div class="filter__value">
                <div class="filter__text">до</div>
                <input type="number" @change="changeFilterStatus" v-model="filterItems.maxYear">
              </div>

              <input type="range" @change="changeFilterStatus" :max="new Date().getFullYear() + 5" min="2000"
                v-model="filterItems.maxYear" class="filter__input">
            </div>
          </div>
          <div class="movies__filters-item">
            <button type="button" class="filter__success" :disabled="checkFilterStatus"
              @click="getNewContent">Применить</button>
          </div>
        </form>

        <div class="movies__list">
          <div class="main__loader" v-if="!$store.state.loading.MoviesPage">
            <Loader />
          </div>

          <div class="" v-show="$store.state.loading.MoviesPage">
            <form class="movies__form">
              <div class="movies__form-type">
                <label>Тип</label>

                <select name="type" ref="selectType" @change="changeContentType">
                  <option value="all">Все</option>
                  <option value="films">Фильмы</option>
                  <option value="series">Сериалы</option>
                </select>
              </div>

              <div class="movies__search movies__form-type">
                <input type="search" @keydown.enter.prevent="searchRequest" v-model="searchInput"
                  placeholder="Введите запрос" />
                <button type="button" @click.prevent="searchRequest">
                  Поиск
                </button>
              </div>
            </form>

            <div class="movies__list-items">
              <app-film-block v-for="item in content" :item="item" :key="item.kinopoiskId"></app-film-block>
            </div>

            <div class="movies__list-pagination">
              <app-pagination :callback="getContent" :settings="paginationSettings"></app-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="movies__categories">
      <h3 class="movies-titles">Списки</h3>
      <div class="list">
        <app-list-item v-for="(title, id) in titles" :title="title" :key="id"></app-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import AppListItem from "../components/AppListItem.vue";
import AppFilmBlock from "../components/AppFilmBlock.vue";
import AppPagination from "../components/UI/AppPagination.vue";
import { FilmsCategories } from "../mocks/data"
import { key } from "../APIKEY.json"
import Loader from "../components/UI/Loader.vue";
import store from "../store";

export default {
  data () {
    return {
      searchInput: "",
      filterChanged: true,
      filterItems: {
        currentType: "ALL",
        minRating: 0,
        maxRating: 10,
        minYear: 1900,
        maxYear: new Date().getFullYear() + 5,
        sortType: "RATING"
      },
      paginationSettings: {
        totalPages: 6,
      },
      content: [],
      pagesTotal: 0,
      titles: FilmsCategories
    };
  },
  components: {
    AppListItem,
    AppFilmBlock,
    Loader,
    AppPagination
  },
  methods: {
    changeFilterStatus () {
      this.filterChanged = false;
    },
    searchRequest () {
      if (this.searchInput.length > 0) {
        this.getContent(this.$store.state.pageCounter);
      }
    },
    getNewContent () {
      let sortInput = this.$refs.sortSelect;
      let selectedSortId = sortInput.selectedIndex

      switch (sortInput[selectedSortId].value) {
        case "year":
          this.filterItems.sortType = "YEAR"
          break;
        default:
          this.filterItems.sortType = "RATING"
          break;
      }

      this.getContent(this.$store.state.pageCounter);
    },
    changeContentType () {
      let typeInput = this.$refs.selectType;
      let selectedTypeId = typeInput.selectedIndex

      switch (typeInput[selectedTypeId].value) {
        case "films":
          this.filterItems.currentType = "FILM"
          break;
        case "series":
          this.filterItems.currentType = "TV_SERIES"
          break;
        default:
          this.filterItems.currentType = "ALL"
          break;
      }

      store.dispatch('disableMoviesPageStatus')

      this.getContent(this.$store.state.pageCounter);
    },
    async getContent (page) {
      let searchInputValue = this.searchInput.trim();
      let result = ""

      if (searchInputValue != "") {
        result = '&keyword=' + searchInputValue
      }

      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?order=${this.filterItems.sortType}&type=${this.filterItems.currentType}&ratingFrom=${this.filterItems.minRating}&ratingTo=${this.filterItems.maxRating}&yearFrom=${this.filterItems.minYear}&yearTo=${this.filterItems.maxYear}${result}&page=${page} `;

      store.dispatch('disableMoviesPageStatus')

      await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": key,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.paginationSettings = {
            totalPages: json.totalPages
          };

          this.content = [...json.items]
          store.dispatch('toggleMoviesPageStatus')

          this.filterChanged = true;
        })
        .catch((err) => console.log(err));
    }
  },
  computed: {
    checkFilterStatus () {
      return this.filterChanged
    }
  },
  mounted () {
    this.getContent(this.$store.state.pageCounter);
  },
  beforeUpdate () {
    window.scrollTo({
      top: 0
    })
  }
};
</script>

<style scoped lang="scss">
.movies {
  &__main {
    height: 100%;
    min-height: 100vh;
    padding-bottom: 50px;
    border-bottom: 1px solid rgb(189, 189, 189);
  }

  &__content {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
  }

  &__filters {
    z-index: 20;
    position: fixed;
    padding-top: 120px;
    width: 20vw;
    min-width: 200px;
    height: 100%;
    padding: 100px 25px 0 25px;
    border-right: 1px solid rgb(189, 189, 189);
    background-color: rgb(227, 225, 225);
  }

  &__form {
    margin-top: 90px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__form-type {}

  &__form-type label {
    font-weight: 600;
    margin-right: 15px;
  }

  &__form-type select {
    border-radius: 5px;
    padding: 5px;
  }

  &__filters-item {
    text-align: start;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  &__filters-item label {
    font-weight: 700;
  }

  &__filters-item select {
    margin: 10px 20px;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
  }

  &__filters-item select:focus {
    outline: none;
  }

  &__list {
    display: flex;
    flex-direction: column;
    margin-left: 21vw;
    width: 100%;
  }

  &__list-items {
    padding-top: 30px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-evenly;
    justify-items: center;
    grid-auto-flow: row;
    align-items: start;
    flex-wrap: wrap;
    margin-left: 10px;
  }

  &__list-pagination {
    margin-top: 50px;
  }

  &__search {
    margin-left: 40px;
  }

  &__search button {
    padding: 3px 5px;
    font-size: 18px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    color: black;
    background-color: rgb(217, 216, 216);
    transition: all 0.4s;
  }

  &__search button:hover {
    background-color: rgb(9, 9, 49);
    color: white;
  }

  &__search input {
    min-width: 250px;
    width: 30vw;
    outline: none;
    padding: 2px;
    border: 1px solid rgb(167, 166, 166);
    border-radius: 5px;
    font-size: 24px;
    margin-right: 10px;
    padding-left: 10px;
  }
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0;
  /* <-- Apparently some margin are still there even though it's hidden */
}


.filter {
  &__inputs {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
  }

  &__input {
    border: 1px solid rgb(82, 82, 82);
    border-radius: 5px;
    outline: none;
    text-align: center;
    margin-bottom: 10px;
  }


  &__input:first-child {
    margin-left: 0px;
  }

  &__text {
    margin: 0 10px;
  }

  &__value {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  &__value input {
    max-width: 70px;
    text-align: center;
    font-size: 17px;
    border: 1px solid rgba(82, 82, 82, 0.838);
    border-radius: 5px;
  }

  &__success {
    cursor: pointer;
    color: black;
    margin: 10px 40px;
    padding: 15px 10px;
    border-radius: 10px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    background-color: orange;
    border: 1px solid rgb(211, 211, 211);
    box-shadow: 0px 0px 44px 20px rgba(251, 180, 0, 0.355);
    transition: all 0.4s;
  }

  &__success:hover {
    color: rgb(34, 33, 33);
    background-color: rgb(255, 124, 2);
    box-shadow: 0px 0px 44px 20px rgba(251, 180, 0, 0.721);
  }

  &__success:disabled {
    background-color: white;
    color: rgb(15, 14, 14);
    font-weight: 700;
    border: 1px solid rgb(211, 211, 211);
    box-shadow: 0px 0px 44px 37px rgba(251, 180, 0, 0);
  }

  &__success:disabled:hover {
    cursor: default;
  }
}


.main__loader {
  padding-top: 250px;
  display: flex;
  justify-content: center;
}

.movies-titles {
  font-size: 29px;
  margin-top: 36px;
}

.movies__categories {
  margin-left: 22vw;
  margin-bottom: 20px;
}

.list {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}



input[type=range] {
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #202ada;
}

input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #02030c;
  height: 15px;
  width: 15px;
  border-radius: 25px;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #202ada;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #202ada;
}

input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: white;
  cursor: pointer;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}

input[type=range]::-ms-fill-lower {
  background: #202ada;
  box-shadow: 0px 0px 0px #000000;
}

input[type=range]::-ms-fill-upper {
  background: #202ada;
  box-shadow: 0px 0px 0px #000000;
}

input[type=range]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 0px #000000;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: white;
  cursor: pointer;
}

input[type=range]:focus::-ms-fill-lower {
  background: #060ea5;
}

input[type=range]:focus::-ms-fill-upper {
  background: #060ea5;
}

@media (max-width: 1004px) {
  .movies__list-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-evenly;
    justify-items: flex-end;
    grid-auto-flow: row;
  }

  .list-item {
    min-width: 500px;
  }

  .movies__categories {
    margin-left: 30vw;
  }
}


@media (max-width: 687px) {
  .movies__list {
    margin-left: 30vw;
  }
}


@media (max-width: 687px) {
  .movies__list-items {
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
  }

  .movies__filters {
    display: none;
  }

  .movies__list {
    margin-left: 0;
  }

  .movies__categories {
    margin-left: 20px;
  }
}

@media (max-width: 580px) {
  .movies__list-items {
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
  }

  .movies__form {
    flex-direction: column-reverse;
  }

  .movies__search {
    margin-bottom: 14px;
  }
}

@media (max-width: 520px) {
  .movies__list-items {
    display: flex;
    flex-direction: column;
  }

}
</style>