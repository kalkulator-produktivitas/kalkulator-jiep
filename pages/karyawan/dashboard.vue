<template>
  <div id="layout" class="md:mx-auto my-6 mx-auto flex">
    <div class="shrink-0 w-[5%]"></div>
    <div class="h-[92vh] w-[100vw]">
      <div v-if="available" class="gap-4 relatives">
        <div class="w-[50%]">
          <label for="underline_select" class="sr-only"></label>
          <select id="underline_select" v-model="selectedDiv"
            class="block py-1 text-center text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-600 peer">
            <option v-for="divisi of division" class="text-sm">{{ divisi }}</option>
          </select>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <GraphKpiBar class="col-span-8" id="2" :dataset="filterData" :key="`line2-${reactiveState}`" :years="years" />
          <div class="col-span-3 grid grid-rows-4 gap-4">
            <div class="row-span-1 flex flex-col">
              <div class="w-full">
                <div class="mb-2 flex">
                  <div class="w-[60%] relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input type="search" id="default-search"
                      class="w-full p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
                      placeholder="ID Karyawan">
                  </div>
                  <div class="w-[40%] relative ml-2">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input type="search" id="default-search"
                      class="w-full p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
                      placeholder="Tahun">
                  </div>

                </div>

              </div>
              <div class="w-full flex justify-between">
                <div class="mr-4 flex border rounded-full bg-gray-50">
                  <p class="my-auto font-bold mx-4 text-center text-gray-600">Pilih Bulan</p>
                  <select id="year" @change="reactiveState++"
                    class="block text-left w-[60px] py-0.5 bg-gray-100 rounded-full font-bold text-gray-600 border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-gray-500 focus:border-gray-500 peer transition ease-in-out"
                    v-model="selectedMonth">
                    <option v-for="mnt in months" :key="mnt">{{ mnt }}</option>
                  </select>
                </div>
                <div class="relative flex gap-4">
                  <button @click="route.go(-1)" class="hover:scale-150 transition ease-in-out" title="back">
                    <Icon name="fe:arrow-left" size="6mm" class="mx-auto flex-none " />
                  </button>
                  <button type="submit" class="hover:scale-150 transition ease-in-out" title="search">
                    <Icon name="fe:search" size="6mm" class="mx-auto flex-none " />
                  </button>
                  <button type="submit" class="hover:scale-150 transition ease-in-out" title="Download">
                    <Icon name="fe:download" size="6mm" class="mx-auto flex-none " />
                  </button>


                </div>
              </div>
            </div>
            <div class="row-span-3 rounded-lg shadow-lg border border-gray-100 relative flex flex-col justify-center">
              <p class="font-bold text-2xl text-black text-center absolute top-0 w-full pt-2">Total Skor Sikap</p>
              <div class="text-center px-8 mt">
                <div class="flex mb-8">
                  <Icon :key="`smiley-${reactiveState}`" :name="sikapData.icon" size="26mm"
                    class="flex-none w-[50%] my-auto " :class="sikapData.color" />
                  <p class="w-full text-center text-[58px] font-bold font-['oswald'] my-auto">{{
                    specifiedData.data[months.indexOf(selectedMonth)].total_skor_sikap }}</p>

                </div>
              </div>
              <p class="w-full text-center text-[20px] font-['oswald'] font-bold absolute bottom-14">{{
                sikapData.title }}
              </p>
            </div>
          </div>
        </div>
        <!-- {{ filterData }} -->
        <div class="lg:row-span-2 row-span-3 grid grid-cols-12 gap-4">

          <!-- <GraphKpiGauge :key="`capaian-${reactiveState}`" class="col-span-3" :dataset="{
            data: [specifiedData.data[months.indexOf(selectedMonth)].capaian_kpi, specifiedData.data[months.indexOf(selectedMonth)].target_kpi - specifiedData.data[months.indexOf(selectedMonth)].capaian_kpi],
            label: ['Capaian', 'Target'],
            title: 'Capaian KPI'
          }">
            <p class="font-bold w-full text-md text-black text-3xl text-center font-['oswald']">{{
              Math.ceil(specifiedData.data[months.indexOf(selectedMonth)].capaian_per_target * 100) / 100 }}%</p>
            <p class="font-light w-full text-md text-black text-md text-center font-['oswald']">
              Capaian:
              {{ specifiedData.data[months.indexOf(selectedMonth)].capaian_kpi }}
            </p>
            <p class="font-light w-full text-md text-black text-md text-center font-['oswald']">
              Target:
              {{ specifiedData.data[months.indexOf(selectedMonth)].target_kpi }}
            </p>
          </GraphKpiGauge>
          <div :key="`kecepatan-${reactiveState}`"
            class="col-span-3 rounded-lg shadow-lg border border-gray-100 relative flex flex-row px-4 justify-center">
            <p class="font-bold text-2xl text-black text-center absolute pt-2">Kecepatan Produksi</p>
            <div class="my-auto w-[50%] flex ">
              <Icon name="fa6-solid:clock" size="18mm" class="mx-auto mt-[70%] lg:my-auto flex-none text-[#034EA2]" />
            </div>
            <div class="w-[50%] mt-[70%] lg:my-auto">
              <p class="w-full text-center text-[42px] font-bold font-['oswald']">{{
                Math.ceil(specifiedData.data[months.indexOf(selectedMonth)].produksi_per_waktu * 100) / 100 }}
              </p>
              <p class="w-full text-center text-[18px] font-['oswald']">Unit / Detik</p>
            </div>
          </div>

          <div :key="`material-${reactiveState}`"
            class="col-span-3 rounded-lg shadow-lg border border-gray-100 relative flex flex-row justify-center">
            <p class="font-bold text-2xl text-black text-center absolute pt-2">Pemakaian Material</p>
            <div class="my-auto w-[50%] flex">
              <Icon name="mdi:weight-kilogram" size="24mm"
                class="mx-auto mt-[70%] lg:my-auto flex-none text-[#034EA2]" />
            </div>
            <div class="my-auto w-[50%] mt-[70%] lg:my-auto">
              <p class="w-full text-center text-[42px] font-bold font-['oswald']">{{
                Math.ceil(specifiedData.data[months.indexOf(selectedMonth)].produksi_per_material * 100) / 100
              }}</p>
              <p class="w-full text-center text-[18px] font-['oswald']">Unit / Material (Kg)</p>
            </div>
          </div> -->
          <!-- <GraphKpiGauge :key="`reject-${reactiveState}`" class="col-span-3" :dataset="{
            data: [specifiedData.data[months.indexOf(selectedMonth)].produksi - specifiedData.data[months.indexOf(selectedMonth)].reject, specifiedData.data[months.indexOf(selectedMonth)].reject],
            label: ['Good', 'Reject'],
            title: 'Hasil Produksi'
          }">
            <p class="font-bold w-full text-md text-black text-3xl text-center font-['oswald']">{{
              specifiedData.data[months.indexOf(selectedMonth)].persen_produk_go }}%</p>
            <p class="font-light w-full text-md text-black text-md text-center font-['oswald']">
              Produksi:
              {{ specifiedData.data[months.indexOf(selectedMonth)].produksi }}
            </p>
            <p class="font-light w-full text-md text-black text-md text-center font-['oswald']">
              Reject:
              {{ specifiedData.data[months.indexOf(selectedMonth)].reject }}
            </p>
          </GraphKpiGauge> -->
        </div>
      </div>

      <div v-else>
        <p class="text-xl text-center text-black">
          Belum Ada Laporan
        </p>
      </div>
    </div>

  </div>
  <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
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


// try {
//   loading.value = true
//   let res = await kpiDetails.call(id, (2023), (months.indexOf(selectedMonth.value) + 1))
//   // dataKaryawan.value = res
//   console.log(res);
//   loading.value = false
// } catch (e) {
//   if (e instanceof ErrorApiResponse) {
//     // console.log(e);
//     console.error(`ERROR | code: ${e.code} | message: ${e.message}`)
//     modal.value.type = 'ERROR'
//     modal.value.message = e.message
//     modal.value.show = true
//     loading.value = false
//   } else {
//     // console.log(e);
//     console.error('UNKNOWN ERROR: ', (e)?.message ?? 'Unknown Error')
//     modal.value.type = 'ERROR'
//     modal.value.message = 'UNKNOWN ERROR: '
//     modal.value.show = true
//     loading.value = false
//   }
// }

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