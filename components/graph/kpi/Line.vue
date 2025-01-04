<template>
  <div class="flex flex-col bg-white rounded-xl shadow-lg border border-gray-200/50 ">
    <div class="bg-gradient-to-r from-blue-100 to-blue-50 p-3">
      <h2 class="text-lg font-semibold text-gray-800">Pertumbuhan KPI Karyawan</h2>
    </div>
    <div class="flex gap-4 p-3">
      <div class="w-[20%] h-full my-auto">
        <select id="karyawan-select" v-model="selectedKaryawanIds" multiple class="w-full h-[100%] px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                 transition-all duration-200">
          <option v-for="karyawan in karyawanList" :key="karyawan.No" :value="karyawan.No">
            {{ karyawan.Karyawan }}
          </option>
        </select>
      </div>
      <div class="flex-1 h-[240px]">
        <Line :options="lineOptions" :key="reaction" :data="lineData" />
      </div>
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

import { DistinctColors } from '~/assets/helpers/colors'

const props = defineProps(['dataset', 'title', 'years'])

// let karyawanList = computed(() => {
//   return (Array.from(new Set(props.dataset.map(x => x.No))))
// })

let listOfYears = props.years.reverse()
// let selectedYear = ref(props.years.reverse()[2])
// let selectedKaryawan = computed(() => {
//   return karyawanList.value
// })

const karyawanList = computed(() => {
  let listKaryawan = props.dataset.map(x => (x))
  return listKaryawan
});

const selectedKaryawanIds = ref(props.dataset.map(x => x.No));
// Computed value to return only selected karyawan details
const selectedKaryawanDetails = computed(() =>
  karyawanList.value.filter((karyawan) =>
    selectedKaryawanIds.value.includes(karyawan.No)
  )
);

const reaction = ref(0)

const colors = [
  "#2F4F4F", // Dark Slate Gray
  "#556B2F", // Dark Olive Green
  "#8B4513", // Saddle Brown
  "#6B8E23", // Olive Drab
  "#4682B4", // Steel Blue
  "#708090", // Slate Gray
  "#B0C4DE", // Light Steel Blue
  "#D2B48C", // Tan
  "#A0522D", // Sienna
  "#C0C0C0", // Silver
  "#CD853F", // Peru
  "#BC8F8F", // Rosy Brown
  "#8B0000", // Dark Red
  "#800000", // Maroon
  "#808000", // Olive
  "#228B22", // Forest Green
  "#5F9EA0", // Cadet Blue
  "#2E8B57", // Sea Green
  "#A9A9A9", // Dark Gray
  "#8FBC8F", // Dark Sea Green
  "#696969", // Dim Gray
  "#B8860B", // Dark Goldenrod
  "#4682B4", // Steel Blue
  "#A52A2A", // Brown
  "#6A5ACD", // Slate Blue
];

const lineData = computed(() => {
  let final = {
    labels: props.years,
    datasets: []
  }
  for (let kar of selectedKaryawanDetails.value) {
    let data = {
      label: kar.Karyawan,
      backgroundColor: DistinctColors[props.dataset.indexOf(kar)],
      borderColor: DistinctColors[props.dataset.indexOf(kar)],
      data: [],
    }
    for (let y of props.years) {
      if (kar[String(y)].length > 0) {
        data.data.push(kar[String(y)])
      } else {
        data.data.push(null)
      }
    }
    final.datasets.push(data)
  }
  return final
})


const lineOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      display: true,
      align: 'start',
      position: 'right',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          size: 11,
          family: "'Inter', sans-serif" // Add Inter font for better typography
        },
        usePointStyle: true, // Makes legend markers circular
        pointStyle: 'circle'
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
      },
      grid: {
        color: 'rgba(0,0,0,0.05)' // Lighter grid lines
      }
    },
    x: {
      grid: {
        display: false // Remove vertical grid lines
      }
    }
  }
})

</script>

<style scoped>
/* Optional: Add if you want to use Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
</style>