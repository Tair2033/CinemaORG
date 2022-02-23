<template>
  <div id="app">
    <navbar></navbar> 
    <router-view />
  </div>
</template>

<script> 
import navbar from "@/components/TheNavbar";
export default {
  components: { navbar },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
  padding: 0;
  margin: 0;

  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
}

.container {
  max-width: 1178px;
  margin: 0 auto;
}
</style>