<template>
  <header class="header">
    <slot name="header" />
  </header>

  <main>
    <slot name="main" />
  </main>
</template>

<style lang="scss" scoped>
.header {
  background: #dee5eb;
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
