<template>
  <div
    class="flex flex-col relative bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div
      class="flex justify-between p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-t-xl border-b border-gray-100">
      <p class="font-bold text-md ml-2 text-gray-800">{{ title }}</p>
      <button
        class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg text-white text-sm font-medium shadow-sm hover:shadow-md"
        @mouseover="showTooltip = true" @mouseout="showTooltip = false">
        Legend
      </button>
    </div>
    <div class="my-auto p-6">
      <Bar :options="chartOptions" :data="dataset" />
    </div>
    <div v-if="showTooltip"
      class="absolute top-[48px] right-4 bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-700 p-3 rounded-lg shadow-xl">
      <div v-for="(dat, index) in dataset.datasets" :key="index"
        class="flex items-center py-1 hover:bg-gray-50 rounded px-2">
        <div :style="{ 'background-color': dat.backgroundColor }" class="w-[24px] h-[16px] rounded"></div>
        <p class="ml-3 text-sm">{{ dat["label"] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { ref } from 'vue';
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
const showTooltip = ref(false)

defineProps(['dataset', 'title'])

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 2.4,
  plugins: {
    legend: {
      display: false,
    }
  },
  scales: {
    x: {
      border: {
        display: false
      },
      grid: {
        display: true,
        drawOnChartArea: false,
        drawTicks: false,
      }
    },
    y: {
      border: {
        display: false
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: false
      }
    }
  }
}
</script>

<style scoped></style>