<template>
  <div class="space-y-6">
    <!-- Stats Cards com design circular -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="relative p-6 overflow-hidden bg-gray-800 rounded-2xl">
        <div class="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full bg-cyan-500/10"></div>
        <div class="relative">
          <div class="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500">
            <span class="text-2xl font-bold text-white">{{ store.totalMachines }}</span>
          </div>
          <h3 class="mb-1 text-sm text-gray-400">EQUIPAMENTOS</h3>
          <div class="flex items-center space-x-2">
            <div class="flex-1 h-2 overflow-hidden bg-gray-700 rounded-full">
              <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style="width: 70%"></div>
            </div>
            <span class="text-xs text-cyan-400">+2</span>
          </div>
        </div>
      </div>

      <div class="relative p-6 overflow-hidden bg-gray-800 rounded-2xl">
        <div class="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full bg-green-500/10"></div>
        <div class="relative">
          <div class="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500">
            <span class="text-2xl font-bold text-white">{{ store.maintenanceStats.concluded }}</span>
          </div>
          <h3 class="mb-1 text-sm text-gray-400">CONCLUÍDAS</h3>
          <div class="flex items-center space-x-2">
            <div class="flex-1 h-2 overflow-hidden bg-gray-700 rounded-full">
              <div class="h-full bg-gradient-to-r from-green-500 to-emerald-500" style="width: 85%"></div>
            </div>
            <span class="text-xs text-green-400">+15%</span>
          </div>
        </div>
      </div>

      <div class="relative p-6 overflow-hidden bg-gray-800 rounded-2xl">
        <div class="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full bg-yellow-500/10"></div>
        <div class="relative">
          <div class="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500">
            <span class="text-2xl font-bold text-white">{{ store.maintenanceStats.pending }}</span>
          </div>
          <h3 class="mb-1 text-sm text-gray-400">PENDENTES</h3>
          <div class="flex items-center space-x-2">
            <div class="flex-1 h-2 overflow-hidden bg-gray-700 rounded-full">
              <div class="h-full bg-gradient-to-r from-yellow-500 to-orange-500" style="width: 40%"></div>
            </div>
            <span class="text-xs text-yellow-400">+2</span>
          </div>
        </div>
      </div>

      <div class="relative p-6 overflow-hidden bg-gray-800 rounded-2xl">
        <div class="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full bg-red-500/10"></div>
        <div class="relative">
          <div class="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-red-500 to-pink-500">
            <span class="text-2xl font-bold text-white">{{ store.machinesByStatus.red }}</span>
          </div>
          <h3 class="mb-1 text-sm text-gray-400">CRÍTICOS</h3>
          <div class="flex items-center space-x-2">
            <div class="flex-1 h-2 overflow-hidden bg-gray-700 rounded-full">
              <div class="h-full bg-gradient-to-r from-red-500 to-pink-500" style="width: 20%"></div>
            </div>
            <span class="text-xs text-red-400">Alert!</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Gráficos lado a lado com design diferente -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Gráfico de Linha Animado -->
      <div class="p-6 bg-gray-800 border border-gray-700 rounded-2xl">
        <h3 class="mb-6 text-lg font-bold text-white">Tendência de Performance</h3>
        <div class="relative h-64">
          <svg class="w-full h-full" viewBox="0 0 400 200">
            <!-- Grid lines -->
            <line x1="0" y1="50" x2="400" y2="50" stroke="#374151" stroke-width="1" stroke-dasharray="5,5"/>
            <line x1="0" y1="100" x2="400" y2="100" stroke="#374151" stroke-width="1" stroke-dasharray="5,5"/>
            <line x1="0" y1="150" x2="400" y2="150" stroke="#374151" stroke-width="1" stroke-dasharray="5,5"/>
            
            <!-- Line chart -->
            <polyline
              points="0,180 50,140 100,160 150,100 200,120 250,60 300,80 350,40 400,70"
              fill="none"
              stroke="url(#lineGradient)"
              stroke-width="3"
            />
            
            <!-- Area under line -->
            <polygon
              points="0,200 0,180 50,140 100,160 150,100 200,120 250,60 300,80 350,40 400,70 400,200"
              fill="url(#areaGradient)"
              opacity="0.3"
            />
            
            <!-- Gradients -->
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.5" />
                <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0" />
              </linearGradient>
            </defs>
          </svg>
          <div class="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
            <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span><span>Jul</span><span>Ago</span>
          </div>
        </div>
      </div>

      <!-- Gráfico Radial de Status -->
      <div class="p-6 bg-gray-800 border border-gray-700 rounded-2xl">
        <h3 class="mb-4 text-lg font-bold text-white">Status em Tempo Real</h3>
        <div class="flex items-center justify-center h-64">
          <div class="relative">
            <!-- Círculos concêntricos -->
            <svg class="w-48 h-48" viewBox="0 0 200 200">
              <!-- Círculo externo (Total) -->
              <circle cx="100" cy="100" r="90" fill="none" stroke="#1f2937" stroke-width="20"/>
              
              <!-- Círculo verde (OK) -->
              <circle 
                cx="100" cy="100" r="90" 
                fill="none" 
                stroke="#10b981" 
                stroke-width="20"
                stroke-dasharray="565"
                :stroke-dashoffset="565 - (store.machinesByStatus.green / store.totalMachines * 565)"
                transform="rotate(-90 100 100)"
              />
              
              <!-- Círculo amarelo (Atenção) -->
              <circle 
                cx="100" cy="100" r="65" 
                fill="none" 
                stroke="#f59e0b" 
                stroke-width="20"
                stroke-dasharray="408"
                :stroke-dashoffset="408 - (store.machinesByStatus.yellow / store.totalMachines * 408)"
                transform="rotate(-90 100 100)"
              />
              
              <!-- Círculo vermelho (Crítico) -->
              <circle 
                cx="100" cy="100" r="40" 
                fill="none" 
                stroke="#ef4444" 
                stroke-width="20"
                stroke-dasharray="251"
                :stroke-dashoffset="251 - (store.machinesByStatus.red / store.totalMachines * 251)"
                transform="rotate(-90 100 100)"
              />
              
              <!-- Texto central -->
              <text x="100" y="95" text-anchor="middle" class="text-3xl font-bold fill-white">{{ store.totalMachines }}</text>
              <text x="100" y="115" text-anchor="middle" class="text-sm fill-gray-400">Total</text>
            </svg>
            
            <div class="absolute left-0 right-0 flex justify-center space-x-6 text-xs -bottom-8">
              <div class="flex items-center">
                <div class="w-3 h-3 mr-1 bg-green-500 rounded-full"></div>
                <span class="text-gray-400">{{ store.machinesByStatus.green }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 mr-1 bg-yellow-500 rounded-full"></div>
                <span class="text-gray-400">{{ store.machinesByStatus.yellow }}</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 mr-1 bg-red-500 rounded-full"></div>
                <span class="text-gray-400">{{ store.machinesByStatus.red }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline de Atividades -->
    <div class="p-6 bg-gray-800 border border-gray-700 rounded-2xl">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold text-white">Timeline de Atividades</h3>
        <router-link to="/manutencoes" class="text-sm text-cyan-400 hover:text-cyan-300">
          Ver todas →
        </router-link>
      </div>
      
      <div class="space-y-4">
        <div 
          v-for="(maintenance, index) in recentMaintenances" 
          :key="maintenance.id"
          class="flex items-start space-x-4"
        >
          <div class="flex flex-col items-center">
            <div 
              class="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full"
              :class="getStatusColor(maintenance.status)"
            >
              {{ index + 1 }}
            </div>
            <div 
              v-if="index < recentMaintenances.length - 1" 
              class="w-0.5 h-12 bg-gray-700 mt-2"
            ></div>
          </div>
          
          <div class="flex-1 p-4 transition-colors border border-gray-600 bg-gray-700/50 rounded-xl hover:border-cyan-500">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-semibold text-white">{{ maintenance.machine }}</h4>
              <span 
                class="px-3 py-1 text-xs font-medium rounded-full"
                :class="getStatusBadge(maintenance.status)"
              >
                {{ maintenance.status }}
              </span>
            </div>
            <p class="mb-2 text-sm text-gray-300">{{ maintenance.description }}</p>
            <div class="flex items-center justify-between text-xs text-gray-400">
              <span>👤 {{ maintenance.technician }}</span>
              <span>📅 {{ formatDate(maintenance.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useMaintenanceStore } from '../store'

export default {
  name: 'Dashboard',
  
  setup() {
    const store = useMaintenanceStore()
    
    const recentMaintenances = computed(() => {
      return store.allMaintenances.slice(0, 5)
    })
    
    const getStatusColor = (status) => {
      const colors = {
        'Concluída': 'bg-green-500',
        'Pendente': 'bg-yellow-500',
        'Em Andamento': 'bg-cyan-500',
        'Agendada': 'bg-purple-500'
      }
      return colors[status] || 'bg-gray-500'
    }
    
    const getStatusBadge = (status) => {
      const badges = {
        'Concluída': 'bg-green-500/20 text-green-400 border border-green-500',
        'Pendente': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500',
        'Em Andamento': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500',
        'Agendada': 'bg-purple-500/20 text-purple-400 border border-purple-500'
      }
      return badges[status] || 'bg-gray-500/20 text-gray-400'
    }
    
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('pt-BR')
    }
    
    return {
      store,
      recentMaintenances,
      getStatusColor,
      getStatusBadge,
      formatDate
    }
  }
}
</script>