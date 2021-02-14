import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import clickOutside from './utils/clickoutside.js'
import base from './utils/base.js'



const app = createApp(App);
base(app);
app.use(router);



app.directive("click-outside", clickOutside);
app.mount('#app');
