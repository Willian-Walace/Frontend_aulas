# Vue 3 + Vite AULA 1

2. Qual a função do main.js?
R: É o ponto de entrada da aplicação Vue. Ele cria a instância da aplicação Vue, importa o componente raiz, configura plugins, como o Vue Router ou Vuex e monta a aplicação na div do HTML

3. O que é o App.vue?
R: É o componente raiz da aplicação Vue, o "pai" de todos os outros componentes. É o principal componente que organiza a estrutura base da sua aplicação. Normalmente, dentro dele você chama o <router-view /> para renderizar as views de acordo com a rota.

4. Para que servem os arquivos em views?
R: Os arquivos dentro da pasta views geralmente são os componentes que representam páginas ou telas inteiras da sua aplicação. Por exemplo, uma página Home, Sobre, Contato etc. São usados para organizar melhor o projeto, separando páginas de componentes menores.

5. Como o Vue Router usa as views?
R: O Vue Router define rotas que apontam para componentes (geralmente os das views). Quando o usuário navega para uma rota, o Vue Router carrega o componente da view correspondente e exibe dentro do <router-view /> no App.vue.

6. O que faz app.mount('#app')?
R: Essa linha diz pro Vue "pegue essa aplicação criada e conecte ela ao elemento HTML que tem o id app". Ou seja, o Vue controla aquele pedaço do DOM, e renderiza os componentes dentro dele.
