<template>
  <div class="review__wrapper" :style="{ background: isType }">
    <div class="review">
      <div class="review__top">
        <div class="review__title">{{ data.title }}</div>
        <div class="review__date">
          {{ new Date(data.date).toLocaleDateString() }}
        </div>
      </div>

      <div class="review__main">
        <div class="review__description" :class="{activeStyle: isShown}" ref="description" 
        @click="isShown = !isShown">
          <div class="review__all">Открыть весь отзыв</div>
        </div>
      </div>

      <div class="review__bottom">
        <div class="review__author">
          <span>{{ data.author }}</span>
        </div>
        <div class="review__rating">
          <div class="review__raiting-positive">
            <span>Полезно</span>
            {{ data.positiveRating }}
          </div>
          <div class="review__raiting-negative">
            <span>Нет</span>
            {{ data.negativeRating }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Review',
  data () {
    return {
      isShown: false,
      isFull: false
    };
  },
  props: ['data'],
  computed: {
    isType () {
      if (this.data.type === 'POSITIVE') {
        return 'rgb(205, 237, 205)';
      }

      if (this.data.type === 'NEGATIVE') {
        return 'rgb(252, 210, 203)';
      }

      return 'rgb(215, 218, 215)';
    }
  },
  mounted () {
    this.$refs.description.innerHTML = this.data.description;
  }
};
</script>

<style scoped lang="scss">

.review {
  &__wrapper {
    cursor: default;
    padding: 25px 30px;
    border-radius: 14px;
    margin-bottom: 20px;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 15px;
  }

  &__title {
    font-size: calc(10px + 1.2vw);
    font-weight: 800;
  }

  &__date {
    font-size: calc(8px + 1vw);
    font-weight: 600;
    margin-left: 10px;
  }

  &__main {}

  &__description {
    max-height: 260px;
    overflow: hidden;
    font-size: calc(13px + 0.4vw);
    box-shadow: -2px -33px 28px -14px rgba(21, 35, 46, 0.2) inset;
    transition: all 0.4s;
    cursor: pointer;
  }

  &__description:hover {
    box-shadow: -2px -33px 28px -16px rgba(101, 163, 210, 0.2) inset;
  }

  &__bottom {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__author {
    font-weight: 600;
    cursor: pointer;
  }

  &__author span {
    color: rgb(26, 18, 87);
  }

  &__author span:hover {
    color: rgb(16, 11, 56);
  }

  &__rating {
    display: flex;
    justify-content: flex-end;
    cursor: default;
  }

  &__raiting-positive span {
    display: block;
    font-size: calc(1.1vw);
    color: black;
    padding-right: 8px;
  }

  &__raiting-positive {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px 5px;
    border-radius: 10px;
    margin-right: 30px;
    font-size: calc(1.3vw);
    color: rgb(8, 133, 10);
    transition: all 0.4s;
  }

  &__raiting-positive:hover {
    background-color: rgba(212, 212, 212, 0.99);
  }

  &__raiting-negative {
    cursor: pointer;
    transition: all 0.4s;
    font-size: calc(1.3vw);
    display: flex;
    align-items: center;
    padding: 10px 5px;
    border-radius: 10px;
    color: red;
  }

  &__raiting-negative:hover {
    background-color: rgba(212, 212, 212, 0.99);
  }

  &__raiting-negative span {
    font-size: calc(1.1vw);
    padding-right: 8px;
    color: black;
  }
}

.activeStyle {
  max-height: max-content;
  box-shadow: none;
}

.activeStyle:hover {
  box-shadow: none;
}

</style>
