<template>
  <div class="bg-white rounded-xl shadow-md border border-gray-200 transition-all hover:shadow-lg">
    <div class="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50">
      <div class="flex flex-row justify-between my-auto">
        <h3 class="font-semibold text-lg text-gray-800 my-1.5">{{ title }}</h3>
        <h5 class="font-semibold text-lg text-gray-800 my-1.5"> {{ year }} </h5>
      </div>
    </div>
    <div class="px-4 pb-4">
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



defineProps(['dataset', 'config', 'title', 'year'])
</script>

<style scoped></style>