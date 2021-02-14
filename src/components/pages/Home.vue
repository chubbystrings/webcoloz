<template>
    <search></search>
</template>

<script>
    import Search from '../search/SearchHome.vue';

    export default {
        provide() {
            return {
                items: this.items
            }
        },
        components: {
            Search,
        },
        data: () => ({
            loaded: false,
            searchComp: false,
            searchResults: [],
            searchText: '',
            items: [
                'gold',
                'yellow',
                'green',
                'red',
                'blue',
                'black',
                'gray',
                'orange',
            ]
        }), 

        computed: {
            isSetResult() {
                return this.searchResults.length > 0
            },
        },
        methods: {
          
            submitSearch() {
                this.$router.replace({name: 'Colors', query: {q: this.$refs.input.value}})
            }
        },

        mounted() {
            this.loaded = true;
        }
    }
</script>

<style scoped>

</style>