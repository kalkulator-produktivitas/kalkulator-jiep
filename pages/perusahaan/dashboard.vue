<template>
  <div id="layout" class="md:mx-auto my-6 mx-auto flex">
    <div class="shrink-0 w-[5%]"></div>
    <div class="h-[92vh] w-[100vw]">
      <div v-if="available" class="pt-4 mx-auto flex flex-row gap-4 w-[98%] h-[100%]">
        <div class="w-[60%] flex flex-col">
          <div class="mb-6">
            <GraphGeneralLine class="" id="2" :dataset="lineData" :title="['Nilai Tambah', 'Pendapatan']"
              :key="`line2-${state}`" />
          </div>
          <div class="row-span-2 grid grid-cols-12 gap-4">
            <div class="col-span-5">
              <GraphGeneralDoughnut id="3" :config="pieOptions" :dataset="pieData" title="Perbandingan Nilai Tambah"
                :key="`doughnut-${state}`" />
            </div>
            <div class="col-span-7 ">
              <GraphGeneralInfo :value="infoData" />
            </div>

          </div>
        </div>
        <div class="flex flex-col gap-4 w-[40%] overflow-y-auto">
          <div class="pr-2">
            <div class="mb-4">
              <GraphGeneralBar id="10" :config="chartOptions"
                :title="barData.produktivitas_tenaga_kerja.labels.length > 1 ? `${barData.produktivitas_tenaga_kerja.labels[1]} - Produktivitas Tenaga Kerja (%)` : `${barData.produktivitas_tenaga_kerja.labels[0]} - Produktivitas Tenaga Kerja (%)`"
                :dataset="barData.produktivitas_tenaga_kerja" :key="`bar1-${state}`" />
            </div>
            <div class="my-4">
              <GraphGeneralBar id="10" :config="chartOptions"
                :title="barData.daya_saing_kerja.labels.length > 1 ? `${barData.daya_saing_kerja.labels[1]} - Daya Saing Kerja (%)` : `${barData.daya_saing_kerja.labels[0]} - Daya Saing Kerja (%)`"
                :dataset="barData.daya_saing_kerja" :key="`bar2-${state}`" />
            </div>
            <div class="my-4 ">
              <GraphGeneralBar id="10" :config="chartOptions"
                :title="barData.profitabilitas.labels.length > 1 ? `${barData.profitabilitas.labels[1]} - Profitabilitas (%)` : `${barData.profitabilitas.labels[0]} - Profitabilitas (%)`"
                :dataset="barData.profitabilitas" :key="`bar3-${state}`" />
            </div>
            <div class="my-4 ">
              <GraphGeneralBar id="10" :config="chartOptions"
                :title="barData.produktivitas_modal.labels.length > 1 ? `${barData.produktivitas_modal.labels[1]} - Produktivitas Modal (%)` : `${barData.produktivitas_modal.labels[0]} - Produktivitas Modal (%)`"
                :dataset="barData.produktivitas_modal" :key="`bar3-${state}`" />
            </div>
            <div class="my-4 ">
              <GraphGeneralBar id="10" :config="chartOptions"
                :title="barData.intensitas_modal.labels.length > 1 ? `${barData.intensitas_modal.labels[1]} - Intensitas Modal (%)` : `${barData.intensitas_modal.labels[0]} - Intensitas Modal (%)`"
                :dataset="barData.intensitas_modal" :key="`bar3-${state}`" />
            </div>
            <div class="my-4 ">
              <GraphGeneralBar id="10" :config="chartOptions"
                :title="barData.konten_nilai_tambah.labels.length > 1 ? `${barData.konten_nilai_tambah.labels[1]} - Konten Nilai Tambah (%)` : `${barData.konten_nilai_tambah.labels[0]} - Konten Nilai Tambah (%)`"
                :dataset="barData.konten_nilai_tambah" :key="`bar3-${state}`" />
            </div>
          </div>
        </div>

      </div>

      <div v-else>
        <p class="text-xl text-center text-black">
          Belum Ada Laporan
        </p>
      </div>
    </div>
    <Loading v-if="loading" text="Fetching Data" />
    <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
});
import dummy from '~/assets/dummy_produktivitas.json'

const dummyData = dummy

let rawData = ref()
let loading = ref(false)
let available = ref(false)


const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const closeModal = () => {
  modal.value.show = false
}


const state = ref(0)
const showSlider = ref(false)

let year = ref({
  min: 0,
  max: 0,
  minValue: 0,
  maxValue: 0
})

const lineData = ref({
  "Nilai Tambah": {
    labels: null,
    datasets: [
      {
        label: "",
        backgroundColor: '#034EA2',
        data: null,
      },
    ]
  },
  "Pendapatan": {
    labels: null,
    datasets: [
      {
        label: "",
        backgroundColor: '#034EA2',
        data: null,
      }
    ]
  }
})

const barData = ref({
  produktivitas_tenaga_kerja: {
    labels: null,
    datasets: [
      {
        label: 'Nilai Tambah / Jml Tenaga Kerja',
        backgroundColor: '#7EC27E',
        data: null,
      },
      {
        label: 'Penjualan / Jml Tenaga Kerja',
        backgroundColor: '#FFEFA1',
        data: null,
      },
      {
        label: 'Nilai Tambah / Total Jam Kerja',
        backgroundColor: '#FFBE85',
        data: null,
      }
    ],
  },
  daya_saing_kerja: {
    labels: null,
    datasets: [
      {
        label: 'Nilai Tambah / Biaya Tenaga Kerja',
        backgroundColor: '#7EC27E',
        data: null,
      },
      {
        label: 'Biaya Tenaga Kerja / Jml Tenaga Kerja',
        backgroundColor: '#FFEFA1',
        data: null,
      },
      {
        label: 'Biaya Tenaga Kerja / Penjualan',
        backgroundColor: '#FFBE85',
        data: null,
      },
    ],
  },
  produktivitas_modal: {
    labels: null,
    datasets: [
      {
        label: 'Nilai Tambah / Total Aktiva',
        backgroundColor: '#7EC27E',
        data: null,
      }
    ],
  },
  intensitas_modal: {
    labels: null,
    datasets: [
      {
        label: 'Aktiva Tetap / Jml Tenaga Kerja',
        backgroundColor: '#7EC27E',
        data: null,
      },
      {
        label: 'Nilai Tambah / Total Input',
        backgroundColor: '#FFEFA1',
        data: null,
      }
    ],
  },
  konten_nilai_tambah: {
    labels: null,
    datasets: [
      {
        label: 'Nilai Tambah / Total Aktiva',
        backgroundColor: '#7EC27E',
        data: null,
      }
    ],
  },
  profitabilitas: {
    labels: null,
    datasets: [
      {
        label: 'Laba Operasi / Penjualan',
        backgroundColor: '#7EC27E',
        data: null,
      },
      {
        label: 'Laba Operasi / Nilai Tambah',
        backgroundColor: '#FFEFA1',
        data: null,
      },
      {
        label: 'Laba Operasi / Modal Operasi',
        backgroundColor: '#FFBE85',
        data: null,
      },
    ],
  }
})

const infoData = ref({
  label: [],
  'Nilai Tambah': {
    label: 'Nilai Tambah',
    previous: null,
    latest: null,
    details: "Total Penjualan dikurangi jumlah Biaya Bahan, Overhead Produksi, dan Biaya Adminsitrasi"
  },
  'Nilai Tambah / Biaya Tenaga Kerja': {
    label: 'Nilai Tambah / Biaya Tenaga Kerja',
    previous: null,
    latest: null,
    details: "Kreativitas dan kemampuan inovasi perusahaan terhadap bahan-bahan dan jasa"
  },
  'Biaya Tenaga Kerja / Jml Tenaga Kerja': {
    label: 'Biaya Tenaga Kerja / Jml Tenaga Kerja',
    previous: null,
    latest: null,
    details: "Kreativitas dan kemampuan inovasi perusahaan terhadap bahan-bahan dan jasa"
  },
  'Nilai Tambah / Total Output': {
    label: 'Nilai Tambah / Total Output',
    previous: null,
    latest: null,
    details: "Ukuran kemampuan melipatgandakan biaya tenaga kerja yg dibayarkan dalam menghasilkan laba perusahaan"
  }
})

const pieData = ref({
  labels: null,
  datasets: [
    {
      label: 'Data One',
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#7F00FF'],
      data: null,
    },
  ],
})

const pieOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.3,
  plugins: {
    legend: {
      display: true,
      position: 'right',
      align: 'center',
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


const nilaiTambahFunc = (raw) => {
  let data = {
    label: [],
    value: [],
    total: null,
    pie_label: ['Gaji Karyawan', 'Laba', 'Penyusutan', 'Pajak', 'Bunga Bank'],
    pie_value: [0, 0, 0, 0, 0]
  }
  for (let year of raw) {
    data["label"].push(year["tahun"])
    data["value"].push(year["nilai_tambah"])
    data["total"] += year["nilai_tambah"]
    data["pie_value"][0] += year["total_biaya_tenaga_kerja"]
    data["pie_value"][1] += (year["nilai_tambah"] - year["total_biaya_tenaga_kerja"] - year["total_pajak"] - year["total_penyusutan"] - year["total_bunga_pinjaman"])
    data["pie_value"][2] += year["total_pajak"]
    data["pie_value"][3] += year["total_penyusutan"]
    data["pie_value"][4] += year["total_bunga_pinjaman"]
  }
  return data
}

const pendapatanFunc = ((raw) => {
  let data = {
    label: [],
    value: [],
  }
  for (let year of raw) {
    data["label"].push(year["tahun"])
    data["value"].push(year["pendapatan"])
  }
  return data
})

const ptkParamsFunc = ((raw) => {

  let dataLength = raw?.length
  const year_0 = raw[dataLength - 3]
  const year_1 = raw[dataLength - 2]
  const year_2 = raw[dataLength - 1]
  let data = {
    label: [],
    ptk1: [],
    ptk2: [],
    ptk3: []
  }
  if (!year_0 && !year_1) {
    data.label = ["Laporan belum cukup"]
    data.ptk1[0] = 0
    data.ptk2[0] = 0
    data.ptk3[0] = 0
  } else if (!year_0) {
    data.label = [year_2.tahun]
    data.ptk1[0] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_1 - year_1.produktivitas_tenaga_kerja_1) / year_1.produktivitas_tenaga_kerja_1) / 100
    data.ptk2[0] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_2 - year_1.produktivitas_tenaga_kerja_2) / year_1.produktivitas_tenaga_kerja_2) / 100
    data.ptk3[0] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_3 - year_1.produktivitas_tenaga_kerja_3) / year_1.produktivitas_tenaga_kerja_3) / 100
  } else {
    data.label = [year_1.tahun, year_2.tahun]
    data.ptk1[0] = Math.round(10000 * (year_1.produktivitas_tenaga_kerja_1 - year_0.produktivitas_tenaga_kerja_1) / year_0.produktivitas_tenaga_kerja_1) / 100
    data.ptk2[0] = Math.round(10000 * (year_1.produktivitas_tenaga_kerja_2 - year_0.produktivitas_tenaga_kerja_2) / year_0.produktivitas_tenaga_kerja_2) / 100
    data.ptk3[0] = Math.round(10000 * (year_1.produktivitas_tenaga_kerja_3 - year_0.produktivitas_tenaga_kerja_3) / year_0.produktivitas_tenaga_kerja_3) / 100

    data.ptk1[1] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_1 - year_1.produktivitas_tenaga_kerja_1) / year_1.produktivitas_tenaga_kerja_1) / 100
    data.ptk2[1] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_2 - year_1.produktivitas_tenaga_kerja_2) / year_1.produktivitas_tenaga_kerja_2) / 100
    data.ptk3[1] = Math.round(10000 * (year_2.produktivitas_tenaga_kerja_3 - year_1.produktivitas_tenaga_kerja_3) / year_1.produktivitas_tenaga_kerja_3) / 100
  }
  return data

})

const dskParamsFunc = ((raw) => {
  let dataLength = raw?.length
  const year_0 = raw[dataLength - 3]
  const year_1 = raw[dataLength - 2]
  const year_2 = raw[dataLength - 1]
  let data = {
    label: [],
    dsk1: [],
    dsk2: [],
    dsk3: [],
  }
  if (!year_0 && !year_1) {
    data.label = ["Laporan belum cukup"]
    data.dsk1[0] = 0
    data.dsk2[0] = 0
    data.dsk3[0] = 0
  }
  else if (!year_0) {
    data.label = [year_2.tahun]
    data.dsk1[0] = Math.round(10000 * (year_2.daya_saing_kerja_1 - year_1.daya_saing_kerja_1) / year_1.daya_saing_kerja_1) / 100
    data.dsk2[0] = Math.round(10000 * (year_2.daya_saing_kerja_2 - year_1.daya_saing_kerja_2) / year_1.daya_saing_kerja_2) / 100
    data.dsk3[0] = Math.round(10000 * (year_2.daya_saing_kerja_3 - year_1.daya_saing_kerja_3) / year_1.daya_saing_kerja_3) / 100
  } else {
    data.label = [year_1.tahun, year_2.tahun]
    data.dsk1[0] = Math.round(10000 * (year_1.daya_saing_kerja_1 - year_0.daya_saing_kerja_1) / year_0.daya_saing_kerja_1) / 100
    data.dsk2[0] = Math.round(10000 * (year_1.daya_saing_kerja_2 - year_0.daya_saing_kerja_2) / year_0.daya_saing_kerja_2) / 100
    data.dsk3[0] = Math.round(10000 * (year_1.daya_saing_kerja_3 - year_0.daya_saing_kerja_3) / year_0.daya_saing_kerja_3) / 100

    data.dsk1[1] = Math.round(10000 * (year_2.daya_saing_kerja_1 - year_1.daya_saing_kerja_1) / year_1.daya_saing_kerja_1) / 100
    data.dsk2[1] = Math.round(10000 * (year_2.daya_saing_kerja_2 - year_1.daya_saing_kerja_2) / year_1.daya_saing_kerja_2) / 100
    data.dsk3[1] = Math.round(10000 * (year_2.daya_saing_kerja_3 - year_1.daya_saing_kerja_3) / year_1.daya_saing_kerja_3) / 100
  }
  // console.log(data);

  return data
})

const pmParamsFunc = ((raw) => {
  let dataLength = raw?.length
  const year_0 = raw[dataLength - 3]
  const year_1 = raw[dataLength - 2]
  const year_2 = raw[dataLength - 1]
  let data = {
    label: [],
    pm1: [],
  }
  if (!year_0 && !year_1) {
    data.label = ["Laporan belum cukup"]
    data.pm1[0] = 0
  }
  else if (!year_0) {
    data.label = [year_2.tahun]
    data.pm1[0] = Math.round(10000 * (year_2.produktivitas_modal_1 - year_1.produktivitas_modal_1) / year_1.produktivitas_modal_1) / 100

  } else {
    data.label = [year_1.tahun, year_2.tahun]
    data.pm1[0] = Math.round(10000 * (year_1.produktivitas_modal_1 - year_0.produktivitas_modal_1) / year_0.produktivitas_modal_1) / 100

    data.pm1[1] = Math.round(10000 * (year_2.produktivitas_modal_1 - year_1.produktivitas_modal_1) / year_1.produktivitas_modal_1) / 100
  }
  return data
})

const imParamsFunc = ((raw) => {
  let dataLength = raw?.length
  const year_0 = raw[dataLength - 3]
  const year_1 = raw[dataLength - 2]
  const year_2 = raw[dataLength - 1]
  let data = {
    label: [],
    im1: [],
    im2: []
  }
  if (!year_0 && !year_1) {
    data.label = ["Laporan belum cukup"]
    data.im1[0] = 0
    data.im2[0] = 0
  }
  else if (!year_0) {
    data.label = [year_2.tahun]
    data.im1[0] = Math.round(10000 * (year_2.intensitas_modal_1 - year_1.intensitas_modal_1) / year_1.intensitas_modal_1) / 100
    data.im2[0] = Math.round(10000 * (year_2.intensitas_modal_2 - year_1.intensitas_modal_2) / year_1.intensitas_modal_2) / 100

  } else {
    data.label = [year_1.tahun, year_2.tahun]
    data.im1[0] = Math.round(10000 * (year_1.intensitas_modal_1 - year_0.intensitas_modal_1) / year_0.intensitas_modal_1) / 100
    data.im2[0] = Math.round(10000 * (year_1.intensitas_modal_2 - year_0.intensitas_modal_2) / year_0.intensitas_modal_2) / 100

    data.im1[1] = Math.round(10000 * (year_2.intensitas_modal_1 - year_1.intensitas_modal_1) / year_1.intensitas_modal_1) / 100
    data.im2[1] = Math.round(10000 * (year_2.intensitas_modal_2 - year_1.intensitas_modal_2) / year_1.intensitas_modal_2) / 100
  }
  return data
})

const kntParamsFunc = ((raw) => {
  let dataLength = raw?.length
  const year_0 = raw[dataLength - 3]
  const year_1 = raw[dataLength - 2]
  const year_2 = raw[dataLength - 1]
  let data = {
    label: [],
    knt1: [],

  }
  if (!year_0 && !year_1) {
    data.label = ["Laporan belum cukup"]
    data.knt1[0] = 0
  }
  else if (!year_0) {
    data.label = [year_2.tahun]
    data.knt1[0] = Math.round(10000 * (year_2.produktivitas_modal_1 - year_1.produktivitas_modal_1) / year_1.produktivitas_modal_1) / 100

  } else {
    data.label = [year_1.tahun, year_2.tahun]
    data.knt1[0] = Math.round(10000 * (year_1.produktivitas_modal_1 - year_0.produktivitas_modal_1) / year_0.produktivitas_modal_1) / 100

    data.knt1[1] = Math.round(10000 * (year_2.produktivitas_modal_1 - year_1.produktivitas_modal_1) / year_1.produktivitas_modal_1) / 100
  }
  return data
})

const pfParamsFunc = ((raw) => {
  let dataLength = raw?.length
  const year_0 = raw[dataLength - 3]
  const year_1 = raw[dataLength - 2]
  const year_2 = raw[dataLength - 1]

  let data = {
    label: [],
    pf1: [],
    pf2: [],
    pf3: [],
  }

  if (!year_0 && !year_1) {
    data.label = ["Laporan belum cukup"]
    data.pf1[0] = 0
    data.pf2[0] = 0
    data.pf3[0] = 0
  } else if (!year_0) {
    data.label = [year_2.tahun]
    data.pf1[0] = Math.round(10000 * (year_2.profitabilitas_1 - year_1.profitabilitas_1) / year_1.profitabilitas_1) / 100
    data.pf2[0] = Math.round(10000 * (year_2.profitabilitas_2 - year_1.profitabilitas_2) / year_1.profitabilitas_2) / 100
    data.pf3[0] = Math.round(10000 * (year_2.profitabilitas_3 - year_1.profitabilitas_3) / year_1.profitabilitas_3) / 100
  } else {
    data.label = [year_1.tahun, year_2.tahun]
    data.pf1[0] = Math.round(10000 * (year_1.profitabilitas_1 - year_0.profitabilitas_1) / year_0.profitabilitas_1) / 100
    data.pf2[0] = Math.round(10000 * (year_1.profitabilitas_2 - year_0.profitabilitas_2) / year_0.profitabilitas_2) / 100
    data.pf3[0] = Math.round(10000 * (year_1.profitabilitas_3 - year_0.profitabilitas_3) / year_0.profitabilitas_3) / 100

    data.pf1[1] = Math.round(10000 * (year_2.profitabilitas_1 - year_1.profitabilitas_1) / year_1.profitabilitas_1) / 100
    data.pf2[1] = Math.round(10000 * (year_2.profitabilitas_2 - year_1.profitabilitas_2) / year_1.profitabilitas_2) / 100
    data.pf3[1] = Math.round(10000 * (year_2.profitabilitas_3 - year_1.profitabilitas_3) / year_1.profitabilitas_3) / 100
  }
  return data
})

const rasioFunc = ((raw) => {

  let dataLength = raw?.length
  const year_0 = raw[dataLength - 3]
  const year_1 = raw[dataLength - 2]
  const year_2 = raw[dataLength - 1]

  let data = {
    label: null,
    latest1: year_2 ? (Math.round(year_2.daya_saing_kerja_1 * 100) / 100) : 0,
    latest2: year_2 ? (Math.round(year_2.intensitas_modal_1 * 100) / 100) : 0,
    latest3: year_2 ? Math.round(year_2.konten_nilai_tambah_1 * 100) / 100 : 0,
    previous1: year_1 ? Math.round(year_1.daya_saing_kerja_1 * 100) / 100 : 0,
    previous2: year_1 ? Math.round(year_1.intensitas_modal_1 * 100) / 100 : 0,
    previous3: year_1 ? Math.round(year_1.konten_nilai_tambah_1 * 100) / 100 : 0,
    rasio1: [],
    rasio2: [],
    rasio3: []
  }

  if (!year_0 && !year_1) {
    data.label = ["Laporan belum cukup"]
    data.rasio1[0] = 0
    data.rasio2[0] = 0
    data.rasio3[0] = 0
  } else if (!year_0) {
    data.label = [year_2.tahun]
    data.rasio1[1] = Math.round(10000 * (year_2.daya_saing_kerja_1 - year_1.daya_saing_kerja_1) / year_1.daya_saing_kerja_1) / 100
    data.rasio2[1] = Math.round(10000 * (year_2.intensitas_modal_1 - year_1.intensitas_modal_1) / year_1.intensitas_modal_1) / 100
    data.rasio3[1] = Math.round(10000 * (year_2.konten_nilai_tambah_1 - year_1.konten_nilai_tambah_1) / year_1.konten_nilai_tambah_1) / 100
  } else {
    data.label = [year_2.tahun, year_1.tahun]
    data.rasio1[0] = Math.round(10000 * (year_1.daya_saing_kerja_1 - year_0.daya_saing_kerja_1) / year_0.daya_saing_kerja_1) / 100
    data.rasio2[0] = Math.round(10000 * (year_1.intensitas_modal_1 - year_0.intensitas_modal_1) / year_0.intensitas_modal_1) / 100
    data.rasio3[0] = Math.round(10000 * (year_1.konten_nilai_tambah_1 - year_0.konten_nilai_tambah_1) / year_0.konten_nilai_tambah_1) / 100

    data.rasio1[1] = Math.round(10000 * (year_2.daya_saing_kerja_1 - year_1.daya_saing_kerja_1) / year_1.daya_saing_kerja_1) / 100
    data.rasio2[1] = Math.round(10000 * (year_2.intensitas_modal_1 - year_1.intensitas_modal_1) / year_1.intensitas_modal_1) / 100
    data.rasio3[1] = Math.round(10000 * (year_2.konten_nilai_tambah_1 - year_1.konten_nilai_tambah_1) / year_1.konten_nilai_tambah_1) / 100
  }
  return data
})

const renewData = (data) => {

  let nt = nilaiTambahFunc(data)
  let pndpt = pendapatanFunc(data)
  let ptk = ptkParamsFunc(data)
  let dsk = dskParamsFunc(data)
  let pm = pmParamsFunc(data)
  let im = imParamsFunc(data)
  let knt = kntParamsFunc(data)
  let pf = pfParamsFunc(data)
  let rasio = rasioFunc(data)

  console.log(dsk);
  // console.log(pm);
  // console.log(im);
  // console.log(knt);
  // console.log(pf);
  // console.log(rasio);

  lineData.value["Nilai Tambah"].labels = nt.label
  lineData.value["Nilai Tambah"].datasets[0].data = nt.value
  lineData.value["Pendapatan"].labels = pndpt.label
  lineData.value["Pendapatan"].datasets[0].data = pndpt.value

  console.log(lineData.value["Nilai Tambah"]);


  // produktivitas tenaga kerja
  barData.value.produktivitas_tenaga_kerja.labels = ptk.label
  barData.value.produktivitas_tenaga_kerja.datasets[0].data = ptk.ptk1
  barData.value.produktivitas_tenaga_kerja.datasets[1].data = ptk.ptk2
  barData.value.produktivitas_tenaga_kerja.datasets[2].data = ptk.ptk3

  // daya saing kerja
  barData.value.daya_saing_kerja.labels = dsk.label
  barData.value.daya_saing_kerja.datasets[0].data = dsk.dsk1
  barData.value.daya_saing_kerja.datasets[1].data = dsk.dsk2
  barData.value.daya_saing_kerja.datasets[2].data = dsk.dsk3

  // produktivitas modal
  barData.value.produktivitas_modal.labels = pm.label
  barData.value.produktivitas_modal.datasets[0].data = pm.pm1

  // intensitas modal
  barData.value.intensitas_modal.labels = im.label
  barData.value.intensitas_modal.datasets[0].data = im.im1
  barData.value.intensitas_modal.datasets[1].data = im.im2

  // konten nilai tambah
  barData.value.konten_nilai_tambah.labels = knt.label
  barData.value.konten_nilai_tambah.datasets[0].data = knt.knt1

  // profitabilitas
  barData.value.profitabilitas.labels = pf.label
  barData.value.profitabilitas.datasets[0].data = pf.pf1
  barData.value.profitabilitas.datasets[1].data = pf.pf2
  barData.value.profitabilitas.datasets[2].data = pf.pf3


  // rasio-rasio
  infoData.value.label = rasio.label
  infoData.value['Nilai Tambah'].latest = nt.value[data.length - 1]
  infoData.value['Nilai Tambah'].previous = nt.value[data.length - 2]
  infoData.value['Nilai Tambah / Biaya Tenaga Kerja'].latest = rasio.latest1
  infoData.value['Nilai Tambah / Biaya Tenaga Kerja'].previous = rasio.previous1
  infoData.value['Biaya Tenaga Kerja / Jml Tenaga Kerja'].latest = rasio.latest2
  infoData.value['Biaya Tenaga Kerja / Jml Tenaga Kerja'].previous = rasio.previous2
  infoData.value['Nilai Tambah / Total Output'].latest = rasio.latest3
  infoData.value['Nilai Tambah / Total Output'].previous = rasio.previous3


  // pie
  pieData.value.labels = nt.pie_label
  pieData.value.datasets[0].data = nt.pie_value
}


let reports = dummyData.reports
let yearMap
yearMap = reports.map(x => x["tahun"])
year.value.max = Math.max(...yearMap)
year.value.min = Math.min(...yearMap)
year.value.maxValue = Math.max(...yearMap)
year.value.minValue = Math.min(...yearMap)
renewData(dummyData.analisis)
loading.value = false
showSlider.value = true
available.value = true





const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'IDR',
});



</script>

<style scoped>
.shadow-new {
  border: solid;
  box-shadow: -5px 5px 5px gray;
}
</style>