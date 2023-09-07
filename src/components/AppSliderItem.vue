<template>
	<router-link :to="'/film/' + getID" class="link film">
		<div class="film__img">
			<img loading="lazy" :src="item.posterUrlPreview" alt="" />
		</div>
		<span class="film__title">{{ item.nameRu.slice(0, 18) }}</span>
		<br />
		<span class="film__info">{{ item.year }}, {{ item.genres[0].genre }}</span>
	</router-link>
</template>

<script>
export default {
	props: ['item'],
	computed: {
		getID () {

			if (this.item.kinopoiskId != null) {
				return this.item.kinopoiskId
			}

			if (this.item.filmId != null) {
				return this.item.filmId
			}

			return false
		}
	}
};
</script>

<style scoped>
.film__img {
	height: 210px;
	width: 140px;
	border-radius: 5px;
}

.film img {
	width: 100%;
	height: auto;
	background-color: #cccccc;
}

.film {
	background-color: rgba(38, 38, 38, 0.278);
	height: 100%;
	position: relative;
	padding: 10px;
	border-radius: 5px;
	transition-property: background-color;
	transition-duration: 0.4s;
	margin: 0 5px;
}

.film:hover {
	background-color: #cccccc;
	color: black;
}

.film:hover .film__title {
	color: black;
}

.film__title {
	transition: all 0.4s;
	font-size: 13px;
	font-weight: 500;
	color: white;
}

.film__info {
	color: rgba(226, 226, 226, 0.6);
	font-size: 13px;
	line-height: 15px;
	font-weight: 600;
	transition: all 0.4s;
}

.film:hover .film__info {
	color: rgb(66, 64, 64);
}

.link {
	text-decoration: none;
}
</style>