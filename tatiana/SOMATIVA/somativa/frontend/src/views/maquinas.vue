<template>
  <div class="space-y-6">
    <!-- Galeria de Máquinas -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="machine in store.machines"
        :key="machine._id || machine.id"
        class="relative overflow-hidden transition-all duration-300 bg-white shadow-sm cursor-pointer group rounded-2xl hover:shadow-2xl"
      >
        <!-- Imagem da Máquina -->
        <div 
          class="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200"
          @click="openImageUpload(machine)"
        >
          <!-- Foto da máquina ou placeholder -->
          <img
            v-if="machine.image"
            :src="machine.image"
            :alt="machine.name"
            class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <div v-else class="flex items-center justify-center h-full">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-sm text-slate-400">Clique para adicionar foto</p>
            </div>
          </div>

          <!-- Overlay com ícone de upload -->
          <div class="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-40">
            <svg class="w-12 h-12 text-white transition-opacity opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <!-- Badge de Status -->
          <div class="absolute top-4 right-4">
            <div 
              class="px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm"
              :class="getStatusBadge(machine._id || machine.id)"
            >
              {{ getStatusText(machine._id || machine.id) }}
            </div>
          </div>
        </div>

        <!-- Info da Máquina -->
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="mb-1 text-xl font-bold text-gray-800">{{ machine.name }}</h3>
              <p class="text-sm text-gray-500">{{ machine.sector }}</p>
            </div>
            <div 
              class="w-4 h-4 rounded-full ring-2 ring-white"
              :class="getStatusColor(machine._id || machine.id)"
            ></div>
          </div>

          <!-- Estatísticas -->
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="p-3 rounded-lg bg-gray-50">
              <p class="mb-1 text-xs text-gray-500">Última Manutenção</p>
              <p class="font-semibold text-gray-800">{{ formatDate(machine.lastMaintenance) }}</p>
            </div>
            <div class="p-3 rounded-lg bg-gray-50">
              <p class="mb-1 text-xs text-gray-500">Próxima Manutenção</p>
              <p class="font-semibold text-gray-800">{{ getNextMaintenance(machine._id || machine.id) }}</p>
            </div>
          </div>
        </div>

        <!-- Input de arquivo escondido -->
        <input
          :ref="`fileInput-${machine._id || machine.id}`"
          type="file"
          @change="handleImageUpload($event, machine)"
          accept="image/*"
          class="hidden"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useMaintenanceStore } from '../store'

export default {
  name: 'Maquinas',
  
  setup() {
    const store = useMaintenanceStore()
    
    onMounted(async () => {
      await Promise.all([
        store.fetchMachines(),
        store.fetchMaintenances()
      ])
    })
    
    // Upload de imagem
    const openImageUpload = (machine) => {
      const input = document.querySelector(`input[ref="fileInput-${machine._id || machine.id}"]`)
      if (input) input.click()
    }
    
    const handleImageUpload = async (event, machine) => {
      const file = event.target.files[0]
      if (!file) return
      
      // Converter para base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = e.target.result
        
        try {
          // Atualizar máquina com a imagem
          await fetch(`http://localhost:3000/api/machines/${machine._id}/image`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 })
          })
          
          // Recarregar máquinas
          await store.fetchMachines()
          
          alert('Foto atualizada com sucesso!')
        } catch (error) {
          console.error('Erro ao fazer upload:', error)
          alert('Erro ao atualizar foto')
        }
      }
      reader.readAsDataURL(file)
    }
    
    // Status functions
    const getMachineStatusByLastMaintenance = (machineId) => {
      const allMaintenances = store.allMaintenances.filter(m => {
        let mId = null
        if (m.machineId) mId = String(m.machineId)
        else if (m.machine) {
          if (typeof m.machine === 'object' && m.machine._id) mId = String(m.machine._id)
          else mId = String(m.machine)
        }
        return mId === String(machineId)
      })
      
      if (allMaintenances.length === 0) return 'verde'
      
      const sorted = allMaintenances.sort((a, b) => new Date(b.date) - new Date(a.date))
      const lastMaintenance = sorted[0]
      
      const statusMap = {
        'Agendada': 'vermelho',
        'Em Andamento': 'amarelo',
        'Concluída': 'verde'
      }
      
      return statusMap[lastMaintenance.status] || 'verde'
    }
    
    const getStatusColor = (machineId) => {
      const status = getMachineStatusByLastMaintenance(machineId)
      const colors = {
        'verde': 'bg-green-500',
        'amarelo': 'bg-yellow-500',
        'vermelho': 'bg-red-500'
      }
      return colors[status]
    }
    
    const getStatusBadge = (machineId) => {
      const status = getMachineStatusByLastMaintenance(machineId)
      const badges = {
        'verde': 'bg-green-500 text-white',
        'amarelo': 'bg-yellow-500 text-white',
        'vermelho': 'bg-red-500 text-white'
      }
      return badges[status]
    }
    
    const getStatusText = (machineId) => {
      const status = getMachineStatusByLastMaintenance(machineId)
      const texts = {
        'verde': 'Operacional',
        'amarelo': 'Em Manutenção',
        'vermelho': 'Agendada'
      }
      return texts[status]
    }
    
    const formatDate = (date) => {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('pt-BR')
    }
    
    const getNextMaintenance = (machineId) => {
      const scheduled = store.scheduledMaintenances.filter(m => {
        let mId = null
        if (m.machineId) mId = String(m.machineId)
        else if (m.machine) {
          if (typeof m.machine === 'object' && m.machine._id) mId = String(m.machine._id)
          else mId = String(m.machine)
        }
        return mId === String(machineId)
      })
      
      if (scheduled.length === 0) return 'Não agendada'
      
      const sorted = scheduled.sort((a, b) => new Date(a.date) - new Date(b.date))
      return formatDate(sorted[0].date)
    }
    
    return {
      store,
      openImageUpload,
      handleImageUpload,
      getStatusColor,
      getStatusBadge,
      getStatusText,
      formatDate,
      getNextMaintenance
    }
  }
}
</script>