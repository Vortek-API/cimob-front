<script setup lang="ts">
import type { ParametroVelocidade } from '~/types';

const config = useRuntimeConfig();
const { data: parametros, pending, error } = await useFetch<ParametroVelocidade[]>(`${config.public.apiBase}/parametros-velocidade`);
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4 text-gray-700">Constantes de Velocidade Média</h2>

    <div v-if="pending" class="text-center text-gray-500">
      <p>Carregando dados...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <strong class="font-bold">Ocorreu um erro!</strong>
      <span class="block sm:inline"> Não foi possível buscar os parâmetros. Tente novamente mais tarde.</span>
      <pre class="mt-2 text-xs">{{ error.message }}</pre>
    </div>

    <div v-else-if="parametros" class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="py-3 px-4 uppercase font-semibold text-sm text-left">Tipo de Veículo</th>
            <th class="py-3 px-4 uppercase font-semibold text-sm text-left">Velocidade Média (km/h)</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-for="parametro in parametros" :key="parametro.tipoVeiculo" class="border-b hover:bg-gray-100">
            <td class="py-3 px-4">{{ parametro.tipoVeiculo }}</td>
            <td class="py-3 px-4">{{ parametro.velocidadeMediaKmh }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>