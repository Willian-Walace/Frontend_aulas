<template>
  <header>
    <h1>Bem-vinda à Agência de Viagens, {{ store.nome }}!</h1>
    <nav>
      <a href="/">Início</a> |
      <a href="/about">Sobre</a> |
      <a href="/services">Serviços</a> |
      <a href="/contact">Contato</a>
    </nav>
  </header>
</template>

<script>

import { useMainStore } from '../stores/mainStore'

export default {
  name: 'Header',
  setup() {
    const store = useMainStore()
    return { store }
  }
}
</script>

<style scoped>
header {
  width: 100%; ;
  height: 100px;
  background:url(src/assets/aviao.png) no-repeat center center;
  background-size: 100% ;
  padding: 1rem;
  margin-top: 2rem;
  text-align: center;
}
nav a {
  color: aliceblue;
  margin: 0 10px;
  text-decoration: none;
}
</style>
