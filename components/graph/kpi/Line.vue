<template>
  <div class="flex flex-col shadow-md rounded-md border border-gray-100">
    <div class="p-1.5 flex ">
      <form class="w-[50%] ">
        <label for="underline_select" class="sr-only"></label>
        <select id="underline_select" v-model="label" @change="reaction++"
          class="py-1 px-4 w-full text-lg font-bold text-black bg-transparent rounded-lg border-2 border-gray-100 dark:text-black peer shadow hover:border-gray-300">
          <option v-for="title of Object.keys(dataset)" class="text-sm" :value="title">{{ title }}</option>
        </select>
      </form>
    </div>
    <div class="px-4">
      <Line :options="lineOptions" :key="reaction" :data="dataset[label]" />
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

const reaction = ref(0)

const label = ref("Capaian Target")

const unit = computed(() => {
  let units = ''
  if (label.value === 'Capaian Target' || label.value === 'Produk tidak Reject') {
    units = 'Persen'
  } else if (label.value === 'Waktu Produksi') {
    units = 'Unit / Detik'
  } else if (label.value === 'Material Produksi') {
    units = 'Unit / Kg'
  } else {
    units = 'Skor'
  }
  return units
})

const lineOptions = ref({
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
      title: {
        display: true,
        text: unit
      }
    }
  }
})

</script>

<style scoped></style>