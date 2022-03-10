<template>
    <div class="pagination-wrapper">
        <div class="pagination">
            <div
                :style="(id + 1) === active? activeStyle: null"
                v-for="(item, id) in len"
                :key="id"
                class="pagination-item"
                @click="page(item)"
            >
                {{ item }}
            </div>
            <div class="arrow" @click="next">
                &gt;
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeStyle: {
                backgroundColor: '#222222',
                color: 'white'
            }
        }
    },
    props: ['len', 'active', 'change'],
    methods: {
        page(item) {
            this.$store.commit('changePage', item)
            this.change(this.$store.state.Top250PageCount)
            window.scrollTo({
                top: 60
            })
        },
        next() {
            this.$store.commit('nextPage')
            this.change(this.$store.state.Top250PageCount)
            window.scrollTo({
                top: 60
            })
        }
    }
}
</script>

<style scoped>
.arrow {
    font-size: 28px;
    margin-left: 20px;
    cursor: pointer;
}

.arrow:hover {
    color: orange;
}

.pagination-wrapper {
    padding: 10px;
    display: flex;
    justify-content: center;
}

.pagination {
    display: flex;
    align-items: center;
}

.pagination-item {
    margin-left: 10px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination-item:hover {
    background-color: #222222;
    color: white;
}

.pagination-item:first-child {
    margin-left: 0px;
}

</style>