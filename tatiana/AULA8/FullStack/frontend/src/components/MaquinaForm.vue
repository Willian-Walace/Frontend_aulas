<template>
  <form @submit.prevent="onSubmit" style="display:grid; gap:0.5rem; margin:1rem 0">
    <input v-model="state.maquina" placeholder="Nome" required />
    <input v-model="state.email" placeholder="Email" type="email" required />
    <select v-model="state.role">
      <option value="maquina">maquina</option>
      <option value="admin">admin</option>
    </select>
    <div style="display:flex; gap:0.5rem">
      <button :disabled="submitting">{{ edit ? "Salvar" : "Adicionar" }}</button>
      <button v-if="edit" type="button" @click="$emit('cancel')">Cancelar</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, toRefs, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  initial: { type: Object, default: null },
  submitting: { type: Boolean, default: false },
  edit: { type: Boolean, default: false }
});
const emit = defineEmits(["submit", "cancel"]);

const state = reactive({
  name: "",
  email: "",
  role: "maquina"
});

watch(() => props.initial, (val) => {
  if (val) {
    state.name = val.name || "";
    state.email = val.email || "";
    state.role = val.role || "maquina";
  } else {
    state.name = ""; state.email = ""; state.role = "maquina";
  }
}, { immediate: true });

function onSubmit() {
  emit("submit", { name: state.name, email: state.email, role: state.role });
}
</script>
