<template>
  <div class="bg-white shadow-md rounded-2xl p-6">
    <h2 class="text-xl font-semibold mb-4">Calendário</h2>
    <div class="grid grid-cols-7 gap-2">
      <div 
        v-for="day in days" 
        :key="day.date" 
        class="border rounded-lg p-2 text-center cursor-pointer hover:bg-blue-100"
        :class="{
          'bg-green-200': day.status === 'concluido',
          'bg-yellow-200': day.status === 'pendente',
          'bg-red-200': day.status === 'atrasado'
        }"
      >
        <p class="font-bold">{{ day.date }}</p>
        <p class="text-sm">{{ day.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const days = [
  { date: "01", label: "Troca óleo", status: "concluido" },
  { date: "02", label: "Verif. Motor", status: "pendente" },
  { date: "03", label: "Inspeção", status: "atrasado" },
]
</script>
