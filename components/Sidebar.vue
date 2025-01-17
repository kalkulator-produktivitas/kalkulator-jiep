<template>
  <div class="flex">
    <aside @mouseover="isOpen = false" @mouseleave="isOpen = true" id="default-sidebar"
      :class="isOpen ? 'w-12' : 'w-48'" class="fixed top-0 left-0 h-screen transition-all ease-in-out duration-500 z-30"
      aria-label="Sidebar">
      <div class="h-full bg-[#034EA2]">
        <nuxt-link class="flex items-center" to="/">
          <img :src="logoSrc" class="w-12 pt-3 flex-none" alt="" srcset="">
          <p class="ml-2 font-bold text-white mt-2" :class="!isOpen ? 'visible' : 'invisible'">
            Kalkulator Produktivitas</p>
        </nuxt-link>
        <div class="px-3 py-4">
          <ul class="mt-6">
            <li v-for="item in items" :key="item.text" class="mb-4">
              <div v-if="item.sublink" class="transition ease-in-out">
                <div class="text-xl font-normal flex flex-nowrap items-left text-white">
                  <nuxt-link :to="item.to" class="flex grow">
                    <Icon :name="item.icon" size="6mm" class="my-auto flex-none mr-[0.5em]" />
                    <p :class="!isOpen ? 'visible' : 'invisible'">{{ item.text }}</p>
                  </nuxt-link>
                  <button @click="item.show = !item.show">
                    <Icon :class="[
                      !isOpen ? 'visible' : 'invisible',
                      (item.show && !isOpen) ? 'rotate-180' : 'rotate-0'
                    ]" name="fe:arrow-down" size="5mm" class="my-auto flex-none transition ease-in-out" />
                  </button>
                </div>
                <div v-if="(item.show && !isOpen)"
                  class="text-md font-normal text-white ml-[2em] transition ease-in-out">
                  <nuxt-link v-for="x of item.sublink" :key="x.to" :to="x.to" class="flex my-1">
                    <p :class="!isOpen ? 'visible' : 'invisible'">{{ x.text }}</p>
                  </nuxt-link>
                </div>
              </div>
              <div v-else>
                <div class="text-xl font-normal flex flex-nowrap items-left text-white">
                  <nuxt-link :to="item.to" class="flex grow">
                    <Icon :name="item.icon" size="6mm" class="my-auto flex-none mr-[0.5em]" />
                    <p :class="!isOpen ? 'visible' : 'invisible'">{{ item.text }}</p>
                  </nuxt-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="flex border border-white">
          <button class="text-white text-xl w-12 ml-[0.6em] flex fixed bottom-[100px]" @click="navigateTo('/register')">
            <Icon name="mdi:account-plus" size="6mm" class="my-auto flex-none mr-[0.5em] self-end" />
            <p :class="!isOpen ? 'visible' : 'invisible'">Register</p>
          </button>
          <button class="text-white text-xl w-12 ml-[0.6em] flex absolute bottom-[50px]" @click="navigateTo('/')">
            <Icon name="mdi:arrow-left-circle" size="6mm" class="my-auto flex-none mr-[0.5em] self-end" />
            <p :class="!isOpen ? 'visible' : 'invisible'">Back</p>
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>



<style scoped>
.nav-header {
  background-color: #404258;
}

.show-text {
  visibility: visible;
}

.hide-text {
  visibility: hidden;
}
</style>

<script>
import { USE_JIEP_DATA } from '~/assets/helpers/const';
import logoJiep from '~/assets/logo_jiep_1.png';
import logoP3D from '~/assets/P3D_logo_2.png';

export default {
  components: {
  },
  data() {
    return {
      logoSrc: USE_JIEP_DATA ? logoJiep : logoP3D,
      isOpen: true,
      items: [
        {
          text: 'Perusahaan', to: '/perusahaan', icon: 'mdi:office-building', sublink: [
            {
              to: '/perusahaan',
              text: 'Input'
            },
            {
              to: '/perusahaan/dashboard',
              text: 'Dashboard'
            },
          ]
        },
        {
          text: 'Karyawan', to: '/karyawan', icon: 'mdi:people', sublink: [
            {
              to: '/karyawan',
              text: 'Input'
            },
            {
              to: '/karyawan/dashboard',
              text: 'Dashboard'
            }
          ]
        },
        {
          text: 'Makro', to: '/macro/dashboard', icon: 'mdi:globe',
        }
      ]
    }
  }
}

</script>