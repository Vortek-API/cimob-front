<template>
  <section class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <template v-if="isLoadingIndicadores">
        <div v-for="n in 3" :key="`skeleton-${n}`" class="w-full bg-white rounded-xl p-4 ring-1 ring-gray-200 shadow animate-pulse">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-gray-300" />
            <div class="h-4 w-40 bg-gray-200 rounded" />
          </div>
          <div class="text-center py-4">
            <div class="h-10 w-24 bg-gray-200 rounded mx-auto" />
          </div>
        </div>
      </template>

      <template v-else-if="indicadoresError">
        <div class="col-span-full bg-red-50 text-red-700 border border-red-200 rounded-xl p-4">
          {{ indicadoresError }}
        </div>
      </template>

      <template v-else>
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

        <!-- <div class="text-center">
          <NuxtLink
            :to="card.to"
            class="inline-flex items-center justify-center px-4 py-2 rounded-lg text-white shadow-md bg-gradient-to-b from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 transition-colors"
          >
            Ver detalhes
          </NuxtLink>
        </div> -->
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { cards, reloadIndicadores, isLoadingIndicadores, indicadoresError } from '~/store/indicadores'
import { isFiltered, regiaoSelecionada } from '~/store/filtro'

</script>

<style scoped>
</style>
