<script setup lang="ts">
import { downloadPdfLaporanIndividu } from '~/assets/services/laporan';
import { dummyKaryawan } from '~/assets/mock/kpi';
import { mockLaporanAnalisis } from '~/assets/mock/laporan';
import { mockGainSharing, mockGainSharingKaryawan } from '~/assets/mock/gain-sharing';

const search = ref('');
const page = ref(1);
const size = ref(10);

const searchedKaryawan = computed(() => {
  const searched = dummyKaryawan.list.filter(v => {
    return search.value === '' 
      || v['Karyawan'].toLowerCase().includes(search.value.toLowerCase())
      || v['Jabatan'].toLowerCase().includes(search.value.toLowerCase())
      || v['Divisi'].toLowerCase().includes(search.value.toLowerCase())
      || v['Departemen'].toLowerCase().includes(search.value.toLowerCase())
  })
  return searched;
})

const listKaryawan = computed(() => {
  
  const startIdx = (page.value-1) * size.value;
  const endIdx = startIdx + size.value;
  return searchedKaryawan.value.slice(startIdx, endIdx);
})
const totalPage = computed(() => {
  let x = Math.floor(searchedKaryawan.value.length / size.value);
  if (searchedKaryawan.value.length % size.value !== 0) {
    x++
  }
  return x;
})

async function downloadLaporanIndividu(karyawan: typeof dummyKaryawan['list'][number], tahun: number): Promise<void> {
  const analisis = mockLaporanAnalisis.analisis.find(v => v.tahun === tahun);
  const analisisPrev = mockLaporanAnalisis.analisis.find(v => v.tahun === tahun - 1);
  await downloadPdfLaporanIndividu({
    tahun,
    perusahaan: {
      nama: 'PT JIEP',
      logo_src: ''
    },
    karyawan: {
      nama: karyawan['Karyawan'],
      divisi: karyawan['Divisi'],
      nip: '2005120001',
      masa_kerja: 5,
    },
    data: {
      ptk_perusahaan: analisis?.produktivitas_tenaga_kerja_1 || null,
      ptk_divisi: mockGainSharing
        .find(v => v.tahun === tahun)
        ?.divisi.find(v => v.nama === karyawan['Divisi'])
        ?.nilai
        ?? null
      ,
      ptk_growth: (analisis && analisisPrev) ? ((analisis.produktivitas_tenaga_kerja_1 - analisisPrev.produktivitas_tenaga_kerja_1) / analisis.produktivitas_tenaga_kerja_1 * 100) : null,
      kpi: (karyawan as any)[`${tahun}`] ? Number((karyawan as any)[`${tahun}`]) : null,
      gain_sharing: mockGainSharingKaryawan
        .find(v => v.tahun === tahun)?.karyawan
        .find(v => v.nama == karyawan.Karyawan)
        ?.gain_sharing
        ?? null,
    }
  });
}

watch(
  () => search.value,
  () => {
    page.value = 1;
  }
)

</script>

<template>
  <div id="layout" class="md:mx-auto mt-12 mb-6 mx-auto flex">
    <div class="shrink-0 w-[5%]"></div>
    <div class="w-[90%]">
      <div class="pb-8">
        <h1 class="font-bold text-3xl text-neutral-600">List Karyawan</h1>
      </div>
      <div class="overflow-auto w-full">
        <div class="flex justify-between">
          <input 
            type="text"
            v-model="search"
            placeholder="Cari karyawan..."
            class="rounded-full px-4 py-2 border border-neutral-400 outline-blue-500 text-sm"
          />
          <div class="flex gap-2 items-center justify-center">
            <button 
              class="rounded-lg p-2 bg-neutral-500 text-white text-sm"
              @click="page <= 1 ? null : page = page - 1"
            >
              Prev
            </button>
            <button
              class="text-sm rounded-full w-8 h-8 hover:bg-blue-500 hover:text-white"
              :class="{'bg-blue-500 text-white': i === page}"
              @click="page = i"
              v-for="i in totalPage"
            >
              {{ i }}
            </button>
            <button
              class="rounded-lg p-2 bg-neutral-500 text-white text-sm"
              @click="page >= totalPage ? null : page = page + 1"
            >
              Next
            </button>
          </div>
        </div>
        <table class="table table-auto w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Divisi</th>
              <th>Departemen</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr
              class="hover:bg-stone-100"
              v-for="(karyawan, i) in listKaryawan"
              :key="i"
            >
              <td class="font-bold">{{ ((page-1)*size) + i + 1 }}</td>
              <td class="font-bold">{{ karyawan['Karyawan'] }}</td>
              <td>{{ karyawan['Jabatan'] }}</td>
              <td>{{ karyawan['Divisi'] }}</td>
              <td>{{ karyawan['Departemen'] }}</td>
              <td class="flex gap-2">
                <details class="dropdown dropdown-sm">
                  <summary class="btn btn-sm m-1 bg-blue-500 text-white font-regular flex gap-1 hover:bg-blue-700 whitespace-nowrap w-max">
                    <Icon name="heroicons:arrow-down-tray"/>
                    <span>Laporan Individu</span>
                  </summary>
                  <ul class="menu dropdown-content bg-white rounded-box z-[1] p-2 shadow border border-neutral-600">
                    <li
                      class="rounded-lg hover:bg-neutral-200"
                      v-for="y in dummyKaryawan.metadata.year"
                      :key="y"
                    >
                      <button @click="() => downloadLaporanIndividu(karyawan, y)">
                        {{ y }}
                      </button>
                    </li>
                  </ul>
                </details>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- LAPORAN -->
    <div class="hidden">

    </div>
  </div>
</template>