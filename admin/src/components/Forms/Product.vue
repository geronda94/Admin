<script setup>
import Switch from '../ui/Switch.vue';
import FileInput from '../Media/FileInput.vue';
import { inject, ref, onMounted } from 'vue';
import axios from 'axios';

const API = inject('API')
const lang = inject('lang')



// Реактивное состояние для категорий
const categories = ref([]);

// Функция для загрузки категорий
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API}/products/get-categories`, {
      withCredentials: true, // Включаем куки
    });
    categories.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке категорий:', error);
  }
};

// Загружаем категории при монтировании компонента
onMounted(() => {
  fetchCategories();
});

const getCategoryTitle = (category) => {
  const localizedTitle = category[`title_${lang.value}`];
  return localizedTitle || category.title_en; // Используем локализованное название или title_en
};

</script>

<template>    
    <div class="flex__row">
        <Switch title="Is Awailable" field-name="is_available" :is-checked="true"/>

        <label class="label__input" for="code">
            <input class="input modal__input" placeholder="Articul Code" type="text" id="code" name="code">
        </label>
        <label class="label__input" for="id_crm">
            <input class="input modal__input" placeholder="ID crm" type="text" id="id_crm" name="id_crm">
        </label>
        <label class="label__input" for="category_id">
            <select class="input modal__input" id="category_id" name="category_id">
                <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                >
                {{ getCategoryTitle(category) }}
                </option>
            </select>
        </label>           
            
    </div>



        <label class="label__input two__row" for="title_en">
            <input class="input modal__input" placeholder="Title (EN)" type="text" id="title_en" name="title_en" required>
        </label>
        <label class="label__input two__row" for="title_ru">
            <input class="input modal__input" placeholder="Title (RU)" type="text" id="title_ru" name="title_ru">
        </label>
        <label class="label__input two__row" for="title_ua">
            <input class="input modal__input" placeholder="Title (UA)" type="text" id="title_ua" name="title_ua">
        </label>
        <!-- <label class="label__input two__row" for="title_tr">
            <input class="input modal__input" placeholder="Title (TR)" type="text" id="title_tr" name="title_tr">
        </label> -->


        <div class="flex__row">
            <!-- Media Links -->
            <FileInput selectorTitle="Select photo" :max-items="1"  inputId="avatar" />
           
     

        </div>
        <div class="flex__row">
            <!-- Media Links -->
            <FileInput selectorTitle ="Select slides"
                inputId="slides"

             />
            
        </div>

        


        <div class="flex__row">
            <label class="label__input " for="price">
                <input class="input modal__input" placeholder="Price" type="number" id="price" name="price" required>
            </label>
            <!-- Sale Checkbox -->
            <Switch title="On Sale" field-name="sale" />

            <!-- Discount Value -->
            <label class="label__input" for="discount_value">
                <input class="input modal__input" placeholder="Discount Value" type="number" value="0" id="discount_value" name="discount_value">
            </label>
        </div>
        

        <label class="label__input one__row" for="description_en">
            <textarea class="input modal__input" placeholder="Description (EN)" id="description_en" name="description_en"></textarea>
        </label>
        <label class="label__input one__row" for="description_ru">
            <textarea class="input modal__input" placeholder="Description (RU)" id="description_ru" name="description_ru"></textarea>
        </label>
        <label class="label__input one__row" for="description_ua">
            <textarea class="input modal__input" placeholder="Description (UA)" id="description_ua" name="description_ua"></textarea>
        </label>
        <!-- <label class="label__input one__row" for="description_tr">
            <textarea class="input modal__input" placeholder="Description (TR)" id="description_tr" name="description_tr"></textarea>
        </label> -->

        
</template>

<style scoped>

</style>