<template>
  <div id="layout" class="md:mx-auto mt-12 mb-6 mx-auto flex">
    <div class="shrink-0 w-[5%]"></div>
    <div class="absolute flex flex-row top-5 left-20">
      <select id="tahun"
        class="ml-2 block text-center w-[60px] text-md text-gray-700 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        v-model="selectedYear">
        <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
      </select>
      <div class="ml-8">
        <button class="flex gap-2 justify-center items-center rounded-full px-4 py-2 bg-blue-500 text-white text-sm"
          @click="openFileInputModal = true">
          <Icon name="mdi:upload" />
          <p>Upload dari Excel</p>
        </button>
        <FileUploadModal title="Upload File KPI Karyawan" v-model:show="openFileInputModal"
          @file-selected="handleFileSelected" />
      </div>
    </div>
    <div class="w-full flex flex-row mt-6">
      <div class="overflow-y-auto px-1 shrink-0 h-[85vh] border-r-2">
        <ul class="flex list-none flex-col flex-wrap border-b-0 pl-0">
          <li v-for="tabName in divisi" :key="tabName" class="mr-2">
            <button class="inline-block px-4 py-3" @click="selectedDivisi = tabName"
              :class="selectedDivisi === tabName ? 'text-blue-600 border-l-2 border-blue-600 active' : 'border-l-2 border-transparent hover:text-gray-600 hover:border-gray-300'">
              {{ tabName }}
            </button>
          </li>
        </ul>
      </div>
      <div class="col-span-6 overflow-y-auto flex w-[100%] pl-2">
        <div class="w-[50%] h-[85vh] overflow-y-auto bg-white rounded-lg shadow-sm p-4">
          <div class="flex w-full items-center mb-4">
            <div class="w-[150px]"></div>
            <div class="flex items-center">
              <div class="flex space-x-8">
                <div class="text-center">
                  <p class="text-sm font-semibold text-gray-600 uppercase tracking-wider">Capaian</p>
                  <div class="h-1 w-16 bg-blue-500 mx-auto mt-1 rounded-full"></div>
                </div>
                <div class="text-center">
                  <p class="text-sm font-semibold text-gray-600 uppercase tracking-wider">KPI</p>
                  <div class="h-1 w-16 bg-blue-500 mx-auto mt-1 rounded-full"></div>
                </div>
                <button @click="employeeDivisionShare(selectedDivisi)"
                  :disabled="!allSelectedDivisionFilled || !shareGain['gain share'] || !shareGain['koefisien kontribusi']"
                  class="ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  :class="!allSelectedDivisionFilled || !shareGain['gain share'] || !shareGain['koefisien kontribusi'] ?
                    'bg-gray-100 text-gray-400 cursor-not-allowed' :
                    'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'">
                  Calculate Share
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-0">
            <div v-for="param in selectDiv" :key="param.karyawan"
              class="group flex items-center p-2 transition-colors duration-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 rounded-lg"
              :class="[(param.capaian < (0.5 * param.kpi)) && (param.bobot !== null) ? 'bg-red-200' : '', (param.capaian > (0.9 * param.kpi)) && (param.bobot !== null) ? 'bg-green-200' : '']">
              <label class="text-sm font-medium text-gray-700 w-[120px] text-right mr-8" :for="param.karyawan">
                {{ param.karyawan }}
              </label>
              <div class="flex w-[400px] items-center space-x-4">
                <input
                  class="w-[80px] py-2 px-3 text-center rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
                  :id="`${param.karyawan}-capaian`" type="number" v-model="param.capaian"
                  @keypress="(e) => !/^\d$/.test(e.key) && e.preventDefault()">
                <input
                  class="w-[80px] py-2 px-3 text-center rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
                  :id="`${param.karyawan}-kpi`" type="number" v-model="param.kpi"
                  @keypress="(e) => !/^\d$/.test(e.key) && e.preventDefault()">
                <p v-if="param.bobot" class="text-gray-700 font-medium">
                  Rp {{ maskNumber2(parseInt(param.bobot * (parseInt(shareGain['gain share'].replaceAll(".", "")) * 15 /
                    100))) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[40%] flex flex-col mx-auto relative bg-white shadow-lg rounded-lg ">
          <div class="bg-gradient-to-r from-blue-100 to-blue-50">
            <p class="w-full text-center font-bold text-lg py-2">
              Parameter Pengupahan
            </p>
          </div>
          <div class="w-full rounded-md mt-4 p-6">
            <div class="mb-4">
              <div class="mr-4">
                <label class="block font-semibold text-gray-700">
                  Nilai Tambah
                </label>
              </div>
              <div class="flex w-[50%] ml-2">
                <input disabled
                  class="appearance-none border-b-2 h-10 py-2.5 text-gray-700 text-sm leading-tight w-6 text-center bg-gray-200 rounded-l-md"
                  type="text" value="Rp">
                <input disabled
                  class="appearance-none border-b-2 w-full h-10 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline bg-gray-200  rounded-r-md"
                  @input="maskNumber('rasio nilai tambah', $event.target.value)" @keypress="(e) => !/^\d$/.test(e.key) &&
                    !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key) &&
                    e.preventDefault()" type="text" v-model="shareGain['nilai tambah']" />
              </div>
            </div>
            <div class="flex flex-col mb-4">
              <div class="mr-4">
                <label class="block font-semibold text-gray-700">
                  Rasio Nilai Tambah
                </label>
              </div>
              <div class="flex w-[10%] ml-2">
                <!-- <input disabled
                  class="appearance-none border-b-2 h-10 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center bg-white rounded-l-md"
                  type="text" value="  "> -->
                <input
                  class="appearance-none border-b-2 w-20 h-10 py-2.5 px-3 text-gray-800 text-sm leading-tight focus:outline-none focus:shadow-outline bg-gray-50 rounded-md shadow-sm transition duration-200 ease-in-out focus:ring-1 focus:ring-blue-400"
                  type="number" v-model="shareGain['rasio nilai tambah']" />
              </div>
            </div>
            <div class="flex flex-col mb-4">
              <div class="mr-4">
                <label class="block font-semibold text-gray-700">
                  Upah Dibayarkan
                </label>
              </div>
              <div class="flex w-[75%]">
                <div class="flex w-[75%] items-center">
                  <input disabled
                    class="appearance-none border-b-2 h-10 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center bg-gray-200 rounded-l-md"
                    type="text" value="Rp">
                  <input disabled
                    class="appearance-none border-b-2 w-full h-10 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline bg-gray-200 rounded-r-md"
                    @input="maskNumber('rasio nilai tambah', $event.target.value)" @keypress="(e) => !/^\d$/.test(e.key) &&
                      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key) &&
                      e.preventDefault()" type="text" v-model="shareGain['upah dibayarkan']" />
                </div>
              </div>
            </div>
            <div class="flex flex-col mb-4">
              <div class="mr-4">
                <label class="block font-semibold text-gray-800">
                  Reserve Ratio
                </label>
              </div>
              <div class="flex w-[75%] items-center">
                <input disabled
                  class="appearance-none border-b-2 h-10 py-2.5 ml-2 text-gray-800 text-sm leading-tight w-6 text-center bg-gray-100 rounded-l-md"
                  type="text" value="%">
                <input v-model="shareGain['reserve ratio']"
                  class="appearance-none border-b-2 w-20 h-10 py-2.5 px-3 text-gray-800 text-sm leading-tight focus:outline-none focus:shadow-outline bg-gray-50 rounded-r-md shadow-sm transition duration-200 ease-in-out focus:ring-1 focus:ring-blue-400" />
              </div>
            </div>
            <hr class="h-px mt-8 border-gray-600">
            <div class="flex mt-4 justify-between">
              <div class="flex flex-col">
                <div class="mr-4">
                  <label class="block font-semibold text-gray-700">
                    Gain Sharing
                  </label>
                </div>
                <div class="flex">
                  <input disabled
                    class="appearance-none border-b-2 h-10 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center bg-gray-100 rounded-l-md"
                    type="text" value="Rp">
                  <input disabled
                    class="appearance-none border-b-2 w-full h-10 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline bg-gray-100 rounded-r-md"
                    @input="maskNumber('gain share', $event.target.value)" @keypress="(e) => !/^\d$/.test(e.key) &&
                      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key) &&
                      e.preventDefault()" type="text" v-model="shareGain['gain share']" />
                </div>
              </div>
              <div>
                <button
                  class="self-center justify-self-end bg-blue-500 text-white ml-8 hover:bg-blue-600 transition-all font-bold py-1 px-4 rounded"
                  @click="calculateShare">
                  Hitung
                </button>
              </div>
            </div>
            <div class="flex flex-col mt-4">
              <div class="mr-4">
                <label class="block font-semibold text-gray-700">
                  Koefisien Kontribusi
                </label>
              </div>
              <div class="flex">
                <input disabled
                  class="appearance-none border-b-2 h-10 py-2.5 ml-2 text-gray-800 text-sm leading-tight w-6 text-center bg-gray-100 rounded-l-md"
                  type="text" value="%">
                <input v-model="shareGain['koefisien kontribusi']"
                  class="appearance-none border-b-2 w-20 h-10 py-2.5 px-3 text-gray-800 text-sm leading-tight focus:outline-none focus:shadow-outline bg-gray-50 rounded-r-md shadow-sm transition duration-200 ease-in-out focus:ring-1 focus:ring-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute top-[2%] right-[5%] flex flex-row gap-1">
      <button @click="prompt2 = true" type="button"
        class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-full h-9 mr-4">
        Save as Draft
      </button>
      <button @click="prompt = true" type="button"
        class="text-white font-bold py-1 bg-blue-500 hover:bg-blue-700 px-4 rounded-full w-32 h-9">
        Submit
      </button>
    </div>

    <Loading v-if="loading" text="Menginput Data" />
    <ModalsPrompt v-if="prompt" @submit="formRequest()" @close="prompt = false" title="Submit laporan?"
      sub="Laporan bersifat final dan hanya bisa diubah dengan izin admin P3D" />
    <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
  </div>
</template>

<script setup>


const router = useRouter()
import dummy from '~/assets/dummy_karyawan_new.json'
import dummy_2 from '~/assets/dummy_produktivitas.json'
console.log('Loaded dummy_2:', dummy_2)

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

const loading = ref(false)

const tidakSiap = () => {
  modal.value.show = true
  modal.value.message = "Mohon maaf, fitur belum siap"
  modal.value.type = 'WARNING'
}

function handleFileSelected(f) {
  console.info('file: ', f)
  openFileInputModal.value = false;
}

// function labeling(label) {
//   const noSpaces = label.replace(/ /g, '');
//   return noSpaces
// }
function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 20; i++) {
    years.push(currentYear - i);
  }
  return years;
}

const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const divisi = Array.from(new Set(dummy.list.map(x => x.Divisi)))

const selectedYear = ref(2021)
const selectedDivisi = ref(divisi[0])

const tab = ref('default')
const tabList = ref(['Produktivitas Individu', 'Sikap Produktif'])
const parameters = ref([])

const showParameter = ref(false)

parameters.value = dummy.list.map(x => ({
  "divisi": x.Divisi,
  "departemen": x.Departemen,
  "karyawan": x.Karyawan,
  "jabatan": x["Jabatan"],
  "no": x["No"],
  "capaian": null,
  "kpi": null,
  "bobot": null,
}))

const selectDiv = computed(() => {
  return parameters.value.filter(x => x.divisi === selectedDivisi.value)
})


const selectedMonth = ref("Jan")
const yearOptions = ref([2021, 2022, 2023])

const shareGain = ref({
  "nilai tambah": "0",
  "rasio nilai tambah": null,
  "upah dibayarkan": "0",
  "reserve ratio": null,
  "gain share": null,
  "koefisien kontribusi": null,
})

const updateShareGainValues = (year) => {
  try {
    const yearData = dummy_2.analisis.find(x => x.tahun === year)
    if (yearData) {
      console.log(yearData);
      shareGain.value["nilai tambah"] = yearData.nilai_tambah?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') ?? "0"
      shareGain.value["upah dibayarkan"] = yearData.total_biaya_tenaga_kerja?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') ?? "0"
    }
  } catch (error) {
    console.error('Error updating share gain values:', error)
    shareGain.value["nilai tambah"] = "0"
    shareGain.value["upah dibayarkan"] = "0"
  }
}

onMounted(() => {
  updateShareGainValues(selectedYear.value)
})

watch(selectedYear, (newYear) => {
  updateShareGainValues(newYear)
})

function maskNumber(param, value) {
  // Remove non-digit characters and format with thousand separators
  const formattedValue = value.toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') || '0';

  // Update value using dynamic path
  shareGain.value[param] = formattedValue;
}

const maskNumber2 = (value) => {
  return value.toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') || '0';
}


const calculateShare = () => {
  let nilai_tambah = shareGain.value['nilai tambah'] ? parseFloat(shareGain.value['nilai tambah'].replaceAll(".", "")) : 0
  let upah_dibayarkan = shareGain.value['upah dibayarkan'] ? parseFloat(shareGain.value['upah dibayarkan'].replaceAll(".", "")) : 0

  let tempData = ((nilai_tambah / parseFloat(shareGain.value['rasio nilai tambah'])) - (upah_dibayarkan)) * (1 - parseFloat(shareGain.value['reserve ratio']) / 100)

  shareGain.value['gain share'] = parseInt(tempData).toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') || '0';
}

const closeModal = () => {
  modal.value.show = false
}

const asddasdasd = computed(() => {
  return parameters.value.filter(x => x.divisi === selectedDivisi.value)
})

const allSelectedDivisionFilled = computed(() => {
  const params = parameters.value.filter(x => x.divisi === selectedDivisi.value)
  return params.every(x => x.capaian && x.kpi)
})

const employeeDivisionShare = (divisi) => {
  // Get all employees in the selected division
  const divisionEmployees = parameters.value.filter(x => x.divisi === divisi)

  // Calculate total score only for employees with both capaian and kpi values
  const totalScore = divisionEmployees.reduce((acc, curr) => {
    if (curr.capaian && curr.kpi) {
      // console.log(curr.capaian / curr.kpi * 100);
      return acc + (curr.capaian / curr.kpi * 100)
    }
    return acc
  }, 0)
  console.log(totalScore);

  // Update bobot for each employee
  divisionEmployees.forEach(employee => {
    if (employee.capaian && employee.kpi) {
      const individualScore = (employee.capaian / employee.kpi * 100)
      employee.bobot = individualScore / totalScore
      console.log(employee.bobot);

    } else {
      employee.bobot = 0
    }
  })
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

/* Remove spinner buttons for number inputs */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  /* Firefox */
}
</style>
