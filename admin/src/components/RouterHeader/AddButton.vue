<script setup>
import { inject } from 'vue';

const modalAddActive = inject('modalAddActive')

const props = defineProps({
    buttonName:String
})


const openAddModal = ()=>{
    modalAddActive.value = true
}



</script>

<template>
    <div class="add__item" @click="openAddModal">
        {{ buttonName }}<span class="span__plus"> +</span>
    </div>


</template>


<style >

.add__item{
    height: 49px;
    text-shadow: 2.5px 4.3px 10px rgba(0, 0, 0, 0.2);
    background: var(--color-sky);
    padding: 5px 15px;
    color: white;
    font: bold 18px 'Open Sans';
    border-radius: 13%;
    transition: 0.3s;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap:8px;
}

.add__item:hover{
    outline: 1px solid var(--color-sky);
    background-color: white;
    color: var(--color-sky);
    transition: 0.3s;
}

.span__plus{
    font-size: 27px;
    font-weight: bold;
}
</style>