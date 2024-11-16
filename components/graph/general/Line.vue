<template>
  <div class="flex flex-col shadow-lg rounded-lg border border-gray-100">
    <div class="p-1.5 flex ">
      <form class="w-[50%] ">
        <label for="underline_select" class="sr-only"></label>
        <select id="underline_select" v-model="label"
          class="py-1 px-4 w-full text-lg font-bold text-black bg-transparent rounded-lg border-2 border-gray-100 dark:text-black peer shadow hover:border-gray-300">
          <option v-for="title of props.title" class="text-sm">{{ title }}</option>
        </select>
      </form>
    </div>
    <div class="my-auto px-4">
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
  aspectRatio: 1.2,
  plugins: {
    legend: {
      display: false,
    }
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Rupiah'
      }
    }
  }
}

const label = ref("Produktivitas")



</script>

<style scoped></style>