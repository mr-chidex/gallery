<template>
  <div class="skeleton-card">
    <div class="skeleton-img" :style="{ height: randomHeight + 'rem' }"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-text"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const randomHeight = ref(Math.floor(Math.random() * 5) + 20);
</script>

<style lang="scss" scoped>
.skeleton-card {
  width: 100%;
  background: #f0f0f0;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  break-inside: avoid;
}

.skeleton-img {
  width: 100%;
  background: linear-gradient(-90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 400% 400%;
  animation: shimmer 4s infinite linear;
}

.skeleton-text {
  height: 1.25rem;
  width: 60%;
  background: linear-gradient(-90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  margin: 0.625rem;
  border-radius: 0.25rem;
  animation: shimmer 3s infinite ease-in-out;

  &:last-child {
    width: 40%;
  }
}

@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
