<template>
  <div class="overflow-none rounded-lg shadow-lg border border-gray-100">
    <div class="p-1 bg-transparent ">
      <p class="font-bold text-md text-black text-center ml-2">{{ title }}</p>
    </div>
    <div class="mt-2 p-2">
      <Doughnut :options="config" :data="dataset" />
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend)



defineProps(['dataset', 'config', 'title'])
</script>

<style scoped></style>