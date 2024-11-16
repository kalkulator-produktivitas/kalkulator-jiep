<template>
  <div class="overflow-none rounded-lg shadow-lg border border-gray-100 relative">
    <div class="bg-transparent ">
      <p class="font-bold text-2xl text-black text-center pt-2">{{ props.dataset.title }}</p>
    </div>
    <div class="px-2 ">
      <Doughnut :options="options" :data="dataset" />
    </div>
    <div class="absolute bottom-[12%] lg:bottom-[20%] w-full">
      <slot>

      </slot>
    </div>

  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps(['dataset'])

const dataset = ref({
  labels: props.dataset.label,
  datasets: [{
    label: props.dataset.title,
    data: [props.dataset.data[0], props.dataset.data[1]],
    backgroundColor: [
      '#034EA2',
      '#EEEEEE'
    ],
    borderRadius: [
      { outerStart: 6, innerStart: 6 },
      { outerEnd: 6, innerEnd: 6 }
    ],
  }]
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1.3,
  circumference: 180,
  borderWidth: 0,
  rotation: 270,
  cutout: '85%',
  borderRadius: '3',

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
    },
    tooltip: {
      filter: (toolTipItem) => {
        return toolTipItem.dataIndex === 0;
      }
    }
  },
}

</script>

<style scoped></style>