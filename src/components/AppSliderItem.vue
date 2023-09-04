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
	height: 100%;
	margin-left: 5px;
	position: relative;
	padding: 10px;
	border-radius: 5px;
	transition-property: background-color;
	transition-duration: 0.4s;
}

.film:hover {
	background-color: #cccccc;
}

.film__title {
	font-size: 13px;
	font-weight: 500;
	color: #000;
}

.film__info {
	color: rgba(0, 0, 0, 0.6);
	font-size: 13px;
	line-height: 15px;
	font-weight: 600;
}

.link {
	text-decoration: none;
}
</style>