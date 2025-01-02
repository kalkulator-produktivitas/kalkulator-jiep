<script setup lang="ts">

import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
import type { GainSharingData } from '~/assets/types/gain-sharing';
import { ChartColors, generateColors } from '~/assets/helpers/colors';
ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  divisionPercentages: Array<{
    division_id: string,
    division_name: string,
    value: number,
  }>,
  gainSharing: number,
}>();

const options = {
  aspectRatio: 1,
  plugins: {
    legend: {
      display: true,
      position: 'right' as any,
      align: 'center' as any,
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
const data = {
  labels: props.divisionPercentages.map(v => v.division_name),
  datasets: [
    {
      label: 'Gain Sharing',
      data: props.divisionPercentages.map(v => v.value * props.gainSharing / 100),
      // backgroundColor: generateColors(props.gainSharingData.division_percentages.length),
      backgroundColor: ChartColors,
      hoverOffset: 9,
    },
  ]
}

</script>

<template>
  <Doughnut 
    :options="options"
    :data="data"
  />
</template>