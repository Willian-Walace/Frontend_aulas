<template>
  <aside class="w-64 h-screen bg-gray-900 text-white p-6 fixed">
    <h2 class="text-xl font-bold mb-6">Menu</h2>
    <ul class="flex flex-col gap-4">
      <li><RouterLink to="/" class="hover:text-blue-400">📊 Dashboard</RouterLink></li>
      <li><RouterLink to="/calendar" class="hover:text-blue-400">📅 Calendário</RouterLink></li>
      <li><RouterLink to="/maintenance" class="hover:text-blue-400">🛠️ Manutenções</RouterLink></li>
    </ul>
  </aside>
</template>
