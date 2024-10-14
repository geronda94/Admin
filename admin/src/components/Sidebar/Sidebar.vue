<script setup>



</script>
<template>
    <div class="container">
        <div class="logo">
            <img src="/icons/logo.png" alt="" class="logo__img">
            <h1 class="logo__text">Multi Page</h1>
        </div>


    </div>
</template>
<style scoped>



.container{
    width: 100%;
}

.logo{
    margin-top: 40px;
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 15px;
}

.logo__img{
    width: 30px;
    height: 30px;

}

.logo__text{
    font-family: 'Open Sans';
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: 0.15%;
    text-transform: uppercase;
}
</style>