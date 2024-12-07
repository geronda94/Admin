<script setup>

import Header from '../components/RouterHeader/RouterHeader.vue';
import ProductForm from '../components/Forms/Product.vue';
import { inject, reactive, ref, onMounted } from 'vue';
import axios from 'axios';




const endpointTag = '/products'
const API = inject('API')

const props = defineProps({
    title: String
})

const categories = reactive([])

const state = reactive({
  products: [],
  page: 1,
  perPage: 50,

});


const fetchCategories  = async () => {
    try{
      const response = await axios.get(`${API}/products/get-categories`, {
                withCredentials: true,
            });

            categories.push(...response.data);

    }catch (error) {
    console.error('Ошибка при загрузке категорий:', error);
  }

}





const fetchProducts = async (page = 1) => {
  try {
    const response = await axios.get(`${API}/products/products`, {
      params: { page: state.page, per_page: state.perPage },
      withCredentials: true,
    });

    state.products = response.data;
    state.page  +=1;



  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);
  }


};


const getCategoryName = (category_id)  => {
        for (let i of categories){
            if ( i.id == category_id){
                return i.title_ua
            }
        }

        return 'Без категории'
    }


    

onMounted(() => {
  fetchProducts(state.page);
  fetchCategories()

});
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
                    <!-- <div class="row-item">
                        Slides
                    </div> -->
                    
                    <div class="row-item">
                        Title
                    </div>
                    <div class="row-item">
                        Category
                    </div>
                    <div class="row-item">
                        Price
                    </div>
                    
                    <div class="row-item">
                        Discount
                    </div>
                    <div class="row-item">
                        Code
                    </div>
                    <div class="row-item">
                        Status
                    </div>
                    <div class="row-item">
                        Actions
                    </div>
                    
                </div>

            <div class="row__table-wrapper">
                <div v-for="item of state.products"
                        :key="item.id"
                
                        class="row__content row__table">
                    <div class="row-item">
                        {{ item.avatar }}
                    </div>
                    <!-- <div class="row-item">
                        {{ item.slides }}
                    </div> -->
                    <div class="row-item">
                        {{ item.title_ua }}
                    </div>
                    <div class="row-item">
                        {{ getCategoryName(item.category_id) }}
                    </div>

                    <div class="row-item">
                        {{ item.price }}
                    </div>
                    <div class="row-item">
                        {{ item.discount_value }}
                    </div>
                    <div class="row-item">
                        {{ item.code }}
                    </div>
                    <div class="row-item">
                        {{ item.is_available ? 'доступно' : 'недоступно' }}
                    </div>

                    <div class="row-item">
                        Действия
                    </div>
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
    font-size: 22px;
    font-weight: 550;
    color: var(--color-sky);
}




.row__table{
    display: grid;
    grid-template-columns: 150px 150px 400px 150px 60px 60px 150px 100px 300px ; 
}

/* .row__table{
    display: flex;
    gap: 15px;
} */

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