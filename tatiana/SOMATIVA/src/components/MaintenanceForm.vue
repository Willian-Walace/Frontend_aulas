<template>
  <div class="bg-white shadow-md rounded-2xl p-6">
    <h2 class="text-xl font-semibold mb-4">Registrar Manutenção</h2>
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <input v-model="form.machine" type="text" placeholder="Máquina" class="p-2 border rounded-lg" required />
      <input v-model="form.date" type="date" class="p-2 border rounded-lg" required />
      <select v-model="form.status" class="p-2 border rounded-lg">
        <option value="Pendente">Pendente</option>
        <option value="Concluído">Concluído</option>
        <option value="Atrasado">Atrasado</option>
      </select>
      <textarea v-model="form.notes" placeholder="Observações" class="p-2 border rounded-lg"></textarea>
      <button type="submit" class="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Salvar</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue"

const form = reactive({
  machine: "",
  date: "",
  status: "Pendente",
  notes: ""
})

const emit = defineEmits(["add"])

function submitForm() {
  emit("add", { ...form })
  form.machine = ""
  form.date = ""
  form.status = "Pendente"
  form.notes = ""
}
</script>
