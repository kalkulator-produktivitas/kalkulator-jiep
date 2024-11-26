<template>
  <div class="flex flex-col relative rounded-lg shadow-md border border-gray-100">
    <div class="flex justify-between pt-4 bg-transparent">
      <div class="w-[80%] pl-4 flex">
        <p class="my-auto mr-2">Departemen</p>
        <label for="underline_select" class="sr-only"></label>
        <select id="underline_select" v-model="selectedDept"
          class="px-2 block text-center text-md text-gray-800 bg-transparent border border-gray-400 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-600 peer">
          <option v-for="dept of deptList" :key="dept" class="text-sm">{{ dept }}</option>
        </select>
      </div>
      <div class="w-[15%] flex">
        <p class="my-auto mr-2">Tahun</p>
        <label for="underline_select" class="sr-only"></label>
        <select id="underline_select" v-model="selectedYear"
          class="px-2 block text-center text-md text-gray-800 bg-transparent border border-gray-400 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-600 peer">
          <option v-for="tahun of years" :key="tahun" class="text-sm">{{ tahun }}</option>
        </select>
      </div>
    </div>
    <div class="my-auto p-4">
      <Bar :options="chartOptions" :data="dataset" />
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

const props = defineProps(['dataset', 'title', 'years'])

let deptList = computed(() => {
  return (Array.from(new Set(props.dataset.map(x => x.Departemen))))
})

let selectedYear = ref(props.years.reverse()[2])

let selectedDept = ref(deptList.value[0])

const setDept = (() => {
  selectedDept.value = (Array.from(new Set(props.dataset.map(x => x.Departemen))))[0]
})

setDept()

let dataset = computed(() => {
  let filterData = props.dataset.filter(x => x.Departemen === selectedDept.value)
  let yearData = filterData.map(x => x[String(selectedYear.value)].length > 0 ? parseFloat(x[String(selectedYear.value)]) : null)
  let karyawanData = filterData.map(x => x.Karyawan)
  return {
    labels: karyawanData,
    datasets: [{
      backgroundColor: '#0047AB',
      data: yearData
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1.2,
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