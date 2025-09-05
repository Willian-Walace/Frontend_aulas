<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1 class="font-bold text-lg">SMPM</h1>
    <ul class="flex gap-4">
      <li><RouterLink to="/" class="hover:underline">Dashboard</RouterLink></li>
      <li><RouterLink to="/calendar" class="hover:underline">Calendário</RouterLink></li>
      <li><RouterLink to="/maintenance" class="hover:underline">Manutenções</RouterLink></li>
    </ul>
  </nav>
</template>
