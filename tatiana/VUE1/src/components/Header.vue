<template>
  <header>
    <h1>Agência de Viagem</h1>
    <nav>
      <a href="/">Início</a> |
      <a href="/about">Sobre</a> |
      <a href="/services">Serviços</a> |
      <a href="/contact">Contato</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header {
  width: 900px;
  background:url(src/assets/aviao.png) no-repeat center center;
  background-size: 100% ;
  padding: 1rem;
  text-align: center;
}
nav a {
  color: aliceblue;
  margin: 0 10px;
  text-decoration: none;
}
</style>
