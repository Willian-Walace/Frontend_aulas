import { createRouter, createWebHistory } from "vue-router"

// Views
import Dashboard from "../views/Dashboard.vue"
import CalendarView from "../views/CalendarView.vue"
import MaintenanceList from "../views/MaintenanceList.vue"
import MaintenanceDetail from "../views/MaintenanceDetail.vue"


const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/calendar", name: "Calendar", component: CalendarView },
  { path: "/maintenance", name: "MaintenanceList", component: MaintenanceList },
  { path: "/maintenance/:id", name: "MaintenanceDetail", component: MaintenanceDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
