<script setup>
import Footer from "@/components/Footer.vue";
</script>

<template>
  <header class="header">
    <slot name="header" />
  </header>

  <main>
    <slot name="main" />
  </main>
  <Footer />
</template>

<style lang="scss" scoped>
.header {
  background: var(--background-primary);
  height: 10rem;
  display: grid;
  place-items: center;
  padding: 0 2rem;

  @media (min-width: 768px) {
    padding: 0 6rem;
    height: 14rem;
  }
}

main {
  margin: -2rem auto 4rem;
  padding: 0 1rem;
  min-height: 50vh;

  @media (min-width: 768px) {
    padding: 0 6rem;
  }
}
</style>
