<template>
	<router-link :to="{ path: '/film/' + item.kinopoiskId + '/' }" class="link film">
		<img :src="item.posterUrlPreview" alt="" />
		<span class="film__title">{{ item.nameRu }}</span>
		<br />
		<span class="film__info">{{ item.year }}, {{ item.genres[0].genre }}</span>
	</router-link>
</template>

<script>
export default {
	props: ['item']
};
</script>

<style scoped>
.film img {
	width: 140px;
	height: 210px;
	border-radius: 5px;
}

.film {
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
	color: rgba(0, 0, 0, 0.4);
	font-size: 13px;
	line-height: 15px;
}

.link {
	text-decoration: none;
}
</style>