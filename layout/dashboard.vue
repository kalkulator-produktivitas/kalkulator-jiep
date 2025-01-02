<template>
  <div class="bg-white">
    <div id="layout" class="md:mx-auto my-6 mx-auto flex">
      <div class="shrink-0 w-[5%]"></div>
      <div class="container ml-8 h-screen bg-red-500">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
#layout {
  height: 85vh;
}
</style>