<template>
  <div
    class="bg-white rounded-xl shadow-lg border border-gray-100 relative hover:shadow-xl transition-shadow duration-300">
    <div class="flex justify-between items-center mb-6 bg-gradient-to-r p-3 from-blue-100 to-blue-50">
      <div class="space-y-1">
        <h3 class="font-semibold text-gray-800 text-lg">Average KPI</h3>
        <p class="text-gray-600 font-medium">{{ title }}</p>
      </div>

      <select v-model="selectedYear"
        class="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 outline-none">
        <option v-for="tahun of years" :key="tahun">{{ tahun }}</option>
      </select>
    </div>

    <div class="mt-2">
      <Doughnut :options="pieOptions" :data="calculatedData" />
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
import { DistinctColors } from '~/assets/helpers/colors';
ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps(['dataset', 'title', 'years'])

let selectedYear = ref(props.years.reverse()[2])
let deptList = computed(() => {
  return (Array.from(new Set(props.dataset.map(x => x.Departemen))))
})

function calculateYearAverage(data, th) {
  let total = 0;
  let count = 0;

  data.forEach(item => {
    const value = parseFloat(item[th]); // Parse the value to float
    if (!isNaN(value)) { // Check if the value is a valid number
      total += value;
      count++;
    }
  });
  let average = count > 0 ? (total / count).toFixed(2) : 0
  let sisa = count > 0 ? (110 - (total / count).toFixed(2)) : 0
  return {
    label: '',
    backgroundColor: [DistinctColors[3], '#cccccc'],
    data: [parseFloat(average), sisa]
  } // Return the average, rounded to 2 decimals
}

let calculatedData = computed(() => {
  let finalData = []
  for (let dep of deptList.value) {
    let filtered = props.dataset.filter(x => x.Departemen === dep)
    let appendData = calculateYearAverage(filtered, String(selectedYear.value))
    appendData.label = dep
    finalData.push(appendData)
  }
  return {
    labels: ["Capaian"],
    datasets: finalData
  }
})


const pieOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      align: 'center',
      labels: {
        boxWidth: 12,
        padding: 15,
        usePointStyle: true,
        font: {
          size: 11,
          family: "'Inter', sans-serif"
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 13,
        weight: 'bold'
      },
      bodyFont: {
        size: 12
      }
    }
  },
}



</script>

<style scoped></style>