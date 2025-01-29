<script setup lang="ts">
import { mockLaporanAnalisis } from '~/assets/mock/laporan';
import { downloadPdfLaporanPerusahaan } from '~/assets/services/laporan';

const tahun = ref<number>(mockLaporanAnalisis.analisis[mockLaporanAnalisis.analisis.length-1].tahun);

</script>

<template>
  <div class="p-4">
    <h2 class="font-bold text-xl text-neutral-600">Unduh Laporan Perusahaan</h2>
    <div class="flex justify-center items-center w-full">
      <div class="inline rounded-lg border border-neutral-200 p-6 shadow-sm hover:shadow-md w-[600px] min-w-[600px] max-w-[600px]">
        <div class="flex flex-col gap-1 w-full pb-2.5">
          <label htmlFor="laporan.jenis" class="text-sm font-bold text-neutral-700">Jenis Laporan</label>
          <select 
            id="laporan.jenis" 
            class="select select-bordered select-sm"
          >
            <option>Laporan Produktivitas Perusahaan</option>
          </select>
        </div>
        <div class="flex flex-col gap-1 w-full pb-2.5">
          <label htmlFor="laporan.tahun" class="text-sm font-bold text-neutral-700">Tahun</label>
          <select 
            id="laporan.tahun" 
            class="select select-bordered select-sm"
            :value="tahun"
            @change="(y) => (y.target as any).value ? tahun = (y.target as any).value : null"
          >
            <option v-for="a in mockLaporanAnalisis.analisis" :key="a.tahun" :value="a.tahun">{{ a.tahun }}</option>
          </select>
        </div>
        <button
          class="bg-blue-500 rounded-lg text-white py-2 px-4 w-full mt-8"
          @click="() => downloadPdfLaporanPerusahaan(tahun)"
        >
          Unduh
        </button>
      </div>
    </div>
  </div>
</template>