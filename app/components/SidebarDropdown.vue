<template>
  <div class="relative">
    <button
      type="button"
      class="w-full text-left flex items-center justify-between px-6 py-2 rounded text-black hover:bg-blue-200 transition-colors font-semibold"
      @click="toggleOpen"
      :aria-expanded="isOpen"
    >
      <span>{{ label }}</span>
      <svg
        class="w-4 h-4 transform transition-transform duration-200"
        :class="{ 'rotate-90': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div v-show="isOpen" class="mt-1 space-y-1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  label: string
}>()

const isOpen = ref(false)

function toggleOpen() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
/* Estilos específicos para o dropdown, se necessário */
</style>

