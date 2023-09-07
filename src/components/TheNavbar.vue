<template>
  <nav class="navbar">
    <div class="container">
      <div class="havbar__inside">
        <router-link to="/" class="logo">
          CinemaORG
        </router-link>

        <div class="search">
          <form>
            <input type="text" class="search__form-input" :placeholder="inputPlaceholder" ref="search"
              @blur="hideSearchField" tabindex="0" v-model="searchInputValue" @input="getInputVal" />

            <div class="search__form-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path fill="#000" fill-rule="evenodd"
                  d="M12.026 10.626L16 14.6 14.6 16l-3.974-3.974a5.5 5.5 0 1 1 1.4-1.4zM7.5 11.1a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2z">
                </path>
              </svg>
            </div>
          </form>

          <app-pop-up type="SEARCH" :data="searchItems" v-if="$store.state.popup.search"></app-pop-up>
        </div>
        <ul class="menu">
          <li class="menu__item">
            <router-link to="/" class="menu__item-link">Главная
            </router-link>
          </li>
          <li class="menu__item">
            <router-link to="/movies" class="menu__item-link">Фильмы и сериалы
            </router-link>
          </li>
        </ul>

        <the-authed-user v-if="$store.state.isAuth" :user="user">
        </the-authed-user>

        <div @click="login" class="entrance" v-if="!$store.state.isAuth">
          Войти
        </div>

        <div class="burger-wrapper">
          <div class="burger">
            &#9776;
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import TheAuthedUser from "./TheAuthedUser.vue";
import AppPopUp from "@/components/AppPopUp";
import { key } from "../APIKEY.json"
import store from "../store";


export default {
  components: { AppPopUp, TheAuthedUser },
  data () {
    return {
      key,
      user: {
        ico: "https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/7/45/756778283361457.jpg"
      },
      searchInputValue: '',
      inputPlaceholder: "Фильмы, сериалы",
      searchItems: []
    };
  },
  methods: {
    login () {
      store.dispatch('login');
    },
    hideSearchField (e) {
      this.searchInputValue = ""

      if (e.relatedTarget === null) {
        this.$store.state.popup.search = false
      }
    },
    getInputVal () {
      if (this.searchInputValue.length > 0) {
        this.$store.state.popup.search = true;

        this.$store.state.loading.popupSearch = true


        const timeout = setTimeout(() => {
          this.searchByKeyWord(this.$store.state.searchPage)
          this.$store.state.loading.popupSearch = false
          clearTimeout(timeout)
        }, 700)
      }

      if (this.searchInputValue.length === 0) {
        this.$store.state.popup.search = false;
      }
    },
    async searchByKeyWord (page) {

      const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${this.searchInputValue}&page=${page}`;


      await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": key,
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

.entrance {
  right: 0;
  position: absolute;
  cursor: pointer;
  color: white;
  transition: all 0.4s;
  padding: 5px;
  margin-right: 70px;
}

.burger-wrapper {
  cursor: pointer;
  position: absolute;
  right: 25px;
  display: none;
}

.burger {
  color: white;
  font-size: 40px;
  transition: all 0.4s;
}

.burger:hover {
  color: rgb(250, 170, 9);
}

.entrance:hover {
  color: rgb(250, 170, 9);
}

.auth__wrapper {
  display: flex;
  align-items: center;
  justify-content: end;
}

.navbar {
  position: fixed;
  background-color: rgba(23, 22, 22, 0.949);
  width: 100vw;
  z-index: 30;
  border-bottom: 1px solid rgba(188, 179, 174, 0.305);
}

.havbar__inside {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 75px;
}

.search {
  min-width: 340px;
  position: relative;
}

.search form {
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.4s;
}

.search__form-input {
  background-color: rgb(48, 47, 47);
  color: #000;
  width: 100%;
  margin: 0;
  padding: 8px 0 8px 16px;
  font-size: 15px;
  border: none;
  outline: none;
  border-radius: 4px;
  z-index: 11;
}

.search__form-button {
  z-index: 40;
  position: absolute;
  right: 0px;
  background: none;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
  height: 100%;
  transition-property: background-color;
  transition-duration: 0.3s;
}

.search__form-input:focus {
  background-color: white;
}

.search__form-button:hover {
  background-color: rgb(226, 225, 225);
}

.search__form-button svg {
  margin: 0 10px;
  font-size: 18px;
  height: 100%;
}

.menu {
  display: flex;
  justify-content: center;
  margin-right: 200px;
}

.menu__item {
  list-style: none;
  margin-left: 10px;
}

.menu__item:first-child {
  margin-left: 50px;
}

.menu__item-link {
  color: rgb(113, 112, 112);
  text-decoration: none;
  font-size: 18px;
  white-space: nowrap;
}

.menu__item-link:hover {
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
  font-weight: 600;
  font-size: calc(14px + 1vw);
  transition: all 0.4s;
  margin-left: 15px;
}

.logo:hover {
  color: rgb(255, 172, 19);
}

.logo:focus {
  color: rgb(255, 255, 255);
}

@media (max-width: 1012px) {
  .search {
    min-width: 260px;
  }

  .logo {
    margin-right: 50px;
  }

  .authed {
    margin-left: 10px;
  }
}

@media (max-width: 884px) {
  .search {
    min-width: 340px;
  }

  .havbar__inside {
    justify-content: start;
  }

  .menu {
    display: none;
  }

  .burger-wrapper {
    display: block;
  }
}

@media (max-width: 676px) {
  .search {
    display: none;
  }
}
</style>