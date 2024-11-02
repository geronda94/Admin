<script setup>
import Search from "./Search.vue"
import AddButton from "./AddButton.vue";

const props = defineProps({
    title: String
})


const langNames = {
    search: 'Search',
    add: 'Add item'
}
</script>
<template>    
    <div class="router__header">
        <h1 class="router__title">{{ title }}</h1>
        <div class="router__header-row">
            <Search :title="langNames.search" />
            <AddButton :buttonName="langNames.add"/>
            
        </div>
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