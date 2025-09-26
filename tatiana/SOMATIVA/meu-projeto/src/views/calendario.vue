<template>
  <div class="space-y-6">
    <!-- Header com controles -->
    <div class="p-6 bg-gray-800 border border-gray-700 rounded-2xl">
      <div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 class="mb-1 text-2xl font-bold text-white">{{ currentMonthYear }}</h2>
          <p class="text-sm text-gray-400">Visualização de Agenda</p>
        </div>
        
        <div class="flex items-center gap-3">
          <button
            @click="previousMonth"
            class="px-4 py-2 text-white transition-colors bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            ← Anterior
          </button>
          <button
            @click="goToToday"
            class="px-6 py-2 font-medium text-white transition-all rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
          >
            Hoje
          </button>
          <button
            @click="nextMonth"
            class="px-4 py-2 text-white transition-colors bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            Próximo →
          </button>
        </div>
      </div>
      
      <!-- Legenda horizontal -->
      <div class="flex flex-wrap gap-6 pt-4 mt-6 border-t border-gray-700">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-green-500 rounded"></div>
          <span class="text-sm text-gray-300">Concluída</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-cyan-500"></div>
          <span class="text-sm text-gray-300">Em Andamento</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-yellow-500 rounded"></div>
          <span class="text-sm text-gray-300">Pendente</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-purple-500 rounded"></div>
          <span class="text-sm text-gray-300">Agendada</span>
        </div>
      </div>
    </div>

    <!-- Calendário em grade moderna -->
    <div class="overflow-hidden bg-gray-800 border border-gray-700 rounded-2xl">
      <!-- Dias da semana -->
      <div class="grid grid-cols-7 border-b border-gray-700 bg-gray-700/50">
        <div 
          v-for="day in dayNames" 
          :key="day"
          class="p-4 text-sm font-bold tracking-wide text-center uppercase text-cyan-400"
        >
          {{ day }}
        </div>
      </div>
      
      <!-- Dias do mês -->
      <div class="grid grid-cols-7">
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index"
          class="min-h-[120px] border-r border-b border-gray-700 p-3 transition-all hover:bg-gray-700/30"
          :class="{
            'bg-gray-700/20': !day.isCurrentMonth,
            'bg-cyan-900/20': day.isToday
          }"
          @click="selectDay(day)"
        >
          <!-- Número do dia com badge -->
          <div class="flex items-start justify-between mb-2">
            <span 
              class="inline-flex items-center justify-center w-8 h-8 text-sm font-bold transition-colors rounded-lg"
              :class="{
                'text-gray-600': !day.isCurrentMonth,
                'bg-gradient-to-br from-cyan-500 to-blue-500 text-white': day.isToday,
                'text-white': day.isCurrentMonth && !day.isToday
              }"
            >
              {{ day.day }}
            </span>
            <span 
              v-if="day.maintenances.length > 0"
              class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full bg-cyan-500"
            >
              {{ day.maintenances.length }}
            </span>
          </div>
          
          <!-- Manutenções do dia como chips -->
          <div class="space-y-1">
            <div 
              v-for="maintenance in day.maintenances.slice(0, 2)" 
              :key="maintenance.id"
              class="px-2 py-1 text-xs font-medium truncate transition-transform rounded cursor-pointer hover:scale-105"
              :class="getMaintenanceChipStyle(maintenance.status)"
              @click.stop="viewMaintenance(maintenance)"
            >
              {{ maintenance.machine }}
            </div>
            <div 
              v-if="day.maintenances.length > 2"
              class="px-2 text-xs text-gray-400"
            >
              +{{ day.maintenances.length - 2 }} mais
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista lateral de manutenções do dia selecionado -->
    <div v-if="selectedDayMaintenances.length > 0" class="p-6 bg-gray-800 border border-gray-700 rounded-2xl">
      <h3 class="mb-4 text-lg font-bold text-white">
        📅 {{ formatSelectedDate }}
      </h3>
      
      <div class="space-y-3">
        <div 
          v-for="maintenance in selectedDayMaintenances" 
          :key="maintenance.id"
          class="p-4 transition-colors border border-gray-600 cursor-pointer bg-gray-700/50 rounded-xl hover:border-cyan-500"
          @click="viewMaintenance(maintenance)"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center space-x-3">
              <div 
                class="w-3 h-3 rounded-full"
                :class="getStatusDot(maintenance.status)"
              ></div>
              <div>
                <h4 class="font-semibold text-white">{{ maintenance.machine }}</h4>
                <p class="text-sm text-gray-400">{{ maintenance.description }}</p>
              </div>
            </div>
            
            <span 
              class="px-3 py-1 text-xs font-medium rounded-lg"
              :class="getStatusBadge(maintenance.status)"
            >
              {{ maintenance.status }}
            </span>
          </div>
          
          <div class="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>👤 {{ maintenance.technician }}</span>
            <span>🏭 {{ maintenance.sector }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Visualização -->
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
import ViewMaintenanceModal from '../components/ViewMaintenanceModal.vue'

export default {
  name: 'Calendario',
  components: {
    ViewMaintenanceModal
  },
  
  setup() {
    const store = useMaintenanceStore()
    const currentDate = ref(new Date())
    const selectedDate = ref(null)
    const showViewModal = ref(false)
    const selectedMaintenance = ref(null)
    
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    
    const currentMonthYear = computed(() => {
      return currentDate.value.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
      })
    })
    
    const formatSelectedDate = computed(() => {
      if (!selectedDate.value) return ''
      return selectedDate.value.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    })
    
    const calendarDays = computed(() => {
      const year = currentDate.value.getFullYear()
      const month = currentDate.value.getMonth()
      
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      
      const startDate = new Date(firstDay)
      startDate.setDate(startDate.getDate() - firstDay.getDay())
      
      const endDate = new Date(lastDay)
      endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))
      
      const days = []
      const currentDateLoop = new Date(startDate)
      
      while (currentDateLoop <= endDate) {
        const day = {
          date: new Date(currentDateLoop),
          day: currentDateLoop.getDate(),
          isCurrentMonth: currentDateLoop.getMonth() === month,
          isToday: isToday(currentDateLoop),
          maintenances: getMaintenancesForDate(currentDateLoop)
        }
        
        days.push(day)
        currentDateLoop.setDate(currentDateLoop.getDate() + 1)
      }
      
      return days
    })
    
    const selectedDayMaintenances = computed(() => {
      if (!selectedDate.value) return []
      return getMaintenancesForDate(selectedDate.value)
    })
    
    const isToday = (date) => {
      const today = new Date()
      return date.toDateString() === today.toDateString()
    }
    
    const getMaintenancesForDate = (date) => {
      const dateStr = date.toISOString().split('T')[0]
      return store.allMaintenances.filter(m => m.date === dateStr)
    }
    
    const getMaintenanceChipStyle = (status) => {
      const styles = {
        'Concluída': 'bg-green-500 text-white',
        'Pendente': 'bg-yellow-500 text-white',
        'Em Andamento': 'bg-cyan-500 text-white',
        'Agendada': 'bg-purple-500 text-white'
      }
      return styles[status] || 'bg-gray-500 text-white'
    }
    
    const getStatusDot = (status) => {
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
        'Concluída': 'bg-green-500/20 text-green-400',
        'Pendente': 'bg-yellow-500/20 text-yellow-400',
        'Em Andamento': 'bg-cyan-500/20 text-cyan-400',
        'Agendada': 'bg-purple-500/20 text-purple-400'
      }
      return badges[status] || 'bg-gray-500/20 text-gray-400'
    }
    
    const previousMonth = () => {
      currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
    }
    
    const nextMonth = () => {
      currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
    }
    
    const goToToday = () => {
      currentDate.value = new Date()
      selectedDate.value = new Date()
    }
    
    const selectDay = (day) => {
      selectedDate.value = day.date
    }
    
    const viewMaintenance = (maintenance) => {
      selectedMaintenance.value = maintenance
      showViewModal.value = true
    }
    
    onMounted(() => {
      selectedDate.value = new Date()
    })
    
    return {
      currentDate,
      selectedDate,
      showViewModal,
      selectedMaintenance,
      dayNames,
      currentMonthYear,
      formatSelectedDate,
      calendarDays,
      selectedDayMaintenances,
      getMaintenanceChipStyle,
      getStatusDot,
      getStatusBadge,
      previousMonth,
      nextMonth,
      goToToday,
      selectDay,
      viewMaintenance
    }
  }
}
</script>