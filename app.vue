<template>
  <div data-theme="light" class="h-screen bg-white overflow-auto">
    <NuxtLayout>
      <Sidebar />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
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
</style>
