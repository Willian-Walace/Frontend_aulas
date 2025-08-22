import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    nome: 'Maria',
    preco_praia: 1200,
    desconto_praia: 200,
    preco_neve: 5000,
    desconto_neve: 500,
    preco_cidade: 900,
    desconto_cidade: 80,
    dataAtual: new Date().toLocaleDateString()
  })
})
