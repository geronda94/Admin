<script setup>
import { defineProps, ref } from 'vue';


const sendingData = ref(false)


const props = defineProps({
    isActive: Boolean, // Пропс для видимости модального окна
    modalForm: Object, // Компонент, который рендерится в модальном окне

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
    sendingData.value = true
    console.log(formData)
    setTimeout(() => {
        emit('update:isActive', false);
    }, 3000); // Таймер на 3 секунды
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

            <form v-if="sendingData != true" class="modal__form" @submit="submitForm">
                <div class="modal__main">
                    <!-- Рендерим компонент, который был передан как contentComponent -->
                    <component :is="modalForm" />

                </div>

                <div class="modal__footer">
                    <button
                    
                    class="button modal__button" 
                    type="submit">Add</button>
                </div>
            </form>



            <form v-else>
              <div class="modal__main">
                <div class="load__animation-wrapper">
                  <img class="load__animation" src="/load.gif" alt="">
                
                </div>
                
                
              </div>
              <div class="modal__footer">
                <h2 class="load__title">Дождитесь отправки данных</h2>
              </div>
            </form>
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
  padding: 20px;
  text-align: center
}

</style>