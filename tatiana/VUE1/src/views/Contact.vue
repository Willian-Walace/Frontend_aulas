<template>
  <Header />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <section>
    <h2>Nossas redes</h2>
    <ul>
        <li><i class="fab fa-instagram"></i> Instagram</li>
        <li><i class="fab fa-facebook-f"></i> Facebook</li>
        <li><i class="fab fa-x-twitter"></i> X</li>
    </ul>
  </section>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  components: { Header, Footer }
}
</script>
<style scoped>
ul li {
  list-style: none;
  font-size: 20px;
  margin-bottom: 10px;
}

ul li i {
  margin-right: 8px;
  color: #000; 
}

</style>