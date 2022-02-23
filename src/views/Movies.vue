<template>
    <div class="movies">
        <div class="container">
            <h3 class="movies-titles">Списки</h3> 
            <div class="list">
                <router-link
                    :to="{ path: '/movies/' + title.url }"
                    class="list-item"
                    v-for="(title, id) in titles"
                    :key="id"
                >
                    <img :src="title.src" alt="" class="img"/>
                    <span class="list-title">{{ title.name }}</span>
                    <div class="sel"></div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default { 
    data() {
        return {
            titles: [
                {
                    name: "250 лучших фильмов",
                    url: "top250/",
                    src: 'img/top250.png'
                },
                {
                    name: "100 популярных фильма",
                    url: "popular/",
                    src: 'img/popular.png'
                },
                {
                    name: "Ожидаемые фильмы",
                    url: "await/",
                    src: 'img/wait.png'
                },
            ],
        };
    },
    methods: {
        async top250() {
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

<style scoped>
.img {
    width: 88px;
    height: 88px;
    border-radius: 4px; 
}
.movies {
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
.list-item { 
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 40px;
    margin: 10px;
    min-width: 500px; 
    border-radius: 4px;
    transition-property: background-color, color;
    transition-duration: 0.15s;
}

.list-item:hover {
    background-color: rgb(202, 200, 200);
    color: rgb(197, 130, 29);
}

.list-title { 
    font-weight: bold;
    font-size: 24px; 
    margin-left: 20px;
}
</style>