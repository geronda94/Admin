<script setup>
import { computed } from 'vue';
const props = defineProps({
    title: String,
    link: String,
    is_active: {
        type: Boolean,
        require: false,
        default: false
    }
})



</script>
<template>
    
    <router-link :class="['nav__item', {'nav_active':is_active}]" :to="link">
        <p>{{ title }}</p>
    </router-link>


</template>
<style scoped>
.sidebar__icon{
    width: 20px;
}

</style>