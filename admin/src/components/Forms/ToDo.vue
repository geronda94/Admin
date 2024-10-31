<script setup>

</script>

<template>    
    <div class="flex__row">
            
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

            
            <label class="label__input" for="is_available">
                <input class="input modal__input" type="checkbox" id="is_available" name="is_available" checked/>
                <span>Is Available</span>
            </label>
            
        </div>


</template>