<template>
  <header class="header">
    <slot name="header" />
  </header>

  <main>
    <slot name="main" />

    <slot />
  </main>
</template>

<style lang="scss" scoped>
.header {
  background: var(--background-primary);
  height: 14rem;
  display: grid;
  place-items: center;
  padding: 0 6rem;
}

main {
  margin: -2rem auto 4rem;
  padding: 0 6rem;
}
</style>
