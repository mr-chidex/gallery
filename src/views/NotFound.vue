<script setup>
import Wrapper from "@/components/Wrapper.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "Image Gallery: Page Not Found",
  meta: [
    { name: "description", content: "A beautiful image gallery with smooth animations." },
  ],
});
</script>

<template>
  <Wrapper>
    <template #header>
      <h1>Page Not Found</h1>
    </template>

    <template #main>
      <div class="not-found">
        <p>The page you're looking for doesn't exist.</p>
        <router-link to="/">Back to Home</router-link>
      </div>
    </template>
  </Wrapper>
</template>

<style lang="scss" scoped>
h1 {
  color: #15054f;
  text-align: left;
}
.not-found {
  margin-top: 6rem;
  display: grid;
  gap: 1rem;
}
</style>
