  
  <script setup>
  import { ref, inject } from 'vue';
  import axios from 'axios';
  import qs from 'qs'; 


  const email = ref('');
  const password = ref('');
  const API = inject('API')


  
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
  </script>

<template>
    <div class="form__wrapper">
        <form class="form" @submit.prevent="submitLogin">
            <input class="input" type="email" name="username" v-model="email" placeholder="Email" required />
            <input class="input" type="password" name="password" v-model="password" placeholder="Password" required />
            <button class="button" type="submit">Войти</button>
        </form>
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

.form{
    background: white;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
}

</style>
  