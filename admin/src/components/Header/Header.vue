<script setup>
import { provide } from 'vue';
import Quit from './Quit.vue';
import Me from './Me.vue';
import Language from './Language.vue';





</script>

<template>
    <header class="header">
        <Me />

        <div class="right__block-header"> 
          <Language />
          <Quit/>
        </div>
        
    </header>
</template>

<style scoped>
.header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 35px 20px;
    margin-top: 31px;
}

.right__block-header{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
</style>