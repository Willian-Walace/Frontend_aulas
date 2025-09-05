<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="bg-white p-6 rounded-2xl shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
      <div>
        <slot />
      </div>
      <div class="mt-4 flex justify-end gap-2">
        <button @click="$emit('close')" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancelar</button>
        <button @click="$emit('confirm')" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String
})
defineEmits(["close", "confirm"])
</script>
