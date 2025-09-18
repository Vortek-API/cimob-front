<template>
  <div class="relative inline-block text-left" ref="root">
    <button
      type="button"
      class="w-56 inline-flex items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
      @click="toggle"
    >
      <span>{{ selected?.label || 'Filtrar por região' }}</span>
      <svg class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clip-rule="evenodd" />
      </svg>
    </button>

    <div
      v-show="open"
      class="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/10"
    >
      <ul class="py-2 text-sm text-gray-700">
        <li
          v-for="item in regioes"
          :key="item.valor"
          @click="select(item)"
          class="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50"
        >
          <span :class="['h-2.5 w-2.5 rounded-full', item.color]" />
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

type Regiao = { valor: string; label: string; color: string }

const regioes: Regiao[] = [
  { valor: 'norte', label: 'Região x', color: 'bg-orange-500' },
  { valor: 'sul', label: 'Região y', color: 'bg-green-500' },
  { valor: 'leste', label: 'Região z', color: 'bg-fuchsia-600' }
]

const open = ref(false)
const selected = ref<Regiao | null>(null)
const root = ref<HTMLElement | null>(null)

function toggle() { open.value = !open.value }
function select(item: Regiao) { selected.value = item; open.value = false }

function onClickOutside(e: MouseEvent) {
  if (!root.value) return
  if (!root.value.contains(e.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
</style>
