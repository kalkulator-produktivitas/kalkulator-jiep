<template>
  <div class="flex flex-col relative rounded-xl bg-white shadow-lg border border-gray-200/50">
    <div class="flex justify-between mb-6 bg-gradient-to-r from-blue-100 to-blue-50 py-3">
      <div class="flex items-center space-x-3 pl-6 w-full">
        <div class="w-[50%]">
          <p class="text-gray-800 font-medium">Divisi {{ props.divisi }}</p>
          <p class="text-gray-500">Jumlah Pegawai {{ pegawaiCount }}</p>
        </div>
        <div>
          <p class="text-gray-600 font-medium mb-1">Pilih Departemen</p>
          <select v-model="selectedDept"
            class="rounded-lg px-4 py-1 text-gray-700 bg-white/50 border border-blue-200 hover:border-blue-400 hover:bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option v-for="dept of deptList" :key="dept">{{ dept }}</option>
          </select>
        </div>
      </div>
      <div class="flex items-center space-x-3 pr-6">
        <p class="text-gray-600 font-medium">Tahun</p>
        <select v-model="selectedYear"
          class="rounded-lg px-4 py-2 text-gray-700 bg-white/50 border border-blue-200 hover:border-blue-400 hover:bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <option v-for="tahun of years" :key="tahun">{{ tahun }}</option>
        </select>
      </div>
    </div>
    <div class="bg-white rounded-lg p-4">
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

const props = defineProps(['dataset', 'title', 'years', 'divisi', 'pegawaiCount'])

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
  let dataLength = filterData.length


  // Create gradient colors based on data values
  const colors = yearData.map(value => {
    // You can adjust these color ranges
    if (value >= 90) return '#2563EB'      // Deep blue for highest values
    if (value >= 70) return '#464BB1'      // Medium blue
    if (value >= 50) return '#663276'      // Light blue
    if (value >= 30) return '#86193B'      // Lighter blue
    return '#A60000'                       // Lightest blue for lowest values
  })

  return {
    labels: karyawanData,
    dataLength: dataLength,
    datasets: [{
      backgroundColor: colors,
      borderRadius: 6,
      data: yearData
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 14,
        weight: 'bold'
      },
      bodyFont: {
        size: 13
      }
    }
  },
  scales: {
    x: {
      border: {
        display: false
      },
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 12
        },
        color: '#64748b'
      }
    },
    y: {
      border: {
        display: false
      },
      grid: {
        display: true,
        color: '#e2e8f0',
        drawTicks: false
      },
      ticks: {
        font: {
          size: 12
        },
        color: '#64748b'
      }
    }
  }
}
</script>

<style scoped></style>