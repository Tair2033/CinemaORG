<template>
    <div class="home">
        <div class="container">
            <!-- <loader v-if="$store.state.loading.films"></loader> -->

            <div class="premiere-films">
                <h3 class="title">Премьеры</h3>
                <div class="films">
                    <div
                        class="film"
                        v-for="(item, id) in premiereList"
                        :key="id"
                    >
                        <router-link
                            :to="{ path: '/film/' + item.kinopoiskId + '/' }"
                            class="link"
                        >
                            <img :src="item.posterUrlPreview" alt="" />
                            <span class="film__title">{{ item.nameRu }}</span>
                            <br />
                            <span class="film__info"
                                >{{ item.year }},
                                {{ item.genres[0].genre }}</span
                            >
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            premiereList: [],
        };
    },
    methods: {
        async getPremereFilm() {
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
    },
    mounted() {
        this.getPremereFilm();
    },
};
</script>

<style scoped>
.home {
    /* background-color: rgb(43, 43, 43); */
    height: 100vh;
    padding-top: 72px;
}

.premiere-video {
    display: flex;
    justify-content: center;
}

.link {
    text-decoration: none;
}

.title {
    font-size: 24px;
    line-height: 30px;
    font-weight: 700;
    margin-top: 20px;
}

.premiere-films {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.films {
    display: flex;
    overflow: auto;
}

.film img {
    width: 140px;
    height: 210px;
}

.film {
    margin-left: 14px;
    position: relative;
}

/* .score {
    position: absolute;
    top: 8px;
    font-size: 12px;
    left: -5px;
    z-index: 2; 
    color: white;
    background-color: green;
    border-radius: 4px;
    padding: 3px 10px;
} */

.film__title {
    font-size: 13px;
    font-weight: 500;
    color: #000;
}
.film__info {
    color: rgba(0, 0, 0, 0.4);
    font-size: 13px;
    line-height: 15px;
}
</style>
