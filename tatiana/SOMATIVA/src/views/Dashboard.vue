<template>
  <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
    <KpiCard title="Máquinas Ativas" :value="12" />
    <KpiCard title="Pendentes" :value="5" />
    <KpiCard title="Concluídas" :value="20" />
  </div>
</template>

<script setup>
import KpiCard from "../components/KpiCard.vue"
</script>

