<script setup>
import Wrapper from "@/components/Wrapper.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const searchQuery = route.query.q;
</script>

<template>
  <Wrapper>
    <template #header>
      <h1 v-if="searchQuery?.length > 0">
        Search Results for <span>&quot;{{ searchQuery }}&quot;</span>
      </h1>

      <h1 v-else>No search query</h1>
    </template>

    <template #main>
      <div class="card-container">
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
        <div class="card-container_card"></div>
      </div>
    </template>
  </Wrapper>
</template>

<style lang="scss" scoped>
h1 {
  color: #15054f;
  text-align: left;
  width: 100%;

  span {
    color: #6b6b6b;
  }
}

.card-container {
  column-count: 3;
  column-gap: 3rem;

  &_card {
    break-inside: avoid;
    background: #ccc;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 0.5rem;
    min-height: 20rem;
  }
}
</style>
