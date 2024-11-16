<template>
  <div class="h-full overflow flex flex-col shadow-lg p-2 rounded-lg border border-gray-100">
    <div class=" flex gap-0 justify-between">
      <form class="w-[80%]">
        <label for="underline_select" class="sr-only"></label>
        <select id="underline_select" v-model="selectedLabel"
          class="py-1 px-2 w-full text-md font-bold text-black bg-transparent rounded-lg border-2 border-gray-100 dark:text-black peer shadow hover:border-gray-300">
          <option v-for="title of label" class="text-sm">{{ title }}</option>
        </select>
      </form>
      <div class="">
        <p class="text-[18px] font-bold text-right">{{ value.label[0] }}</p>
      </div>
    </div>
    <div class="h-full flex p-1 gap-4 mt-2">
      <div class="w-[42%] shrink-0 flex">
        <div class="h-[60%] my-auto mx-auto text-center" v-if="selectedLabel !== 'Nilai Tambah'">
          <p class="text-[24px] font-bold mx-auto my-auto">{{ value[selectedLabel].previous }}
          </p>
          <p class="text-[24px] font-bold mx-auto my-auto">
            <Icon name="fe:drop-down" class="mb-1"
              :class="(value[selectedLabel].latest) - (value[selectedLabel].previous) < 0 ? 'text-red-700' : 'text-green-700'" />
          </p>
          <p class="text-[32px] font-bold mx-auto my-auto">
            <span
              :class="(value[selectedLabel].latest) - (value[selectedLabel].previous) < 0 ? 'text-red-700' : 'text-green-700'">{{
                value[selectedLabel].latest }}</span>
          </p>
        </div>
        <div class="h-[60%] my-auto mx-auto text-center" v-else>
          <p class="text-[24px] font-bold mx-auto my-auto">{{ rupiah(value[selectedLabel].previous) }}
          </p>
          <p class="text-[24px] font-bold mx-auto my-auto">
            <Icon name="fe:drop-down" class="mb-1"
              :class="(value[selectedLabel].latest) - (value[selectedLabel].previous) < 0 ? 'text-red-700' : 'text-green-700'" />
          </p>
          <p class="text-[32px] font-bold mx-auto my-auto">
            <span
              :class="(value[selectedLabel].latest) - (value[selectedLabel].previous) < 0 ? 'text-red-700' : 'text-green-700'">{{
                rupiah(value[selectedLabel].latest) }}</span>
          </p>
        </div>
      </div>
      <div class="h-full w-[58%] flex">
        <p class="font-light text-sm text-slate-500 my-auto">{{ value[selectedLabel].details }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>

defineProps(['value'])

const label = [
  "Nilai Tambah",
  "Nilai Tambah / Penjualan",
  "Nilai Tambah / Pembelian Bahan",
  "Laba / Biaya Tenaga Kerja"
]

const selectedLabel = ref("Nilai Tambah")

const rates = computed(() => {
  let numRate = parseFloat(props.rate)
  if (numRate > 0) {
    return true
  } else {
    return false
  }
})

const rupiah = (params) => {
  let num_string = ''
  if (params) {
    let data = params ? parseInt(params).toString() : 0
    if (data.length <= 15 && data.length > 12) {
      num_string = (Math.round(params * 100 / (Math.pow(10, 12))) / 100).toString() + " T"
    } else if (data.length <= 12 && data.length > 9) {
      num_string = (Math.round(params * 100 / (Math.pow(10, 9))) / 100).toString() + " M"
    } else if (data.length <= 9) {
      num_string = (Math.round(params * 100 / (Math.pow(10, 6))) / 100).toString() + " Jt"
    }
    return num_string
  } else {
    return "0"
  }
}

</script>

<style scoped></style>