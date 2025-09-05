import { defineStore } from "pinia"

export const useMaintenanceStore = defineStore("maintenance", {
  state: () => ({
    list: [
      { id: 1, machine: "Torno CNC", date: "2025-09-05", status: "Pendente", notes: "Trocar óleo" },
      { id: 2, machine: "Prensa Hidráulica", date: "2025-09-10", status: "Concluído", notes: "Revisão geral" }
    ]
  }),
  actions: {
    addMaintenance(item) {
      item.id = this.list.length + 1
      this.list.push(item)
    },
    getById(id) {
      return this.list.find(m => m.id === parseInt(id))
    }
  }
})
