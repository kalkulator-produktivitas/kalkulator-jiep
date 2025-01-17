<template>
  <div class="register-container">
    <div class="h-[10px]">
    </div>
    <div class="flex">
      <ul class="flex list-none flex-row flex-wrap border-b-0 pl-0 mx-auto">
        <li class="mr-2">
          <button class="inline-block p-4 rounded-t-lg" @click="tab = 'Data Perusahaan'"
            :class="tab === 'Data Perusahaan' ? 'text-blue-600 border-b-2 border-blue-600 active' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'">Data
            Perusahaan</button>
        </li>
        <li class="mr-2">
          <button class="inline-block p-4 rounded-t-lg" @click="tab = 'Struktur Perusahaan'"
            :class="tab === 'Struktur Perusahaan' ? 'text-blue-600 border-b-2 border-blue-600 active' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'">Struktur
            Perusahaan</button>
        </li>
        <li class="mr-2">
          <button class="inline-block p-4 rounded-t-lg" @click="tab = 'Data Pengguna'"
            :class="tab === 'Data Pengguna' ? 'text-blue-600 border-b-2 border-blue-600 active' : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'">Data
            Pengguna</button>
        </li>
      </ul>
    </div>
    <div class="flex w-[90%] mx-auto">
      <div v-if="tab === 'Data Perusahaan'" class="w-6/12 p-8 mx-auto" style="min-height: 280px;">
        <InputField3 class="col-span-3" label="Nama Perusahaan" type="text" :color="textColor"
          :highlight="validasiPage1.nextClicked && validasiPage1.vals.namaPerusahaan"
          v-model="register.namaPerusahaan" />
        <div class="grid grid-cols-2 gap-4 mt-4">
          <InputField3 label="Nama Pemilik Perusahaan" type="text" :color="textColor"
            v-model="register.namaPemilikPerusahaan"
            :highlight="validasiPage1.nextClicked && validasiPage1.vals.namaPemilikPerusahaan" />
          <InputField3 label="Nama Pimpinan" type="text" :color="textColor" v-model="register.namaPimpinan"
            :highlight="validasiPage1.nextClicked && validasiPage1.vals.namaPimpinan" />
        </div>
        <div class="grid grid-cols-5 gap-3">
          <InputField3 label="Alamat Perusahaan" class="col-span-3" type="email" :color="textColor"
            v-model="register.alamatPerusahaan"
            :highlight="validasiPage1.nextClicked && validasiPage1.vals.alamatPerusahaan" />
          <div class="col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Telp/Fax">
              Telp/Fax
            </label>
            <div class="bg-transparent rounded flex">
              <input
                class="shadow appearance-none border border-r-none rounded-l py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                value="+62" readonly style="width: 50px">
              <input type="text" @keypress="parseIntsOnly($event)"
                class="shadow appearance-none border rounded-r w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-[#1CA83B] focus:shadow-outline"
                v-model="register.telpFax" id="Telp/Fax" :style="{ color: textColor }">
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4" :id="reaction.address">
          <div class="">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Telp/Fax">
              Provinsi
            </label>
            <select @change="reaction.address += 1" id="provinsi" v-model="register.provinsiPerusahaan"
              class="bg-white border border-gray-300 text-sm rounded-lg focus:border-blue-500 p-2 placeholder-gray-400 w-full"
              :class="validasiPage1.nextClicked && validasiPage1.vals.provinsiPerusahaan ? 'border-2 border-red-500 shadow-highlight' : ''"
              placeholder="-- Provinsi --">
              <option selected disabled :value="null">-- Provinsi --</option>
              <option v-for="prov of regions" :value="prov.nama" :key="prov.nama">{{ prov.nama }}</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Telp/Fax">
              Kota
            </label>
            <select @change="reaction.address += 1" id="kota" v-model="register.kotaPerusahaan"
              class="bg-white border border-gray-300 text-sm rounded-lg focus:border-blue-500 p-2 placeholder-gray-400 w-full"
              :class="validasiPage1.nextClicked && validasiPage1.vals.kotaPerusahaan ? 'border-2 border-red-500 shadow-highlight' : ''">
              <option selected disabled :value="null">-- Kota --</option>
              <option v-for="kota of listKota" :value="kota.nama" :key="kota.nama">{{
                kota.nama }}</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Telp/Fax">
              Kecamatan
            </label>
            <select @change="reaction.address += 1" id="kelurahan" v-model="register.kecamatanPerusahaan"
              class="bg-white border border-gray-300 text-sm rounded-lg focus:border-blue-500 p-2 placeholder-gray-400 w-full"
              :class="validasiPage1.nextClicked && validasiPage1.vals.kecamatanPerusahaan ? 'border-2 border-red-500 shadow-highlight' : ''">
              <option selected disabled :value="null">-- Kelurahan --</option>
              <option v-for="camat of listKecamatan" :value="camat.nama" :key="camat.nama">{{
                camat.nama }}</option>
            </select>
          </div>
        </div>
        <div class="mb-2 flex w-full">
          <InputField3 class="w-full" label="Alamat Pabrik" type="text" :color="textColor"
            v-model="register.alamatPabrik" :highlight="validasiPage1.nextClicked && validasiPage1.vals.alamatPabrik" />
          <button @click="sameAddress"
            class="bg-transparent transition hover:bg-gray-700 text-gray-500 hover:text-gray-100 font-semibold mt-3 px-4 border border-black hover:border-black rounded h-10 self-center ml-2">
            Sama
          </button>
        </div>
        <div class="grid grid-cols-5 gap-4">
          <InputField3 class="col-span-2" label="Tanggal Pendirian" type="date" :color="textColor"
            v-model="register.tanggalPendirian"
            :highlight="validasiPage1.nextClicked && validasiPage1.vals.tanggalPendirian" />
          <div class="col-span-3 flex">
            <InputField3 class="w-full" label="Klasifikasi Usaha" type="text" :color="textColor"
              v-model="register.klasifikasiUsaha"
              :highlight="validasiPage1.nextClicked && validasiPage1.vals.klasifikasiUsaha" />
            <button @click="showModal = true"
              class="bg-transparent transition hover:bg-gray-700 text-gray-500 hover:text-gray-100 font-semibold mt-3 px-4 border border-black hover:border-black rounded h-10 self-center ml-2">
              Pilih
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <InputField3 label="Email Perusahaan" type="email" :color="textColor" v-model="register.email"
            :highlight="validasiPage1.nextClicked && validasiPage1.vals.email" />
          <InputField3 label="Website" type="text" :color="textColor" v-model="register.website"
            :highlight="validasiPage1.nextClicked && validasiPage1.vals.website" />
        </div>

        <div class="flex">
          <button @click="nextTab"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto w-28 ease-in-out duration-300 mt-4">
            Next
          </button>
        </div>
      </div>
      <div v-if="tab === 'Struktur Perusahaan'" class="w-10/12 p-8 mx-auto" style="min-height: 280px;">
        <div class="w-full mx-auto">
          <p class="text-xl italic text-gray-500 text-center mb-4">Opsional</p>

          <!-- Divisions Section -->
          <div class="relative">
            <div v-if="divisions.length < 1" class="flex justify-center mt-4">
              <Icon @click="addDivision" name="mdi:plus-circle" size="10mm" class="text-green-500 cursor-pointer" />
            </div>
            <div v-for="(division, index) in divisions" :key="`division-${index}`" class="grid grid-cols-7 gap-2 ">
              <!-- <InputField3 v-model="division.name" class="col-span-3" label="Input Nama Divisi" type="text"
                :color="textColor" /> -->
              <div class="col-span-3" :style="{ width: inputWide }">
                <div class="absolute -left-12 flex">
                  <Icon @click="removeDivision(index)" name="mdi:minus-circle" size="10mm"
                    class="flex-none text-red-500 cursor-pointer self-center mt-7" />
                </div>
                <label class="block text-sm font-bold mb-2" :style="color ? { color: textColor } : { color: '#334155' }"
                  for="random1">
                  Input Nama Divisi
                </label>
                <input
                  class="shadow appearance-none border rounded w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-[#1CA83B] focus:shadow-outline"
                  id="random1" :type="text" :placeholder="placeholder">
                <div class="flex justify-center mt-4">
                  <Icon @click="addDivision" name="mdi:plus-circle" size="10mm" class="text-green-500 cursor-pointer" />
                </div>
              </div>

              <!-- Department inputs for this division -->
              <div class="col-span-3">
                <div v-for="(dept, deptIndex) in division.departments" :key="`dept-${index}-${deptIndex}`"
                  class="grid grid-cols-7 gap-2 relative">
                  <div class="col-span-6">
                    <label class="block text-sm font-bold mb-2"
                      :style="color ? { color: textColor } : { color: '#334155' }" for="random1">
                      Input Nama Departemen
                    </label>
                    <input
                      class="shadow appearance-none border rounded w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-[#1CA83B] focus:shadow-outline"
                      id="random1" :type="text" :placeholder="placeholder">
                  </div>
                  <div class="my-auto flex flex-col">
                    <Icon @click="removeDepartment(index, deptIndex)" name="mdi:minus-circle" size="6mm"
                      class="flex-none mt-8 text-red-500 cursor-pointer" />
                  </div>
                  <div class="my-auto col-span-6 flex justify-center">
                    <Icon @click="addDepartment(index)" name="mdi:plus-circle" size="6mm"
                      class="flex-none text-blue-500 cursor-pointer mb-4" />
                  </div>
                </div>

                <!-- Add Department Button -->

              </div>

              <!-- Remove Division Button -->

            </div>
          </div>

          <!-- Add Division Button -->

        </div>

        <div class="flex">
          <button @click="tab = 'Data Pengguna'"
            class="text-white font-bold py-2 px-4 rounded-full mx-auto w-40 ease-in-out duration-300 mt-4 bg-blue-500 hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
      <div v-if="tab === 'Data Pengguna'" class="w-6/12 p-8 mx-auto" style="min-height: 280px;">
        <div class="w-full mx-auto">
          <!-- <p class="text-4xl font-bold text-black text-center mb-4">Data User</p> -->
          <div class="mb-4 grid grid-cols-7 gap-2">
            <InputField3 class="col-span-3" label="Nama Pengguna Akun" type="text" :color="textColor"
              v-model="register.namaPengguna"
              :highlight="validasiPage2.submitClicked && validasiPage2.vals.namaPengguna" />
            <InputField3 class="col-span-3" label="Nama Kontak Person" type="text" :color="textColor"
              v-model="register.kontakPerson"
              :highlight="validasiPage2.submitClicked && validasiPage2.vals.kontakPerson" />
            <button @click="register.kontakPerson = register.namaPengguna"
              class="col-span-1 bg-transparent transition hover:bg-gray-700 text-gray-500 hover:text-gray-100 font-semibold mt-3 px-2 border border-black hover:border-black rounded h-10 self-center ml-2">
              Sama
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="nomorUser">
                Nomor Handphone User
              </label>
              <div class="bg-transparent rounded flex">
                <input
                  class="shadow appearance-none border border-r-none rounded-l py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  value="+62" readonly style="width: 50px">
                <input type="text" @keypress="parseIntsOnly($event)"
                  class="shadow appearance-none border rounded-r w-full h-100 py-2.5 px-3 text-gray-700 text-sm leading-tight focus:outline-[#1CA83B] focus:shadow-outline"
                  v-model="register.nomorPengguna" id="nomorUser" :style="{ color: textColor }"
                  :class="(validasiPage2.submitClicked && validasiPage2.vals.nomorPengguna) ? 'border-2 border-red-500 shadow-highlight' : ''">
              </div>
            </div>
            <!-- <InputField3 label="" type="number" :color="textColor" v-model="register.nomorPengguna" /> -->
            <InputField3 label="Email User" type="email" :color="textColor" v-model="register.emailPengguna"
               />
          </div>
          <div class="mb-4">
            <InputField3 label="Username" type="text" :color="textColor" v-model="register.username"
              :highlight="validasiPage2.submitClicked && validasiPage2.vals.username" />
          </div>
          <div class="mb-4">
            <InputField3 label="Password" type="password" :color="textColor" v-model="register.password"
              :highlight="validasiPage2.submitClicked && validasiPage2.vals.password" />
          </div>
          <div class="mb-4">
            <InputField3 label="Retype Password" type="password" :color="textColor" v-model="register.retypePassword"
              :highlight="validasiPage2.submitClicked && validasiPage2.vals.retypePassword" />
          </div>
        </div>

        <div class="flex">
          <button @click="registerAuth"
            class="text-white font-bold py-2 px-4 rounded-full mx-auto w-40 ease-in-out duration-300 mt-4"
            :class="(validasiPage1.output === 0 && validasiPage2.output === 0) ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'">
            Daftar
          </button>
        </div>
      </div>
      <div v-show="showModal">
        <div class="modal-overlay z-20">
          <div class="modal p-6 a">
            <p class="text-4xl font-bold text-center mb-6">Klasifikasi Usaha</p>
            <div class="container h-[60vh] overflow-y-auto">
              <div class="overflow-y-auto ">
                <ul class="list-none">
                  <li v-for="kelas of klasifikasi" :key="kelas.class">
                    <div class="flex items-center mb-4 ml-4">
                      <input :id="kelas.class" type="checkbox" v-model="kelas.selected"
                        class="w-[20px] h-[20px] shrink-0 bg-gray-100 rounded-2 dark:bg-gray-700">
                      <label :for="kelas.class" class="ml-6 text-sm font-medium text-gray-900">{{
                        klasifikasiUsaha[kelas.class] }}</label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex justify-center items-center">
              <button type="button"
                class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full w-40 ease-in-out duration-300 mt-2"
                @click="showModal = false">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <Loading v-if="loading" text="Menginput Data" />
      <Popup v-if="modal.show" :message="modal.message" :status="modal.status" :type="modal.type" @close="closeModal" />
    </div>
  </div>
</template>

<script setup>

// import moment from 'moment';
import regions from '@/assets/region.json'
import klasifikasiUsaha from '@/assets/data_klasifikasi_usaha.json'

const loading = ref(false)

const textColor = 'black'

const tab = ref('Data Perusahaan')

const showModal = ref(false)

const modal = ref({
  show: false,
  type: '',
  message: '',
  status: undefined
})

const reaction = ref({ address: 0, clickNext: 0, submit: 0 })

const closeModal = () => {
  modal.value.show = false
}

const klasifikasi = ref([
  { selected: false, class: 'A' },
  { selected: false, class: 'B' },
  { selected: false, class: 'C' },
  { selected: false, class: 'D' },
  { selected: false, class: 'E' },
  { selected: false, class: 'F' },
  { selected: false, class: 'G' },
  { selected: false, class: 'H' },
  { selected: false, class: 'I' },
  { selected: false, class: 'J' },
  { selected: false, class: 'K' },
  { selected: false, class: 'L' },
  { selected: false, class: 'M' },
  { selected: false, class: 'N' },
  { selected: false, class: 'O' },
  { selected: false, class: 'P' },
  { selected: false, class: 'Q' },
  { selected: false, class: 'R' },
  { selected: false, class: 'S' },
  { selected: false, class: 'T' },
  { selected: false, class: 'U' }
])

const selectedClass = computed(() => {
  let listClass = []
  const selectedValue = klasifikasi.value.filter((klas) => klas.selected === true)
  for (let i of selectedValue) {
    listClass.push(i.class)
  }
  return listClass
})

const register = reactive({
  namaPerusahaan: '',
  namaPemilikPerusahaan: '',
  namaPimpinan: '',
  alamatPerusahaan: '',
  provinsiPerusahaan: '',
  kotaPerusahaan: '',
  kecamatanPerusahaan: '',
  telpFax: '',
  alamatPabrik: '',
  tanggalPendirian: '',
  klasifikasiUsaha: selectedClass,
  email: '',
  website: '',
  namaPengguna: '',
  kontakPerson: '',
  emailPengguna: '',
  nomorPengguna: '',
  username: '',
  password: '',
  retypePassword: ''
})

const listKota = computed(() => {
  if (register.provinsiPerusahaan.length > 0) {
    let kota = regions.filter(x => x['nama'] === register.provinsiPerusahaan)[0]['kota/kab']
    return kota
  } else return []

})

const listKecamatan = computed(() => {
  if (register.provinsiPerusahaan.length > 0 && register.kotaPerusahaan.length > 0) {
    let kota = regions.filter(x => x['nama'] === register.provinsiPerusahaan)[0]['kota/kab']
    let cmt = kota.filter(x => x['nama'] === register.kotaPerusahaan)[0]['kecamatan']
    return cmt
  } else return []
})

const parseIntsOnly = (evt) => {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
    evt.preventDefault();;
  } else {
    return true;
  }
}

const samePassword = computed(() => {
  return register.password === register.retypePassword
})

const sameAddress = () => {
  register.alamatPabrik = register.alamatPerusahaan
}

const validasiPage1 = computed(() => {
  let nextClicked = reaction.value.clickNext > 0 ? true : false
  let vals = {
    namaPerusahaan: (register.namaPerusahaan) ? true : false,
    namaPemilikPerusahaan: (register.namaPemilikPerusahaan) ? true : false,
    namaPimpinan: (register.namaPimpinan) ? true : false,
    alamatPerusahaan: (register.alamatPerusahaan) ? true : false,
    provinsiPerusahaan: (register.provinsiPerusahaan) ? true : false,
    kotaPerusahaan: (register.kotaPerusahaan) ? true : false,
    kecamatanPerusahaan: (register.kecamatanPerusahaan) ? true : false,
    alamatPabrik: (register.alamatPabrik) ? true : false,
    tanggalPendirian: (register.tanggalPendirian) ? true : false,
    klasifikasiUsaha: (false) ? true : false,
    email: (register.email) ? true : false,
    website: (register.website) ? true : false,
  }
  let output = Object.values(vals).filter(Boolean).length

  return { vals, output, nextClicked }
})

const validasiPage2 = computed(() => {
  let submitClicked = reaction.value.submit > 0 ? true : false
  let vals = {
    namaPengguna: (register.namaPengguna) ? true : false,
    kontakPerson: (register.kontakPerson) ? true : false,
    emailPengguna: (register.emailPengguna || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(register.emailPengguna))) ? true : false,
    nomorPengguna: (register.nomorPengguna.toString()) ? true : false,
    username: (register.username) ? true : false,
    password: (register.password) ? true : false,
    retypePassword: (register.retypePassword) ? true : false,
  }
  let output = Object.values(vals).filter(Boolean).length

  return { vals, output, submitClicked }
})

const registerAuth = async () => {
  reaction.value.submit += 1
  if (validasiPage1.value.output === 0 && validasiPage2.value.output === 0) {
    try {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        modal.value.show = true
        modal.value.status = null
        modal.value.message = 'Registrasi Berhasil'
        modal.value.type = 'SUCCESS'

        setTimeout(() => {
          reloadNuxtApp({
            path: "/",
            ttl: 5000,
          });
        }, 1500);
      }, 1000)

    } catch (e) {
      modal.value.type = 'ERROR'
      modal.value.message = 'An error occurred'
      modal.value.show = true
      loading.value = false
    }
  }
}

const divisions = ref([
  {
    name: '',
    departments: [{ name: '' }]
  }
])

const addDivision = () => {
  divisions.value.push({
    name: '',
    departments: [{ name: '' }]
  })
}

const removeDivision = (index) => {
  divisions.value.splice(index, 1)
}

const addDepartment = (divisionIndex) => {
  divisions.value[divisionIndex].departments.push({ name: '' })
}

const removeDepartment = (divisionIndex, deptIndex) => {
  divisions.value[divisionIndex].departments.splice(deptIndex, 1)
}

</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
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

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  background-color: white;
  height: 80vh;
  width: 80vh;
  margin-top: 5%;
  border-radius: 5px;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

.shadow-highlight {
  filter: drop-shadow(0 0 5px red);
  ;
}
</style>