<template>
  <div class="flex flex-col items-center h-full">
    <!-- Stepper Indicator -->
    <div class="flex items-center gap-4 mb-6">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-center"
      >
        <!-- Step Circle -->
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full border-2"
          :class="{
            'bg-blue-500 text-white border-blue-500': index <= currentStep,
            'bg-gray-200 text-gray-500': index > currentStep,
          }"
        >
          {{ index + 1 }}
        </div>
        <!-- Step Line -->
        <div
          v-if="index < steps.length - 1"
          class="h-1 w-12 bg-gray-200"
          :class="{'bg-blue-500': index < currentStep}"
        ></div>
      </div>
    </div>

    <div class="flex-1 overflow-auto w-full">
      <p class="text-blue-500 font-bold text-base text-center">{{ steps[currentStep] }}</p>
      
    </div>

    <!-- Step Content -->
    <div class="relative w-full h-full">
      <div class="absolute -top-20 right-0 mt-6 flex gap-4">
        <button
          @click="prevStep"
          class="px-4 py-2 bg-gray-200 rounded-md"
          :disabled="currentStep === 0"
        >
          Balik
        </button>
        <button
          @click="nextStep"
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
          :disabled="currentStep === steps.length - 1"
        >
          {{ currentStep === steps.length - 1 ? (confirmText ?? 'Konfirmasi') : 'Lanjut' }}
        </button>
      </div>
      <slot />
    </div>

    <!-- Navigation Buttons -->
    
  </div>
</template>

<script setup lang="ts">

// Define props with types
type StepperProps = {
  steps: string[];
  initialStep?: number;
  confirmText?: string;
}

const props = defineProps<StepperProps>();
const emit = defineEmits(['change'])

// Local state for tracking the current step
const currentStep = ref(props.initialStep ?? 0);

// Functions for navigation
const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};

const nextStep = () => {
  if (currentStep.value < props.steps.length - 1) currentStep.value++;
};

watch(
  () => currentStep.value,
  () => emit('change', currentStep.value),
)
</script>

<style scoped>
</style>