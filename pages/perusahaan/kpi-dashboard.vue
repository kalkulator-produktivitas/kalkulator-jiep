<script setup lang="ts">
import { MockDivisionList, MockEmployeeList } from '../../assets/mock/company';
import { groupArray } from '../../assets/helpers/array';
import type { GainSharingData } from '~/assets/types/gain-sharing';

type KPI = {
  id: string,
  name: string,
  value: string,
  icon: string
}
type Indicator = {
  id: string,
  name: string,
  value: string,
  kpi: string,
  desc: string,
  relatedKpiGroups: string[],
  isRed?: boolean,
  parah: boolean
}

const mode = ref<string>('kpi');
const gainSharingShow = ref<string>('history');
const selectedKpi = ref<KPI|undefined>(undefined);
const selectedIndicator = ref<Indicator|undefined>(undefined);
const gainSharingCurrentStep = ref<number>(0);
const gainSharingData = ref<GainSharingData | undefined>(undefined);
const gainSharingResultSelectedDivision = ref<string | undefined>(undefined);

const gainSharingSteps: Array<string> = [
  'Informasi Utama', 'Pembagian per Divisi', 'Hasil Perhitungan',
]

// --- MOCK DATA
// TODO: replace with fetch data
const _mockKpiList: KPI[] = [
  { id: 'ptk1', name: 'Nilai Tambah / Jumlah Tenaga Kerja', value: '20.59%', icon: "mdi:check-circle" },
  { id: 'ptk2', name: 'Nilai Tambah / Jam Kerja', value: '20.39%', icon: "mdi:check-circle" },
  { id: 'ptk3', name: 'Nilai Tambah / Biaya Tenaga Kerja', value: '14.82%', icon: "mdi:alert-circle" },
  { id: 'ptk4', name: 'Biaya Tenaga Kerja / Total Jam Kerja', value: '4.85%', icon: "mdi:check-circle" },
  { id: 'pm1', name: 'Penjualan / Total Modal', value: '55.66%', icon: "mdi:alert-circle" },
  { id: 'pm2', name: 'Nilai Tambah / Total Modal', value: '10.33%', icon: "mdi:alert-circle" },
  { id: 'pm3', name: 'Total Modal / Jumlah Tenaga Kerja', value: '9.31%', icon: "mdi:check-circle" },
  { id: 'pf1', name: 'Laba / Penjualan', value: '24.33%', icon: "mdi:check-circle" },
  { id: 'pf2', name: 'Laba / Nilai Tambah', value: '2.00%', icon: "mdi:check-circle" },
  { id: 'pf3', name: 'Laba / Total Modal', value: '12.54%', icon: "mdi:check-circle" },
  { id: 'rp1', name: 'Nilai Tambah / Penjualan', value: '-1.96%', icon: "mdi:check-circle" },
  { id: 'rp2', name: 'Nilai Tambah / Pembelian Bahan', value: '-25.41%', icon: "mdi:check-circle" },
  { id: 'rp3', name: 'Laba / Biaya Tenaga Kerja', value: '45.62%', icon: "mdi:check-circle" },
]
const _mockIndicatorList: Indicator[] = [
  {
    id: 'Return on Investment',
    name: 'Return on Investment',
    value: "20.2%",
    kpi: "18.0%",
    relatedKpiGroups: ['ptk1', 'ptk2', 'rp3'],
    isRed: false,
    desc: "ROI mengukur efisiensi suatu investasi dengan membandingkan laba bersih yang dihasilkan terhadap total biaya investasi.",
    parah: false
  },
  {
    id: 'Market Value',
    name: 'Market Value',
    value: "Rp 16.244.934.000",
    kpi: "Rp 15.350.000.000",
    relatedKpiGroups: ['ptk1', 'ptk2'],
    isRed: false,
    desc: "Market Value adalah nilai pasar dari suatu perusahaan, yang biasanya diukur berdasarkan kapitalisasi pasar (jumlah saham beredar dikalikan dengan harga saham saat ini). Ini mencerminkan persepsi pasar terhadap nilai perusahaan.",
    parah: false
  },
  {
    id: 'Profit Margin',
    name: 'Profit Margin',
    value: "9%",
    kpi: "10%",
    relatedKpiGroups: ['ptk1', 'ptk3', 'pf1', 'pf2'],
    isRed: true,
    desc: "Profit Margin menunjukkan persentase laba bersih terhadap pendapatan total. Indikator ini digunakan untuk mengevaluasi efisiensi perusahaan dalam menghasilkan laba.",
    parah: false
  },

  {
    id: 'Total assets/Employee',
    name: 'Total assets/Employee',
    value: "Rp 1.000.000.000",
    kpi: "Rp 700.000.000",
    relatedKpiGroups: ['pf3'],
    isRed: false,
    desc: "Rasio ini mengukur produktivitas aset perusahaan berdasarkan jumlah karyawan. Nilainya diperoleh dengan membagi total aset dengan jumlah karyawan. Ini menggambarkan seberapa efektif perusahaan menggunakan asetnya per karyawan.",
    parah: false
  },

  {
    id: 'Leadership Index',
    name: 'Leadership Index',
    value: "10",
    kpi: "8",
    relatedKpiGroups: ['rp1'],
    isRed: false,
    desc: "Leadership Index adalah ukuran untuk menilai efektivitas kepemimpinan dalam organisasi, biasanya diukur melalui survei atau penilaian terhadap kemampuan kepemimpinan, komunikasi, dan pengambilan keputusan.",
    parah: false
  },

  {
    id: 'Defect Product',
    name: 'Defect Product',
    value: "4%",
    kpi: "2%",
    relatedKpiGroups: ['ptk3'],
    isRed: true,
    desc: "Defect Product mengacu pada jumlah produk cacat yang dihasilkan selama proses produksi. Indikator ini menunjukkan tingkat kualitas produksi dan sering dinyatakan dalam persentase dari total produksi.",
    parah: true
  },

  {
    id: 'Lead Time, from order to Delivery',
    name: 'Lead Time, from order to Delivery',
    value: "4 hari",
    kpi: "7 hari",
    relatedKpiGroups: ['ptk4'],
    isRed: false,
    desc: "Lead Time mengukur waktu yang dibutuhkan sejak pelanggan memesan hingga produk atau layanan diterima. Indikator ini mencerminkan efisiensi proses operasional dan logistik.",
    parah: false
  },
  {
    id: 'Contracts Filed Without Error',
    name: 'Contracts Filed Without Error',
    value: "95%",
    kpi: "82%",
    relatedKpiGroups: ['ptk4'],
    isRed: false,
    desc: "Indikator ini mengukur persentase kontrak yang diselesaikan dan diajukan tanpa kesalahan. Ini mencerminkan tingkat kepatuhan, akurasi, dan efisiensi administrasi organisasi.",
    parah: false
  },
  {
    id: 'Motivation Index',
    name: 'Motivation Index',
    value: "9",
    kpi: "9",
    relatedKpiGroups: ['ptk4'],
    isRed: false,
    desc: "Motivation Index adalah ukuran tingkat motivasi karyawan dalam suatu organisasi, biasanya diukur melalui survei internal yang menilai kepuasan, keterlibatan, dan semangat kerja.",
    parah: false
  },

  {
    id: 'Market Share',
    name: 'Market Share',
    value: "17%",
    kpi: "15%",
    relatedKpiGroups: ['pm1', 'rp2'],
    isRed: false,
    desc: "Market Share menunjukkan persentase pangsa pasar yang dikuasai perusahaan dalam industri tertentu. Indikator ini mencerminkan posisi kompetitif perusahaan di pasar.",
    parah: false
  },
  {
    id: 'Improvement in Productivity',
    name: 'Improvement in Productivity',
    value: "1%",
    kpi: "4%",
    relatedKpiGroups: ['pm1', 'pm2'],
    isRed: true,
    desc: "Indikator ini mengukur peningkatan produktivitas dari waktu ke waktu, biasanya dihitung berdasarkan perubahan output relatif terhadap input (misalnya tenaga kerja, bahan baku, atau waktu).",
    parah: true
  },

  {
    id: 'Time in Training',
    name: 'Time in Training',
    value: "4 hari",
    kpi: "3 hari",
    relatedKpiGroups: ['pm3'],
    isRed: true,
    desc: "Time in Training mengukur waktu yang dihabiskan oleh karyawan untuk pelatihan. Ini mencerminkan investasi perusahaan dalam pengembangan kompetensi karyawan.",
    parah: false
  },

  {
    id: 'Employee Turnover',
    name: 'Employee Turnover',
    value: "10%",
    kpi: "20%",
    relatedKpiGroups: ['pf1'],
    isRed: true,
    desc: "Employee Turnover mengukur tingkat pergantian karyawan dalam suatu periode. Indikator ini digunakan untuk mengevaluasi stabilitas tenaga kerja dan kepuasan karyawan.",
    parah: false
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
          <select class="select select-bordered">
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
          </select>
          <button type="button" class="rounded-full bg-blue-500 text-white text-sm py-2.5 px-4 w-fit">Terapkan</button>
        </div>
        <div class="py-4 grid grid-cols-3 gap-8 h-[65vh]">
          <div class="flex flex-col gap-2 overflow-y-auto">
            <button type="button" v-for="_kpi in _mockKpiList"
              :class="`px-6 py-4 rounded-lg border border-neutral-200 hover:border-blue-500 hover:bg-blue-50 text-left transition ease-in-out flex justify-between ${selectedKpi?.id === _kpi.id ? 'border-blue-500 bg-blue-50' : ''}`"
              @click="selectedKpi = _kpi">
              <Icon :name="_kpi.icon" size="7mm" class="my-auto flex-none"
                :class="`${_kpi.icon === 'mdi:alert-circle' ? 'text-red-500 animate-pulse' : 'text-transparent'}`" />
              <p class="ml-2 w-full text-left">{{ _kpi.name }}</p>
              <p class="font-bold">{{ _kpi.value }}</p>
            </button>
          </div>
          <div v-if="selectedKpi" class="rounded-lg border border-neutral-200 p-4">
            <table class="table text-sm">
              <thead>
                <tr>
                  <th>Indikator</th>
                  <th>Capaian</th>
                  <th>KPI</th>
                </tr>
              </thead>
              <tbody class="text-xs">
                <tr
                  v-for="indicator in _mockIndicatorList.filter(v => v.relatedKpiGroups.includes(selectedKpi?.id ?? ''))"
                  :class="`hover:bg-blue-50 transition ease-in-out cursor-pointer text-sm ${indicator.id === selectedIndicator?.id ? 'bg-blue-50' : ''} ${indicator.parah === true ? 'bg-red-100' : ''}`"
                  :key="indicator.id" @click="selectedIndicator = indicator">
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

          <div v-if="selectedIndicator"
            :class="`rounded-lg border border-neutral-200 p-4 ${selectedIndicator.parah ? 'bg-red-100' : ''}`">
            <h3 class="font-bold text-xl text-neutral-600 mb-2">{{ selectedIndicator.name }}</h3>
            <hr />
            <p class="text-sm text-neutral-700 mt-2">{{ selectedIndicator.desc }}</p>
            <div class="grid grid-cols-2 gap-2 mt-4">
              <div class="">
                <h4 class="text-sm font-bold text-neutral-500">Capaian</h4>
                <p class="text-xl font-bold text-green-500" :class="{ 'text-red-500': selectedIndicator.isRed }">{{
                  selectedIndicator.value }}</p>
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