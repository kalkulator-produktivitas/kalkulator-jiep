<template>
  <div id="layout" class="md:mx-auto my-6 mx-auto flex">
    <div class="shrink-0 w-[5%]"></div>
    <div class="gap-4 relatives h-full">
      <div class="w-[40%] mb-4 flex">
        <label for="underline_select" class="text-lg font-bold my-auto mr-4">Pilih Divisi</label>
        <select id="underline_select" v-model="selectedDiv" @change="reactiveState++"
          class="block py-2 px-3 text-md text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none">
          <option v-for="divisi of division" :key="divisi" class="text-lg">{{ divisi }}</option>
        </select>
      </div>
      <div class="h-full w-[92vw] overflow-y-auto">
        <div class="gap-4 relatives h-full">
          <div class="grid grid-cols-11 gap-4 h-[50%]">
            <GraphKpiBar class="col-span-8" id="2" :dataset="filterData" :key="`bar-${reactiveState}`" :years="years"
              :divisi="selectedDiv" :pegawai-count="filterData.length" />
            <GraphKpiDoughnut class="col-span-3" :dataset="filterData" :years="years" :title="selectedDiv"
              :key="`doughnut-${reactiveState}`" />

          </div>
          <div class="grid grid-cols-11 gap-4 mt-4">
            <GraphKpiLine class="col-span-8" :dataset="filterData" :years="years" :key="`line-${reactiveState}`" />
            <GraphKpiHbar class="col-span-3" :dataset="filterData" :years="years" :key="`bar2-${reactiveState}`" />
          </div>
        </div>
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
import dummy_2 from '~/assets/dummy_karyawan_jiep_real.json'

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


</script>

<style scoped></style>