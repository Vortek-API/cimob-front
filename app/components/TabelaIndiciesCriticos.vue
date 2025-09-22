<script setup lang="ts">
const props = withDefaults(defineProps<{ maxHeight?: string; limit?: number }>(), {
  limit: 3
})

const data = ref([
  {
    endereco: 'Rua das Flores, 123',
    regiao: 'Norte',
    velocidade: 85,
  },
  {
    endereco: 'Avenida Central, 456',
    regiao: 'Sul',
    velocidade: 90,
  },
  {
    endereco: 'Travessa das Acácias, 789',
    regiao: 'Leste',
    velocidade: 78,
  },
  {
    endereco: 'Rua do Sol, 101',
    regiao: 'Oeste',
    velocidade: 92,
  },
  {
    endereco: 'Avenida das Estrelas, 202',
    regiao: 'Centro',
    velocidade: 88,
  },
])

const columns = [
  { accessorKey: 'endereco', header: 'Endereço do radar' },
  { accessorKey: 'regiao', header: 'Região' },
  { accessorKey: 'velocidade', header: 'Velocidade' }
]

const tableUi = {
  root: 'w-full',
  base: 'w-full table-auto',
  thead: 'bg-white',
  tbody: 'bg-white',
  // Tornar o cabeçalho realmente "sticky" nos navegadores (aplicar no th, não apenas no thead)
  th: 'sticky top-0 z-10 bg-white text-sm font-semibold text-gray-700 px-4 py-3',
  td: 'px-4 py-3 text-gray-800',
  tr: 'border-b border-gray-200 last:border-b-0',
  separator: 'border-t border-gray-200'
}

// Apenas N linhas visíveis (além do header)
const visibleData = computed(() => data.value.slice(0, props.limit))
</script>

<template>
  <div class="bg-white rounded-xl ring-1 ring-gray-200 shadow">
    <UTable :data="visibleData" :columns="columns" :ui="tableUi" />
  </div>
</template>
