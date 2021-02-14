<template>
 <router-view v-slot="slotProps">
   <transition
    mode="out-in"
    name="route"
   >
     <component :is="slotProps.Component" ></component>
   </transition>
 </router-view>
</template>

<script>

export default {
  methods: {
      change(color) {
        const body = document.querySelector('body');
        if (this.$route.path === '/color') {
          body.style.backgroundColor = color
        } 
      }
  },

  watch: {
    '$route'() {
      if (this.$route.name === 'Home') {
        const body = document.querySelector('body');
        body.style.backgroundColor = '#644bff';
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body{
  background: #644bff;
  padding: 0 20px;
  transition: background 0.3s ease-out;
}

.route-enter-from { 
  opacity: 0;
  transform: translateY(-30px)
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out
}

.route-leave-active {
  transition: all 0.3s ease-in
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

button, a {
  outline: none !important
}
</style>
