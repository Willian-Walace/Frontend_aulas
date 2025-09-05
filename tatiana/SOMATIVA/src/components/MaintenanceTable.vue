<template>
  <div class="bg-white shadow-md rounded-2xl p-6">
    <h2 class="text-xl font-semibold mb-4">Lista de Manutenções</h2>
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th class="p-2">Máquina</th>
          <th class="p-2">Data</th>
          <th class="p-2">Status</th>
          <th class="p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-100">
          <td class="p-2">{{ item.machine }}</td>
          <td class="p-2">{{ item.date }}</td>
          <td class="p-2">
            <span 
              class="px-2 py-1 rounded text-sm font-semibold"
              :class="{
                'bg-green-200 text-green-800': item.status === 'Concluído',
                'bg-yellow-200 text-yellow-800': item.status === 'Pendente',
                'bg-red-200 text-red-800': item.status === 'Atrasado'
              }"
            >
              {{ item.status }}
            </span>
          </td>
          <td class="p-2">
            <RouterLink 
              :to="`/maintenance/${item.id}`" 
              class="text-blue-600 hover:underline">
              Detalhes
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
