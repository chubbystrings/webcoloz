<template>
    <div>
        <base-card>
            <header class="colorWrapper">
                <div id="colorSample" ref="sample"></div>
            </header>
            <section id="color-name">
                <h3> Color Name: {{ colorDetails.name }}</h3>
                <h3> Rgb: {{ colorDetails.rgb }}</h3>
                <h3> Hex: {{ colorDetails.hex }}</h3>
            </section>
            <base-button  @click="back" mode="flat" :color="colorDetails.hex"> Back</base-button>
        </base-card>
        <!-- <color-card 
        :hex="colorDetails.hex"
        :name="colorDetails.name"
        :rgb="colorDetails.rgb"
        >
        </color-card> -->
    </div>
</template>



<script>
    // import ColorCard from '../core/ColorCard.vue';
    export default {
        props: ['color'],
        data: () => ({
            colorDetails: {},
        }),
        async mounted() {
            const body = document.querySelector('body');
            console.log(this.$refs.sample);
            console.log(this.color)
            this.$refs.sample.style.backgroundColor = this.color;
            this.$emit('background', this.color);
            const server = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PROD_SERVER : process.env.VUE_APP_LOCAL_SERVER;
            
            console.log(server)
            const response = await fetch(`${server}/color?name=${this.color}`);

            const responseData = await response.json();
            this.colorDetails = {
                ...responseData.data[0]
            }

            if (this.$route.path === '/color') {
                body.style.backgroundColor = this.colorDetails.name
            }
        }, 
        components: {
            //
        },

        methods: {
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
.colorWrapper {
    display: flex;
    justify-content: center;
}

#colorSample {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

#color-name {
    padding: 1rem;
    text-align: center;
}

#color-name h3 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 2.0em;
}
</style>