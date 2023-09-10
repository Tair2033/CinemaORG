<template>
  <div class="authed" @click="togglePopup">
    <div class="authed-button">
      <img :src="user.ico" class="authed-button__image" />
    </div>
    <app-pop-up v-if="$store.state.popup.user" type="USER"></app-pop-up>
  </div>
</template>

<script>
  import AppPopUp from './AppPopUp.vue';
  import store from '@/store';

  export default {
    data() {
      return {};
    },
    methods: {
      hideUserPop() {
        store.dispatch('toggleUserPopup');
      },
      togglePopup() {
        store.dispatch('toggleUserPopup');
      }
    },
    props: {
      user: {
        ico: String
      }
    },
    components: {
      AppPopUp
    }
  };
</script>

<style scoped>
  .authed {
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    margin-right: 70px;
    right: 0;
  }

  .authed-button {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    width: 59px;
    height: 59px;
    border: 2px solid rgb(50, 177, 71);
    border-radius: 50%;
  }

  .authed-button__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
  }

  @media (max-width: 850px) {
    .authed {
      margin-right: 70px;
    }
  }
</style>
