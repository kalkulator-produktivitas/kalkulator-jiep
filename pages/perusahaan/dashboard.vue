<script setup lang="ts">
import { mockIndicators, mockKpiPerusahaan } from '~/assets/mock/kpi';
import logoJiep from '~/assets/logo_jiep_1.png';
import logoP3D from '~/assets/P3D_logo_2.png';
import { USE_JIEP_DATA } from '~/assets/helpers/const';

type IndicatorType = typeof mockIndicators[number]['indicators'][number];
type KpiType = typeof mockKpiPerusahaan[number]['kpi'][number];

const mode = ref<string>('produktivitas');

const logoSrc = USE_JIEP_DATA ? logoJiep : logoP3D;

</script>

<template>
  <div id="layout" class="md:mx-auto my-6 mx-auto flex pr-12">
    <div class="shrink-0 w-[5%]"></div>
    <main class="h-[92vh] w-[100vw] relative">
      <div class="absolute -top-16 -right-5">
        <img :src="logoSrc" class="w-36 ml-1 pt-3 flex-none" alt="" srcset=""/>
      </div>
      <!-- :start TAB -->
      <div class="flex w-[100%]">
        <div role="tablist" class="tabs tabs-lg tabs-lifted">
          <a 
            role="tab" 
            :class="`tab ${mode === 'produktivitas' ? 'tab-active font-bold text-blue-500' : ''}`"
            @click="mode = 'produktivitas'"
          >
            Produktivitas Perusahaan
          </a>
          <a 
            role="tab" 
            :class="`tab ${mode === 'kpi' ? 'tab-active font-bold text-blue-500' : ''}`"
            @click="mode = 'kpi'"
          >
            Indikator Produktivitas
          </a>
          <a 
            role="tab" 
            :class="`tab ${mode === 'gain-sharing' ? 'tab-active font-bold text-blue-500' : ''}`"
            @click="mode = 'gain-sharing'"
          >
            Gain Sharing
          </a>
          <a 
            role="tab" 
            :class="`tab ${mode === 'laporan' ? 'tab-active font-bold text-blue-500' : ''}`"
            @click="mode = 'laporan'"
          >
            Laporan
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

      <div v-else-if="mode == 'laporan'" class="py-4">
        <DashboardLaporan />
      </div>

    </main>
  </div>
</template>