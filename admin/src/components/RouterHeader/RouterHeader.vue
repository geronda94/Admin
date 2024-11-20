<script setup>
import { inject, ref } from 'vue';
import Modal from '../Modal/ModalAdd.vue';

const props = defineProps({
    title: String,
    modalForm: Object, // Передаем компонент формы
    endpoint: String
});

const modalAddActive = ref(false)

const langNames = {
    search: 'Search',
    add: 'Add item'
};
</script>

<template>
    <div class="router__header">
        <h1 class="router__title">{{ title }}</h1>
        <div class="router__header-row">
            <Search :title="langNames.search" />
            <AddButton @click="modalAddActive=true" :buttonName="langNames.add"/>
        </div>

        <!-- Передаем компонент формы в модальное окно и состояние видимости -->
        <Modal 
            v-if="modalAddActive"

            v-model:isActive="modalAddActive" 
            :modalForm="modalForm" 
            :endpoint="endpoint"
            />
    </div>
</template>





<style>



.router__header{
    padding: 0 20px;
}
.router__title{
    margin-left: 15px;
    font: bold 24px "Open Sans";
    color: var(--color-sky);
}

.router__header-row{
    min-width: 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    gap: 25px;
    align-items: center;
}

</style>