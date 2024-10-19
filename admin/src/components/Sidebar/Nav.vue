<script setup>
import NavItem from './NavItem.vue';
import { inject, ref, computed } from 'vue';
import { useRoute } from 'vue-router'; // Импортируем useRoute для доступа к текущему маршруту

const lang = inject('lang');
const route = useRoute(); // Получаем текущий маршрут

const linkList = {
    en: {
        Index: 'Main',
        Products: 'Products',
        Orders: 'Orders',
        ToDo: 'ToDo',
        Users: 'Users',           // Название для пользователей
        Media: 'Media',           // Название для медиа
    },
    ru: {
        Index: 'Главная',
        Products: 'Продукты',
        Orders: 'Заказы',
        ToDo: 'Список дел',
        Users: 'Пользователи',    // Название для пользователей
        Media: 'Медиа',           // Название для медиа
    },
    tr: {
        Index: 'Ana Sayfa',
        Products: 'Ürünler',
        Orders: 'Siparişler',
        ToDo: 'Yapılacaklar',
        Users: 'Kullanıcılar',     // Название для пользователей
        Media: 'Medya',            // Название для медиа
    },
    ua: {
        Index: 'Головна',
        Products: 'Продукти',
        Orders: 'Замовлення',
        ToDo: 'Список справ',
        Users: 'Користувачі',      // Название для пользователей
        Media: 'Медіа',            // Название для медиа
    }
};


const linkNames = computed(() => linkList[lang.value]);
const isActive = (link) => {
    return route.path === link; // Сравниваем текущий путь с ссылкой
};

</script>
<template>
    
    
    <nav class="nav__sidebar">
        <NavItem :title="linkNames.Index" img="dashboard" :link="'/'" :is_active="isActive('/')" />
        <NavItem :title="linkNames.Products" img="line" :link="'/products'" :is_active="isActive('/products')" />
        <NavItem :title="linkNames.Orders"  img="media" :link="'/orders'" :is_active="isActive('/orders')" />
        <NavItem :title="linkNames.ToDo" img="media" :link="'/todos'" :is_active="isActive('/todos')" />
        <NavItem :title="linkNames.Media" img="media" :link="'/media'" :is_active="isActive('/media')" />
        <NavItem :title="linkNames.Users" img="media" :link="'/users'" :is_active="isActive('/users')" />
    </nav>

</template>

<style scoped>

.nav__sidebar{
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    gap: 32px;
}

.nav__item{
    font: 18px "Open Sans";
    letter-spacing: 0.5px;
    line-height: 150%;
    color: var(--color-grey);
    display: flex;
    gap: 20px;
}

.nav_active{
    color: var(--color-sky) !important;

}

</style>
