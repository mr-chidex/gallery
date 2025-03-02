<template>
  <footer class="footer">
    Designed with <span class="heart">❤️</span> by
    <a href="https://github.com/mr-chidex" target="_blank" rel="noreferrer noopener">
      mr-chidex
    </a>
    © {{ new Date().getFullYear() }}. All rights reserved
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 2rem;
  background: var(--background-primary);
  color: var(--color-primary);
  margin-top: 4rem;
  text-align: center;

  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: bold;
  }
}

.heart {
  display: inline-block;
  animation: bounce 1s infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
}
</style>
