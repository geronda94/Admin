<script setup>
import {  onMounted, onUnmounted } from "vue";

const emit = defineEmits();
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  headerTitle: String,
});

const close = () => {
  emit("close");
};

const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    close();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEscapeKey);
});
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal__header" id="header">
        <h2 class="modal__title">{{ headerTitle }}</h2>
        <div class="modal__close" @click="close">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </div>
      </div>

      <slot name="body"></slot>
    </div>
  </div>
</template>

<style scoped>
.modal__close {
  padding: 5px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  padding: 7px;
  border-radius: 15px;
  max-width: 95%;
  max-height: 95%;
  position: relative;
  overflow: auto;
}

.modal-content img {
  width: auto;
  max-height: 100vh;
  display: block;
  object-fit:none;
}
</style>
