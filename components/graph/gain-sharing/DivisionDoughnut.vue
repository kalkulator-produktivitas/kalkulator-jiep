<script setup lang="ts">

import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
import type { GainSharingData } from '~/assets/types/gain-sharing';
import { ChartColors, generateColors } from '~/assets/helpers/colors';
ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  gainSharingData: GainSharingData,
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
  labels: props.gainSharingData.division_percentages.map(v => v.division_name),
  datasets: [
    {
      label: 'Gain Sharing',
      data: props.gainSharingData.division_percentages.map(v => v.value * (props.gainSharingData.base_data.gain_sharing ?? 10_000_000_000) / 100),
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