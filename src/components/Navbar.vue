<template>
    <div class="navbar">
        <header>
            <div class="container header-inside">
                <router-link to="/" class="logo">
                    <img src="/img/logo.svg" alt="" class="logo__image" />
                </router-link>
                <div class="search">
                    <form class="search-form">
                        <input
                            type="text"
                            class="search-form__input"
                            :placeholder="inputPlaceholder"
                        />
                        <button class="search-form__button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                            >
                                <path
                                    fill="#000"
                                    fill-rule="evenodd"
                                    d="M12.026 10.626L16 14.6 14.6 16l-3.974-3.974a5.5 5.5 0 1 1 1.4-1.4zM7.5 11.1a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2z"
                                ></path>
                            </svg>
                        </button>
                    </form>
                </div>
                <ul class="menu">
                    <li class="menu-item">
                        <router-link to="/" class="menu-item__link"
                            >Home</router-link
                        >
                    </li>
                    <li class="menu-item">
                        <router-link to="/movies" class="menu-item__link"
                            >Movies</router-link
                        >
                    </li>
                    <li class="menu-item">
                        <router-link to="/series" class="menu-item__link"
                            >Tv Series</router-link
                        >
                    </li>
                </ul>
                <authed-user></authed-user>
            </div>
        </header>
    </div>
</template>

<script>
import AuthedUser from "./AuthedUser.vue";
export default {
    components: { AuthedUser },
    data() {
        return {
            inputPlaceholder: "Фильмы, сериалы, персоны",
        };
    },
};
</script>

<style scoped> 
.navbar {
    position: fixed;
    background-color: black;
    width: 100%;
}

.header-inside {
    display: flex;
    align-items: center;
    justify-content: space-between;
} 

.search {
    width: 340px; 
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
}

.search-form__input:focus {
	background-color: white;
}

.search-form__input:focus > .search-form__button {
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
    width: 163px;
    height: 100%;
    text-decoration: none;
    margin-right: 100px;
    border: none;
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