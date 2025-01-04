<template>
  <div
    class="flex flex-col relative rounded-xl bg-white shadow-lg border border-gray-100/50 hover:shadow-xl transition-shadow duration-300">
    <div class="flex justify-between px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50">
      <div class="text-lg font-semibold text-gray-800 w-[50%]">Top 5 Karyawan Divisi</div>
      <div class="w-[40%] flex items-center">
        <p class="text-gray-600 mr-3">Tahun</p>
        <select v-model="selectedYear"
          class="px-3 py-1.5 rounded-lg text-gray-700 bg-gray-50 border border-gray-200 appearance-none hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
          <option v-for="tahun of years" class="text-sm">{{ tahun }}</option>
        </select>
      </div>
    </div>
    <div class="p-6 pt-2">
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
import { DistinctColors } from '~/assets/helpers/colors';
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


let selectedYear = ref(props.years.reverse()[2])



let dataset = computed(() => {
  let data = props.dataset.map(x => ({ karyawan: x.Karyawan, value: x[String(selectedYear.value)].length > 0 ? parseFloat(x[String(selectedYear.value)]) : 0 }))
  let final = data.sort((a, b) => (b.value) - a.value).slice(0, 5)
  return {
    labels: final.map(x => x.karyawan),
    datasets: [{
      backgroundColor: DistinctColors[3],
      data: final.map(x => x.value)
    }]
  }
})

const chartOptions = {
  responsive: true,
  indexAxis: 'y',
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
        weight: 'normal'
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
        display: true,
        drawOnChartArea: false,
        drawTicks: false,
        color: 'rgba(0, 0, 0, 0.05)'
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
        drawOnChartArea: true,
        drawTicks: false,
        color: 'rgba(0, 0, 0, 0.05)'
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