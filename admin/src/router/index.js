import { createRouter, createWebHistory } from 'vue-router'

import Index from '../views/Index.vue' 
import Order from '../views/Order.vue'
import ToDo from '../views/ToDo.vue'
import Product from '../views/Product.vue'
import Media from '../views/Media.vue'
import Users from '../views/Users.vue'
import ProtectedPage from '../views/ProtectedPage.vue';
import LoginPage from '../views/AuthForm.vue';

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
    { 
        path: '/login', 
        component: LoginPage 
    },
    { 
        path: '/protected', 
        component: ProtectedPage, 
        meta: { requiresAuth: true } 
    }

]




const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = /* Здесь добавьте проверку аутентификации */;
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });
  

export const routers = routes.map(({ path, name, name_ru }) => ({ path, name, name_ru }));
export default router;