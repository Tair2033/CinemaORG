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
import store from '@/store'

export default {
  data () {
    return {
    }
  },
  methods: {
    hideUserPop () {
      store.dispatch('toggleUserPopup')
    },
    togglePopup () {
      store.dispatch('toggleUserPopup')
    },
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
  align-items: center;
  width: 20vw;
  justify-content: center;
  position: relative;
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