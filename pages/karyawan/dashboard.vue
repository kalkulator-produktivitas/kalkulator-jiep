<template>
  <div id="layout" class="md:mx-auto my-6 mx-auto flex">
    <div class="shrink-0 w-[5%]"></div>
    <div class="h-full w-[100vw] overflow-y-auto">
      <div v-if="available" class="gap-4 relatives h-full">
        <div class="w-[50%] mb-4 flex">
          <label for="underline_select" class="text-lg my-auto mr-4">Divisi</label>
          <select id="underline_select" v-model="selectedDiv" @change="reactiveState++"
            class="block py-2 px-3 text-md text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none">
            <option v-for="divisi of division" :key="divisi" class="text-lg">{{ divisi }}</option>
          </select>
        </div>
        <div class="grid grid-cols-12 gap-4 h-[50%]">
          <GraphKpiBar class="col-span-8" id="2" :dataset="filterData" :key="`bar-${reactiveState}`" :years="years" />
          <GraphKpiDoughnut class="col-span-3" :dataset="filterData" :years="years" :title="selectedDiv"
            :key="`doughnut-${reactiveState}`" />

        </div>
        <div class="grid grid-cols-12 gap-4 mt-4">
          <GraphKpiLine class="col-span-8" :dataset="filterData" :years="years" :key="`line-${reactiveState}`" />
          <GraphKpiHbar class="col-span-3" :dataset="filterData" :years="years" :key="`bar2-${reactiveState}`" />
        </div>
      </div>
      <div v-else>
        <p class="text-xl text-center text-black">
          Belum Ada Laporan
        </p>
      </div>
    </div>
    <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
});


const global = useRuntimeConfig();

let available = ref(true)
const route = useRouter()
import dummy from '~/assets/dummy_karyawan.json'
import dummy_2 from '~/assets/dummy_karyawan_new.json'

let loading = ref(false)

let division = ref(Array.from(new Set(dummy_2.list.map(x => x.Divisi))))

let years = ref(dummy_2.metadata.year)

let selectedDiv = ref("Business Development & Planning")

let data_baru = ref()

const filterData = computed(() => {
  let selectedData = dummy_2.list.filter(x => x.Divisi === selectedDiv.value)
  return selectedData
})

const { id } = useRoute().params

const reactiveState = ref(0)

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const closeModal = () => {
  modal.value.show = false
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const selectedMonth = ref('Jan')

const state = ref(0)

const data = ref([])

const specifiedData = computed(() => {
  let raw = dummy.filter(x => x.id === "karyawan-1")[0]
  return raw
})

const lineData = ref({
  "Capaian Target": {
    labels: months,
    datasets: [
      {
        label: "Capaian per Target",
        backgroundColor: '#034EA2',
        data: specifiedData.value.data.map(x => x.capaian_per_target),
      },
    ]
  },
  "Waktu Produksi": {
    labels: months,
    datasets: [
      {
        label: "Produksi per Detik",
        backgroundColor: '#034EA2',
        data: specifiedData.value.data.map(x => x.produksi_per_waktu),
      },
    ]
  },
  "Material Produksi": {
    labels: months,
    datasets: [
      {
        label: "Produksi per Material",
        backgroundColor: '#034EA2',
        data: specifiedData.value.data.map(x => x.produksi_per_material),
      },
    ]
  },
  "Produk tidak Reject": {
    labels: months,
    datasets: [
      {
        label: "Produk Accept per Total Produksi",
        backgroundColor: '#034EA2',
        data: specifiedData.value.data.map(x => x.persen_produk_go),
      },
    ]
  },
  "Total Skor Sikap": {
    labels: months,
    datasets: [
      {
        label: "Skor Sikap",
        backgroundColor: '#034EA2',
        data: specifiedData.value.data.map(x => x.total_skor_sikap),
      },
    ]
  }
})

const sikapData = computed(() => {
  let skor = specifiedData.value.data[months.indexOf(selectedMonth.value)].total_skor_sikap
  let dataReturn = { title: '', icon: '', color: '' }
  if (skor <= 11) {
    dataReturn.title = 'Tidak Memuaskan'
    dataReturn.icon = 'streamline:smiley-crying-1-solid';
    dataReturn.color = 'text-red-500'
  } else if (skor > 11 && skor <= 22) {
    dataReturn.title = 'Kurang Memuaskan'
    dataReturn.icon = 'streamline:sad-face-solid';
    dataReturn.color = 'text-orange-500'
  } else if (skor > 22 && skor <= 33) {
    dataReturn.title = 'Cukup Memuaskan'
    dataReturn.icon = 'streamline:straight-face-solid';
    dataReturn.color = 'text-yellow-500'
  } else if (skor > 33 && skor <= 44) {
    dataReturn.title = 'Memuaskan'
    dataReturn.icon = 'streamline:happy-face-solid';
    dataReturn.color = 'text-lime-500'
  } else if (skor > 44 && skor <= 55) {
    dataReturn.title = 'Sangat Memuaskan'
    dataReturn.icon = 'streamline:smiley-happy-solid';
    dataReturn.color = 'text-green-500'
  }
  return dataReturn
})

</script>

<style scoped></style>