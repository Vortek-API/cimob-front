<script setup lang="ts">
import { ref } from "vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import imgCimo from "/images/cimob.png";
import svgPathsImport from "~/assets/svgPaths";
import { autenticarUsuario } from "~/services/autenticador-api";

// Estado do formulário
const usuario = ref("");
const senha = ref("");
const mostrarSenha = ref(false);
const loading = ref(false);

// SVGs importados
const svgPaths = svgPathsImport;

// Toasts
const toastAviso = (msg: string) =>
  createToast(msg, {
    type: "warning",
    position: "top-center",
    showIcon: true,
    timeout: 3000,
  });

const toastSucesso = (msg: string) =>
  createToast(msg, {
    type: "success",
    position: "top-center",
    showIcon: true,
    timeout: 3000,
  });

// Mostrar/ocultar senha
const toggleSenha = () => (mostrarSenha.value = !mostrarSenha.value);

// Função de login
const login = async () => {
  // Validação básica
  if (!usuario.value || !senha.value) {
    toastAviso("Por favor, preencha todos os campos!");
    return;
  }

  // Trim para remover espaços extras
  const userTrimmed = usuario.value.trim();
  const passTrimmed = senha.value.trim();

  console.log("Enviando:", { userName: userTrimmed, senha: passTrimmed });

  loading.value = true;
  try {
    const data = await autenticarUsuario({
      userName: userTrimmed,
      senha: passTrimmed,
    });

    // Salva o token no localStorage
    localStorage.setItem("token", data.accessToken);
    console.log("Token recebido:", data.accessToken); // Debug token

    toastSucesso("Login realizado com sucesso!");
    window.location.href = "/home";
  } catch (error: any) {
    // Tratamento de erros detalhado
    if (error.response) {
      if (error.response.status === 401) {
        toastAviso("Usuário ou senha incorretos!");
      } else if (error.response.data?.message) {
        toastAviso(`Erro: ${error.response.data.message}`);
      } else {
        toastAviso(`Erro no servidor: ${error.response.status}`);
      }
    } else if (error.request) {
      toastAviso("Não foi possível conectar ao servidor. Tente novamente.");
    } else {
      toastAviso(`Erro inesperado: ${error.message}`);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <!-- Container principal -->
  <div class="relative w-screen h-screen flex items-center justify-center"
    style="background-image: url('/images/sao-jose-campos.png'); background-size: cover; background-position: center;">

    <div class="relative w-screen h-screen flex items-center justify-center">
      <!-- Card de login -->
      <div class="opacity-80 relative w-[700px] h-[490px] z-10 shadow-2xl rounded-[20px]" data-name="Login group">

        <!-- Fundo azul -->
        <div class="absolute bg-[#cde8ff] h-[490px] left-0 rounded-[20px] top-0 w-[700px]"></div>

        <!-- Logo -->
        <div class="absolute bg-center bg-cover bg-no-repeat h-[119.292px] left-[210px] top-[27.66px] w-[290.906px]"
          data-name="cimo" :style="{ backgroundImage: `url('${imgCimo}')` }"></div>

        <!-- Linha decorativa -->
        <div class="absolute h-0 left-[90px] top-[147.2px] w-[524.006px]">
          <div class="absolute top-[5px] left-0 w-full h-[3px] z-10">
            <svg class="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 3">
              <line x1="0" y1="1.5" x2="1000" y2="1.5" stroke="var(--stroke-0, #113E63)" stroke-width="3" />
            </svg>
          </div>
        </div>

        <!-- Input de usuário -->
        <div class="absolute h-[52.359px] left-[135.7px] top-[226.23px] w-[439.59px]">
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

          <input v-model="usuario" type="text" placeholder="Usuário"
            class="absolute inset-0 px-[70px] py-3 w-full h-full bg-transparent text-[#113E63] font-bold focus:outline-none" />

          <div class="absolute h-[39.516px] left-[10px] top-[6px] w-[39.514px]" data-name="account_circle">
            <svg class="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
              <g id="account_circle">
                <path :d="svgPaths.user" fill="var(--fill-0, #113E63)" id="icon" />
              </g>
            </svg>
          </div>
        </div>

        <!-- Input de senha -->
        <div
          class="absolute bg-white h-[52.359px] left-[135.7px] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[339.84px] w-[439.59px] relative">
          <input v-model="senha" :type="mostrarSenha ? 'text' : 'password'" placeholder="Senha"
            class="absolute inset-0 pl-[70px] pr-[40px] py-3 w-full h-full bg-transparent text-[#113E63] font-bold focus:outline-none" />

          <div class="absolute h-[39.516px] left-[10px] top-[6px] w-[39.514px]" data-name="Key">
            <svg class="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
              <g id="Key">
                <path :d="svgPaths.key" id="Icon" stroke="var(--stroke-0, #113E63)" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="4" />
              </g>
            </svg>
          </div>

          <button type="button" @click="toggleSenha"
            class="absolute right-[15px] top-1/2 transform -translate-y-1/2 text-[#113E63]">
            <svg v-if="!mostrarSenha" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3l18 18M4.465 4.465A10.95 10.95 0 0112 5c4.478 0 8.268 2.943 9.542 7-.344 1.096-.882 2.108-1.58 3.016M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18" />
            </svg>
          </button>

          <!-- Botão de Login -->
     <div class="absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 w-full flex justify-center">
  <button @click="login" :disabled="loading"
    class="h-[35px] w-[155px] rounded-md cursor-pointer font-nunito shadow-md flex justify-center items-center bg-[#113E63] text-white hover:bg-[#0f2b4a] transition-colors duration-200">
    ENTRAR
  </button>
</div>


        </div>

      </div>
    </div>

    <!-- Rodapé -->
    <div class="fixed text-[#cde8ff] bottom-[50px] w-full flex justify-center z-50">
      <span class="text-white text-sm opacity-50 select-none">© VORTEK 2025</span>
    </div>

  </div>
</template>
