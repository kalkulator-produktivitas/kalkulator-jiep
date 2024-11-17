<template>
  <div class="flex flex-col shadow-md rounded-md border border-gray-100">
    <div class="flex">
      <div class="py-1.5 pl-2 flex flex-col w-[20%] my-auto h-full">
        <select id="karyawan-select" v-model="selectedKaryawanIds" multiple
          class="h-[100%] px-2 block text-center text-md text-gray-800 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option v-for="karyawan in karyawanList" :key="karyawan.No" :value="karyawan.No">
            {{ karyawan.Karyawan }}
          </option>
        </select>
      </div>
      <div class="w-full">
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
      backgroundColor: colors[props.dataset.indexOf(kar)],
      borderColor: colors[props.dataset.indexOf(kar)],
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

// const unit = computed(() => {
//   let units = ''
//   if (label.value === 'Capaian Target' || label.value === 'Produk tidak Reject') {
//     units = 'Persen'
//   } else if (label.value === 'Waktu Produksi') {
//     units = 'Unit / Detik'
//   } else if (label.value === 'Material Produksi') {
//     units = 'Unit / Kg'
//   } else {
//     units = 'Skor'
//   }
//   return units
// })

const lineOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1.1,
  plugins: {
    legend: {
      display: true,
      align: 'center',
      position: 'right',
      labels: {
        boxWidth: 15,
        padding: 12,
        font: {
          size: 10
        }
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
      }
    }
  }
})

</script>

<style scoped></style>