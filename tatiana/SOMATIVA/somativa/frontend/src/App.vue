<template>
  <div id="app" class="flex h-screen overflow-hidden bg-gray-50">
    <!-- Sidebar Lateral Esquerda -->
    <aside class="flex flex-col w-64 text-white shadow-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <!-- Logo -->
      <div class="p-6 border-b border-slate-700">
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-600">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold tracking-tight">ManutechPro</h1>
            <p class="text-xs text-slate-400">Sistema Industrial</p>
          </div>
        </div>
      </div>

      <!-- Navegação -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <button
          @click="currentView = 'dashboard'"
          class="flex items-center w-full px-4 py-3 transition-all duration-200 rounded-lg"
          :class="currentView === 'dashboard' 
            ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg' 
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span class="font-medium">Dashboard</span>
        </button>

        <button
          @click="currentView = 'calendario'"
          class="flex items-center w-full px-4 py-3 transition-all duration-200 rounded-lg"
          :class="currentView === 'calendario' 
            ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg' 
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="font-medium">Calendário</span>
        </button>

        <button
          @click="currentView = 'gestao'"
          class="flex items-center w-full px-4 py-3 transition-all duration-200 rounded-lg"
          :class="currentView === 'gestao' 
            ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg' 
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span class="font-medium">Gestão</span>
        </button>
      </nav>

      <!-- User Profile -->
      <div class="p-4 border-t border-slate-700">
        <div class="flex items-center px-3 py-2 space-x-3 transition-colors rounded-lg cursor-pointer hover:bg-slate-800">
          <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600">
            <span class="text-sm font-bold text-white">A</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-white">Ana Silva</p>
            <p class="text-xs text-slate-400">Administrador</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Conteúdo Principal -->
    <main class="flex-1 overflow-y-auto bg-gray-50">
      <div class="p-8">
        <!-- TELA 1: Dashboard -->
        <div v-if="currentView === 'dashboard'">
          <h2 class="mb-6 text-2xl font-bold text-gray-800">Dashboard</h2>
          <DashboardView />
        </div>

        <!-- TELA 2: Calendário -->
        <div v-if="currentView === 'calendario'">
          <h2 class="mb-6 text-2xl font-bold text-gray-800">Calendário</h2>
          <CalendarioView />
        </div>

        <!-- TELA 3: Gestão (Manutenções + Equipamentos) -->
        <div v-if="currentView === 'gestao'" class="space-y-8">
          <div class="mb-8">
            <h2 class="mb-6 text-2xl font-bold text-gray-800">Manutenções</h2>
            <ManutencoesView />
          </div>

          <div class="mt-8">
            <h2 class="mb-6 text-2xl font-bold text-gray-800">Equipamentos</h2>
            <MaquinasView />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useMaintenanceStore } from './store'
import DashboardView from './views/dashboard.vue'
import CalendarioView from './views/calendario.vue'
import ManutencoesView from './views/Manutencoes.vue'
import MaquinasView from './views/maquinas.vue'

export default {
  name: 'App',
  components: {
    DashboardView,
    CalendarioView,
    ManutencoesView,
    MaquinasView
  },
  
  setup() {
    const store = useMaintenanceStore()
    const currentView = ref('dashboard')
    
    // Recarrega dados ao trocar para tela de gestão
    watch(currentView, async (newView) => {
      console.log('🔄 Mudando para tela:', newView)
      
      if (newView === 'gestao') {
        console.log('🔄 Recarregando dados para tela de gestão...')
        await store.fetchMaintenances()
        console.log('✅ Dados recarregados!')
      }
    })
    
    return {
      currentView
    }
  }
}
</script>

<style>
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Transição suave entre telas */
main > div {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scrollbar customizada */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>