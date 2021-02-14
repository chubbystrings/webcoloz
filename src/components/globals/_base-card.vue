<template>
    <div class="card" 
    :class="{addBorder: !!border}"
    :ref="border"
    @mouseover="hover(border)"
    @mouseout="removeHover(border)"
    >
        <p :class="!!border ? 'prefix-border' : '' "  :style="{backgroundColor: !!border ? border : ''}"></p>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        border: {
            type: String,
            required: false,
        }
    },

    methods: {
        hover(color) {
            if (this.border) {
                this.$refs[color].style.backgroundColor = color
            }
        },

        removeHover(color) {
            if(this.border) {
                this.$refs[color].style.backgroundColor = 'white'
            }
        }
    }

}
</script>
<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  margin: 2rem auto;
  background-color: white;
  max-width: 40rem;
}

.addBorder {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
}
.prefix-border {
    padding: 0.3rem;
    color: white;
    margin: 0;
}

</style>