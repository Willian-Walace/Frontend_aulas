
<template>
  <section>
    <h2>Maquinas ({{ store.totalMaquinas }})</h2>

    <UserForm
      v-if="!editing"
      @submit="store.addMaquina"
      :submitting="store.loading"
    />

    <UserForm
      v-else
      :initial="editing"
      :submitting="store.loading"
      @submit="(payload) => { store.updateMaquina(editing._id, payload); editing=null; }"
      @cancel="cancelEdit"
      edit
    />
  
    <p v-if="store.error" style="color:#b00020">{{ store.error }}</p>

    <UserList :maquinas="store.maquinas" @edit="edit" @remove="store.removeMaquina" />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMaquinaStore } from "../stores/maquina.js";
import UserForm from "../components/UserForm.vue";
import UserList from "../components/UserList.vue";

const store = useMaquinaStore();
const editing = ref(null);

onMounted(() => {
  store.fetchMaquinas();
});

function edit(user) {
  editing.value = { ...user };
}

function cancelEdit() {
  editing.value = null;
}
</script>


