<template>
  <Header />
  <section>
    <h2>Bem-vindo à nossa agência!</h2>
    <div class="cards">
      <div class="praia">As melhores praias</div>
      <div class="neve">As melhores neves</div>
      <div class="cidade">As melhores cidades</div>
    </div>
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
.cards {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  font-size: 28px;
  color: #f2f2f2;               
  -webkit-text-stroke: 1px black; 

}
.praia {
  background: url('../assets/praia.png') no-repeat center center;
  background-size: 100% ;
  padding: 1rem;
  border: 1px solid #ccc;
  width: 30%;
  text-align: center;
}

.neve {
  background: url('../assets/neve.png') no-repeat center center;
  background-size: 100% 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  width: 30%;
  text-align: center;
  
}
.cidade {
  background: url('../assets/cidade.png') no-repeat center center;
  padding: 1rem;
  background-size: 100% 100%;
  border: 1px solid #ccc;
  width: 30%;
  text-align: center;
}
</style>


