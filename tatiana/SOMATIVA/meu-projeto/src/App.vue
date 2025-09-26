<template>
  <div id="app" class="min-h-screen bg-gray-900">
    <div class="flex">
      <!-- Sidebar Vertical -->
      <aside class="fixed top-0 left-0 w-64 h-full bg-gray-800 border-r border-gray-700">
        <div class="p-6">
          <div class="flex items-center mb-8 space-x-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
              <span class="text-lg font-bold text-white">⚡</span>
            </div>
            <div>
              <h1 class="text-lg font-bold text-white">TechMaint</h1>
              <p class="text-xs text-gray-400">Pro System</p>
            </div>
          </div>

          <nav class="space-y-2">
            <router-link 
              to="/" 
              class="flex items-center px-4 py-3 space-x-3 transition-all rounded-lg"
              :class="$route.path === '/' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </router-link>

            <router-link 
              to="/calendario" 
              class="flex items-center px-4 py-3 space-x-3 transition-all rounded-lg"
              :class="$route.path === '/calendario' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Calendário</span>
            </router-link>

            <router-link 
              to="/manutencoes" 
              class="flex items-center px-4 py-3 space-x-3 transition-all rounded-lg"
              :class="$route.path === '/manutencoes' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Manutenções</span>
            </router-link>

            <router-link 
              to="/maquinas" 
              class="flex items-center px-4 py-3 space-x-3 transition-all rounded-lg"
              :class="$route.path === '/maquinas' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Máquinas</span>
            </router-link>
          </nav>
        </div>

        <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
          <div class="flex items-center space-x-3">
            <div class="flex items-center justify-center rounded-full w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-500">
              <span class="text-sm font-bold text-white">B</span>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-white">Admin</p>
              <p class="text-xs text-gray-400">admin@techmaint.com</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 ml-64">
        <header class="px-8 py-4 bg-gray-800 border-b border-gray-700">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-white">{{ pageTitle }}</h2>
              <p class="text-sm text-gray-400">{{ currentDate }}</p>
            </div>
            <button class="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </header>

        <div class="p-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    pageTitle() {
      const titles = {
        '/': 'Dashboard',
        '/calendario': 'Calendário',
        '/manutencoes': 'Manutenções',
        '/maquinas': 'Máquinas'
      }
      return titles[this.$route.path] || 'TechMaint'
    },
    currentDate() {
      return new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      })
    }
  }
}
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #111827;
}
</style>