<template>
  <div class="p-6 flex flex-col gap-6">
    <MaintenanceForm @add="addMaintenance" />
    <MaintenanceTable :items="store.list" />
  </div>
</template>

<script setup>
import { useMaintenanceStore } from "../store/maintenance"
import MaintenanceForm from "../components/MaintenanceForm.vue"
import MaintenanceTable from "../components/MaintenanceTable.vue"

const store = useMaintenanceStore()

function addMaintenance(item) {
  store.addMaintenance(item)
}
</script>
