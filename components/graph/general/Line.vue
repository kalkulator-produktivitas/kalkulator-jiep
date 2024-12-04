<template>
  <div class="flex flex-col shadow-lg rounded-lg border border-gray-100 bg-white">
    <div class=" bg-gray-50 rounded-t-lg">
      <form class="w-full">
        <label for="underline_select" class="sr-only"></label>
        <select id="underline_select" v-model="label"
          class="py-2 px-2 w-full text-lg font-bold text-black bg-gradient-to-r from-blue-100 to-blue-50 rounded-t-lg  border-gray-200 dark:text-black peer hover:border-gray-300 focus:outline-none">
          <option v-for="title of props.title" :key="title" class="text-sm">{{ title }}</option>
        </select>
      </form>
    </div>
    <div class="my-auto px-4 py-2">
      <Line :options="lineOptions" :data="dataset[label]" />
    </div>
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ref } from 'vue';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps(['dataset', 'config', 'title'])

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    }
  },
  scales: {
    y: {
      grid: {
        color: '#f0f0f0',
        drawBorder: false,
      },
      border: {
        display: false,
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 12
        },
        color: '#64748b',
        padding: 8
      },
      title: {
        display: true,
        text: 'Rupiah',
        font: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: '500'
        },
        color: '#334155',
        padding: 16
      }
    },
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 12
        },
        color: '#64748b',
        padding: 8
      }
    }
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
      borderColor: '#3b82f6',
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.1)'
    },
    point: {
      radius: 4,
      borderWidth: 2,
      backgroundColor: '#ffffff',
      borderColor: '#3b82f6',
      hoverRadius: 6,
      hoverBorderWidth: 3
    }
  }
}

const label = ref("Nilai Tambah")



</script>

<style scoped></style>