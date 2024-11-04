<script setup>
import MediaModalSelector from "./MediaModalSelector.vue";
import { inject, ref, watch, nextTick, onMounted } from "vue";
const API = inject("API");

const images = ref([]);
const selectedImages = ref([]);
const ModalActive = ref(false);

const props = defineProps({
  selectorTitle: String,
  inputId: String,
  singleMode: Boolean,
  maxItems: { type: Number, default: Infinity }, // Добавили пропс для максимального количества файлов
  initialFiles: { type: String, default: '' },
});

onMounted(() => {
  // Разделяем строку на массив
  const initialFilesArray = props.initialFiles.split(',').map(file => file.trim()).filter(file => file);

  if (initialFilesArray.length > 0) {
    if (props.singleMode) {
      images.value = [initialFilesArray[initialFilesArray.length - 1]];
    } else {
      images.value = [...initialFilesArray];
    }
  }
});

watch(ModalActive, async (isActive) => {
  if (!isActive) {
    await nextTick();
    addSelectedFilesToImages();
  }
});

const addSelectedFilesToImages = () => {
  selectedImages.value.forEach((file) => {
    if (file.includes(".") && !images.value.includes(file)) {
      if (props.singleMode) {
        images.value = [file]; // Если singleMode, заменяем текущее изображение
      } else {
        // Если ограничение не превышено, добавляем файл
        if (images.value.length < props.maxItems) {
          images.value.push(file);
        }
      }
    }
  });
  selectedImages.value = [];
};

const handleFilesUpdate = (files) => {
  selectedImages.value = files;
};

const moveToLeft = (index) => {
  if (index > 0) {
    const item = images.value[index];
    images.value.splice(index, 1);
    images.value.splice(index - 1, 0, item);
  }
};

const moveToRight = (index) => {
  if (index < images.value.length - 1) {
    const item = images.value[index];
    images.value.splice(index, 1);
    images.value.splice(index + 1, 0, item);
  }
};

const dropItem = (index) => {
  images.value.splice(index, 1);
};
</script>

<template>
  <div class="file__input-wrapper">
    <input
      class="input__hidden"
      type="text"
      :name="inputId"
      :value="images.join(',')"
      :id="inputId"
    />
    <div class="media__selector-block">
      <div class="label__input media__label" @click="ModalActive = true">
        <div class="media__icon-wrapper">
          <font-awesome-icon class="media__icon" :icon="['far', 'image']" />
        </div> 
        <p>{{ selectorTitle }} </p>
      </div>    
      <div v-if="images.length > 0" @click="images=[]" class="drop__all-slides">
        <font-awesome-icon :icon="['fas', 'trash']" />
      </div>
    </div>
    
    <div class="slides__manager">
      <div 
        v-for="(item, index) in images" :key="item" 
        class="slides__manager-item">

        <div class="slide__item-nav">
          <div class="slide__nav-item" @click="moveToLeft(index)">
           <font-awesome-icon :icon="['fas', 'arrow-left']" />
          </div>
          <div class="slide__nav-item" @click="moveToRight(index)">
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </div>
          <div class="slide__nav-item slide__nav-item-close" @click="dropItem(index)">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </div>
        </div>

        <img class="slides__manager-img" :src="API+'/static/'+item" alt="">
      </div>
    </div>

    <MediaModalSelector
    v-if="ModalActive"
      v-model:isActive="ModalActive"
      @update:selectedFiles="handleFilesUpdate"
    />
  </div>
</template>



<style scoped>
.slides__manager-item {
  width: 210px;
  height: 210px; /* Высота контейнера */
  background: var(--color-blue);
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Скрыть лишние части изображения */
  position: relative;
}

.slides__manager-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Масштабирование и обрезка по центру */
  object-position: center; /* Центрирование изображения */
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}
.slide__item-nav{
  position: absolute;
  top: 0;
  left: 0;
  width: 96%;
  margin: 2%;
  background: rgba(212, 212, 212, 0.5);
  backdrop-filter: blur(5px);
  padding: 3px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  display: flex;
  gap: 20px;
}


.drop__all-slides{
  font-size: 20px;
  color: var(--color-prime);
  padding: 4px;
  transition: 0.3s;
  cursor: pointer;
}
.drop__all-slides:hover{

  color: var(--color-sky);
  transition: 0.1s;
}

.slide__nav-item{
  border: 2px solid var(--color-prime);
  color: var(--color-prime);
  padding: 4px;
  border-radius: 5px;
  transition: 0.1s;
  cursor: pointer;
}

.slide__nav-item:hover{
  border: 2px solid var(--color-sky);
  color: var(--color-sky);
  background: var(--color-blue);
  transition: 0.1s;
}


.slide__nav-item-close{
  margin-left: auto;
}
.slides__manager{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.file__input-wrapper{
  border: 2px solid var(--color-second);
  width: 100%;
  padding: 10px;
  border-radius: 15px;
}
.media__label {
  width: 250px;
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
.media__selector-block{
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
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
