<script setup>
import Switch from '../ui/Switch.vue';
import FileInput from '../Media/FileInput.vue';
</script>

<template>    
    <div class="flex__row">
            <Switch title="Is Awailable" field-name="is_awailable" :is-checked="true"/>

            <label class="label__input" for="code">
                <input class="input modal__input" placeholder="Product Code" type="text" id="code" name="code">
            </label>
            <label class="label__input" for="category_id">
                <select class="input modal__input" id="category_id" name="category_id">
                    <option value="">Select Category</option>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <!-- Add other categories dynamically -->
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
        <label class="label__input two__row" for="title_tr">
            <input class="input modal__input" placeholder="Title (TR)" type="text" id="title_tr" name="title_tr">
        </label>


        <div class="flex__row">
            <!-- Media Links -->
            <FileInput selectorTitle="Select photo" :max-items="1"  inputId="product_avatar" />
           
     

        </div>
        <div class="flex__row">
            <!-- Media Links -->
            <FileInput selectorTitle ="Select slides"
                inputId="product_slides"

             />
            
        </div>

        
        <div class="flex__row">
            <label class="label__input " for="video">
                <input class="input modal__input" placeholder="Video URL" type="text" id="video" name="video">
            </label>
        </div>

        <div class="flex__row">
            <label class="label__input " for="price">
                <input class="input modal__input" placeholder="Price" type="number" id="price" name="price" required>
            </label>
            <!-- Sale Checkbox -->
            <Switch title="On Sale" field-name="sale" />

            <!-- Discount Value -->
            <label class="label__input" for="discount_value">
                <input class="input modal__input" placeholder="Discount Value" type="number" id="discount_value" name="discount_value">
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
        <label class="label__input one__row" for="description_tr">
            <textarea class="input modal__input" placeholder="Description (TR)" id="description_tr" name="description_tr"></textarea>
        </label>

        
</template>

<style scoped>

</style>