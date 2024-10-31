<script setup>
import { inject, ref } from 'vue';

const me = inject('me')
const lang = inject('lang')

const langNames = {
    en: {
        hello: 'Hello',
        role: 'role',
    },
    ru: {
        hello: 'Здравствуйте',
        role: 'роль',
    },
    tr: {
        hello: 'Merhaba',
        role: 'rol',
    },
    ua: {
        hello: 'Привіт',
        role: 'роль',
    },
    ro: {
        hello: 'Bună',
        role: 'rol',
    },
    it: {
        hello: 'Ciao',
        role: 'ruolo',
    },
    es: {
        hello: 'Hola',
        role: 'rol',
    },
    fr: {
        hello: 'Bonjour',
        role: 'rôle',
    },
    ar: {
        hello: 'مرحبا',
        role: 'دور',
    },
};


const role = {
    '1': 'User',
    '2': 'Moderator',
    '3': 'Admin'
}

</script>
<template>
    
    <div class="me__wrapper">
        <h1 class="user__title">
           {{ langNames[lang].hello }}, {{ me.username }}
        </h1>
        <p class="role__title">{{ langNames[lang].role  }}: {{ role[me.role_id] }}</p>

    </div>

</template>

<style scoped>
.me__wrapper{
    line-height: 150%;
}
.user__title{
    color: var(--color-black);
    font-family: 'Open Sans';
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.15px;
}


.role__title{
    color: var(--color-grey);
    font-family: 'Open Sans Regular';
    font-size: 14px;
    letter-spacing: 0.25px;
}

</style>