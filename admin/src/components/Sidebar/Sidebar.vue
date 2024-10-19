<script setup>
import Nav from './Nav.vue';


</script>
<template>
    <div class="container">
        <div class="logo">
            <img src="/icons/logo.svg" alt="" class="logo__img">
            <div>
                <h1 class="logo__text">Site</h1>
                <h1 class="logo__text">ADMIN</h1>
                
            </div>
            
            
        </div>

        <div class="nav__wrapper">
            <Nav/>
        </div>

    </div>
</template>
<style scoped>



.container{
    width: 100%;
}

.logo{
    margin: 40px 10px;
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: start;
    align-items: center;
    align-content: center;
    gap: 5px;

}

.logo__img{
    width: 40px;
    height: 40px;
    color: var(--color-grey);
}

.logo__text{
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 13px;
    margin-top: 4px;
    color: var(--color-prime);
}

.nav__wrapper{
    width: 100%;
}
</style>