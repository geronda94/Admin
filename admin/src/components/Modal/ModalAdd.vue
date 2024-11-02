<script setup>
import { inject, onMounted, onUnmounted, watch, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import Product from '../Forms/Product.vue';
import ToDo from '../Forms/ToDo.vue';


let currentRoute = useRoute()
let contentComponent = null;

const setContentComponent = () => {
  switch (currentRoute.name) {    
    case 'Products':
      contentComponent= Product;
      break;
    case 'ToDo':
      contentComponent = ToDo;
      break;
    default:
      contentComponent= null;
  }
};


const modalAddActive = inject('modalAddActive')

const props = defineProps({
    isActive: {
        typeof: Boolean,
        default: false
    }
})








watch(
  () => currentRoute.name,  () => {
    setContentComponent()
  }
);

onMounted(() => {
    setContentComponent()
});


</script>
<template>
    <div :class="['modal', {'modal__active':modalAddActive}]" @click="modalAddActive=false">
        <div class="content__modal" @click.stop>
            <div class="modal__header">
                <h2 class="modal__title">Add {{currentRoute.name}}</h2>
                <div class="modal__close" @click="modalAddActive=false">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </div>
            </div>


            <form class="modal__form">
                <div class="modal__main">            
                    <component :is="contentComponent" />
                </div>


                <div class="modal__footer">
                    <button class="button modal__button" type="submit">Add</button>
                </div>
            </form>
        </div>
    </div>

</template>
<style>


</style>