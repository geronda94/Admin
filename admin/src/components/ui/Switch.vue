<script setup>
defineProps({
    title: String,
    fieldName: String,
    isChecked: {
        type: Boolean,
        default: false
    }

})

</script>
<template>    
    <label class="label__input switch__label" :for="title">
        <p>{{title}}</p>
        <label class="switch" :for="title">
            <input class="input modal__input" type="checkbox" :id="title" :name="fieldName" :checked="isChecked"/>
            <span class="slider round"></span>
        </label>
    </label>
</template>



<style scoped>
.switch__label{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 20px;
    color: var(--color-grey);
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-blue);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 27px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--color-sky);
}
.input, .input:focus {
    outline: none !important;
}
input:focus + .slider {
  box-shadow: 0 0 1px var(--color-sky);
  
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>