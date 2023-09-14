<template>
  <div id="app" ref="container">
    <Navbar></Navbar>
    <transition name="main">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/TheNavbar';

export default {
  components: { Navbar }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

.main-enter-active,
.main-leave-active {
  transition: opacity 0.4s ease;
}

.main-enter-from,
.main-leave-to {
  opacity: 0;
}

* {
  padding: 0;
  margin: 0;

  box-sizing: border-box;
}

body {
  font-family: 'Nunito', sans-serif;
  overflow-x: hidden;
  background-color: rgb(13, 13, 13);
}

.container {
  max-width: 1178px;
  margin: 0 auto;
}
</style>
