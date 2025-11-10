<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">
          {{ isEditing ? 'Editar Manutenção' : 'Nova Manutenção' }}
        </h2>
      </div>
      
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">
            Máquina *
          </label>
          <select 
            v-model="form.machineId"
            @change="updateMachine"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma máquina</option>
            <option 
              v-for="machine in store.machines" 
              :key="machine._id || machine.id" 
              :value="machine._id || machine.id"
            >
              {{ machine.name }} - {{ machine.sector }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">
            Data *
          </label>
          <input 
            v-model="form.date"
            type="date"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">
            Técnico *
          </label>
          <input 
            v-model="form.technician"
            type="text"
            required
            placeholder="Nome do técnico"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">
            Tipo *
          </label>
          <select 
            v-model="form.type"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione o tipo</option>
            <option value="Preventiva">Preventiva</option>
            <option value="Corretiva">Corretiva</option>
            <option value="Preditiva">Preditiva</option>
          </select>
        </div>
        
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">
            Status *
          </label>
          <select 
            v-model="form.status"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione o status</option>
            <option value="Agendada">🔴 Agendada</option>
            <option value="Em Andamento">🟡 Em Andamento</option>
            <option value="Concluída">🟢 Concluída</option>
          </select>
        </div>
        
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">
            Descrição *
          </label>
          <textarea 
            v-model="form.description"
            required
            rows="3"
            placeholder="Descreva a manutenção..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-600 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {{ isEditing ? 'Salvar' : 'Criar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useMaintenanceStore } from '../store'

export default {
  name: 'MaintenanceModal',
  props: {
    maintenance: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'save'],
  
  setup(props, { emit }) {
    const store = useMaintenanceStore()
    
    const form = ref({
      machineId: '',
      machineName: '',
      date: new Date().toISOString().split('T')[0],
      technician: '',
      type: '',
      status: '',
      description: '',
      sector: ''
    })
    
    const isEditing = computed(() => {
      return props.maintenance && props.maintenance.id
    })
    
    const updateMachine = () => {
      const machine = store.machines.find(m => 
        (m._id && m._id === form.value.machineId) || 
        (m.id && m.id === form.value.machineId)
      )
      
      if (machine) {
        form.value.machineName = machine.name
        form.value.sector = machine.sector
      }
    }
    
    const handleSubmit = () => {
      if (!form.value.machineId) {
        alert('Por favor, selecione uma máquina')
        return
      }
      
      // ✅ CORREÇÃO CRÍTICA: Converte data para ISO com hora do meio-dia
      // Isso evita problemas de timezone quando a data cruza meia-noite
      const dateISO = `${form.value.date}T12:00:00.000Z`
      
      const maintenanceData = {
        machine: form.value.machineId,
        machineName: form.value.machineName,
        date: dateISO,  // ✅ Envia como ISO com hora fixa
        technician: form.value.technician,
        type: form.value.type,
        status: form.value.status,
        description: form.value.description,
        sector: form.value.sector
      }
      
      console.log('💾 Enviando manutenção:', maintenanceData)
      emit('save', maintenanceData)
    }
    
    watch(() => props.maintenance, (maintenance) => {
      if (maintenance) {
        // ✅ Converte data ISO para formato YYYY-MM-DD
        let dateValue = maintenance.date
        if (dateValue) {
          dateValue = dateValue.split('T')[0]
        } else {
          dateValue = new Date().toISOString().split('T')[0]
        }
        
        form.value = {
          machineId: maintenance.machineId || maintenance.machine || '',
          machineName: maintenance.machineName || maintenance.machine || '',
          date: dateValue,
          technician: maintenance.technician || '',
          type: maintenance.type || '',
          status: maintenance.status || '',
          description: maintenance.description || '',
          sector: maintenance.sector || ''
        }
      }
    }, { immediate: true })
    
    return {
      store,
      form,
      isEditing,
      updateMachine,
      handleSubmit
    }
  }
}
</script>