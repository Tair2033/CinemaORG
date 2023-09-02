<template>
  <div class="review__wrapper" :style="{ background: isType }">
    <div class="review">
      <div class="review__top">
        <div class="review__title">{{ data.title }}</div>
        <div class="review__date">{{ data.date }}</div>
      </div>

      <div class="review__main">
        <div class="review__description">
          {{ data.description }}
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
  name: "Review",
  props: ["data"],
  computed: {
    isType () {
      if (this.data.type === "POSITIVE") {
        return "rgb(205, 237, 205)"
      }

      if (this.data.type === "NEGATIVE") {
        return "rgb(252, 210, 203)"
      }

      return "rgb(215, 218, 215)"
    }
  }
};
</script>

<style scoped lang="scss">
.review {
  &__wrapper {
    cursor: default;
    max-width: 700px;
    padding: 25px 30px;
    border-radius: 14px;
    margin-bottom: 20px;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  &__title {
    font-size: calc(1.6vw);
    font-weight: 600;
  }

  &__date {
    font-size: calc(1svw);
    font-weight: 600;
  }

  &__main {}

  &__description {
    font-size: calc(1.1vw);
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
    background-color: rgba(94, 94, 94, 0.193);
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
    background-color: rgba(94, 94, 94, 0.193);
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
</style>