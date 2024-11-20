<script setup>
import { defineProps, ref, inject } from 'vue';
import axios from 'axios';

const sendingData = ref(false); // Статус загрузки
const successMessage = ref(''); // Сообщение об успешной отправке
const errorMessage = ref(''); // Сообщение об ошибке
const API = inject('API')




const props = defineProps({
    isActive: Boolean, // Пропс для видимости модального окна
    modalForm: Object, // Компонент, который рендерится в модальном окне
    endpoint: String, // Пропс для указания эндпоинта
});

const emit = defineEmits(['update:isActive']);

async function submitForm(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    const formData = {}; // Объект для данных формы
    const formElements = event.target.elements; // Получаем элементы формы

    // Заполняем formData значениями из элементов формы
    for (let element of formElements) {
        if (element.name) {
            formData[element.name] = element.value;
        }
    }

    

    sendingData.value = true; // Включаем статус загрузки
    successMessage.value = ''; // Сбрасываем старые сообщения
    errorMessage.value = '';

    try {
        const response = await axios.post(API+props.endpoint, formData, {
            withCredentials: true, // Если нужно отправлять куки
        });

        // Если запрос успешен
        successMessage.value = 'Данные успешно отправлены!';
        setTimeout(() => {
            emit('update:isActive', false); // Закрываем модальное окно
        }, 2000);
    } catch (error) {
        errorMessage.value = error.response?.data?.detail || 'Ошибка при отправке данных.';
        console.error('Ошибка:', error);
    } finally {
        sendingData.value = false; // Выключаем статус загрузки
    }
}
</script>


<template>
  <div :class="['modal', { 'modal__active': isActive }]" @click="emit('update:isActive', false)">
      <div class="content__modal" @click.stop>
          <div class="modal__header">
              <h2 class="modal__title">Add {{ $route.name }}</h2>
              <div class="modal__close" @click="emit('update:isActive', false)">
                  <font-awesome-icon :icon="['fas', 'xmark']" />
              </div>
          </div>

          <!-- Форма отправки -->
          <form v-if="sendingData !== true" class="modal__form" @submit="submitForm">
              <div class="modal__main">
                  <!-- Рендерим компонент, который был передан как modalForm -->
                  <component :is="modalForm" />
              </div>

              <div class="modal__footer">
                  <button class="button modal__button" type="submit">Add</button>
              </div>
          </form>

          <!-- Заглушка загрузки -->
          <div v-else>
              <div class="modal__main">
                  <div class="load__animation-wrapper">
                      <img class="load__animation" src="/load.gif" alt="Loading..." />
                  </div>
              </div>
              <div class="modal__footer">
                  <h2 class="load__title">Дождитесь отправки данных...</h2>
              </div>
          </div>

          <!-- Сообщение об успехе или ошибке -->
          <div v-if="successMessage || errorMessage" class="modal__status">
              <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </div>
      </div>
  </div>
</template>



<style>
.load__animation-wrapper{
  width: 100px;
  height: 100px;
  margin:50px auto;
}

.load__animation{
  width: 100%;
  height:100%;
}

.load__title{
  width: 100%;
  padding: 20pxbackend;
  text-align: center
}

</style>