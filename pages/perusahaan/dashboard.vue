<script setup lang="ts">
import { mockIndicators, mockKpiPerusahaan } from '~/assets/mock/kpi';


type IndicatorType = typeof mockIndicators[number]['indicators'][number];
type KpiType = typeof mockKpiPerusahaan[number]['kpi'][number];

const mode = ref<string>('produktivitas');


</script>

<template>
  <div id="layout" class="md:mx-auto my-6 mx-auto flex pr-12">
    <div class="shrink-0 w-[5%]"></div>
    <main class="h-[92vh] w-[100vw]">

      <!-- :start TAB -->
      <div class="flex w-[100%]">
        <div role="tablist" class="tabs tabs-lg tabs-lifted">
          <a role="tab" :class="`tab ${mode === 'produktivitas' ? 'tab-active font-bold text-blue-500' : ''}`"
            @click="mode = 'produktivitas'">
            Produktivitas Perusahaan
          </a>
          <a role="tab" :class="`tab ${mode === 'kpi' ? 'tab-active font-bold text-blue-500' : ''}`"
            @click="mode = 'kpi'">
            Indikator Produktivitas
          </a>
          <a role="tab" :class="`tab ${mode === 'gain-sharing' ? 'tab-active font-bold text-blue-500' : ''}`"
            @click="mode = 'gain-sharing'">
            Gain Sharing
          </a>
        </div>
        <!-- border only -->
        <div class="border-b border-neutral-200 flex-1"></div>
      </div>
      <!-- :end TAB -->

      <!-- :start Dashboard Produktivitas -->
      <div v-if="mode == 'produktivitas'" class="py-4">
        <DashboardPerformance />
      </div>
      <!-- :end Dashboard Produktivitas -->

      <!-- :start Dashboard KPI Indikator -->
      <div v-else-if="mode == 'kpi'" class="py-4">
        <DashboardIndikatorKpi />
      </div>
      <!-- :end Dashboard KPI Indikator -->

      <!-- :start GAIN SHARING -->
      <div v-else-if="mode == 'gain-sharing'" class="py-4">
        <DashboardGainSharing />
      </div>
      <!-- :end GAIN SHARING -->

    </main>
  </div>
</template>