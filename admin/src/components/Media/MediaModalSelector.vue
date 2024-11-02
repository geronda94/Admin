<script setup>
import Media from './Media.vue';
import { ref, provide } from 'vue';

const props = defineProps({
  isActive: Boolean,
  modelValue: Array, 
});


const resetSelected = ref(false)
provide('resetSelected', resetSelected )


const emits = defineEmits(["update:isActive", "update:selectedFiles", "resetFiles"]);

// Локальное хранилище для выбранных файлов
const selectedFromMedia = ref([]);

// Функция для закрытия модального окна
const closeModal = () => {
  emits('update:isActive', false);
};

// Функция для передачи данных в родительский компонент при нажатии "Select"
const confirmSelection = () => {
  emits('update:selectedFiles', selectedFromMedia.value);
  selectedFromMedia.value = []; // Очищаем локальные выбранные файлы
  resetSelected.value = true
  closeModal();
};
// Обновление `selectedFromMedia` при изменении файлов в компоненте `Media`
function handleSelectedFiles(files) {
  selectedFromMedia.value = files;
}
</script>

<template>
  <div :class="['modal', 'modal_media', {'modal__active':isActive}, {'modal__file-active':isActive}]" @click="closeModal">
    <div class="content__modal" @click.stop>
      <div class="modal__header">
        <h2 class="modal__title">File Manager</h2>
        <div class="modal__close" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </div>
      </div>

      <div class="content__media">
        <Media @updateSelectedFiles="handleSelectedFiles"  />
      </div>

      <div class="modal__footer">
        <!-- При нажатии кнопки "Select" отправляем данные в родительский компонент -->
        <button type="button" class="button modal__button" @click="confirmSelection">Select</button>
      </div>
    </div>
  </div>
</template>
<style scoped>


.modal__file-active{

    position: fixed;
    z-index: 9999 !important;
    top: 0;
    left: 0;
}
.content__modal{
    width: 90%;
}


.content__media{
    height: 65vh;
}



</style>