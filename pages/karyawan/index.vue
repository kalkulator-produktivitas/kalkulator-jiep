<template>
  <div id="layout" class="md:mx-auto mt-12 mb-6 mx-auto flex">
    <div class="shrink-0 w-[5%]"></div>
    <div class="absolute flex flex-row top-5 left-20">
      <select id="tahun"
        class="ml-2 block text-center w-[60px] text-md text-gray-700 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        v-model="selectedYear">
        <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <div class="container max-w flex flex-row mt-6">
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
      <div class="col-span-6 overflow-y-auto flex w-[90%] pl-2">
        <div class="w-[45%] h-[85vh] overflow-y-auto border-r-2">
          <div class="flex w-full">
            <div class="block text-sm font-bold mr-8 md:text-right w-[120px]">

            </div>
            <div class="flex w-[400px]">
              <p class="text-lg font-bold w-[80px] text-center">CAPAIAN</p>
              <p class="text-lg font-bold w-[80px] ml-4 text-center">KPI</p>
              <button v-if="allSelectedDivisionFilled && shareGain['gain share'] && shareGain['koefisien kontribusi']"
                @click="employeeDivisionShare(selectedDivisi)"
                class="text-sm ml-4 text-center border rounded-md px-2 py-1 hover:bg-gray-200 transition-all">Calculate
                Share</button>
            </div>

          </div>
          <hr class="mt-2 border-black border-1 ml-4 w-[60%]">
          <div v-for="param in selectDiv" :key="param.karyawan" class="mb-4 md:flex md:items-center">
            <div class="flex w-full my-0.5">
              <label class="block text-sm font-bold mr-8 md:text-right w-[120px] self-end" :for="param.karyawan">
                {{ param.karyawan }}
              </label>
              <div class="flex w-[400px]">
                <input
                  class="appearance-none border-b-2 border-gray-600 w-[80px] py-1.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                  :id="param.karyawan" type="number" v-model="param.capaian"
                  @keypress="(e) => !/^\d$/.test(e.key) && e.preventDefault()">
                <input
                  class="appearance-none border-b-2 border-gray-600 w-[80px] py-1.5 ml-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                  :id="param.karyawan" type="number" v-model="param.kpi"
                  @keypress="(e) => !/^\d$/.test(e.key) && e.preventDefault()">
                <p v-if="param.bobot"
                  class="w-full ml-4 text-gray-700 self-center leading-tight focus:outline-none focus:shadow-outline text-left"
                  :id="param.karyawan">Rp {{ maskNumber2(param.bobot * parseInt(shareGain['gain share'].replaceAll(".",
                    "")) / 100) }}</p>

              </div>
              <div class="flex">

              </div>
            </div>

          </div>
        </div>
        <div class="w-[50%] h-[70%] flex mx-auto my-auto relative">
          <button @click="showParameter = !showParameter"
            class="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-lg h-12 rounded-full px-4 py-1.5 hover:bg-blue-700 transition-all">Lihat
            Parameter
            Pengupahan</button>
          <div v-if="showParameter" class="mt-[20%] w-full border border-gray-600 rounded-md p-4">
            <div class="flex">
              <div class="w-[25%] self-center text-right mr-2 my-4">
                <label class="block font-bold">
                  Nilai Tambah
                </label>
              </div>
              <div class="flex w-[75%] items-center">
                <input disabled
                  class="appearance-none border-b-2 h-10 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center bg-gray-200 rounded-l-md"
                  type="text" value="Rp">
                <input disabled
                  class="appearance-none border-b-2 w-full h-10 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline bg-gray-200 rounded-r-md"
                  @keypress="(e) => !/^\d$/.test(e.key) &&
                    !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key) &&
                    e.preventDefault()" type="text" v-model="shareGain['nilai tambah']" />
              </div>
            </div>
            <div class="flex my-4">
              <div class="w-[25%] self-center text-right mr-2">
                <label class="block font-bold">
                  Rasio Nilai Tambah
                </label>
              </div>
              <div class="flex w-[75%]">
                <input disabled
                  class="appearance-none border-b-2 h-10 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center bg-white rounded-l-md"
                  type="text" value="  ">
                <input
                  class="appearance-none border-b-2 w-full h-10 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline bg-white rounded-r-md"
                  type="number" v-model="shareGain['rasio nilai tambah']" />
              </div>
            </div>
            <div class="flex my-4">
              <div class="w-[25%] self-center text-right mr-2">
                <label class="block font-bold">
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
            <div class="flex my-4">
              <div class="w-[25%] self-center text-right mr-2">
                <label class="block font-bold">
                  Reserve Ratio
                </label>
              </div>
              <div class="flex w-[75%]">
                <input disabled
                  class="appearance-none border-b-2 h-10 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center bg-white rounded-l-md"
                  type="text" value="%">
                <input v-model="shareGain['reserve ratio']"
                  class="appearance-none border-b-2 w-20 h-10 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline bg-white rounded-r-md" />
              </div>
            </div>
            <hr class="h-px mt-8 border-black border-1 ml-12">
            <div class="flex w-[100%] mt-2">
              <div class="w-[80%] self-center text-right mr-2">
                <label class="block font-bold">
                  Gain Sharing
                </label>
              </div>
              <input disabled
                class="appearance-none border-b-2 h-10 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center bg-gray-200 rounded-l-md"
                type="text" value="Rp">
              <input disabled
                class="appearance-none border-b-2 w-full h-10 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline  bg-gray-200 rounded-r-md"
                @input="maskNumber('gain share', $event.target.value)" @keypress="(e) => !/^\d$/.test(e.key) &&
                  !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key) &&
                  e.preventDefault()" type="text" v-model="shareGain['gain share']" />
              <button
                class="self-center justify-self-end bg-transparent ml-8 hover:text-white hover:bg-gray-400 hover:border-transparent  text-gray-400 font-bold py-1 px-4 border border-blue  rounded"
                @click="calculateShare">
                Calc
              </button>
            </div>
            <div class="flex w-[80%] mt-2">
              <div class="w-[40%] self-center text-right mr-2">
                <label class="block font-bold">
                  Koefisien Kontribusi
                </label>
              </div>
              <input disabled
                class="appearance-none border-b-2 h-10 py-2.5 ml-2 text-gray-700 text-sm leading-tight w-6 text-center bg-white rounded-l-md"
                type="text" value="%">
              <input v-model="shareGain['koefisien kontribusi']"
                class="appearance-none border-b-2 w-20 h-10 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline  bg-white rounded-r-md" />
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-[5%] right-[5%]">
      <button @click="prompt = true" type="button"
        class="text-white font-bold py-1 bg-blue-500 hover:bg-blue-700 px-4 rounded-full w-32 h-9">
        Submit
      </button>
    </div>

    <!-- {{ parameters }} -->
    <Loading v-if="loading" text="Menginput Data" />
    <ModalsPrompt v-if="prompt" @submit="formRequest()" @close="prompt = false" title="Submit laporan?"
      sub="Laporan bersifat final dan hanya bisa diubah dengan izin admin P3D" />
    <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
  </div>
</template>

<script setup>


const router = useRouter()
import dummy from '~/assets/dummy_karyawan_new.json'

const formatter = new Intl.NumberFormat("de-DE");

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const prompt = ref(false)
const prompt2 = ref(false)


const loading = ref(false)

const tidakSiap = () => {
  modal.value.show = true
  modal.value.message = "Mohon maaf, fitur belum siap"
  modal.value.type = 'WARNING'
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

const selectedYear = ref(new Date().getFullYear())
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
const yearOptions = ref(generateYearOptions())

const shareGain = ref({
  "nilai tambah": "179.217.852.727",
  "rasio nilai tambah": 2.04,
  "upah dibayarkan": "72.332.929.047",
  "reserve ratio": 25,
  "gain share": null,
  "koefisien kontribusi": null,
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
  // console.log(tempData);

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