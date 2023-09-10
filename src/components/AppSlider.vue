<template>
  <div class="slider__wrapper">
    <div
      class="slider__arrow arrow__left"
      v-if="calculateLeft"
      @click="leftAction"
    >
      &larr;
    </div>
    <div
      class="slider__arrow arrow__right"
      v-if="calculateRight"
      @click="rightAction"
    >
      &rarr;
    </div>

    <div class="slider__main" ref="sliderSize">
      <div class="slider">
        <div class="slider__inside" ref="slider">
          <app-slider-item
            class="slider__item"
            v-for="(item, id) in data"
            :item="item"
            :key="id"
          ></app-slider-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppSliderItem from './AppSliderItem.vue';

  export default {
    data() {
      return {
        leftPos: 0,
        rightPos: 9624,
        step: 620
      };
    },
    components: { AppSliderItem },
    props: ['data'],
    methods: {
      leftAction() {
        this.leftPos += this.step;
        this.$refs.slider.style.transform = `translateX(${this.leftPos}px)`;
      },
      rightAction() {
        this.leftPos -= this.step;
        this.$refs.slider.style.transform = `translateX(${this.leftPos}px)`;
      }
    },
    computed: {
      calculateLeft() {
        return this.leftPos != 0;
      },
      calculateRight() {
        return this.leftPos < 9000;
      }
    }
  };
</script>

<style scoped>
  .slider__wrapper {
    position: relative;
    width: 90vw;
  }

  .slider__main {
    position: relative;
    overflow: hidden;
  }

  .slider {
  }

  .slider__inside {
    display: flex;
    position: relative;
    transition: all 0.5s ease;
    right: 0;
  }

  .arrow__left {
    left: -20px;
    transition-property: left;
    transition-duration: 0.5s;
  }

  .arrow__left:hover {
    right: -20px;
  }

  .arrow__right {
    right: -20px;
    transition-property: right;
    transition-duration: 0.5s;
  }

  .arrow__right:hover {
    right: -30px;
  }

  .slider__arrow {
    z-index: 20;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 23px;
    color: black;
    border: 1px solid rgb(84, 123, 249);
    font-weight: 500;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgb(84, 123, 249);
    top: 32%;
  }
</style>
