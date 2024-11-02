<script setup>
import MediaModalSelector from "./MediaModalSelector.vue";
import { ref } from "vue";

const images = ref([]); // Основной массив для хранения всех уникальных файлов
const selectedImages = ref([]); // Временный массив для файлов, полученных из MediaModalSelector
const ModalActive = ref(false);

const props = defineProps({
  selectorTitle: String,
  inputId: String,
});

// Добавление файлов из selectedImages в images, только если их там еще нет
const addSelectedFilesToImages = () => {
  selectedImages.value.forEach((file) => {
    if (!images.value.includes(file)) {
      images.value.push(file);
    }
  });
  selectedImages.value = []; // Очищаем selectedImages после добавления
};

// Обработчик события при закрытии модального окна с передачей выбранных файлов
const handleFilesUpdate = (files) => {
  selectedImages.value = files;
  addSelectedFilesToImages();
};

</script>

<template>
  <div class="file__input-wrapper">
    <!-- Невидимый input для хранения данных -->
    <input
      class="input__hidden"
      type="text"
      :name="inputId"
      :value="JSON.stringify(images)"
      :id="inputId"
    />

    <!-- Кнопка для открытия модального окна выбора файлов -->
    <div class="label__input media__label" @click="ModalActive = true">
      <p>{{ selectorTitle }}</p>
      <div class="media__icon-wrapper">
        <font-awesome-icon class="media__icon" :icon="['far', 'image']" />
      </div>
    </div>

    <!-- Отображение выбранных файлов -->
    <div>
      <span v-for="item of images" :key="item">{{ item }}</span>
    </div>

    <!-- Модальное окно выбора файлов -->
    <MediaModalSelector
      v-model:isActive="ModalActive"
      @update:selectedFiles="handleFilesUpdate"
    />
  </div>
</template>


<style scoped>
.media__label {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 2px solid var(--color-second);
  border-radius: 6px;
  padding: 8px 10px;
  color: var(--color-second);
  gap: 10px;
  transition: 0.3;
}

.media__label:hover {
  border: 2px solid var(--color-sky);
  color: var(--color-sky);
  transition: 0.3;
}

.media__icon-wrapper {
  font-size: 30px;
}

.input__hidden {
  display: none;
}
</style>
