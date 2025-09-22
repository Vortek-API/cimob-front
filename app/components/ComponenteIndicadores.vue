<template>
  <section class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class="w-full bg-white rounded-xl p-4 ring-1 ring-gray-200 shadow-[0_6px_0_0_rgba(17,24,39,0.06)] hover:shadow-[0_10px_0_0_rgba(17,24,39,0.08)] transition-all duration-200 flex flex-col justify-between"
      >
        <div class="flex items-center gap-2 text-gray-700 font-semibold">
          <span :class="['w-3 h-3 rounded-full', card.circulo]" />
          <span>{{ card.indicador }}</span>
        </div>

        <div class="text-center py-2">
          <div class="text-4xl font-extrabold text-gray-900 leading-none">{{ card.valor }}</div>
        </div>

        <div class="text-center">
          <NuxtLink
            :to="card.to"
            class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-white shadow-md bg-gradient-to-b from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 transition-colors"
          >
            Ver detalhes
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
  
</template>

<script setup lang="ts">
type Card = {
  id: number
  indicador: string
  valor: number
  circulo: string
  to: string
}

const cards: Card[] = [
  { id: 1, indicador: 'Trânsito', valor: 3, circulo: 'bg-orange-500', to: '/database' },
  { id: 2, indicador: 'Velocidade Média', valor: 1, circulo: 'bg-green-500', to: '/database' },
  { id: 3, indicador: 'Indicador a Definir', valor: 1, circulo: 'bg-lime-500', to: '/database' },
]
</script>

<style scoped>
</style>
