<script setup lang="ts">
import { mockIndicators, mockKpiPerusahaan } from '~/assets/mock/kpi';
import type { KPIPerusahaan } from '~/assets/types/kpi';
import { currency, formatNumber } from '~/assets/helpers/number';

const SEVERE_VALUE = 0.5;

type IndicatorType = typeof mockIndicators[number]['indicators'][number];
type KpiType = typeof mockKpiPerusahaan[number]['kpi'][number];

const mode = ref<string>('kpi');
const gainSharingShow = ref<string>('history');
const selectedValue = ref(mockIndicators[0]);
const selectedIndicator = ref<IndicatorType | undefined>(undefined);
const selectedKpi = ref<KpiType | undefined>(undefined);
const selectedYear = ref<number>(selectedValue.value.tahun);
const kpiPerusahaan = computed(() => {
  const v = mockKpiPerusahaan.find(v => v.tahun === selectedValue.value.tahun);
  if (!v) return undefined;
  return v;
})

function onKpiYearSelected(ev: any) {
  const val = ev.target?.value;
  if (!val) return;
  const value = mockIndicators.find(v => v.tahun === Number(val));
  if (!value) return;
  selectedValue.value = value;
}

function isKpiSevere(k: KpiType): boolean {
  if (k.lower_is_better) {
    return k.target / k.value < SEVERE_VALUE
  }
  return k.value / k.target < SEVERE_VALUE;
}

function isIndicatorSevere(i: IndicatorType): boolean {
  if (!kpiPerusahaan.value) return false;
  const relatedKpi = kpiPerusahaan.value.kpi.filter(v => v.related_indicator_ids.includes(i.id));
  if (!relatedKpi || relatedKpi.length === 0) return false;
  const severeKpi = relatedKpi.filter(v => isKpiSevere(v));
  if (severeKpi.length / relatedKpi.length >= 0.5) {
    return true;
  }
  return false;
}

function formatKpi(value: number, kind: KPIPerusahaan['kind']): string {
  switch (kind) {
    case 'percentage':
      return `${value}%`
    case 'currency':
      return currency(value)
    case 'day':
      return `${value} hari`
    default:
      return `${value}`
  }
}

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
  <div id="layout" class="md:mx-auto my-6 mx-auto flex pr-12">
    <div class="shrink-0 w-[5%]"></div>
    <main class="h-[92vh] w-[100vw]">
      <div class="mb-8">
        <h1 class="font-bold text-3xl text-neutral-700">Dashboard Indikator Produktivitas & Gain Sharing</h1>
      </div>

      <!-- :start TAB -->
      <div class="flex w-full">
        <div role="tablist" class="tabs tabs-lg tabs-lifted">
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

      <!-- :start KPI -->
      <div v-if="mode == 'kpi'" class="py-4">
        <div class="mb-4 flex gap-8 items-center">
          <select class="select select-bordered" v-model="selectedYear">
            <option v-for="y in mockIndicators" :value="y.tahun">
              {{ y.tahun }}
            </option>
          </select>
          <button type="button" class="rounded-full bg-blue-500 text-white text-sm py-2.5 px-4 w-fit"
            @click="selectedValue = mockIndicators.find(v => v.tahun === selectedYear) ?? mockIndicators[0]">
            Terapkan
          </button>
        </div>
        <div class="py-4 grid grid-cols-3 gap-8 h-[65vh]">
          <div class="flex flex-col gap-2.5 overflow-y-auto">
            <button type="button" v-for="indicator in selectedValue.indicators"
              class="px-6 py-2.5 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition ease-in-out border-neutral-200 flex gap-2 justify-between items-center"
              :class="{ 'border-blue-500 bg-blue-50': selectedIndicator?.id === indicator.id }"
              @click="selectedIndicator = indicator">
              <div class="flex flex-col gap-1 text-left">
                <p class="w-full text-sm">{{ indicator.name }}</p>
                <p class="font-bold text-xl text-neutral-600">{{ formatNumber(indicator.value) }}</p>
              </div>
              <div v-if="isIndicatorSevere(indicator)">
                <Icon name="mdi:alert" :size="24" class="text-red-500" />
              </div>
            </button>
          </div>
          <div v-if="selectedIndicator" class="rounded-lg border border-neutral-200 p-4">
            <table class="table text-sm">
              <thead>
                <tr>
                  <th>Nama KPI</th>
                  <th>Capaian</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody class="text-xs">
                <tr
                  v-for="kpi in kpiPerusahaan?.kpi.filter(v => v.related_indicator_ids.includes(selectedIndicator?.id ?? '')) ?? []"
                  class="hover:bg-blue-50 transition ease-in-out cursor-pointer text-sm" :class="{
                    'bg-blue-50': kpi.id === selectedKpi?.id,
                    'bg-red-100': isKpiSevere(kpi),
                  }" :key="kpi.id" @click="selectedKpi = kpi">
                  <td>{{ kpi.name }}</td>
                  <td class="whitespace-wrap">{{ formatKpi(kpi.value, kpi.kind) }}</td>
                  <td class="whitespace-wrap">{{ formatKpi(kpi.target, kpi.kind) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="py-8 flex justify-center items-center">
            <p class="text-neutral-500 italic text-sm">Silahkan pilih perspektif</p>
          </div>

          <div v-if="selectedKpi" class="rounded-lg border border-neutral-200 p-4 shadow-sm hover:shadow-lg"
            :class="{ 'bg-red-100 border-red-500': isKpiSevere(selectedKpi) }">
            <h3 class="font-bold text-xl text-neutral-600 mb-2">{{ selectedKpi.name }}</h3>
            <hr />
            <p class="text-sm text-neutral-700 mt-2">{{ selectedKpi.desc }}</p>
            <div class="grid grid-cols-2 gap-2 mt-4">
              <div class="">
                <h4 class="text-sm font-bold text-neutral-500">Capaian</h4>
                <p class="text-xl font-bold text-green-500"
                  :class="{ 'text-red-500': selectedKpi.lower_is_better ? selectedKpi.target < selectedKpi.value : selectedKpi.value < selectedKpi.target }">
                  {{ formatKpi(selectedKpi.value, selectedKpi.kind) }}
                </p>
              </div>
              <div class="">
                <h4 class="text-sm font-bold text-neutral-500">Target</h4>
                <p class="text-xl font-bold">{{ formatKpi(selectedKpi.target, selectedKpi.kind) }}</p>
              </div>
            </div>
          </div>
          <div v-else-if="selectedIndicator" class="py-8 flex justify-center items-center">
            <p class="text-neutral-500 italic text-sm">Silahkan pilih indikator</p>
          </div>
        </div>
      </div>
      <!-- :end KPI -->

      <!-- :start GAIN SHARING -->
      <div v-else class="p-4">
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

    </main>
  </div>
</template>