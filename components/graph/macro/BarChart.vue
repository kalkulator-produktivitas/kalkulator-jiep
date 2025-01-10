<template>
  <div class="flex flex-col relative bg-white rounded-xl border border-slate-200 duration-300 w-full">
    <div class="flex justify-between px-3 pt-2 bg-gradient-to-r rounded-t-xl">
      <p class="font-bold text-md ml-2 text-[#034EA2]">{{ title }}</p>
    </div>
    <div class="">
      <Bar :options="chartOptions" :data="chartData" />
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

const props = defineProps(['title', 'chartData', 'ribuan'])

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false, // Hides the legend
    },
    title: {
      display: true,
      font: {
        size: 16,
        weight: "bold",
      },
      color: "#003366",
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Hides vertical grid lines
      },
      ticks: {
        color: "#666666",
      },
    },
    y: {
      grid: {
        display: false, // Hides vertical grid lines
      },
      ticks: {
        callback: function (value) {
          return props.ribuan ? `${value / 1000}k` : value;
        },
        color: "#666666",
      },
    },
  },
}

</script>

<style scoped></style>