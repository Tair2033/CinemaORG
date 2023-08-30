<template>
  <div class="navbar">
    <header>
      <div class="container header-inside">
        <router-link to="/" class="logo">
          CinemaORG
        </router-link>
        <div class="search">
          <form class="search-form">
            <input type="text" class="search-form__input" :placeholder="inputPlaceholder" ref="search" v-model="value"
              @input="getInputVal" />
            <button class="search-form__button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path fill="#000" fill-rule="evenodd" d="M12.026 10.626L16 14.6
                                    14.6 16l-3.974-3.974a5.5 5.5 0
                                    1 1 1.4-1.4zM7.5 11.1a3.6 3.6 0 1
                                    0 0-7.2 3.6 3.6 0 0 0 0 7.2z"></path>
              </svg>
            </button>
          </form>

          <app-pop-up :data="searchItems" v-if="!$store.state.popup.search"></app-pop-up>
        </div>
        <ul class="menu">
          <li class="menu-item">
            <router-link to="/" class="menu-item__link">Главная
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/movies" class="menu-item__link">Фильмы
            </router-link>
          </li>
          <li class="menu-item">
            <router-link to="/series" class="menu-item__link">Сериалы
            </router-link>
          </li>
        </ul>

        <div>
          <the-authed-user :user="user"></the-authed-user>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import TheAuthedUser from "./TheAuthedUser.vue";
import AppPopUp from "@/components/AppPopUp";

export default {
  components: { AppPopUp, TheAuthedUser },
  data () {
    return {
      user: {
        ico: "https://animemotivation.com/wp-content/uploads/2023/03/makima-chainsaw-man-wallpaper-sinister.jpg"
      },
      value: '',
      inputPlaceholder: "Фильмы, сериалы, персоны",
      searchItems: []
    };
  },
  methods: {
    getInputVal () {
      if (this.value.length > 0) {
        this.$store.state.popup.search = false;

        this.searchByKeyWord(this.$store.state.searchPage)
      }

      if (this.value.length === 0) {
        this.$store.state.popup.search = true;
      }
    },
    async searchByKeyWord (page) {

      const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${this.value}&page=${page}`;

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
          this.searchItems = [...json.films]


          this.$store.state.loading.popupSearch = false
        })
        .catch((err) => console.log(err));
    }
  }
};
</script>

<style scoped>
.router-link-active {
  color: white;
}

.navbar {
  position: fixed;
  background-color: black;
  width: 100%;
  z-index: 10;
}

.header-inside {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search {
  width: 340px;
  position: relative;
}

.search-form {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
}

.search-form__input {
  background-color: rgb(48, 47, 47);
  color: #000;
  width: 100%;
  margin: 0;
  padding: 8px 0 8px 16px;
  font-size: 15px;
  border: none;
  outline: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.search-form__button {
  background-color: rgb(48, 47, 47);
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
}

.search-form__input:focus {
  background-color: white;
}

.search-form__button:hover {
  background-color: white;
}

.search-form__button svg {
  margin: 0;
  font-size: 18px;
  margin: 6px;
}


.menu {
  display: flex;
  justify-content: center;
}

.menu-item {
  list-style: none;
  margin-left: 10px;
}

.menu-item:first-child {
  margin-left: 50px;
}

.menu-item__link {
  color: rgb(88, 87, 87);
  text-decoration: none;
  font-size: 18px;
}

.menu-item__link:hover {
  color: white;
}

.active {
  border-bottom: 1px solid orange;
  color: white;
}

.logo {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-right: 100px;
  border: none;
  font-size: calc(14px + 1vw);
}


.logo__image {
  cursor: pointer;
  display: block;
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  margin: 17px 0;
  border: none;
}
</style>