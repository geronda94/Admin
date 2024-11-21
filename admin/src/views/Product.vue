<script setup>

import Header from '../components/RouterHeader/RouterHeader.vue';
import ProductForm from '../components/Forms/Product.vue';
import { inject } from 'vue';





const endpointTag = 'products'
const API = inject('API')

const props = defineProps({
    title: String
})
</script>

<template>
    <Header 
        :title="title" 
        :modalForm="ProductForm" 
        :endpoint="endpointTag+'/add-product'"
    />

    <div class="table__wrapper">
        <div class="table__body">
            <div class="table__title">
                <h2 class="router__title-h">List Users</h2>
            </div>

                <div class="row__title row__table">
                    <div class="row-item">
                        Image
                    </div>
                    <div class="row-item">
                        Title
                    </div>
                    <div class="row-item">
                        Price
                    </div>
                </div>

            <div class="row__content row__table">
                <div class="row-item">
                    <img src="" alt="">
                </div>
                <div class="row-item">
                    Название товара...
                </div>
                <div class="row-item">
                    Цена
                </div>
            </div>
            </div>
            
        </div>

</template>


<style>
.table__wrapper{
    width: 100%;
    height: 82.4vh;
    padding: 20px;
    background: inherit;
    overflow: hidden;
}
.table__body{
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: white;

}


.table__title{
    padding: 20px;
}

.router__title-h{
    font-family: "Open Sans";
    font-size: 17px;
    font-weight: 550;
}




.row__table{
    display: grid;
    grid-template-columns: 100px 1fr 100px; /* Фиксированная ширина столбцов */
}

.row__title {
  background-color:var(--color-blue) !important;
  color: var(--color-second);
  width: 100%;
  font-size: 17px;
  font-weight: 600;
}

.row__table{
    padding: 13px;
}

.row-item {
  padding: 10px;
  text-align: center; /* Центрирование текста */
}

.row-item img {
  max-width: 100%;
  height: auto;
}

</style>