<template>
  <div class="h-full overflow flex flex-col shadow-lg rounded-lg border border-gray-200 bg-white">
    <div class="flex gap-2 justify-between items-center bg-gradient-to-r from-blue-100 to-blue-50 px-2">
      <form class="w-[100%] px-2">
        <select id="underline_select bg-transaprent" v-model="selectedLabel"
          class="py-4 w-full text-md font-semibold text-gray-700 bg-transparent rounded-lg focus:outline-none transition duration-200">
          <option v-for="title of label" :key="title" class="text-sm">{{ title }}</option>
        </select>
      </form>
      <div>
        <p class="text-lg font-semibold text-right text-gray-800 mr-2">{{ value.label[0] }}</p>
      </div>
    </div>
    <div class="h-full flex p-2 gap-4 mt-3">
      <div class="w-[42%] shrink-0 flex">
        <div class="h-[60%] my-auto mx-auto text-center"
          v-if="selectedLabel !== 'Nilai Tambah' && selectedLabel !== 'Biaya Tenaga Kerja / Jml Tenaga Kerja'">
          <p class="text-2xl font-semibold mx-auto my-auto text-gray-800">{{ value[selectedLabel].previous }}</p>
          <p class="text-2xl font-semibold mx-auto my-auto">
            <Icon name="fe:drop-down" class="mb-1"
              :class="(value[selectedLabel].latest) - (value[selectedLabel].previous) < 0 ? 'text-red-600' : 'text-green-600'" />
          </p>
          <p class="text-3xl font-semibold mx-auto my-auto">
            <span
              :class="(value[selectedLabel].latest) - (value[selectedLabel].previous) < 0 ? 'text-red-600' : 'text-green-600'">{{
                value[selectedLabel].latest }}</span>
          </p>
        </div>
        <div class="h-[60%] my-auto mx-auto text-center" v-else>
          <p class="text-2xl font-semibold mx-auto my-auto text-gray-800">{{ rupiah(value[selectedLabel].previous) }}
          </p>
          <p class="text-2xl font-semibold mx-auto my-auto">
            <Icon name="fe:drop-down" class="mb-1"
              :class="(value[selectedLabel].latest) - (value[selectedLabel].previous) < 0 ? 'text-red-600' : 'text-green-600'" />
          </p>
          <p class="text-3xl font-semibold mx-auto my-auto">
            <span
              :class="(value[selectedLabel].latest) - (value[selectedLabel].previous) < 0 ? 'text-red-600' : 'text-green-600'">{{
                rupiah(value[selectedLabel].latest) }}</span>
          </p>
        </div>
      </div>
      <div class="h-full w-[58%] flex">
        <p class="font-light text-sm text-gray-500 my-auto">{{ value[selectedLabel].details }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps(['value'])

const label = [
  "Nilai Tambah",
  "Nilai Tambah / Biaya Tenaga Kerja",
  "Biaya Tenaga Kerja / Jml Tenaga Kerja",
  "Nilai Tambah / Total Output"
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

<style scoped>
/* Add any additional modern styles here */
</style>