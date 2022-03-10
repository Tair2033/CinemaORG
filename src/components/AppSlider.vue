<template>
    <div class="slider-wrapper" ref="sliderSize">
        <div class="slider">
            <div class="slider-inside" ref="slider">
                <app-film-item
                    class="slider-item"
                    v-for="(item, id) in data"
                    :item="item"
                    :key="id"
                ></app-film-item>
            </div>
        </div>
        <div class="slider-arrow arrow-left" v-if="leftPos != 0" @click="leftAction">&larr;</div>
        <div class="slider-arrow arrow-right" v-if="leftPos < 8000" @click="rightAction">&rarr;</div>
    </div>
</template>

<script>
import AppFilmItem from "../components/AppFilmItem.vue";

export default {
    data() {
        return { 
            leftPos: 0,
            rightPos: 8624,
            step: 620
        }
    },
    components: { AppFilmItem },
    props: ["data"],
    methods: {
        leftAction() {
            this.leftPos-=this.step
            this.$refs.slider.style.right = this.leftPos + 'px' 
        },
        rightAction() {
            this.leftPos+=this.step
            this.$refs.slider.style.right = this.leftPos + 'px' 
        },
    }
};
</script>

<style scoped>
.slider-wrapper {
    position: relative; 
    max-width: 1087px; 
}
.slider { 
    overflow: hidden; 
}

.slider-inside { 
    display: flex;
    position: relative; 
    transition: all 0.5s ease; 
    right: 0;
}

.arrow-left {
    left: -10px;
    transition-property: left;
    transition-duration: 0.5s;
}
.arrow-left:hover {
    left: -20px;
}
.arrow-right {
    right: -20px;
    transition-property: right;
    transition-duration: 0.5s;
}

.arrow-right:hover {
    right: -30px;
}

.slider-arrow {
    z-index: 15;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 23px;
    color: black;
    border: 1px solid rgb(207, 207, 207);
    font-weight: 500;
    width: 44px;
    height: 44px;
    border-radius: 50%; 
    background-color: white;
    top: 32%;
}
</style>