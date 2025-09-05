<template>
  <div class="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center">
    <h3 class="text-lg font-semibold text-gray-600">{{ title }}</h3>
    <p class="text-3xl font-bold text-blue-600 mt-2">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number]
})
</script>
