<template>
  <router-link :to="{ path: title.url }" class="list-item">
    <img :src="title.ico" alt="" class="img" />
    <span class="list-title">{{ title.name }}</span>
    <div class="sel"></div>
  </router-link>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.img {
  width: 88px;
  height: 88px;
  border-radius: 4px;
}

.list-item {
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 40px;
  margin: 10px;
  min-width: 800px;
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