<template>
        <ul v-if="inputSearch.length > 0" class="inputColors">
            <base-card
                :border="item"
                v-for="item in inputSearch" 
                :key="item"
                @click="openColor(item)"
            >
                <header>
                    <h2>{{ item }}</h2>
                </header>
                <div>
                    <p>sample color details</p>
                </div>
            </base-card>
        </ul>
</template>
   

<script>
    export default {
        inject: ['items'],
        props: {
            colors: {
                type: String,
                required: true
            }
        },

        data: () => ({
            inputSearch: [],
        }),

        methods: {
            openColor(color) {
                this.$router.push({name: 'Color', query:{color} })
            }, 
            search() {
                this.inputSearch = this.items.filter((item) => {
                    return item.match(this.colors);
                })
            }
        }, 

        created() {
            this.search()
        },

        watch: {
            $route() {
               this.inputSearch = this.items.filter((item) => {
                    return item.match(this.$route.query.q);
                })
            }
        }

    }
</script>

<style scoped>
ul {
    width: 80%;
    box-sizing: border-box;
    outline: none;
    list-style: none;
    margin: 0;   
}



</style>