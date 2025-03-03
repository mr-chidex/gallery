<template>
  <Loader v-if="isLoading" />
  <RouterView />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Loader from "@/components/Loader.vue";

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>
