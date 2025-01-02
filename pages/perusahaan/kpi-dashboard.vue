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
const selectedKpi = ref<KPI | undefined>(undefined);
const selectedIndicator = ref<Indicator | undefined>(undefined);
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

function _newMockGainSharingData(): GainSharingData {
  return {
    base_data: {
      tahun: 2025,
      nilai_tambah: 2_000_000_000,
      upah_dibayarkan: 250_000_000,
    },
    division_percentages: MockDivisionList.map((v) => ({ division_id: v.id, division_name: v.name, value: 5.88 })),
    employee_values: MockEmployeeList.map((v) => ({ employee_id: v.id, employee_name: v.name, division_id: v.division_id, value: 99 })),
  }
}

watch(
  () => selectedKpi.value,
  () => selectedIndicator.value = undefined,
);

watch(
  () => mode.value,
  () => selectedKpi.value = undefined,
);

watch(
  () => gainSharingData.value?.base_data,
  (baseDataValue) => {
    console.log('changed', baseDataValue);
    if (gainSharingData.value && baseDataValue && baseDataValue.koefisien_kontribusi && baseDataValue.rasio_nilai_tambah && baseDataValue.reserve_ratio) {
      gainSharingData.value.base_data.gain_sharing = baseDataValue.nilai_tambah / baseDataValue.rasio_nilai_tambah - baseDataValue.upah_dibayarkan * (1 - (baseDataValue.reserve_ratio / 100))
    }
  }
)

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
        <div v-if="gainSharingData" class="relative w-full h-full">
          <button
            class="absolute top-0 left-0 rounded-lg border border-neutral-400 p-2 flex gap-2 items-center justify-center"
            @click="gainSharingData = undefined">
            <Icon name="heroicons:arrow-long-left" />
            <p>Riwayat</p>
          </button>
          <div>
            <Stepper :steps="gainSharingSteps" :initial-step="gainSharingCurrentStep"
              @change="(s) => gainSharingCurrentStep = s">
              <div class="p-4 w-full h-full">
                <!-- :start INFORMASI UTAMA -->
                <div v-if="gainSharingCurrentStep === 0" class="flex justify-center items-center">
                  <div
                    class="inline rounded-lg border border-neutral-200 p-6 shadow-sm hover:shadow-md w-[600px] min-w-[600px] max-w-[600px]">
                    <div class="flex flex-col gap-1 w-full pb-2.5">
                      <label htmlFor="gain-sharing.data.year" class="text-sm font-bold text-neutral-700">Tahun</label>
                      <select id="gain-sharing.data.year" class="select select-bordered select-sm">
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                      </select>
                    </div>
                    <div class="flex flex-col gap-1 w-full pb-2.5">
                      <label htmlFor="gain-sharing.data.nilai-tambah" class="text-sm font-bold text-neutral-700">Nilai
                        Tambah</label>
                      <input id="gain-sharing.data.nilai-tambah" type="string" class="input input-bordered input-sm"
                        disabled value="Rp 179.217.852.727" />
                    </div>
                    <div class="flex flex-col gap-1 w-full pb-2.5">
                      <label htmlFor="gain-sharing.data.upah-dibayarkan" class="text-sm font-bold text-neutral-700">Upah
                        Dibayarkan</label>
                      <input id="gain-sharing.data.upah-dibayarkan" type="string" class="input input-bordered input-sm"
                        disabled value="Rp 72.332.929.047" />
                    </div>
                    <div class="grid grid-cols-3 gap-4 w-full pb-2.5">
                      <div class="flex flex-col gap-1 w-full">
                        <label htmlFor="gain-sharing.data.rasio-nilai-tambah"
                          class="text-sm font-bold text-neutral-700">Rasio
                          Nilai Tambah</label>
                        <input id="gain-sharing.data.rasio-nilai-tambah" required type="number"
                          class="input input-bordered input-sm"
                          v-model="gainSharingData.base_data.rasio_nilai_tambah" />
                      </div>
                      <div class="flex flex-col gap-1 w-full">
                        <label htmlFor="gain-sharing.data.reserve-ratio"
                          class="text-sm font-bold text-neutral-700">Reserve
                          Ratio</label>
                        <div class="input input-bordered input-sm flex gap-2 items-center w-full">
                          <input id="gain-sharing.data.reserve-ratio" required type="number" class="w-4/5"
                            v-model="gainSharingData.base_data.reserve_ratio" />
                          <p class="text-sm">%</p>
                        </div>
                      </div>
                      <div class="flex flex-col gap-1 w-full">
                        <label htmlFor="gain-sharing.data.koefisien-kontribusi"
                          class="text-sm font-bold text-neutral-700">Koefisien Kontribusi</label>
                        <div class="input input-bordered input-sm flex gap-2 items-center w-full">
                          <input id="gain-sharing.data.koefisien-kontribusi" required type="number" class="w-4/5"
                            v-model="gainSharingData.base_data.koefisien_kontribusi" />
                          <p class="text-sm">%</p>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col gap-1 w-full pb-2.5">
                      <label htmlFor="gain-sharing.data.gain-sharing" class="text-sm font-bold text-neutral-700">Nilai
                        Gain Sharing</label>
                      <input id="gain-sharing.data.gain-sharing" type="string"
                        class="input input-bordered input-sm bg-blue-50 border-blue-500" readonly
                        value="Rp 150.565.890" />
                    </div>
                  </div>
                </div>
                <!-- :end INFORMASI UTAMA -->

                <!-- :start PEMBAGIAN PER DIVISI -->
                <div v-else-if="gainSharingCurrentStep === 1" class="flex flex-col gap-2 justify-center items-center">
                  <div class="p-4 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md">
                    <div class="flex gap-8">
                      <div v-for="grouped in groupArray(gainSharingData.division_percentages, 6)">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Divisi</th>
                              <th>Rasio (%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="division in grouped" :key="division.division_id" class="">
                              <td class="text-sm pb-1">{{ division.division_name }}</td>
                              <td class="pb-1">
                                <div class="input input-bordered input-sm text-sm flex items-center w-full">
                                  <input type="number" class="w-[50px]" :value="division.value" />
                                  <p>%</p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="flex justify-center w-full mt-4">
                      <h3 class="font-bold text-neutral-500 text-xl">Total: 100%</h3>
                    </div>
                  </div>
                </div>
                <!-- :end PEMBAGIAN PER DIVISI -->

                <!-- :start HASIL PERHITUNGAN -->
                <div v-else-if="gainSharingCurrentStep === 2"
                  class="border border-neutral-200 rounded-lg shadow-sm hover:shadow-md flex gap-4 w-full h-full p-4">
                  <div class="w-5/12">
                    <GraphGainSharingDivisionDoughnut :gain-sharing-data="gainSharingData" />
                  </div>
                  <div class="w-3/12 max-h-[500px] overflow-auto flex flex-col gap-2">
                    <button v-for="(division, i) in gainSharingData.division_percentages" :key="i"
                      class="border border-neutral-200 rounded-lg py-2.5 px-4 text-left hover:border-blue-500 hover:bg-blue-50 transition ease-in-out"
                      :class="{ 'border-blue-500 bg-blue-50': gainSharingResultSelectedDivision === division.division_id }"
                      @click="gainSharingResultSelectedDivision === division.division_id ? gainSharingResultSelectedDivision = undefined : gainSharingResultSelectedDivision = division.division_id">
                      <h4 class="text-sm font-bold text-neutral-600">{{ division.division_name }}</h4>
                      <p class="text-xs">{{ new Intl.NumberFormat('id-Id', {
                      }).format((gainSharingData.base_data.gain_sharing ?? 10_000_000_000) * division.value / 100) }}
                        ({{ division.value }}%)</p>
                    </button>
                  </div>
                  <div class="w-4/12">
                    <h3 class="text-sm font-bold text-neutral-600 text-center">Pembagian per Karyawan Divisi</h3>
                    <p class="text-xs text-blue-700 text-center">{{ gainSharingData.division_percentages.find(v =>
                      v.division_id === gainSharingResultSelectedDivision)?.division_name }}</p>
                    <div v-if="gainSharingResultSelectedDivision" class="pt-8">
                      <div
                        v-if="gainSharingData.employee_values.filter(v => v.division_id === gainSharingResultSelectedDivision).length === 0">
                        <p class="text-sm text-neutral-500 italic text-center">Tidak ada data</p>
                      </div>
                      <div v-else>
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
                              v-for="(karyawan, i) in gainSharingData.employee_values.filter(v => v.division_id === gainSharingResultSelectedDivision)"
                              :key="i" class="text-xs">
                              <td>{{ i + 1 }}</td>
                              <td>{{ karyawan.employee_name }}</td>
                              <td>{{ karyawan.value }}</td>
                              <td>{{ 100 }}</td>
                              <td>Rp 50.000.000</td>
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

        <!-- :start GAIN SHARING HISTORY -->
        <div v-else>
          <div class="flex justify-between items-center w-full">
            <h3 class="font-bold text-lg text-neutral-600">Riwayat Perhitungan Gain Sharing</h3>
            <div class="flex gap-4">
              <button class="rounded-full bg-blue-500 text-white font-bold py-2.5 px-4 text-sm"
                @click="gainSharingData = _newMockGainSharingData()">
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