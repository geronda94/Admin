<script setup>
const props = defineProps({
    title:String
})
</script>

<template>
    <div class="search__wrapper">
        <div class="search__icon-wrapper">
            <font-awesome-icon class="search__icon" :icon="['fas', 'magnifying-glass']" />
        </div>
        <input class="search__input input" type="text" :placeholder="title">
    </div>
</template>

<style scoped>

.search__input{
    width: 100%;
    font: 18px "Open Sans Regular";
    color: var(--color-solid);
    padding: 12px;
    border-radius: 16px;
    padding-left: 40px;

}

.search__input::placeholder{
    color: var(--color-solid);
}


.search__wrapper{
    position: relative;
    width: 45%;
}
.search__icon-wrapper{
    position: absolute;
    height: 100%;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.search__icon{
    font-size: 18px;
    color: var(--color-solid);
}
</style>