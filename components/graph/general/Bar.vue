<template>
  <div class="flex flex-col relative rounded-lg shadow-lg border border-gray-100">
    <div class="flex justify-between p-1 bg-transparent">
      <p class="font-bold text-lg ml-2 text-black">{{ title }}</p>
      <button class="px-3 py-1 bg-[#034EA2] border-2 border-white rounded-full text-white text-sm font-bold"
        @mouseover="showTooltip = true" @mouseout="showTooltip = false">
        Legend
      </button>
    </div>
    <div class="my-auto p-4">
      <Bar :options="chartOptions" :data="dataset" />
    </div>
    <div v-if="showTooltip" class="absolute top-[32px] right-0 bg-gray-700/[.85] border text-white p-2">
      <div v-for="(dat, index) in dataset.datasets" :key="index" class="flex items-center">
        <div :style="{ 'background-color': dat.backgroundColor }" class="w-[20px] h-[15px]"></div>
        <p class="ml-2">{{ dat["label"] }}</p>
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