<template>
  <div id="layout" class="md:mx-auto my-3 mx-auto flex">

    <div class="shrink-0 w-[5%]"></div>
    <div class="h-full relative">
      <p class="font-bold text-xl">Dashboard Produktivitas Makro</p>

      <div class="mt-2 w-full">
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
        <div class="col-span-8">
          <div class="flex mt-2 w-full">
            <GraphMacroBarChart :chart-data="data_1" title="Produktivitas Tenaga Kerja" :ribuan="true" />
            <GraphMacroBarChart :chart-data="data_2" title="Pertumbuhan Produktivitas Tenaga Kerja" :ribuan="false"
              class="mx-1" />
            <GraphMacroBarChart :chart-data="data_3" title="Produktivitas Upah" :ribuan="false" />
          </div>
          <div class="grid grid-cols-2 mt-2 gap-2">
            <GraphMacroBarChart2 :chart-data="data_4" title="Produktivitas Tenaga Kerja Berdasarkan Lapangan Usaha"
              :ribuan="true" />
            <GraphMacroBarChart2 :chart-data="data_5"
              title="Produktivitas Jam Kerja Berdasarkan Klasifikasi Lapangan Usaha" :ribuan="false" />
            <GraphMacroBarChart2 :chart-data="data_6" title="Produktivitas Upah Berdasarkan Klasifikasi Lapangan Usaha"
              :ribuan="false" />
            <GraphMacroBarChart2 :chart-data="data_7"
              title="Pertumbuhan Produktivitas TK Berdasarkan Klasifikasi Lapangan Usaha" :ribuan="true" />
          </div>
        </div>
        <div class="col-span-2 px-4 pt-2 flex w-full">
          <div class="border border-slate-200 w-full h-full rounded-lg px-2">
            <p class="mt-2 text-[#034EA2] font-bold">Filters</p>
            <p class="text-sm mt-2">Lapangan Usaha</p>
            <div>
              <div v-for="usaha of Object.keys(lapanganUsaha).entries()" class="flex items-center">
                <input :id="usaha[0]" type="checkbox" v-model="lapanganUsaha[usaha[1]]"
                  class="w-[10px] h-4 text-[#034EA2] bg-gray-100 border-gray-300 rounded dark:border-gray-600">
                <label :for="usaha[0]" class="ms-2 text-sm "
                  :class="`${lapanganUsaha[usaha[1]] ? 'text-[#034EA2]' : 'text-gray-900'}`">
                  {{ usaha[1] }} {{ kodeLapanganUsaha[usaha[0]] }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
  <div class="ml-8">

  </div>
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

const changeTab = (x) => {
  subTab.value = x
  data.value = macro[subTab.value]
}

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

const closeModal = () => {
  modal.value.show = false
}

const lapanganUsaha = ref({
  'Pertanian, Kehutanan, dan Perikanan': true,
  'Pertambangan dan Penggalian': true,
  'Industri Pengolahan': true,
  'Pengadaan Listrik dan Gas': true,
  'Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang': true,
  'Konstruksi': true,
  'Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor': true,
  'Transportasi dan Pergudangan': true,
  'Penyediaan Akomodasi dan Makan Minum': true,
  'Informasi dan Komunikasi': true,
  'Jasa Keuangan dan Asuransi': true,
  'Real Estate': true,
  'Jasa Perusahaan': true,
  'Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib': true,
  'Jasa Pendidikan': true,
  'Jasa Kesehatan dan Kegiatan Sosial': true,
  'Jasa Lainnya': true,
})

const kodeLapanganUsaha = [
  '(kode A)',
  '(kode B)',
  '(kode C)',
  '(kode D)',
  '(kode E)',
  '(kode F)',
  '(kode G)',
  '(kode H)',
  '(kode I)',
  '(kode J)',
  '(kode K)',
  '(kode L)',
  '(kode M, N)',
  '(kode O)',
  '(kode P)',
  '(kode Q)',
  '(kode R, S, T, U)'
]

const data_1 = computed(() => {
  let dataNew = data.value.filter((x) => x["Kode Lapangan Usaha"] === "TOTAL")[0]
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
  let dataNew = data.value.filter((x) => x["Kode Lapangan Usaha"] === "TOTAL")[0]
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
  let dataNew = data.value.filter((x) => x["Kode Lapangan Usaha"] === "TOTAL")[0]
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

const state = ref(0)




</script>

<style scoped></style>