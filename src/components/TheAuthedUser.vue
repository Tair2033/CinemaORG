<template>
  <div class="authed">
    TODO: Реализация авторизации
    <div class="authed-button">
      <img :src="user.ico" class="authed-button__image" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      ico: String
    }
  }
};
</script>

<style scoped>
.authed {
  z-index: 2;
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 15px;
}

.authed-button {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: 2px solid rgb(50, 177, 71);
  border-radius: 50%;
}

.authed-button__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
}
</style>