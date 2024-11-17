<template>
  <div class="overflow-none rounded-lg shadow-md border border-gray-100 relative">
    <div class="p-1 bg-transparent w-[75%] h-[15%]">
      <p class="font-bold text-lg text-black ml-2">{{ title }}</p>
    </div>
    <div class="absolute top-5 right-2 flex">
      <label for="underline_select" class="sr-only"></label>
      <select id="underline_select" v-model="selectedYear"
        class="px-2 block text-center text-md text-gray-800 bg-transparent border border-gray-400 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-600 peer">
        <option v-for="tahun of years" class="text-sm">{{ tahun }}</option>
      </select>
    </div>
    <div class="mt-2 p-2">
      <Doughnut :options="pieOptions" :data="calculatedData" />
    </div>
    <!-- {{ calculatedData }} -->
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
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
    backgroundColor: ['#0047AB', '#cccccc'],
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
  aspectRatio: 1.2,
  plugins: {
    legend: {
      display: false,
      position: 'right',
      align: 'center',
      labels: {
        boxWidth: 15,
        padding: 12,
        font: {
          size: 10
        }
      }
    }
  },
}



</script>

<style scoped></style>