<script setup lang="ts">
import svgPaths from "@/assets/svgPaths"; 
import imgCimo from "/images/cimob.png";  
import { ref } from "vue";

// Variáveis reativas para os inputs
const usuario = ref("");
const senha = ref("");   

// Lógica para mostrar/ocultar senha
const mostrarSenha = ref(false);
const toggleSenha = () => {
  mostrarSenha.value = !mostrarSenha.value; 
};
</script>

<template>
  <!-- Container principal com background da cidade -->
  <div class="relative w-screen h-screen flex items-center justify-center"
    style="background-image: url('/images/sao-jose-campos.png'); background-size: cover; background-position: center;">
    <!-- Overlay escuro para dar destaque ao card de login -->
    <div class="absolute inset-0 bg-black opacity-60 z-0"></div>

    <div class="relative w-screen h-screen flex items-center justify-center">


      <!-- Card de login -->
      <div class="opacity-80 relative w-[700px] h-[490px] z-10 shadow-2xl rounded-[20px]" data-name="Login group">

        <!-- Fundo azul do card com borda arredondada -->
        <div class="absolute bg-[#cde8ff] h-[490px] left-0 rounded-[20px] top-0 w-[700px]"></div>

        <!-- Logo no topo do card -->
        <div class="absolute bg-center bg-cover bg-no-repeat h-[119.292px] left-[210px] top-[27.66px] w-[290.906px]"
          data-name="cimo" :style="{ backgroundImage: `url('${imgCimo}')` }"></div>

        <!-- Linha decorativa abaixo do logo -->
        <div class="absolute h-0 left-[90px] top-[147.2px] w-[524.006px]">
          <div class="absolute top-[5px] left-0 w-full h-[3px] z-10">
            <svg class="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 3">
              <line x1="0" y1="1.5" x2="1000" y2="1.5" stroke="var(--stroke-0, #113E63)" stroke-width="3" />
            </svg>
          </div>
        </div>

        <!-- Input de usuário -->
        <div class="absolute h-[52.359px] left-[135.7px] top-[226.23px] w-[439.59px]">
          <!-- Caixa SVG de fundo do input -->
          <div class="absolute bottom-[-15.28%] left-[-0.91%] right-[-0.91%] top-0">
            <svg class="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 448 61">
              <g filter="url(#filter0_d_3_98)" id="Rectangle 8">
                <path :d="svgPaths.inputBox" fill="var(--fill-0, white)" />
              </g>
              <defs>
                <filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="60.3589"
                  id="filter0_d_3_98" width="447.59" x="0" y="0">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_3_98" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_3_98" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>

          <!-- Input real -->
          <input v-model="usuario" type="text" placeholder="Usuário"
            class="absolute inset-0 px-[70px] py-3 w-full h-full bg-transparent text-[#113E63] font-bold focus:outline-none" />

          <!-- Ícone de usuário -->
          <div class="absolute h-[39.516px] left-[10px] top-[6px] w-[39.514px]" data-name="account_circle">
            <svg class="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
              <g id="account_circle">
                <path :d="svgPaths.user" fill="var(--fill-0, #113E63)" id="icon" />
              </g>
            </svg>
          </div>
        </div>

        <!-- Container do input de senha -->
        <div
          class="absolute bg-white h-[52.359px] left-[135.7px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[339.84px] w-[439.59px] relative">
          <!-- Input de senha -->
          <input v-model="senha" :type="mostrarSenha ? 'text' : 'password'" placeholder="Senha"
            class="absolute inset-0 pl-[70px] pr-[40px] py-3 w-full h-full bg-transparent text-[#113E63] font-bold focus:outline-none" />
          <!-- Alterna entre texto e password -->

          <!-- Ícone chave -->
          <div class="absolute h-[39.516px] left-[10px] top-[6px] w-[39.514px]" data-name="Key">
            <svg class="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
              <g id="Key">
                <path :d="svgPaths.key" id="Icon" stroke="var(--stroke-0, #113E63)" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="4" />
              </g>
            </svg>
          </div>

          <!-- Botão do olhinho para mostrar/ocultar senha -->
          <button type="button" @click="toggleSenha"
            class="absolute right-[15px] top-1/2 transform -translate-y-1/2 text-[#113E63]">
            <!-- Olho aberto -->
            <svg v-if="!mostrarSenha" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            </svg>

            <!-- Olho fechado -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3l18 18M4.465 4.465A10.95 10.95 0 0112 5c4.478 0 8.268 2.943 9.542 7-.344 1.096-.882 2.108-1.58 3.016M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18" />
            </svg>
          </button>
        </div>

      </div>
    </div>
    <!-- ----- Marca d'água rodapé ----- -->
    <div class="fixed text-[#cde8ff] bottom-[50px] w-full flex justify-center z-50">
      <span class="text-white text-sm opacity-50 select-none">
        © VORTEK 2025
      </span>
    </div>

  </div>

</template>
