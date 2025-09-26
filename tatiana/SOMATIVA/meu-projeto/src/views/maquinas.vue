<template>
  <div class="space-y-6">
    <!-- Header com resumo -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="p-6 text-white bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl">
        <div class="flex items-center justify-between">
          <div>
            <p class="mb-1 text-sm opacity-90">Operacionais</p>
            <h3 class="text-4xl font-bold">{{ store.machinesByStatus.green }}</h3>
          </div>
          <div class="flex items-center justify-center w-16 h-16 rounded-full bg-white/20">
            <span class="text-3xl">✓</span>
          </div>
        </div>
      </div>

      <div class="p-6 text-white bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl">
        <div class="flex items-center justify-between">
          <div>
            <p class="mb-1 text-sm opacity-90">Em Atenção</p>
            <h3 class="text-4xl font-bold">{{ store.machinesByStatus.yellow }}</h3>
          </div>
          <div class="flex items-center justify-center w-16 h-16 rounded-full bg-white/20">
            <span class="text-3xl">⚠</span>
          </div>
        </div>
      </div>

      <div class="p-6 text-white bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl">
        <div class="flex items-center justify-between">
          <div>
            <p class="mb-1 text-sm opacity-90">Críticos</p>
            <h3 class="text-4xl font-bold">{{ store.machinesByStatus.red }}</h3>
          </div>
          <div class="flex items-center justify-center w-16 h-16 rounded-full bg-white/20">
            <span class="text-3xl">!</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Máquinas com Toggle de Status -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div 
        v-for="machine in store.machines" 
        :key="machine.id"
        class="p-6 transition-all bg-gray-800 border border-gray-700 rounded-2xl hover:border-cyan-500"
      >
        <!-- Header do Card -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
              <span class="text-lg font-bold text-white">{{ machine.name }}</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">{{ machine.name }}</h3>
              <p class="text-sm text-gray-400">{{ machine.sector }}</p>
            </div>
          </div>
        </div>

        <!-- Toggle de Status com 3 opções -->
        <div class="mb-4">
          <label class="block mb-2 text-xs text-gray-400">Status da Máquina</label>
          <div class="flex items-center gap-2 p-1 bg-gray-900 rounded-lg">
            <button
              @click="updateMachineStatus(machine.id, 'verde')"
              class="flex-1 py-2 text-sm font-medium transition-all rounded-md"
              :class="machine.status === 'verde' 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-green-400'"
            >
              OK
            </button>
            <button
              @click="updateMachineStatus(machine.id, 'amarelo')"
              class="flex-1 py-2 text-sm font-medium transition-all rounded-md"
              :class="machine.status === 'amarelo' 
                ? 'bg-yellow-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-yellow-400'"
            >
              Atenção
            </button>
            <button
              @click="updateMachineStatus(machine.id, 'vermelho')"
              class="flex-1 py-2 text-sm font-medium transition-all rounded-md"
              :class="machine.status === 'vermelho' 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-red-400'"
            >
              Crítico
            </button>
          </div>
        </div>

        <!-- Informações -->
        <div class="mb-4 space-y-3">
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
            <span class="text-sm text-gray-400">Última Manutenção</span>
            <span class="text-sm font-medium text-white">{{ formatDate(machine.lastMaintenance) }}</span>
          </div>
          
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
            <span class="text-sm text-gray-400">Próxima Manutenção</span>
            <span class="text-sm font-medium text-white">{{ getNextMaintenanceDate(machine.id) }}</span>
          </div>
        </div>

        <!-- Ações -->
        <div class="flex gap-2">
          <button
            @click="viewMachineHistory(machine)"
            class="flex-1 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-cyan-600 hover:bg-cyan-700"
          >
            📊 Histórico
          </button>
          <button
            @click="scheduleMaintenance(machine)"
            class="flex-1 px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            📅 Agendar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Histórico -->
    <MachineHistoryModal
      v-if="showHistoryModal"
      :machine="selectedMachine"
      @close="showHistoryModal = false"
    />

    <!-- Modal de Agendamento -->
    <MaintenanceModal
      v-if="showScheduleModal"
      :maintenance="newMaintenance"
      @close="closeScheduleModal"
      @save="saveScheduledMaintenance"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useMaintenanceStore } from '../store'
import MachineHistoryModal from '../components/MachineHistoryModal.vue'
import MaintenanceModal from '../components/MaintenanceModal.vue'

export default {
  name: 'Maquinas',
  components: {
    MachineHistoryModal,
    MaintenanceModal
  },
  
  setup() {
    const store = useMaintenanceStore()
    const showHistoryModal = ref(false)
    const showScheduleModal = ref(false)
    const selectedMachine = ref(null)
    const newMaintenance = ref(null)
    
    const updateMachineStatus = (machineId, newStatus) => {
      const machine = store.machines.find(m => m.id === machineId)
      if (machine) {
        machine.status = newStatus
      }
    }
    
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('pt-BR')
    }
    
    const getNextMaintenanceDate = (machineId) => {
      const nextMaintenance = store.scheduledMaintenances
        .filter(m => m.machineId === machineId)
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0]
      
      return nextMaintenance ? formatDate(nextMaintenance.date) : 'Não agendada'
    }
    
    const viewMachineHistory = (machine) => {
      selectedMachine.value = machine
      showHistoryModal.value = true
    }
    
    const scheduleMaintenance = (machine) => {
      newMaintenance.value = {
        machineId: machine.id,
        machine: machine.name,
        sector: machine.sector,
        status: 'Agendada',
        type: 'Preventiva'
      }
      showScheduleModal.value = true
    }
    
    const closeScheduleModal = () => {
      showScheduleModal.value = false
      newMaintenance.value = null
    }
    
    const saveScheduledMaintenance = (maintenanceData) => {
      store.addMaintenance(maintenanceData)
      closeScheduleModal()
    }
    
    return {
      store,
      showHistoryModal,
      showScheduleModal,
      selectedMachine,
      newMaintenance,
      updateMachineStatus,
      formatDate,
      getNextMaintenanceDate,
      viewMachineHistory,
      scheduleMaintenance,
      closeScheduleModal,
      saveScheduledMaintenance
    }
  }
}
</script>