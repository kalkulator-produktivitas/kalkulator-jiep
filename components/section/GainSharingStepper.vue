<script setup lang="ts">
import { groupArray } from '~/assets/helpers/array';
import { GAIN_SHARING_KARYAWAN_MULTIPLIER } from '~/assets/helpers/const';
import { currency } from '~/assets/helpers/number';
import { mockKpiKaryawan } from '~/assets/mock/gain-sharing';
import { mockLaporanAnalisis } from '~/assets/mock/laporan';

// const props = defineProps<{
//   initialData: GainSharingData,
// }>()
const emit = defineEmits(['back']);

const currentStep = ref<number>(0);

const divisions = (new Set(mockKpiKaryawan.map(v => v.divisi)));

const analisis = ref<typeof mockLaporanAnalisis['analisis'][number]>(mockLaporanAnalisis.analisis[0]);
const rasioNilaiTambah = ref<number>(2.04);
const reserveRatio = ref<number>(25);
const gainSharingTotal = computed<number|undefined>(() => {
  if (!rasioNilaiTambah || Number.isNaN(rasioNilaiTambah) || !reserveRatio || Number.isNaN(reserveRatio)) return undefined;
  const { nilai_tambah, total_biaya_tenaga_kerja } = analisis.value;
  return (nilai_tambah / rasioNilaiTambah.value - total_biaya_tenaga_kerja) * (1 - (reserveRatio.value / 100));
})
const divisionPercentages = ref<Array<{
  division_id: string,
  division_name: string,
  value: number,
}>>(Array.from(divisions).map((v, i) => { 
  return {
    division_id: v, 
    division_name: v, 
    value: i <= 4 ? 9 : i <= 17 ? 4 : 3,
  }
}));
const resultSelectedDivision = ref<typeof divisionPercentages.value[number]|undefined>(undefined)
const totalPercentage = computed<number>(() => {
  return divisionPercentages.value.map(v => v.value).reduce((prev, curr) => prev + curr, 0)
})

function onYearChange(ev: any) {
  const v = mockLaporanAnalisis.analisis.find(v => v.tahun === Number(ev.target.value));
  if (!v) return;
  analisis.value = v;
}

const steps: Array<string> = [
  'Informasi Utama', 'Koefisien Kontribusi per Divisi', 'Hasil Perhitungan',
];

function calculateDivisionGainSharing(d: typeof divisionPercentages.value[number]): number {
  return (gainSharingTotal.value ?? 0) * (d.value / 100) * GAIN_SHARING_KARYAWAN_MULTIPLIER;
}

function calculateEmployeeGainSharing(emp: typeof mockKpiKaryawan[number]): number {
  const d = divisionPercentages.value.find(v => v.division_name === emp.divisi);
  if (!d) return 0;
  const colleagues = mockKpiKaryawan.filter(v => v.divisi === d.division_name);
  const colleaguesTotalScore = colleagues
    .map((v): number => v.kpi.find(w => w.tahun === analisis.value.tahun)?.value ?? 0)
    .reduce((prev, curr) => prev + curr, 0)
  const empScore = emp.kpi.find(v => v.tahun === analisis.value.tahun)?.value ?? 0;
  return empScore / colleaguesTotalScore * calculateDivisionGainSharing(d);
}

</script>

<template>
  <!-- :start MUTATE GAIN SHAIRNG -->
  <div class="relative w-full h-full">
    <button 
      class="absolute top-0 left-0 rounded-lg border border-neutral-400 p-2 flex gap-2 items-center justify-center"
      @click="emit('back')"
    >
      <Icon name="heroicons:arrow-long-left"/>
      <p>Riwayat</p>
    </button>
    <div>
      <Stepper 
        :steps="steps" 
        :initial-step="currentStep" 
        @change="(s) => currentStep = s"
      >
        <div class="p-4 w-full h-full">
          <!-- :start INFORMASI UTAMA -->
          <div v-if="currentStep === 0" class="flex justify-center items-center">
            <div class="inline rounded-lg border border-neutral-200 p-6 shadow-sm hover:shadow-md w-[600px] min-w-[600px] max-w-[600px]">
              <div class="flex flex-col gap-1 w-full pb-2.5">
                <label htmlFor="gain-sharing.data.year" class="text-sm font-bold text-neutral-700">Tahun</label>
                <select 
                  id="gain-sharing.data.year" 
                  class="select select-bordered select-sm"
                  :value="analisis.tahun"
                  @change="onYearChange"
                >
                  <option v-for="a in mockLaporanAnalisis.analisis" :key="a.tahun" :value="a.tahun">{{ a.tahun }}</option>
                </select>
              </div>
              <div class="flex flex-col gap-1 w-full pb-2.5">
                <label htmlFor="gain-sharing.data.nilai-tambah" class="text-sm font-bold text-neutral-700">Nilai Tambah</label>
                <input id="gain-sharing.data.nilai-tambah" type="string" class="input input-bordered input-sm bg-neutral-200" readonly :value="currency(analisis.nilai_tambah)"/>
              </div>
              <div class="flex flex-col gap-1 w-full pb-2.5">
                <label htmlFor="gain-sharing.data.upah-dibayarkan" class="text-sm font-bold text-neutral-700">Upah Dibayarkan</label>
                <input id="gain-sharing.data.upah-dibayarkan" type="string" class="input input-bordered input-sm bg-neutral-200" readonly :value="currency(analisis.total_biaya_tenaga_kerja)"/>
              </div>
              <div class="grid grid-cols-2 gap-4 w-full pb-2.5">
                <div class="flex flex-col gap-1 w-full">
                  <label htmlFor="gain-sharing.data.rasio-nilai-tambah" class="text-sm font-bold text-neutral-700">Rasio Nilai Tambah</label>
                  <input id="gain-sharing.data.rasio-nilai-tambah" required type="number" class="input input-bordered input-sm" v-model="rasioNilaiTambah"/>
                </div>
                <div class="flex flex-col gap-1 w-full">
                  <label htmlFor="gain-sharing.data.reserve-ratio" class="text-sm font-bold text-neutral-700">Reserve Ratio</label>
                  <div class="input input-bordered input-sm flex gap-2 items-center w-full">
                    <input id="gain-sharing.data.reserve-ratio" required type="number" class="w-4/5" v-model="reserveRatio"/>
                    <p class="text-sm">%</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-1 w-full pb-2.5">
                <label htmlFor="gain-sharing.data.gain-sharing" class="text-sm font-bold text-neutral-700">Nilai Gain Sharing Perusahaan</label>
                <input id="gain-sharing.data.gain-sharing" type="string" class="input input-bordered input-sm bg-blue-50 border-blue-500" readonly :value="currency(gainSharingTotal ?? 0)"/>
              </div>
            </div>
          </div>
          <!-- :end INFORMASI UTAMA -->

          <!-- :start PEMBAGIAN PER DIVISI -->
          <div v-else-if="currentStep === 1" class="flex flex-col gap-2 justify-center items-center">
            <div class="p-4 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md">
              <div class="flex gap-8">
                <div v-for="grouped in groupArray(divisionPercentages, 7)">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Divisi</th>
                        <th>Rasio (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(division, i) in grouped" :key="division.division_id" class="">
                        <td class="text-sm pb-1">{{ division.division_name }}</td>
                        <td class="pb-1">
                          <div class="input input-bordered input-sm text-sm flex items-center w-full">
                            <input type="number" class="w-[50px]" v-model="division.value"/>
                            <p>%</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="flex flex-col justify-center items-center w-full mt-4">
                <h3 
                  class="font-bold text-neutral-500 text-xl"
                  :class="{'text-red-500': totalPercentage !== 100}"
                >
                  Total: {{ totalPercentage.toFixed(2) }}%
                </h3>
                <p v-if="totalPercentage !== 100" class="text-xs text-red-500 italic">Total harus = 100</p>
              </div>
            </div>
          </div>
          <!-- :end PEMBAGIAN PER DIVISI -->

          <!-- :start HASIL PERHITUNGAN -->
          <div v-else-if="currentStep === 2" class="border border-neutral-200 rounded-lg shadow-sm hover:shadow-md flex gap-4 w-full h-full p-4">
            <div class="w-5/12">
              <GraphGainSharingDivisionDoughnut 
                :gain-sharing="gainSharingTotal ?? 0"
                :division-percentages="divisionPercentages"
              />
            </div>
            <div class="w-3/12 max-h-[500px] overflow-auto flex flex-col gap-2">
              <button 
                v-for="(division, i) in divisionPercentages" 
                :key="i"
                class="border border-neutral-200 rounded-lg py-2.5 px-4 text-left hover:border-blue-500 hover:bg-blue-50 transition ease-in-out"
                :class="{'border-blue-500 bg-blue-50': resultSelectedDivision?.division_id === division.division_id}"
                @click="resultSelectedDivision === division.division_id ? resultSelectedDivision = undefined : resultSelectedDivision = division"
              >
                <h4 class="text-sm font-bold text-neutral-600">{{ division.division_name }}</h4>
                <p class="text-xs">{{ currency(calculateDivisionGainSharing(division)) }} ({{ division.value }}%)</p>
              </button>
            </div>
            <div class="w-4/12 h-[60vh] overflow-auto">
              <h3 class="text-sm font-bold text-neutral-600 text-center">Pembagian per Karyawan Divisi</h3>
              <p class="text-xs text-blue-700 text-center">{{ resultSelectedDivision?.division_name }}</p>
              <div v-if="resultSelectedDivision" class="pt-8">
                <div v-if="mockKpiKaryawan.filter(v => v.divisi === resultSelectedDivision?.division_name).length === 0">
                  <p class="text-sm text-neutral-500 italic text-center">Tidak ada data</p>
                </div>
                <div v-else class="text-xs">
                  <table class="table text-sm">
                    <thead>
                      <tr>
                        <td>#</td>
                        <td>Nama</td>
                        <td>KPI</td>
                        <td>Target</td>
                        <td>Gain Sharing</td>
                      </tr>
                    </thead>
                    <tbody class="text-xs">
                      <tr 
                        v-for="(karyawan, i) in mockKpiKaryawan.filter(v => v.divisi === resultSelectedDivision?.division_name)"
                        :key="i"
                        class="text-xs hover:bg-neutral-100"
                      >
                        <td>{{ i + 1 }}</td>
                        <td>{{ karyawan.nama }}</td>
                        <td>{{ karyawan.kpi.find(v => v.tahun === analisis.tahun)?.value ?? 0 }}</td>
                        <td>{{ 100 }}</td>
                        <td>{{ currency(calculateEmployeeGainSharing(karyawan)) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div v-else class="py-8 flex items-center justify-center">
                <p class="text-sm text-neutral-500 italic">Silahkan pilih divisi</p>
              </div>
            </div>
          </div>
          <!-- :end HASIL PERHITUNGAN -->
        </div>
      </Stepper>
    </div>
  </div>
  <!-- :end MUTATE GAIN SHARING -->
</template>