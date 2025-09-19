<template>
  <aside class="w-72 min-h-screen bg-blue-100 border-r border-blue-200 flex flex-col select-none relative text-black">
    <!-- Brand -->
    <div class="px-6 pt-6 pb-4 flex items-center">
      <img src="/images/cimob.png" alt="CIMOB" class="h-24 object-contain" />
    </div>
    <div class="-ml-6 mr-10 border-t-4 border-blue-900" />

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1 mt-6">
      <template v-for="item in items" :key="item.label">
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="block px-6 py-2 rounded text-black hover:bg-blue-200 transition-colors font-semibold"
          :class="isActive(item) ? 'bg-blue-200 border-l-4 border-blue-600 pl-3 font-medium' : ''"
        >
          {{ item.label }}
        </NuxtLink>
        <button
          v-else
          type="button"
          class="w-full text-left block px-6 py-2 rounded text-black hover:bg-blue-200 transition-colors font-semibold"
        >
          {{ item.label }}
        </button>
      </template>
    </nav>

    <!-- Footer -->
    <div class="mt-auto p-6 text-sm text-black space-y-4">
      <div>
        <div class="opacity-70">Última atualização:</div>
        <div class="font-medium">{{ formattedUpdatedAt }}</div>
      </div>

      <div class="flex items-center gap-3">
        <!-- User icon -->
        <div class="w-10 h-10 rounded-full bg-white border border-blue-300 flex items-center justify-center text-black">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/>
          </svg>
        </div>
        <div>
          <div class="font-medium leading-tight">Administrador</div>
          <button type="button" class="text-blue-700 hover:underline text-sm">Sair</button>
        </div>
      </div>
    </div>
    <!-- right accent strip -->
  </aside>
  
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

type Item = { label: string; to?: string }

const props = withDefaults(defineProps<{
  items?: Item[]
  updatedAt?: string | Date
}>(), {
  items: () => [
    { label: 'Mapas', to: '/home' },
    { label: 'Base de dados', to: '/database' },
  ],
})

const route = useRoute()

const isActive = (item: Item) => !!item.to && route.path.startsWith(item.to)

const formattedUpdatedAt = computed(() => {
  const d = props.updatedAt ? new Date(props.updatedAt) : new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} - ${pad(d.getHours())}:${pad(d.getMinutes())}`
})
</script>

<style scoped>
</style>
