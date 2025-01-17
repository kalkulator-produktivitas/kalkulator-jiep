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

function isKpiSevere(k: KpiType): boolean {
  if (k.lower_is_better) {
    return k.target / k.value <= SEVERE_VALUE
  }
  return k.value / k.target <= SEVERE_VALUE;
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
  <!-- :start KPI -->
  <div class="py-4">
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
        <button type="button" v-for="[i, indicator] in selectedValue.indicators.entries()"
          class="px-6 py-2.5 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition ease-in-out border-neutral-200 flex gap-2 justify-between items-center"
          :class="{ 'border-blue-500 bg-blue-50': selectedIndicator?.id === indicator.id }"
          @click="selectedIndicator = indicator">
          <div class="flex flex-col gap-1 text-left">
            <p class="w-full text-sm">{{ i + 1 }}. {{ indicator.name }}</p>
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
</template>