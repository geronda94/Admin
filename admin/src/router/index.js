import { createRouter, createWebHistory } from 'vue-router'

import Index from '../views/Index.vue' 
import Order from '../views/Order.vue'
import ToDo from '../views/ToDo.vue'
import Product from '../views/Product.vue'
import Media from '../views/Media.vue'
import Users from '../views/Users.vue'


let routes = [
    {
        path: '/',
        name: 'Home',
        name_ru: 'Домой',
        component: Index
    },
    {
        path: '/products',
        name: 'Products',
        name_ru: 'Товары',
        component: Product
    },
    {
        path: '/orders',
        name: 'Orders',
        name_ru: 'Заказы',
        component: Order
    },
    {
        path: '/todos',
        name: 'ToDo',
        name_ru: 'Задачи',
        component: ToDo
    },
    {
        path: '/users',
        name: 'Users',
        name_ru: 'Пользователи',
        component: Users
    },
    {
        path: '/media',
        name: 'Media',
        name_ru: 'Галерея',
        component: Media
    },

]




const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


export const routers = routes.map(({ path, name, name_ru }) => ({ path, name, name_ru }));
export default router;