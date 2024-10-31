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

const closeModal = () => {
    modalAddActive.value =false
}


const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};





watch(
  () => currentRoute.name,  () => {
    setContentComponent()
  }
);

onMounted(() => {
    window.addEventListener('keydown', handleEscapeKey);
    setContentComponent()
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscapeKey);
    
});
</script>
<template>
    <div :class="['modal', {'modal__active':modalAddActive}]" @click="closeModal">
        <div class="content__modal" @click.stop>
            <div class="modal__header">
                <h2 class="modal__title">Add {{currentRoute.name}}</h2>
                <div class="modal__close" @click="closeModal">
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
.flex__row{
    display: flex;
    justify-content: flex-start;
    align-content: start;
    gap: 20px;
    width: 100%;
}

.modal__main{
    overflow-y: auto;
    width: 94%;
    margin:10px auto;
    max-height: 60vh;
    padding-right: 10px;
    scrollbar-width:thin; /* Для Firefox */
    scrollbar-color:var(--color-prime) var(--color-blue) ; 
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: start;
    gap: 15px;
}

.one__row{
    width: 100%;
}

.two__row{
    width: 48%;
}

.three__row{
    width: 32%;
}

.four__row{
    width: 24%;
}



.modal__input{
    margin: 2px;
    padding: 8px 12px;
    width: 100%;
}

.modal__footer{
    
    padding-top: 10px;
    border-top: 1px solid var(--color-blue);
    width: 100%;
    padding: 10px 20px;
    display: flex;
    justify-content: flex-end;
}

.modal__button{
    display: block;

}

.modal__active{
    z-index: 9999 !important ;
    opacity: 1 !important;  
}
.modal{
    position: fixed;

    z-index: -9999;
    opacity: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;

}

.content__modal{
    width: 80%;
    /* height: 82vh; */
    background: white;
    border-radius: 8px;
}

.modal__header{
    padding:0 0 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-family: 'Open Sans';
    font-weight: 600;
    border-bottom: 1px solid var(--color-blue);
}
.modal__close{
    padding: 20px;
    transition: 0.3s;
    cursor: pointer;
    font-size: 21px;
}
.modal__close:hover{
    color: var(--color-sky);
    transition: 0.3s;

}


</style>