<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-box" @click.stop>
      <div class="flex gap-2 items-center justify-center text-lg text-black font-bold">
        <Icon name="mdi:upload"/>
        <h1 class="">{{ title ?? 'Upload File' }}</h1>
      </div>
      <input 
        type="file" 
        ref="fileInput" 
        class="hidden" 
        @change="handleFileChange" 
      />
      <div class="file-box mt-8" @click="openFileDialog">
        <div v-if="selectedFile">
          <p class="text-sm text-neutral-500 pb-4">File terpilih:</p>
          <p >{{ selectedFile.name }}</p>
        </div>
        <p v-else class="text-neutral-500 italic text-sm">Klik untuk memilih file</p>
      </div>
      <div class="flex gap-4 my-4 justify-center items-center">
        <button class="rounded-full bg-neutral-100 border border-neutral-300 text-sm font-bold px-4 py-2.5 hover:bg-neutral-200 transition-all ease-in-out" @click="closeModal">Tutup</button>
        <button 
          class="rounded-full bg-green-500 text-white text-sm font-bold px-4 py-2.5 hover:bg-green-600 transition-all ease-in-out disabled:bg-neutral-100 disabled:text-neutral-200" 
          :disabled="!selectedFile" 
          @click="handleConfirmFile"
        >
        Konfirmasi
      </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Props
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: false
  }
});

// Emits
const emit = defineEmits(['update:show', 'file-selected']);

// References
const fileInput = ref(null);
const selectedFile = ref(null);

// Open file dialog
const openFileDialog = () => {
  fileInput.value.click();
};

// Handle file change
const handleFileChange = (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    selectedFile.value = files[0];
  }
};

const handleConfirmFile = () => {
  emit('file-selected', selectedFile.value); // Emit the selected file
}

// Close modal
const closeModal = () => {
  emit('update:show', false);
};

watch(() => props.show, () => selectedFile.value = null);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.file-box {
  border: 2px dashed #ccc;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.file-box:hover {
  border-color: #007bff;
}

.hidden {
  display: none;
}

.close-btn {
  margin-top: 10px;
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-btn:hover {
  background: #0056b3;
}
</style>