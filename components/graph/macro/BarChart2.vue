<template>
  <div
    class="flex flex-col relative bg-white rounded-xl border border-slate-200 hover:shadow-xl transition-shadow duration-300">
    <div class="flex justify-between px-3 pt-2 bg-gradient-to-r rounded-t-xl">
      <p class="font-bold text-md ml-2 text-[#034EA2]">{{ title }}</p>
      <div class="justify-end flex text-xs gap-1">
        <div class="w-2 h-2 bg-[#5A8DEE] rounded-full my-auto"></div>
        <p class="my-auto">2020</p>
        <div class="w-2 h-2 bg-[#FF5E57] rounded-full my-auto"></div>
        <p class="my-auto">2021</p>
        <div class="w-2 h-2 bg-[#5DD39E] rounded-full my-auto"></div>
        <p class="my-auto">2022</p>
        <div class="w-2 h-2 bg-[#FFC048] rounded-full my-auto"></div>
        <p class="my-auto">2023</p>
        <div class="w-2 h-2 bg-[#18A0FB] rounded-full my-auto"></div>
        <p class="my-auto">2024</p>
      </div>
    </div>
    <!-- Outer container to enable horizontal scrolling -->
    <div class="w-full overflow-x-auto custom-scrollbar">
      <!-- Inner container with a larger width to enable scrolling -->
      <div class="w-[1200px]">
        <Bar :options="chartOptions" :data="props.chartData" />
      </div>
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

const props = defineProps(['title', 'chartData', 'ribuan'])

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "top",
      labels: {
        font: {
          size: 12,
        },
        boxWidth: 10,
        boxHeight: 10,
        useBorderRadius: true,
        borderRadius: 5
      },
    },
  },
  scales: {
    x: {
      stacked: false,
      ticks: {
        color: "#666666",
      },
    },
    y: {
      ticks: {
        callback: function (value) {
          return props.ribuan ? `${value / 1000000}M` : value;
        },
        color: "#666666",
      },
      grid: {
        color: "#EDEDED",
      },
    },
  },
}

const dataset = {
  labels: ["Kode A", "Kode B", "Kode C", "Kode D", "Kode E", "Kode F"],
  datasets: [
    {
      label: "2020",
      data: [60, 40, 50, 70, 80, 90],
      backgroundColor: "#5A8DEE",
      borderRadius: 100,
    },
    {
      label: "2021",
      data: [50, 80, 40, 60, 70, 85],
      backgroundColor: "#FF5E57",
      borderRadius: 100,
    },
    {
      label: "2022",
      data: [45, 50, 60, 65, 55, 75],
      backgroundColor: "#5DD39E",
      borderRadius: 100,
    },
    {
      label: "2023",
      data: [30, 60, 70, 50, 60, 80],
      backgroundColor: "#FFC048",
      borderRadius: 100,
    },
    {
      label: "2024",
      data: [70, 90, 80, 85, 90, 95],
      backgroundColor: "#18A0FB",
      borderRadius: 100,
    },
  ],
}

</script>

<style scoped>
/* Styling the scrollbar for WebKit-based browsers */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  transition: ease-in-out 0.3s;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
  transition: ease-in-out 0.3s;
}

/* Firefox scrollbar styling */
.custom-scrollbar {
  scrollbar-color: #d1d5db #f5f5f5;
  /* thumb color | track color */
  scrollbar-width: thin
    /* Thin scrollbar */
}
</style>