<template>
  <div class="space-y-6">
    <!-- Filtros e Botão -->
    <div class="p-6 bg-white shadow-sm rounded-xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-800">Filtros</h3>
        <button
          @click="showModal = true"
          class="px-6 py-2 font-medium text-white transition-all rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-lg"
        >
          + Nova Manutenção
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Máquina</label>
          <select 
            v-model="filters.machine"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Todas as máquinas</option>
            <option v-for="machine in store.machines" :key="machine._id" :value="machine._id">
              {{ machine.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Status</label>
          <select 
            v-model="filters.status"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Todos os status</option>
            <option value="Agendada">🔴 Agendada</option>
            <option value="Em Andamento">🟡 Em Andamento</option>
            <option value="Concluída">🟢 Concluída</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Tipo</label>
          <select 
            v-model="filters.type"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Todos os tipos</option>
            <option value="Preventiva">Preventiva</option>
            <option value="Corretiva">Corretiva</option>
            <option value="Preditiva">Preditiva</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Timeline de Manutenções -->
    <div class="relative">
      <!-- Linha vertical -->
      <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-200 to-purple-200"></div>

      <div class="space-y-6">
        <div
          v-for="maintenance in filteredMaintenances"
          :key="maintenance._id || maintenance.id"
          class="relative pl-20"
        >
          <!-- Bolinha na timeline -->
          <div 
            class="absolute w-5 h-5 border-4 border-white rounded-full shadow-lg left-6"
            :class="getTimelineColor(maintenance.status)"
          ></div>

          <!-- Card de Manutenção -->
          <div class="p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center mb-2 space-x-3">
                  <h3 class="text-lg font-bold text-gray-800">{{ getMachineName(maintenance) }}</h3>
                  <span 
                    class="px-3 py-1 text-xs font-bold rounded-full"
                    :class="getStatusBadge(maintenance.status)"
                  >
                    {{ maintenance.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-600">{{ maintenance.description }}</p>
              </div>

              <!-- Ações -->
              <div class="flex space-x-2">
                <button
                  @click="viewMaintenance(maintenance)"
                  class="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                  title="Visualizar"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  @click="editMaintenance(maintenance)"
                  class="p-2 text-green-600 transition-colors rounded-lg hover:bg-green-50"
                  title="Editar"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="deleteMaintenance(maintenance)"
                  class="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50"
                  title="Excluir"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Detalhes -->
            <div class="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-gray-100 md:grid-cols-4">
              <div>
                <p class="mb-1 text-xs text-gray-500">Data</p>
                <p class="text-sm font-semibold text-gray-800">{{ formatDate(maintenance.date) }}</p>
              </div>
              <div>
                <p class="mb-1 text-xs text-gray-500">Técnico</p>
                <p class="text-sm font-semibold text-gray-800">{{ maintenance.technician }}</p>
              </div>
              <div>
                <p class="mb-1 text-xs text-gray-500">Tipo</p>
                <p class="text-sm font-semibold text-gray-800">{{ maintenance.type }}</p>
              </div>
              <div>
                <p class="mb-1 text-xs text-gray-500">Setor</p>
                <p class="text-sm font-semibold text-gray-800">{{ maintenance.sector }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensagem quando não há manutenções -->
      <div v-if="filteredMaintenances.length === 0" class="py-12 text-center">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-gray-500">Nenhuma manutenção encontrada</p>
      </div>
    </div>

    <!-- Modals -->
    <MaintenanceModal
      v-if="showModal"
      :maintenance="selectedMaintenance"
      @close="closeModal"
      @save="saveMaintenance"
    />

    <ViewMaintenanceModal
      v-if="showViewModal"
      :maintenance="selectedMaintenance"
      @close="showViewModal = false"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useMaintenanceStore } from '../store'
import MaintenanceModal from '../components/MaintenanceModal.vue'
import ViewMaintenanceModal from '../components/ViewMaintenanceModal.vue'

export default {
  name: 'Manutencoes',
  components: {
    MaintenanceModal,
    ViewMaintenanceModal
  },
  
  setup() {
    const store = useMaintenanceStore()
    const showModal = ref(false)
    const showViewModal = ref(false)
    const selectedMaintenance = ref(null)
    
    const filters = ref({
      machine: '',
      status: '',
      type: ''
    })
    
    onMounted(async () => {
      await Promise.all([
        store.fetchMachines(),
        store.fetchMaintenances()
      ])
    })
    
    const filteredMaintenances = computed(() => {
      let result = store.allMaintenances
      
      if (filters.value.machine) {
        result = result.filter(m => {
          const mId = m.machineId || m.machine?._id || m.machine
          return String(mId) === filters.value.machine
        })
      }
      
      if (filters.value.status) {
        result = result.filter(m => m.status === filters.value.status)
      }
      
      if (filters.value.type) {
        result = result.filter(m => m.type === filters.value.type)
      }
      
      return result.sort((a, b) => new Date(b.date) - new Date(a.date))
    })
    
    const getTimelineColor = (status) => {
      const colors = {
        'Agendada': 'bg-red-500',
        'Em Andamento': 'bg-yellow-500',
        'Concluída': 'bg-green-500'
      }
      return colors[status] || 'bg-gray-500'
    }
    
    const getStatusBadge = (status) => {
      const badges = {
        'Agendada': 'bg-red-100 text-red-800',
        'Em Andamento': 'bg-yellow-100 text-yellow-800',
        'Concluída': 'bg-green-100 text-green-800'
      }
      return badges[status] || 'bg-gray-100 text-gray-800'
    }
    
    const getMachineName = (maintenance) => {
      if (typeof maintenance.machine === 'string') {
        return maintenance.machineName || maintenance.machine
      }
      return maintenance.machine?.name || maintenance.machineName || 'N/A'
    }
    
    const formatDate = (date) => {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('pt-BR')
    }
    
    const closeModal = () => {
      showModal.value = false
      selectedMaintenance.value = null
    }
    
    const saveMaintenance = async (maintenanceData) => {
      try {
        if (selectedMaintenance.value && (selectedMaintenance.value.id || selectedMaintenance.value._id)) {
          await store.updateMaintenance(selectedMaintenance.value.id || selectedMaintenance.value._id, maintenanceData)
        } else {
          await store.addMaintenance(maintenanceData)
        }
        
        await new Promise(resolve => setTimeout(resolve, 500))
        await store.fetchMaintenances()
        
        closeModal()
      } catch (error) {
        console.error('Erro ao salvar:', error)
        alert('Erro ao salvar manutenção')
      }
    }
    
    const viewMaintenance = (maintenance) => {
      selectedMaintenance.value = maintenance
      showViewModal.value = true
    }
    
    const editMaintenance = (maintenance) => {
      selectedMaintenance.value = maintenance
      showModal.value = true
    }
    
    const deleteMaintenance = async (maintenance) => {
      if (!confirm('Tem certeza que deseja excluir esta manutenção?')) return
      
      try {
        await store.deleteMaintenance(maintenance._id || maintenance.id)
        alert('Manutenção excluída!')
      } catch (error) {
        console.error('Erro ao excluir:', error)
        alert('Erro ao excluir manutenção')
      }
    }
    
    return {
      store,
      showModal,
      showViewModal,
      selectedMaintenance,
      filters,
      filteredMaintenances,
      getTimelineColor,
      getStatusBadge,
      getMachineName,
      formatDate,
      closeModal,
      saveMaintenance,
      viewMaintenance,
      editMaintenance,
      deleteMaintenance
    }
  }
}
</script>