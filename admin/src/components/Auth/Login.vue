  
  <script setup>
  import { ref, inject, computed } from 'vue';
  import axios from 'axios';
  import qs from 'qs'; 


  const email = ref('');
  const password = ref('');
  const API = inject('API')

  const lang = inject('lang')
  
  const submitLogin = async () => {
    try {
        const response = await axios.post(API + '/auth/login', qs.stringify({
            username: email.value,
            password: password.value,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Установите заголовок
            },
            withCredentials: true,
        });

        if (response.status >= 200 && response.status < 300) {
            window.location.reload();
        }
    } catch (error) {
        console.log('Ошибка при авторизации:', error);
        alert('Неверные данные для входа.');
        }
    };

    const langNames = {
    en: {
        title: 'Login to admin panel',
        email: 'email',
        password: 'password',
        entry: 'Login',
    },
    ua: {
        title: 'Увійдіть в адмін-панель',
        email: 'електронна пошта',
        password: 'пароль',
        entry: 'Увійти',
    },
    ru: {
        title: 'Вход в админ-панель',
        email: 'электронная почта',
        password: 'пароль',
        entry: 'Войти',
    },
    tr: {
        title: 'Yönetim paneline giriş',
        email: 'e-posta',
        password: 'şifre',
        entry: 'Giriş yap',
    },
    ro: {
        title: 'Conectați-vă la panoul de administrare',
        email: 'email',
        password: 'parolă',
        entry: 'Autentificare',
    },
    it: {
        title: 'Accedi al pannello di amministrazione',
        email: 'email',
        password: 'password',
        entry: 'Accesso',
    },
    es: {
        title: 'Iniciar sesión en el panel de administración',
        email: 'correo electrónico',
        password: 'contraseña',
        entry: 'Iniciar sesión',
    },
    fr: {
        title: 'Connexion au panneau d\'administration',
        email: 'email',
        password: 'mot de passe',
        entry: 'Connexion',
    },
    ar: {
        title: 'تسجيل الدخول إلى لوحة التحكم',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        entry: 'تسجيل الدخول',
    },
};



const titleNames = computed(() => langNames[lang.value]);
</script>

<template>
    <div class="form__wrapper">
        <div class="form__block">
            <div class="title">{{ titleNames.title }}</div>
            <form class="form" @submit.prevent="submitLogin" autocomplete="on" >
                <input class="input" type="email" name="username" v-model="email" :placeholder="titleNames.email" autocomplete="username" required />
                <input class="input" type="password" name="password" v-model="password" :placeholder="titleNames.password" autocomplete="current-password" required />
                <button class="button" type="submit">{{ titleNames.entry }}</button>
            </form>
        </div>
    </div>
</template>


<style>
.form__wrapper{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
}

.form__block{
    padding: 30px;
    background: white;
    border-radius: 10px;
}

.form{
    width: 100%;
    padding: 35px ;
    display: flex;
    flex-direction: column;
    gap: 20px;

}

.title{
    text-align: center;
    font-size: 35px;
    margin-bottom: 20px;
}

</style>
  