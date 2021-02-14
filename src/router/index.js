import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/pages/Home.vue';
import Color from '../components/pages/Color.vue';
import NotFound from '../components/pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {   name: 'Home',
            path: '/', 
            component: Home,
        },
        {   name: 'Color',
            path: '/color', 
            component: Color,
            props: route => ({ color: route.query.color })
        },
        {
            name: 'NotFound',
            path: '/:notFound(.*)', 
            component: NotFound,
        }

    ]
});

export default router;

