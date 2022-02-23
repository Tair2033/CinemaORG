<template>
  <div class="authed">
    TODO: Реализация авторизации
    <button
      type="button"
      class="authed-button" 
    >
      <img src="img/user.svg" class="authed-button__image" /> 
    </button>
  </div>
</template>

<script>
export default {};
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
    width: 45px;
    height: 45px;
    border-color: rgb(50, 177, 71);
    border-radius: 50%;
}

.authed-button__image {
    opacity: 1;
}
</style>