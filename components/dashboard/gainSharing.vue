<script setup lang="ts">
import { mockIndicators, mockKpiPerusahaan } from '~/assets/mock/kpi';

type IndicatorType = typeof mockIndicators[number]['indicators'][number];
type KpiType = typeof mockKpiPerusahaan[number]['kpi'][number];

const mode = ref<string>('kpi');
const gainSharingShow = ref<string>('history');
const selectedIndicator = ref<IndicatorType | undefined>(undefined);
const selectedKpi = ref<KpiType | undefined>(undefined);


watch(
  () => selectedIndicator.value,
  () => selectedKpi.value = undefined,
);

watch(
  () => mode.value,
  () => selectedIndicator.value = undefined,
);

</script>

<template>
  <!-- :start GAIN SHARING -->
  <div class="p-4">
    <!-- :start MUTATE GAIN SHAIRNG -->
    <div v-if="gainSharingShow === 'stepper'">
      <SectionGainSharingStepper @back="gainSharingShow = 'history'" />
    </div>
    <!-- :end MUTATE GAIN SHARING -->

    <!-- :start GAIN SHARING HISTORY -->
    <div v-else>
      <div class="flex justify-between items-center w-full">
        <h3 class="font-bold text-lg text-neutral-600">Riwayat Perhitungan Gain Sharing</h3>
        <div class="flex gap-4">
          <button class="rounded-full bg-blue-500 text-white font-bold py-2.5 px-4 text-sm"
            @click="gainSharingShow = 'stepper'">
            + Hitung Gain Sharing
          </button>
        </div>
      </div>
      <div class="py-4 overflow-auto">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tahun</th>
              <th>Nilai Tambah</th>
              <th>Upah Dibayarkan</th>
              <th>Gain Sharing</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in Array.from({ length: 3 }, (_, i) => i)" :key="i" class="hover:bg-neutral-100">
              <td>{{ i + 1 }}</td>
              <td>{{ 2020 + i }}</td>
              <td>Rp2.520.000.000</td>
              <td>Rp359.000.000</td>
              <td>Rp158.000.000</td>
              <td class="flex gap-4">
                <button
                  class="rounded-full flex justify-center items-center w-8 h-8 bg-white text-blue-500 border border-blue-500 transition ease-in-out hover:bg-blue-500 hover:text-white">
                  <Icon name="heroicons:pencil" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- :end GAIN SHARING HISTORY -->
  </div>
  <!-- :end GAIN SHARING -->
</template>