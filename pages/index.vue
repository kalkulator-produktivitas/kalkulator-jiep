<template>

  <div class="w-full flex text-center">
    <div class="mt-[15%] mx-auto">
      <p class="text-4xl font-bold mb-4">Navigasi</p>
      <div class="flex flex-col">
        <button @click="navigateTo('/perusahaan')"
          class="mx-auto my-2 w-80 border border-blue-600 hover:bg-blue-500 hover:text-white rounded-md transition font-medium">Produktivitas
          Input</button>
        <button @click="navigateTo('/perusahaan/dashboard')"
          class="mx-auto my-2 w-80 border border-blue-600 hover:bg-blue-500 hover:text-white rounded-md transition font-medium">Produktivitas
          Dashboard</button>
        <button @click="navigateTo('/karyawan')"
          class="mx-auto my-2 w-80 border border-blue-600 hover:bg-blue-500 hover:text-white rounded-md transition font-medium">KPI
          Input</button>
        <button @click="navigateTo('/karyawan/dashboard')"
          class="mx-auto my-2 w-80 border border-blue-600 hover:bg-blue-500 hover:text-white rounded-md transition font-medium">KPI
          Dashboard</button>
      </div>
    </div>
  </div>

</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
});


</script>

<style scoped></style>