<template>
  <div class="flex flex-col relative rounded-lg shadow-lg border border-gray-100">
    <div class="flex justify-between pt-4 bg-transparent">
      <div class="w-[80%] pl-4">
        <label for="underline_select" class="sr-only"></label>
        <select id="underline_select" v-model="selectedDept"
          class="block py-1 text-center text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-600 peer">
          <option v-for="dept of deptList" class="text-sm">{{ dept }}</option>
        </select>
      </div>
      <div class="w-[10%]">
        <label for="underline_select" class="sr-only"></label>
        <select id="underline_select" v-model="selectedYear"
          class="block py-1 text-center text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-600 peer">
          <option v-for="tahun of years" class="text-sm">{{ tahun }}</option>
        </select>
      </div>
    </div>
    <div class="my-auto p-4">
      <Bar :options="chartOptions" :data="dataset" />

    </div>

    <!-- <div v-if="showTooltip" class="absolute top-[32px] right-0 bg-gray-700/[.85] border text-white p-2">
      <div v-for="(dat, index) in dataset.datasets" :key="index" class="flex items-center">
        <div :style="{ 'background-color': dat.backgroundColor }" class="w-[20px] h-[15px]"></div>
        <p class="ml-2">{{ dat["label"] }}</p>
      </div>
    </div> -->
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

let deptList = ref(Array.from(new Set(props.dataset.map(x => x.Departemen))))

let selectedYear = ref(props.years.reverse()[2])

let selectedDept = ref(deptList.value[0])

let dataset = computed(() => {
  let filterData = props.dataset.filter(x => x.Departemen === selectedDept.value)
  let yearData = filterData.map(x => x[String(selectedYear.value)])
  let karyawanData = filterData.map(x => x.Karyawan)
  return {
    labels: karyawanData,
    datasets: [{
      backgroundColor: '#0047AB',
      data: yearData.map(Number)
    }]
  }
})

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