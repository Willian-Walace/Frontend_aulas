<template>
  <Header />
  <section class="agencia">
    
  </section>

  <section>
    <h2>Bem-vindo à nossa agência!</h2>
    <div class="cards">
      <div class="praia">{{ textos.praia }}
        <p>Data atual: {{ store.dataAtual }}</p>
        <p>Preço original: R$ {{ store.preco_praia }}</p>
        <p>Desconto: R$ {{ store.desconto_praia }}</p>
        <p><strong>Preço final: R$ {{ store.preco_praia - store.desconto_praia }}</strong></p>
      </div>
      <div class="neve">{{ textos.neve }}
        <p>Data atual: {{ store.dataAtual }}</p>
        <p>Preço original: R$ {{ store.preco_neve }}</p>
        <p>Desconto: R$ {{ store.desconto_neve }}</p>
        <p><strong>Preço final: R$ {{ store.preco_neve - store.desconto_neve }}</strong></p>
      </div>
      <div class="cidade">{{ textos.cidade }}
        <p>Data atual: {{ store.dataAtual }}</p>
        <p>Preço original: R$ {{ store.preco_cidade }}</p>
        <p>Desconto: R$ {{ store.desconto_cidade }}</p>
        <p><strong>Preço final: R$ {{ store.preco_cidade - store.desconto_cidade }}</strong></p>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useMainStore } from '../stores/mainStore'

export default {
  name: 'Agencia',
  components: { Header, Footer },
  setup() {
    const store = useMainStore()
    return { store }
  },
  data() {
    return {
      textos: {
        praia: 'As melhores praias',
        neve: 'As melhores neves',
        cidade: 'As melhores cidades'
      }
    }
  }
}
</script>

<style scoped>
.agencia {
  padding: 20px;
}
p{
  font-size: 16px;
  color: #f2f2f2;               
  -webkit-text-stroke: 0.5px black; 
}

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
  background-size: 100%;
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
