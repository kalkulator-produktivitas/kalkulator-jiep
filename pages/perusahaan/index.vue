<template>
  <div id="layout" class="md:mx-auto mt-12 mb-6 mx-auto flex">
    <div class="shrink-0 w-[5%]"></div>
    <div class="container">
      <div class="flex items-center space-x-4 mb-2">
        <label for="select" class="text-gray-600 font-bold">Pilih tahun</label>
        <div class="relative inline-block">
          <select id="year"
            class="block py-1 text-center w-[70px] text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            v-model="selectedYear">
            <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <label for="select" class="text-gray-600 font-bold">Tipe Laporan</label>
        <div class="relative inline-block ">
          <select id="year"
            class="block py-1 text-left w-[100px] text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 peer"
            v-model="reportType.type">
            <option class="text-center" v-for="val in ['Tahun', 'Semester', 'Triwulan']" :key="val">{{ val }}</option>
          </select>
        </div>
        <div v-if="reportType.type !== 'Tahun'" class="relative inline-block w-[40%]">
          <select
            class="block py-1 w-[20px] text-md text-center text-gray-500 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 peer">
            <option v-if="reportType.type === 'Semester'" v-for="val of [1, 2]" :key="val">{{ val }}</option>
            <option v-if="reportType.type === 'Triwulan'" v-for="val of [1, 2, 3, 4]" :key="val">{{ val }}</option>
          </select>
        </div>
        <div class="ml-8">
          <button class="flex gap-2 justify-center items-center rounded-full px-4 py-2 bg-blue-500 text-white text-sm" @click="openFileInputModal = true">
            <Icon name="mdi:upload"/>
            <p>Upload dari Excel</p>
          </button>
          <FileUploadModal title="Upload File Perusahaan" v-model:show="openFileInputModal" @file-selected="handleFileSelected"/>
        </div>
      </div>
      <div class="container max-w h-full flex flex-row">
        <div class="overflow-y-auto px-1 shrink-0">
          <ul class="flex list-none flex-col flex-wrap border-b-0 border-r-2 pl-0 mt-8">
            <li v-for="tabName in tabList" :key="tabName" class="mr-2">
              <button class="inline-block px-4 py-3" @click="tab = tabName"
                :class="tab === tabName ? 'text-blue-600 border-l-2 border-blue-600 active' : 'border-l-2 border-transparent hover:text-gray-600 hover:border-gray-300'">
                <Icon name="fe:check-circle" size="6mm" class="my-auto flex-none mr-2 text-blue-600"
                  v-if="totals[tabName] && totals[tabName].length > 0" />
                <Icon name="fe:check-circle" size="6mm" class="my-auto flex-none mr-2 text-blue-600" v-else-if="tabName === 'Jumlah Tenaga Kerja'
                  && parameters['Jumlah Tenaga Kerja']['Jam Kerja'] !== null
                  && parameters['Jumlah Tenaga Kerja']['Jam Kerja Lembur'] !== null
                  && parameters['Jumlah Tenaga Kerja']['Jumlah Tenaga Kerja'] !== null
                " />
                {{ tabName }}
              </button>
            </li>
          </ul>
        </div>

        <form class="col-span-6 overflow-y-auto flex w-[65%] pl-2" @submit.prevent="submitForm">
          <div v-if="tab" class="w-full">
            <div v-if="hasNestedStructure">
              <div class="basis-3/5 flex">
                <ul class="flex list-none flex-row flex-wrap border-b-0 pl-0 mx-auto">
                  <li class="mx-2" v-for="subt in getSubtabs" :key="subt">
                    <button class="inline-block px-2 py-1 rounded-md" @click="subtab = subt"
                      :class="subtab === subt ? 'text-blue-600 border-2 border-blue-600 active bg-blue-100' : 'border-2 border-gray-200 hover:text-gray-600 hover:border-gray-300'">{{
                        subt }}</button>
                  </li>

                </ul>
              </div>
              <div v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'"
                class="flex items-center mb-4 ml-4">
                <input @change="zeroParams(tab)" :id="labeling(tab + '_checkbox')" type="checkbox"
                  v-model="total_fill[tab]" class="w-4 h-4 bg-gray-100 rounded-2 dark:bg-gray-700">
                <label :for="labeling(tab + '_checkbox')" class="ml-2 text-sm font-medium text-gray-900">Isi Total
                  Saja</label>
              </div>
              <template v-if="subtab">
                <div v-for="param in Object.keys(parameters[tab][subtab] || {})" :key="param"
                  class="mb-4 md:flex md:items-center">
                  <div class="basis-1/3">
                    <label class="block text-sm font-bold mr-8 md:text-right" :for="labeling(param)">
                      {{ param }}
                    </label>
                  </div>
                  <div class="basis-1/2 flex">
                    <input
                      class="appearance-none border-b-2 h-100 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center"
                      :class="total_fill[tab] ? 'bg-gray-100' : 'bg-white'" disabled readonly type="text" value="Rp">
                    <input :value="subtab ? parameters[tab][subtab][param] : parameters[tab][param]"
                      class="appearance-none border-b-2 w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                      :class="total_fill[tab] ? 'bg-gray-100' : ''"
                      @input="maskNumber(tab, param, $event.target.value, subtab)" @keypress="(e) => !/^\d$/.test(e.key) &&
                        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key) &&
                        e.preventDefault()" type="text" />
                  </div>
                  <div class="ml-2 text-yellow-500 shrink-0" v-if="tidakBolehNol.includes(param)">
                    <Icon name="fe:warning" size="6mm" class="my-auto flex-none" />
                    Tidak boleh 0
                  </div>
                </div>
              </template>

              <hr v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'"
                class="h-px mt-8 border-black border-1 ml-12">
              <div v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'"
                class="mb-4 md:flex md:items-center">
                <div class="basis-1/3">
                  <label class="block text-sm font-bold mr-8 md:text-right" :for="labeling(tab + '_total')">
                    {{ tab + ' Total' }}
                  </label>
                </div>
                <div class="basis-3/5 flex mt-2">
                  <input
                    class="appearance-none border-b-2 h-100 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center"
                    :class="!total_fill[tab] ? 'bg-gray-100' : 'bg-white'" disabled readonly type="text" value="Rp">
                  <input
                    class="appearance-none border-b-2 w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                    :class="!total_fill[tab] ? 'bg-gray-100' : ''" :disabled="!total_fill[tab]"
                    :id="labeling(tab + '_total')" type="text" v-model="totals[tab]"
                    @input="parseIntFormatter2(tab, $event.target.value)" @keypress="parseIntsOnly($event)">
                  <button
                    class="bg-transparent hover:text-white hover:bg-gray-400 hover:border-transparent  text-gray-400 font-bold py-1 px-4 border border-blue  rounded ml-1"
                    :class="total_fill[tab] ? 'hidden' : ''" @click="sumParams(tab)" :disabled="total_fill[tab]">
                    Sum
                  </button>
                </div>
              </div>
            </div>

            <div v-else-if="!hasNestedStructure">
              <div v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'"
                class="flex items-center mb-4 ml-4">
                <input @change="zeroParams(tab)" :id="labeling(tab + '_checkbox')" type="checkbox"
                  v-model="total_fill[tab]" class="w-4 h-4 bg-gray-100 rounded-2 dark:bg-gray-700">
                <label :for="labeling(tab + '_checkbox')" class="ml-2 text-sm font-medium text-gray-900">Isi Total
                  Saja</label>
              </div>
              <template v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'">
                <div v-for="param in Object.keys(parameters[tab])" :key="param" class="mb-4 md:flex md:items-center">
                  <div class="basis-1/3">
                    <label class="block text-sm font-bold mr-8 md:text-right" :for="labeling(param)">
                      {{ param }}
                    </label>
                  </div>
                  <div class="basis-1/2 flex">
                    <input
                      class="appearance-none border-b-2 h-100 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center"
                      :class="total_fill[tab] ? 'bg-gray-100' : 'bg-white'" disabled readonly type="text" value="Rp">
                    <input
                      class="appearance-none border-b-2 w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                      :class="total_fill[tab] ? 'bg-gray-100' : ''" :id="labeling(param)" type="text"
                      :value="parameters[tab][param]" @change="() => { }" @keypress="parseIntsOnly($event)"
                      @input="maskNumber(tab, param, $event.target.value, subtab)">
                  </div>
                  <div class="ml-2 text-yellow-500 shrink-0" v-if="tidakBolehNol.includes(param)">
                    <Icon name="fe:warning" size="6mm" class="my-auto flex-none" />
                    Tidak boleh 0
                  </div>
                </div>
              </template>

              <hr v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'"
                class="h-px mt-8 border-black border-1 ml-12">
              <div v-if="tab !== 'default' && tab !== 'Jumlah Tenaga Kerja' && tab !== 'Informasi Tambahan'"
                class="mb-4 md:flex md:items-center">
                <div class="basis-1/3">
                  <label class="block text-sm font-bold mr-8 md:text-right" :for="labeling(tab + '_total')">
                    {{ tab + ' Total' }}
                  </label>
                </div>
                <div class="basis-3/5 flex mt-2">
                  <input
                    class="appearance-none border-b-2 h-100 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center"
                    :class="!total_fill[tab] ? 'bg-gray-100' : 'bg-white'" disabled readonly type="text" value="Rp">
                  <input
                    class="appearance-none border-b-2 w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                    :class="!total_fill[tab] ? 'bg-gray-100' : ''" :disabled="!total_fill[tab]"
                    :id="labeling(tab + '_total')" type="text" v-model="totals[tab]"
                    @input="parseIntFormatter2(tab, $event.target.value)" @keypress="parseIntsOnly($event)">
                  <button
                    class="bg-transparent hover:text-white hover:bg-gray-400 hover:border-transparent  text-gray-400 font-bold py-1 px-4 border border-blue  rounded ml-1"
                    :class="total_fill[tab] ? 'hidden' : ''" @click="sumParams(tab)" :disabled="total_fill[tab]">
                    Sum
                  </button>
                </div>
              </div>
            </div>

            <div v-if="tab === 'Jumlah Tenaga Kerja'">
              <div v-for="param in Object.keys(parameters[tab])" :key="param" class="md:flex md:items-center my-4">
                <div class="md:w-1/4">
                  <label class="block text-sm font-bold mr-8 md:text-right" :for="labeling(param)">
                    {{ param }}
                  </label>
                </div>
                <div class="md:w-1/4 flex">
                  <input
                    class="appearance-none border-b-2 h-100 py-auto px-3 my-1 w-[30%] text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                    :class="total_fill[tab] ? 'bg-gray-100' : ''" :id="labeling(param)" type="text"
                    :disabled="total_fill[tab]" v-model="parameters[tab][param]" @change="() => { }"
                    @keypress="parseIntsOnly($event)" @input="parseIntFormatter(tab, param, $event.target.value)">
                </div>
                <div class="ml-2 text-yellow-500" v-if="tidakBolehNol.includes(param)">
                  <Icon name="fe:warning" size="6mm" class="my-auto flex-none" />
                  Tidak boleh 0
                </div>
              </div>
            </div>
            <template v-if="tab === 'Informasi Tambahan'">
              <div v-for="param in informasi_tambahan" :key="param.id" class="mb-4 ml-8 flex-col">
                <div class="w-3/4 mb-2">
                  <label class="block text-sm font-bold mr-8 md:text-left" :for="labeling(param.id)">
                    {{ param.question }}
                  </label>
                </div>
                <div class="w-3/4">
                  <textarea rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write here..." v-model="param.jawaban" :id="labeling(param.id)"></textarea>
                </div>
              </div>
            </template>

          </div>
          <div class="absolute bottom-[82%] right-10 lg:top-[4%] lg:right-[4%] flex lg:flex-col gap-4">
            <button @click="prompt2 = true" type="button"
              class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-full h-9 mr-4">
              Save as Draft
            </button>
            <div class="flex relative">
              <button @click="prompt = true" type="button" class="text-white font-bold py-1 px-4 rounded-full w-32 h-9"
                :disabled="!isValid" :class="isValid ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300'">
                <Icon v-if="!isValid" name="fe:question" size="6mm" @mouseover="hoverSubmit = true"
                  @mouseleave="hoverSubmit = false" class="text-blue-500 absolute -top-3 -left-3 rounded-full" />
                Submit
              </button>
              <p class="text-gray-500 text-sm absolute top-9 lg:-top-8 lg:-left-56 lg:w-52 lg:text-right transition delay-300"
                :class="hoverSubmit ? 'block' : 'hidden'">{{
                  invalidMessage
                }}
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script setup>


const formatter = new Intl.NumberFormat("de-DE");

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const prompt = ref(false)
const prompt2 = ref(false)
const openFileInputModal = ref(false);

const handleFileSelected = (f) => {
  console.info('file: ', f);
  openFileInputModal.value = false;
}

// const { data, loading, call, request, error } = useRequest(postReport);

const modal2 = ref(false)

const modal_2 = ref(false)

const hoverSubmit = ref(false)

const tidakSiap = () => {
  modal.value.show = true
  modal.value.message = "Mohon maaf, fitur belum siap"
  modal.value.type = 'WARNING'
}

const tidakBolehNol = ['Penjualan', 'Modal Operasi', 'Jumlah Tenaga Kerja', 'Jam Kerja',]

function labeling(label) {
  const noSpaces = label.replace(/ /g, '');
  return noSpaces
}
function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }
  return years;
}

const invalidMessage = ref('')

const years = generateYearOptions()

const tab = ref('default')
const subtab = ref('')

// const tabList = ref(['Penjualan dan Modal', 'Biaya Tenaga Kerja', 'Bahan Yang Digunakan', 'Overhead Produksi', 'Bunga Pinjaman',
//   'Biaya Administrasi', 'Penyusutan', 'Pajak', 'Aktiva Perusahaan', 'Laba', 'Jumlah Tenaga Kerja', 'Informasi Tambahan'])

const tabList = ref(['Pendapatan', 'Modal', 'Biaya Tenaga Kerja', 'Beban Operasional', 'Beban Non Operasional',
  'Penyusutan', 'Bunga', 'Pajak', 'Laba', 'Tenaga Kerja', 'Informasi Tambahan'])

// const parameters = ref({
//   'Penjualan dan Modal': { 'Penjualan': null, 'Modal Operasi': null, 'Investasi': null },
//   'Biaya Tenaga Kerja': { 'Upah dan Gaji (Termasuk Direksi)': null, 'Dana Pensiun': null, 'Tunjangan-tunjangan Tenaga Kerja': null },
//   'Bahan Yang Digunakan': { 'Barang dan jasa yang dibeli': null, 'Barang yang digunakan': null, 'Bahan Baku': null, 'Bahan pengemas': null },
//   'Overhead Produksi': {
//     'Pekerjaan Subkontrak': null, 'Sewa': null, 'Air dan Listrik': null, 'Asuransi Perusahaan': null, 'Biaya Transport': null,
//     'Pemeliharaan Mesin': null, 'Biaya Supplies dan gudang': null, 'Biaya lain-lain': null
//   },
//   'Bunga Pinjaman': {
//     'Bunga Pinjaman Jangka Pendek': null,
//     'Bunga Pinjaman Jangka Panjang': null
//   },
//   'Biaya Administrasi': {
//     'Sewa': null, 'Air dan Listrik': null, 'Telepon': null,
//     'Pos dan telegram': null, 'Percetakan, Stationary & Office Supplies': null,
//     'Biaya Kendaraan': null, 'Advertising': null, 'Hiburan / Entertainment': null,
//     'Majalah dan surat kabar': null, 'Jamuan Makan': null, 'Perbaikan Umum': null,
//     'Biaya Bank': null, 'Biaya Akuntan dan Audit': null, 'Biaya Bantuan Hukum dan Jasa Profesional lainnya': null,
//     'Komisi': null, 'Biaya Umum': null
//   },
//   'Penyusutan': { 'Penyusutan Gedung': null, 'Penyusutan Peralatan dan Mesin': null },
//   'Pajak': { 'Pajak Penghasilan': null, 'Pajak Kekayaan': null, 'Pajak Upah': null },
//   'Aktiva Perusahaan': {
//     'Kas dan Bank': null, 'Persediaan': null, 'Piutang Dagang': null, 'Piutang Lain - Lain': null,
//     'Tanah': null, 'Gedung': null, 'Mesin dan Peralatan': null, 'Aktiva Tetap Lainnya': null
//   },
//   'Laba': { 'Laba Bersih': null, 'Laba Operasi': null },
//   'Jumlah Tenaga Kerja': { 'Jumlah Tenaga Kerja': null, 'Jam Kerja': null, 'Jam Kerja Lembur': null },
// })

const parameters = ref({
  'Pendapatan': {
    'Aset Tetap': {
      'Maintenance Fee': null,
      'Pendapatan Aset Tetap': null,
      'Peralihan Tenaga Kerja': null,
      'Pendapatan Penalty': null,
      'Dana Bantuan': null,
      'Hasil Pengelolaan': null,
      'Penanganan & Pengendalian': null,
      'Pengelolaan Lainnya': null,
    },
    'Retail': {
      'Fasilitas Produktif': null,
      'Fasilitas Penyimpanan': null,
      'Fasilitas Serbaguna': null,
      'Fasilitas Penunjang': null,
      'Pendapatan Logistik': null,
      'Penalty dan Denda': null,
      'Pendapatan Finansial': null,
      'Fasilias Sharing': null,
      'Pendapatan Lainnya': null,
    },
    'Lainnya': {
      'Jasa Keuangan': null,
      'Sponsor': null,
      'Denda & Penalty': null,
      'Klaim Asuransi': null,
      'Logistik': null,
      'Hasil Investasi': null
    }
  },
  'Modal': {
    'Lancar': {
      'Kas dan Setara Kas': null,
      'Surat Berharga': null,
      'Persediaan': null,
      'Piutang Usaha': null,
      'Piutang Lain - Lain': null,
      'Front Payment': null,
      'Aset Keuangan Lain': null,
      'Properti': null
    },
    'Tetap': {
      'Bangunan': null,
      'Peralatan': null,
      'Fasilitas, Sarana & Prasarana': null,
      'Hak Guna': null,
      'Tak Berwujud': null,
      'Tangguhan': null
    },
  },
  'Biaya Tenaga Kerja': {
    'Gaji dan Tunjangan': null,
    'Asuransi': null,
    'Insentif': null,
    'Pelatihan & Pendidikan': null,
    'Rekruitmen & Assesment': null,
    'Outsource': null,
    'Akomodasi': null,
    'Acara': null,
    'Pengamanan': null
  },
  'Beban Operasional': {
    'Konsultan': null,
    'Sewa': null,
    'Air dan Listrik': null,
    'Telpon dan Internet': null,
    'Asuransi Perusahaan': null,
    'Biaya Transport': null,
    'Biaya Supplies dan gudang': null,
    'Perangkat Lunak': null,
    'Perawatan': null,
    'Makan dan Minum': null,
    'Membership': null,
    'Rapat': null,
    'Kebersihan Lingkungan': null,
    'Pembaruan Sarana Prasarana': null,
    'Kendaraan': null,
    'Biaya lain-lain': null
  },
  'Beban Non Operasional': {
    'Cadangan Kerugian': null,
    'Beban Pajak Daerah': null,
    'Sentra Layanan': null,
    'Beban dan Denda Pajak': null,
    'Biaya Lainnya': null
  },
  'Penyusutan': { 'Penyusutan': null, },
  'Bunga': {
    'Jangka Pendek': null,
    'Jangka Panjang': null
  },
  'Pajak': { 'Pajak Final': null, 'Pajak Kini': null, 'Pajak Tangguhan': null },

  'Laba': { 'Laba Bersih': null },
  'Tenaga Kerja': { 'Jumlah Tenaga Kerja': null, 'Jam Kerja': null, 'Jam Kerja Lembur': null },
})

const hasNestedStructureCheck = (paramKey, parameters) => {
  // First check if the key exists in parameters
  if (!parameters[paramKey]) return false;

  // Get the value for this key
  const value = parameters[paramKey];

  // Check if value is an object
  if (typeof value !== 'object' || value === null) return false;

  // Check if the first level values are objects (indicating proper nested structure)
  // This ensures we only check the immediate children, not deeper nested values
  return Object.values(value).some(subValue =>
    typeof subValue === 'object' &&
    subValue !== null &&
    !Array.isArray(subValue) &&
    // Check that this object contains primitive values (strings, numbers, etc.)
    Object.values(subValue).every(deepValue =>
      typeof deepValue !== 'object' || deepValue === null
    )
  );
}

const hasNestedStructure = computed(() => {
  return hasNestedStructureCheck(tab.value, parameters.value)
})

const getSubtabs = computed(() => {
  if (hasNestedStructure.value) {
    // Only return the immediate keys under the current tab
    // e.g., for Pendapatan tab, only return ['Retail', 'Aset Tetap', 'Lainnya']
    const currentTabData = parameters.value[tab.value]
    return Object.keys(currentTabData).filter(key =>
      typeof currentTabData[key] === 'object' &&
      currentTabData[key] !== null
    )
  }
  return []
})

watch(tab, (newTab) => {
  if (hasNestedStructure.value) {
    // Set to first subtab by default
    subtab.value = getSubtabs.value[0]
  } else {
    subtab.value = ''
  }
})

function sumParams(tabs) {
  if (!hasNestedStructure.value) {
    // Handle non-nested structure
    for (let params of Object.keys(parameters.value[tabs])) {
      // Fill empty values with "0"
      if (!parameters.value[tabs][params] || parameters.value[tabs][params].length === 0) {
        parameters.value[tabs][params] = "0"
      }
    }
    let raw = JSON.parse(JSON.stringify(parameters.value[tabs]))
    for (let i of Object.keys(raw)) {
      raw[i] = parseInt(raw[i].replaceAll(".", ""))
    }
    const sums = Object.values(raw).reduce((accumulator, currentValue) =>
      accumulator + currentValue, 0)
    totals.value[tabs] = formatter.format(sums.toString())
  } else {
    // Handle nested structure
    let totalSum = 0

    // First, ensure all values are filled
    for (let sub of Object.keys(parameters.value[tabs])) {
      const subData = parameters.value[tabs][sub]

      if (typeof subData === 'object' && subData !== null) {
        // Handle second level nesting
        for (let secondLevel of Object.keys(subData)) {
          const secondLevelData = subData[secondLevel]
          // console.log(secondLevelData)

          if (typeof secondLevelData === 'object' && secondLevelData !== null) {
            // Fill all empty values in second level
            for (let params of Object.keys(secondLevelData)) {
              if (!secondLevelData[params] || secondLevelData[params].length === 0) {
                parameters.value[tabs][sub][secondLevel][params] = "0"
              }
            }
          } else {
            // Fill empty values in first level
            if (!secondLevelData || secondLevelData.length === 0) {
              parameters.value[tabs][sub][secondLevel] = 0
            }
          }
        }
      } else {
        // Fill empty direct values
        if (!subData || subData.length === 0) {
          parameters.value[tabs][sub] = "0"
        }
      }
    }

    // Then calculate the sum
    for (let sub of Object.keys(parameters.value[tabs])) {
      let subTotal = 0
      const subData = parameters.value[tabs][sub]

      if (typeof subData === 'object' && subData !== null) {
        for (let secondLevel of Object.keys(subData)) {
          const secondLevelData = subData[secondLevel]

          if (typeof secondLevelData === 'object' && secondLevelData !== null) {
            // Sum second level nested values
            for (let params of Object.keys(secondLevelData)) {
              const cleanValue = secondLevelData[params].toString().replaceAll(".", "")
              subTotal += parseInt(cleanValue) || 0
            }
          } else {
            // Sum first level values
            const cleanValue = secondLevelData.toString().replaceAll(".", "")
            subTotal += parseInt(cleanValue) || 0
          }
        }
      } else {
        // Sum direct values
        const cleanValue = subData.toString().replaceAll(".", "")
        subTotal += parseInt(cleanValue) || 0
      }

      totalSum += subTotal
    }
    totals.value[tabs] = formatter.format(totalSum.toString())
  }
}

function zeroParams(tabs) {
  for (let param of Object.keys(parameters.value[tabs])) {
    parameters.value[tabs][param] = '0'
  }
}

const informasi_tambahan = ref([
  { id: "pertanyaan_1", jawaban: null, question: 'Teknik, metode apa saja yang sudah diterapkan perusahaan untuk meningkatkan produktivitas' },
  { id: "pertanyaan_2", jawaban: null, question: 'Apa saja Kebijakan pimpinan perusahaan dalam rangka mendorong peningkatan produktivitas perusahaan dan tenaga kerja?' },
  { id: "pertanyaan_3", jawaban: null, question: 'Pada tiga tahun terakhir ini apakah perusahaan anda meningkat atau menurun kemajuan atau produktivitasnya?' },
  { id: "pertanyaan_4", jawaban: null, question: 'Jika terjadi peningkatan kemajuan /produktivitas perusahaan, apa saja penyebabnya?' },
  { id: "pertanyaan_5", jawaban: null, question: 'Dan jika terjadi penurunan kemajuan/produktivitas perusahaan, apa saja penyebabnya?' }
])


const total_fill = ref({
  'Pendapatan': false,
  'Modal': false,
  'Biaya Tenaga Kerja': false,
  'Beban Operasional': false,
  'Beban Non Operasional': false,
  'Penyusutan': false,
  'Bunga': false,
  'Pajak': false,
  'Laba': false
})

const totals = ref({
  'Pendapatan': null,
  'Modal': null,
  'Biaya Tenaga Kerja': null,
  'Beban Operasional': null,
  'Beban Non Operasional': null,
  'Penyusutan': null,
  'Bunga': null,
  'Pajak': null,
  'Laba': null
})

const selectedYear = ref(new Date().getFullYear())
const yearOptions = ref(generateYearOptions())

const reportType = ref({
  type: "Tahun",
  value: 1
})

const isValid = computed(() => {
  let obj = totals.value
  let pembelian_bahan_jasa = parseInt(obj['Bahan Yang Digunakan']) + parseInt(obj['Overhead Produksi']) + parseInt(obj['Biaya Administrasi'])
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === null) {
      invalidMessage.value = "Isian belum lengkap"
      return false
    }
  }

  let obj2 = parameters.value["Jumlah Tenaga Kerja"]
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key) && obj2[key] === null) {
      invalidMessage.value = "Isian belum lengkap"
      return false
    }
  }
  if (pembelian_bahan_jasa === 0) {
    invalidMessage.value = "Bahan Yang Digunakan, Overhead Produksi, dan Biaya Administrasi tidak boleh berjumlah 0"
    return false
  }

  return true;
})

const closeModal = () => {
  modal.value.show = false
}

function maskNumber(tab, param, value, subtab = null) {
  // Remove non-digit characters and format with thousand separators
  const formattedValue = value.toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') || '0';

  // Update value using dynamic path
  const target = subtab ? parameters.value[tab][subtab] : parameters.value[tab];
  target[param] = formattedValue;
}

function parseIntFormatter(tab, param, value, subtab = null) {
  if (hasNestedStructure.value && subtab) {
    // Handle nested parameters
    parameters.value[tab][subtab][param] = formatter.format(value.toString())
  } else {
    // Handle non-nested parameters
    parameters.value[tab][param] = formatter.format(value.toString())
  }
}

function parseIntFormatter2(tab, vals) {
  let priceStr = vals.toString().replaceAll(".", "");
  totals.value[tab] = formatter.format(priceStr.toString())
}

function parseIntsOnly(tab, param, value, subtab = null) {
  // Only allow numbers
  if (!/^\d+$/.test(value)) {
    return;
  }

  // Convert value to string and remove any existing formatting
  let cleanValue = value.toString().replace(/[^\d]/g, '');

  if (hasNestedStructure.value && subtab) {
    // Get current value from parameters
    let currentValue = parameters.value[tab][subtab][param] || '';
    // Remove existing formatting
    currentValue = currentValue.replace(/[^\d]/g, '');

    // Update with new value
    if (cleanValue.length > currentValue.length) {
      // Format number with thousand separator
      const formattedValue = new Intl.NumberFormat('id-ID').format(cleanValue);
      parameters.value[tab][subtab][param] = formattedValue;
    } else {
      parameters.value[tab][subtab][param] = cleanValue;
    }
  } else {
    // Same logic for non-nested parameters
    let currentValue = parameters.value[tab][param] || '';
    currentValue = currentValue.replace(/[^\d]/g, '');

    if (cleanValue.length > currentValue.length) {
      const formattedValue = new Intl.NumberFormat('id-ID').format(cleanValue);
      parameters.value[tab][param] = formattedValue;
    } else {
      parameters.value[tab][param] = cleanValue;
    }
  }
}

</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 6px;
  transition: ease-in-out 0.3s;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  transition: ease-in-out 0.3s;
}
</style>