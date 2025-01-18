<template>
  <div id="layout" class="md:mx-auto my-3 mx-auto flex">
    <div class="shrink-0 w-[5%]"></div>
    <div class="h-full relative">
      <p class="font-bold text-xl">Dashboard Produktivitas Makro</p>
      <div class="mt-2 flex">
        <div class="overflow-x-auto">
          <ul class="flex list-none flex-row flex-wrap border-b-0 pl-0 mx-auto bg-blue-200 rounded-full">
            <li class="font-bold text-xs" v-for="subt in tabList" :key="subt">
              <button class="w-[160px] py-1.5 rounded-full" @click="changeTab(subt)"
                :class="subTab === subt ? 'text-white active bg-[#034EA2]' : 'hover:text-gray-600 hover:border-gray-300 bg-blue-200'">{{
                  subt }}</button>
            </li>
          </ul>
        </div>
      </div>

      <div class="grid grid-cols-10">
        <!-- <div class="col-span-8">{{ data }}</div> -->
        <div class="col-span-8">
          <div class="flex mt-2 w-full">
            <GraphMacroBarChart :chart-data="data_1" title="Produktivitas Tenaga Kerja" :ribuan="true" :key="state" />
            <GraphMacroBarChart :chart-data="data_2" title="Pertumbuhan Produktivitas Tenaga Kerja" :ribuan="false"
              :key="state" class="mx-1" />
            <GraphMacroBarChart :chart-data="data_3" title="Produktivitas Upah" :ribuan="false" :key="state" />
          </div>
          <div class="grid grid-cols-2 mt-2 gap-2">
            <GraphMacroBarChart2 :chart-data="data_4" title="Produktivitas Tenaga Kerja Berdasarkan Lapangan Usaha"
              :key="state" :ribuan="true" />
            <GraphMacroBarChart2 :chart-data="data_5"
              title="Produktivitas Jam Kerja Berdasarkan Klasifikasi Lapangan Usaha" :ribuan="false" :key="state" />
            <GraphMacroBarChart2 :chart-data="data_6" title="Produktivitas Upah Berdasarkan Klasifikasi Lapangan Usaha"
              :key="state" :ribuan="false" />
            <GraphMacroBarChart2 :chart-data="data_7"
              title="Pertumbuhan Produktivitas TK Berdasarkan Klasifikasi Lapangan Usaha" :ribuan="false"
              :key="state" />
          </div>
        </div>
        <div class="col-span-2 px-4 pt-2 flex w-full">
          <div class="border border-slate-200 w-full h-[100%] rounded-lg px-2 relative">
            <div class="absolute inset-0 overflow-y-auto px-2">

              <div class="sticky top-0 bg-white z-10">
                <div class="flex justify-between">
                  <p class="mt-2 text-[#034EA2] font-bold">Filters</p>
                </div>
                <div class="flex flex-col justify-between border-b border-slate-200 pb-2">
                  <p class="text-sm mt-2 pb-2">Lapangan Usaha</p>
                  <div class="flex justify-between">
                    <button @click="addAll"
                      class="px-2 py-1 text-sm border-2 border-blue-500 bg-white text-black rounded-md hover:bg-blue-200 transition-all duration-300">
                      Pilih Semua
                    </button>
                    <button @click="removeAll"
                      class="px-2 py-1 text-sm border-2 border-red-500 bg-white text-black rounded-md hover:bg-red-200 transition-all duration-300">
                      Hapus Semua
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div v-for="usaha of lapanganUsaha" :key="usaha.nama" class="flex items-start mb-0.5" @change="applyFilter">
                  <input :id="usaha.kode" type="checkbox" v-model="usaha.status"
                    class="mt-1 w-[10px] h-4 text-[#034EA2] bg-gray-100 border-gray-300 rounded dark:border-gray-600 ">
                  <label :for="usaha.kode" class="ms-2 text-sm "
                    :class="`${usaha.kode ? 'text-[#034EA2]' : 'text-gray-900'}`">
                    {{ usaha.nama }} (Kode {{ usaha.kode }})</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- <div class="ml-8">

  </div> -->
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
});

import macro from '~/assets/macro.json'

let selectedRegion = ref("Business Development & Planning")

let tabList = ref(['Provinsi DKI Jakarta', 'Jakarta Utara', 'Jakarta Timur', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Pusat', 'Kepulauan Seribu'])

let subTab = ref('Provinsi DKI Jakarta')

const data = ref(macro['Provinsi DKI Jakarta'])

// sort array ascending
const asc = arr => arr.sort((a, b) => a - b);

const sum = arr => arr.reduce((a, b) => a + b, 0);

const mean = arr => sum(arr) / arr.length;

// sample standard deviation
const std = (arr) => {
  const mu = mean(arr);
  const diffArr = arr.map(a => (a - mu) ** 2);
  return Math.sqrt(sum(diffArr) / (arr.length - 1));
};

const quantile = (arr, q) => {
  const sorted = asc(arr);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
};

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const state = ref(0)

const closeModal = () => {
  modal.value.show = false
}

const lapanganUsaha = ref([
  {
    nama: 'Pertanian, Kehutanan, dan Perikanan',
    status: true,
    kode: 'A'
  },
  {
    nama: 'Pertambangan dan Penggalian',
    status: true,
    kode: 'B'
  },
  {
    nama: 'Industri Pengolahan',
    status: true,
    kode: 'C'
  },
  {
    nama: 'Pengadaan Listrik dan Gas',
    status: true,
    kode: 'D'
  },
  {
    nama: 'Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang',
    status: true,
    kode: 'E'
  },
  {
    nama: 'Konstruksi',
    status: true,
    kode: 'F'
  },
  {
    nama: 'Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor',
    status: true,
    kode: 'G'
  },
  {
    nama: 'Transportasi dan Pergudangan',
    status: true,
    kode: 'H'
  },
  {
    nama: 'Penyediaan Akomodasi dan Makan Minum',
    status: true,
    kode: 'I'
  },
  {
    nama: 'Informasi dan Komunikasi',
    status: true,
    kode: 'J'
  },
  {
    nama: 'Jasa Keuangan dan Asuransi',
    status: true,
    kode: 'K'
  },
  {
    nama: 'Real Estate',
    status: true,
    kode: 'L'
  },
  {
    nama: 'Jasa Perusahaan',
    status: true,
    kode: 'M,N'
  },
  {
    nama: 'Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib',
    status: true,
    kode: 'O'
  },
  {
    nama: 'Jasa Pendidikan',
    status: true,
    kode: 'P'
  },
  {
    nama: 'Jasa Kesehatan dan Kegiatan Sosial',
    status: true,
    kode: 'Q'
  },
  {
    nama: 'Jasa Lainnya',
    status: true,
    kode: 'R,S,T,U'
  }
])



const applyFilter = () => {
  let filteredUsaha = lapanganUsaha.value.filter(x => x.status === true)
  let filteredKode = filteredUsaha.map(x => x.kode)
  let filtering = macro[subTab.value].filter(x => filteredKode.includes(x["Kode Lapangan Usaha"]))

  data.value = filtering
}

const addAll = () => {
  lapanganUsaha.value.forEach(x => x.status = true)
  applyFilter()
}

const removeAll = () => {
  lapanganUsaha.value.forEach(x => x.status = false)
  applyFilter()
}

const changeTab = (x) => {
  subTab.value = x
  let filteredUsaha = lapanganUsaha.value.filter(x => x.status === true)
  let filteredKode = filteredUsaha.map(x => x.kode)
  data.value = macro[subTab.value].filter(x => filteredKode.includes(x["Kode Lapangan Usaha"]))

  data.value = filtering
}

const data_1 = computed(() => {
  let dataNew = macro[subTab.value].filter((x) => x["Kode Lapangan Usaha"] === "TOTAL")[0]
  let dataset = {
    labels: ["2018", "2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "Produktivitas",
        data: null,
        backgroundColor: [
          "#3867D6", // Dark blue
          "#5A8DEE", // Lighter blue
          "#82B1FF", // Lightest blue
          "#5A8DEE", // Lighter blue
          "#2743A7", // Darkest blue
        ],
        borderRadius: 5,
      },
    ],
  }

  let calcData = [dataNew["Tahun 2018"],
  dataNew["Tahun 2019"],
  dataNew["Tahun 2020"],
  dataNew["Tahun 2021"],
  dataNew["Tahun 2022"]].map(x => parseFloat(x.replaceAll('.', '')))
  dataset.datasets[0].data = calcData

  let color = []
  for (let x of calcData) {
    if (x > quantile(calcData, .75)) {
      color.push("#2743A7")
    } else if (x > quantile(calcData, .5)) {
      color.push("#3867D6")
    } else if (x > quantile(calcData, .5)) {
      color.push("#5A8DEE")
    } else {
      color.push("#82B1FF")
    }
  }
  dataset.datasets[0].backgroundColor = color

  return dataset
})

const data_2 = computed(() => {
  let dataNew = macro[subTab.value].filter((x) => x["Kode Lapangan Usaha"] === "TOTAL")[0]
  let dataset = {
    labels: ["2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "Produktivitas",
        data: null,
        backgroundColor: [
          "#3867D6", // Dark blue
          "#5A8DEE", // Lighter blue
          "#82B1FF", // Lightest blue
          "#5A8DEE", // Lighter blue
          "#2743A7", // Darkest blue
        ],
        borderRadius: 5,
      },
    ],
  }

  let calcData = [dataNew["Growth Produktivitas TK 2019"],
  dataNew["Growth Produktivitas TK 2020"],
  dataNew["Growth Produktivitas TK 2021"],
  dataNew["Growth Produktivitas TK 2022"]].map(x => parseFloat(x.replace(",", ".").replace("%", "")))
  dataset.datasets[0].data = calcData

  let color = []
  for (let x of calcData) {
    if (x > quantile(calcData, .75)) {
      color.push("#2743A7")
    } else if (x > quantile(calcData, .5)) {
      color.push("#3867D6")
    } else if (x > quantile(calcData, .5)) {
      color.push("#5A8DEE")
    } else {
      color.push("#82B1FF")
    }
  }
  dataset.datasets[0].backgroundColor = color

  return dataset
})

const data_3 = computed(() => {
  let dataNew = macro[subTab.value].filter((x) => x["Kode Lapangan Usaha"] === "TOTAL")[0]
  let dataset = {
    labels: ["2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "Produktivitas",
        data: null,
        backgroundColor: [
          "#3867D6", // Dark blue
          "#5A8DEE", // Lighter blue
          "#82B1FF", // Lightest blue
          "#5A8DEE", // Lighter blue
          "#2743A7", // Darkest blue
        ],
        borderRadius: 5,
      },
    ],
  }

  let calcData = [dataNew["Upah 2018"],
  dataNew["Upah 2019"],
  dataNew["Upah 2020"],
  dataNew["Upah 2021"],
  dataNew["Upah 2022"]].map(x => parseFloat(x.replace(',', '.')))
  dataset.datasets[0].data = calcData

  let color = []
  for (let x of calcData) {
    if (x > quantile(calcData, .75)) {
      color.push("#2743A7")
    } else if (x > quantile(calcData, .5)) {
      color.push("#3867D6")
    } else if (x > quantile(calcData, .5)) {
      color.push("#5A8DEE")
    } else {
      color.push("#82B1FF")
    }
  }
  dataset.datasets[0].backgroundColor = color

  return dataset
})

const data_4 = computed(() => {
  let dataNew = data.value
  const dataset = {
    labels: [],
    datasets: [
      {
        label: "2018",
        data: [],
        backgroundColor: "#5A8DEE",
        borderRadius: 100,
      },
      {
        label: "2019",
        data: [],
        backgroundColor: "#FF5E57",
        borderRadius: 100,
      },
      {
        label: "2020",
        data: [],
        backgroundColor: "#5DD39E",
        borderRadius: 100,
      },
      {
        label: "2021",
        data: [],
        backgroundColor: "#FFC048",
        borderRadius: 100,
      },
      {
        label: "2022",
        data: [],
        backgroundColor: "#18A0FB",
        borderRadius: 100,
      },
    ],
  }

  for (let x of dataNew) {
    dataset.labels.push(`Kode ${x['Kode Lapangan Usaha']}`)
    dataset.datasets[0].data.push(parseFloat((x['Tahun 2018']).replaceAll('.', '')))
    dataset.datasets[1].data.push(parseFloat((x['Tahun 2019']).replaceAll('.', '')))
    dataset.datasets[2].data.push(parseFloat((x['Tahun 2020']).replaceAll('.', '')))
    dataset.datasets[3].data.push(parseFloat((x['Tahun 2021']).replaceAll('.', '')))
    dataset.datasets[4].data.push(parseFloat((x['Tahun 2022']).replaceAll('.', '')))
  }
  return dataset
})

const data_5 = computed(() => {
  let dataNew = data.value
  const dataset = {
    labels: [],
    datasets: [
      {
        label: "2018",
        data: [],
        backgroundColor: "#5A8DEE",
        borderRadius: 100,
      },
      {
        label: "2019",
        data: [],
        backgroundColor: "#FF5E57",
        borderRadius: 100,
      },
      {
        label: "2020",
        data: [],
        backgroundColor: "#5DD39E",
        borderRadius: 100,
      },
      {
        label: "2021",
        data: [],
        backgroundColor: "#FFC048",
        borderRadius: 100,
      },
      {
        label: "2022",
        data: [],
        backgroundColor: "#18A0FB",
        borderRadius: 100,
      },
    ],
  }

  for (let x of dataNew) {
    dataset.labels.push(`Kode ${x['Kode Lapangan Usaha']}`)
    dataset.datasets[0].data.push(parseFloat((x['Jam Kerja 2018'])))
    dataset.datasets[1].data.push(parseFloat((x['Jam Kerja 2019'])))
    dataset.datasets[2].data.push(parseFloat((x['Jam Kerja 2020'])))
    dataset.datasets[3].data.push(parseFloat((x['Jam Kerja 2021'])))
    dataset.datasets[4].data.push(parseFloat((x['Jam Kerja 2022'])))
  }
  return dataset
})

const data_6 = computed(() => {
  let dataNew = data.value
  const dataset = {
    labels: [],
    datasets: [
      {
        label: "2018",
        data: [],
        backgroundColor: "#5A8DEE",
        borderRadius: 100,
      },
      {
        label: "2019",
        data: [],
        backgroundColor: "#FF5E57",
        borderRadius: 100,
      },
      {
        label: "2020",
        data: [],
        backgroundColor: "#5DD39E",
        borderRadius: 100,
      },
      {
        label: "2021",
        data: [],
        backgroundColor: "#FFC048",
        borderRadius: 100,
      },
      {
        label: "2022",
        data: [],
        backgroundColor: "#18A0FB",
        borderRadius: 100,
      },
    ],
  }

  for (let x of dataNew) {
    dataset.labels.push(`Kode ${x['Kode Lapangan Usaha']}`)
    dataset.datasets[0].data.push(parseFloat((x['Upah 2018'])))
    dataset.datasets[1].data.push(parseFloat((x['Upah 2019'])))
    dataset.datasets[2].data.push(parseFloat((x['Upah 2020'])))
    dataset.datasets[3].data.push(parseFloat((x['Upah 2021'])))
    dataset.datasets[4].data.push(parseFloat((x['Upah 2022'])))
  }
  return dataset
})

const data_7 = computed(() => {
  let dataNew = data.value
  const dataset = {
    labels: [],
    datasets: [
      {
        label: "2018",
        data: [],
        backgroundColor: "#5A8DEE",
        borderRadius: 100,
      },
      {
        label: "2019",
        data: [],
        backgroundColor: "#FF5E57",
        borderRadius: 100,
      },
      {
        label: "2020",
        data: [],
        backgroundColor: "#5DD39E",
        borderRadius: 100,
      },
      {
        label: "2021",
        data: [],
        backgroundColor: "#FFC048",
        borderRadius: 100,
      },
      {
        label: "2022",
        data: [],
        backgroundColor: "#18A0FB",
        borderRadius: 100,
      },
    ],
  }

  for (let x of dataNew) {
    dataset.labels.push(`Kode ${x['Kode Lapangan Usaha']}`)
    dataset.datasets[0].data.push(parseFloat((x['Growth Produktivitas TK 2018'])))
    dataset.datasets[1].data.push(parseFloat((x['Growth Produktivitas TK 2019'])))
    dataset.datasets[2].data.push(parseFloat((x['Growth Produktivitas TK 2020'])))
    dataset.datasets[3].data.push(parseFloat((x['Growth Produktivitas TK 2021'])))
    dataset.datasets[4].data.push(parseFloat((x['Growth Produktivitas TK 2022'])))
  }
  return dataset
})



const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const selectedMonth = ref('Jan')






</script>

<style scoped>
/* Customize scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #034EA2;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #023b7d;
}

</style>