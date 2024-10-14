import { createRouter, createWebHistory } from 'vue-router'

import Index from '../views/Index.vue' 


let routes = [
    {
        path: '/',
        name: 'Home',
        name_ru: 'Домой',
        component: Index
    },

]




const router = createRouter({
    history: createWebHistory(),
    routes: routes
})



export const routers = routes.map(({ path, name, name_ru }) => ({ path, name, name_ru }));
export default router;