<template>
  <div class="home">
    <loader></loader>
  </div>
</template>

<script>
import Loader from '../components/UI/Loader.vue'

export default {
  name: 'Home',
  components: {Loader}
}
</script>

<style scoped>
.home {
  background-color: rgb(43, 43, 43);
  height: 100vh;
  padding-top: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
} 
</style>
