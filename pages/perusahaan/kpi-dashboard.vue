<script setup lang="ts">
import { MockDivisionList, MockEmployeeList } from '../../assets/mock/company';
import { groupArray } from '../../assets/helpers/array';
import type { GainSharingData } from '~/assets/types/gain-sharing';

type KPI = {
  id: string,
  name: string,
}
type Indicator = {
  id: string,
  name: string,
  value: string,
  kpi: string,
  relatedKpiGroups: string[],
  isRed?: boolean,
}

const mode = ref<string>('kpi');
const gainSharingShow = ref<string>('history');
const selectedKpi = ref<KPI|undefined>(undefined);
const selectedIndicator = ref<Indicator|undefined>(undefined);
const gainSharingCurrentStep = ref<number>(0);
const gainSharingData = ref<GainSharingData|undefined>(undefined);
const gainSharingResultSelectedDivision = ref<string|undefined>(undefined);

const gainSharingSteps: Array<string> = [
  'Informasi Utama', 'Pembagian per Divisi', 'Hasil Perhitungan',
]

// --- MOCK DATA
// TODO: replace with fetch data
const _mockKpiList: KPI[] = [
  { id: 'financial', name: 'Financial', },
  { id: 'customer', name: 'Customer' },
  { id: 'process_business', name: 'Process Business' },
  { id: 'learning_and_growth', name: 'Learning and Growth' },
]
const _mockIndicatorList: Indicator[] = [
  {
    id: 'total_assets',
    name: 'Total Assets',
    value: "Rp 20.000.000.000",
    kpi: "Rp 23.210.000.000",
    relatedKpiGroups: ['financial'],
    isRed: true,
  },
  {
    id: 'roi',
    name: 'Return on Investment',
    value: "2.5%",
    kpi: "1.5%",
    relatedKpiGroups: ['financial'],
  },
  {
    id: 'revenue',
    name: 'Revenue',
    value: "Rp 1.244.934.000",
    kpi: "Rp 1.350.000.000",
    relatedKpiGroups: ['financial'],
    isRed: true,
  },
  {
    id: 'employee_count',
    name: 'Jumlah Karyawan',
    value: "200",
    kpi: "200",
    relatedKpiGroups: ['financial'],
  },
  {
    id: 'customer_count',
    name: 'Jumlah Customer',
    value: "1000",
    kpi: "900",
    relatedKpiGroups: ['customer'],
  },
  {
    id: 'market_share',
    name: 'Market Share',
    value: "25%",
    kpi: "20%",
    relatedKpiGroups: ['customer'],
  },
]

watch(
  () => selectedKpi.value,
  () => selectedIndicator.value = undefined,
);

watch(
  () => mode.value,
  () => selectedKpi.value = undefined,
);

// watch(
//   () => gainSharingData.value?.base_data,
//   (baseDataValue) => {
//     console.log('changed', baseDataValue);
//     if (gainSharingData.value && baseDataValue && baseDataValue.koefisien_kontribusi && baseDataValue.rasio_nilai_tambah && baseDataValue.reserve_ratio) {
//       gainSharingData.value.base_data.gain_sharing = baseDataValue.nilai_tambah / baseDataValue.rasio_nilai_tambah - baseDataValue.upah_dibayarkan * (1 - (baseDataValue.reserve_ratio/100))
//     }
//   }
// )

</script>

<template>
  <div id="layout" class="md:mx-auto my-6 mx-auto flex pr-12">
    <div class="shrink-0 w-[5%]"></div>
    <main class="h-[92vh] w-[100vw]">
      <div class="mb-8">
        <h1 class="font-bold text-3xl text-neutral-700">Dashboard KPI & Gain Sharing</h1>
      </div>

      <!-- :start TAB -->
      <div class="flex w-full">
        <div role="tablist" class="tabs tabs-lg tabs-lifted">
          <a 
            role="tab" 
            :class="`tab ${mode === 'kpi' ? 'tab-active font-bold text-blue-500' : ''}`"
            @click="mode = 'kpi'"
          >
            KPI Perusahaan
          </a>
          <a 
            role="tab" 
            :class="`tab ${mode === 'gain-sharing' ? 'tab-active font-bold text-blue-500' : ''}`"
            @click="mode = 'gain-sharing'"
          >
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
          <select class="select select-bordered">
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
          </select>
          <button type="button" class="rounded-full bg-blue-500 text-white text-sm py-2.5 px-4 w-fit">Terapkan</button>
        </div>
        <div class="py-4 grid grid-cols-3 gap-8">
          <div class="flex flex-col gap-2">
            <button 
              type="button"
              v-for="_kpi in _mockKpiList"
              :class="`px-8 py-4 rounded-lg border border-neutral-200 hover:border-blue-500 hover:bg-blue-50 transition ease-in-out flex justify-between ${selectedKpi?.id === _kpi.id ? 'border-blue-500 bg-blue-50' : ''}`"
              @click="selectedKpi = _kpi"
            >
              <p>{{ _kpi.name }}</p>
              <!-- <p class="font-bold">{{ _kpi.value }}</p> -->
            </button>
          </div>
          <div v-if="selectedKpi" class="rounded-lg border border-neutral-200 p-4">
            <table class="table text-sm">
              <thead>
                <tr>
                  <th>Indikator</th>
                  <th>Nilai</th>
                  <th>KPI</th>
                </tr>
              </thead>
              <tbody class="text-xs">
                <tr 
                  v-for="indicator in _mockIndicatorList.filter(v => v.relatedKpiGroups.includes(selectedKpi?.id ?? ''))" 
                  :class="`hover:bg-blue-50 transition ease-in-out cursor-pointer text-sm ${indicator.id === selectedIndicator?.id ? 'bg-blue-50' : ''}`"
                  :key="indicator.id"
                  @click="selectedIndicator = indicator"
                >
                  <td>{{ indicator.name }}</td>
                  <td>{{ indicator.value }}</td>
                  <td>{{ indicator.kpi }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="py-8 flex justify-center items-center">
            <p class="text-neutral-500 italic text-sm">Silahkan pilih perspektif</p>
          </div>

          <div v-if="selectedIndicator" class="rounded-lg border border-neutral-200 p-4">
            <h3 class="font-bold text-xl text-neutral-600 mb-2">{{ selectedIndicator.name }}</h3>
            <hr />
            <p class="text-sm text-neutral-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a semper erat, id rutrum turpis. Nulla ac faucibus erat, eget luctus sem. Vivamus lectus elit, placerat ac nisi a.</p>
            <div class="grid grid-cols-2 gap-2 mt-4">
              <div class="">
                <h4 class="text-sm font-bold text-neutral-500">Nilai</h4>
                <p class="text-xl font-bold text-green-500" :class="{'text-red-500': selectedIndicator.isRed}">{{ selectedIndicator.value }}</p>
              </div>
              <div class="">
                <h4 class="text-sm font-bold text-neutral-500">KPI</h4>
                <p class="text-xl font-bold">{{ selectedIndicator.kpi }}</p>
              </div>
            </div>
          </div>
          <div v-else-if="selectedKpi" class="py-8 flex justify-center items-center">
            <p class="text-neutral-500 italic text-sm">Silahkan pilih indikator</p>
          </div>
        </div>
      </div>
      <!-- :end KPI -->

      <!-- :start GAIN SHARING -->
      <div v-else class="p-4">
        <!-- :start MUTATE GAIN SHAIRNG -->
        <div v-if="gainSharingShow === 'stepper'">
          <SectionGainSharingStepper 
            @back="gainSharingShow = 'history'"
          />
        </div>
        <!-- :end MUTATE GAIN SHARING -->
        
        <!-- :start GAIN SHARING HISTORY -->
        <div v-else>
          <div class="flex justify-between items-center w-full">
            <h3 class="font-bold text-lg text-neutral-600">Riwayat Perhitungan Gain Sharing</h3>
            <div class="flex gap-4">
              <button
                class="rounded-full bg-blue-500 text-white font-bold py-2.5 px-4 text-sm"
                @click="gainSharingShow = 'stepper'"
              >
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
                <tr 
                  v-for="i in Array.from({ length: 3 }, (_, i) => i)" :key="i"
                  class="hover:bg-neutral-100"
                >
                  <td>{{ i + 1 }}</td>
                  <td>{{ 2020 + i }}</td>
                  <td>Rp2.520.000.000</td>
                  <td>Rp359.000.000</td>
                  <td>Rp158.000.000</td>
                  <td class="flex gap-4">
                    <button
                      class="rounded-full flex justify-center items-center w-8 h-8 bg-white text-blue-500 border border-blue-500 transition ease-in-out hover:bg-blue-500 hover:text-white"
                    >
                      <Icon name="heroicons:pencil"/>
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