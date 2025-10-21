<template>
  <!-- Container principal com imagem de fundo -->
  <div class="main-container" :style="{ backgroundImage: `url(\'/images/sao-jose-campos.png\')` }">

    <!-- Card de login com opacidade e lógica de alternância de classes -->
    <div class="login-card" :class="loginAdminCimob ? 'sign-up-js' : 'sign-in-js'">

      <!-- Fundo azul do card -->
      <div class="card-background"></div>

      <div class="logo-container absolute top-5 right-[calc(var(--spacing)*25)] w-40">
        <img :src="imgCimo" alt="Logo CIMOB" />
      </div>

      <!-- Linha decorativa abaixo da logo -->
      <div class="decorative-line">
        <svg class="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 3">
          <line x1="0" y1="1.5" x2="1000" y2="1.5" stroke="var(--stroke-0, #113E63)" stroke-width="3" />
        </svg>
      </div>

      <!-- Conteúdo das telas de login/cadastro -->
      <div class="content-wrapper">

        <!-- Segunda Tela: Usuário (esquerda) / Administrador (direita) -->
        <div class="content second-content">
          <div class="column first-column-panel">
            <h2 class="title title-primary">Primeira vez no CIMOB?</h2>
            <p class="description description-primary">se você é seu primeiro acesso no CIMOB por favor clique aqui</p>
            <button @click="togglePanel" class="btn btn-primary">Cadastre-se</button>
          </div>
          <div class="column second-column-form">
            <h2 class="title title-second">AUTENTIQUE-SE</h2>
            <form class="form" @submit.prevent="loginAdmin">
              <label class="label-input">
                <i class="far fa-envelope icon-modify"></i>
                <input type="Email" v-model="emailAdminCimob" placeholder="Email">
              </label>

              <label class="label-input">
                <i class="fas fa-lock icon-modify"></i>
                <input :type="mostrarSenhaAdmin ? 'text' : 'password'" v-model="senhaAdminCimob" placeholder="Senha">
                <button type="button" @click="toggleSenhaAdmin" class="toggle-password-visibility">
                  <svg v-if="!mostrarSenhaAdmin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
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
              </label>

              <a class="password" href="#">Esqueceu a senha?</a>
              <button class="btn btn-second" type="submit">Entrar</button>
            </form>

          </div>
        </div>

        <!-- Primeira Tela: Administrador (esquerda) / Usuário (direita) -->
        <div class="content first-content">
          <div class="column first-column-panel">
            <h2 class="title title-primary">Já Sou CIMOB!</h2>
            <p class="description description-primary">Se você tem o cadastro comum ou é administrador por favor clique
              aqui</p>
            <button @click="togglePanel" class="btn btn-primary">Entrar</button>
          </div>

          <div class="column second-column-form">

            <form class="form" @submit.prevent="cadastrarUserCimob">
              <label class="label-input">
                <i class="far fa-user icon-modify"></i>
                <input type="text" v-model="nomeUserCimob" placeholder="Nome Completo">
              </label>

              <label class="label-input">
                <i class="far fa-user icon-modify"></i>
                <input type="text" v-model="nomeUserCimob" placeholder="CPF">
              </label>

              <label class="label-input">
                <i class="far fa-envelope icon-modify"></i>
                <input type="email" v-model="emailUserCimob" placeholder="Email">
              </label>

              <label class="label-input">
                <i class="fas fa-lock icon-modify"></i>
                <input :type="mostrarSenhaUser ? 'text' : 'password'" v-model="senhaUserCimob" placeholder="Senha">
                <button type="button" @click="toggleSenhaUser" class="toggle-password-visibility">
                  <svg v-if="!mostrarSenhaUser" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
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
              </label>

              <button class="btn btn-second" type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Rodapé -->
    <div class="footer-text">
      <span>© VORTEK 2025</span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createToast } from "mosha-vue-toastify";
import imgCimo from "/images/cimob.png";

import "mosha-vue-toastify/dist/style.css";
// import { autenticarUsuario } from "~/services/autenticador-api"; // Descomente e ajuste o caminho se for usar

// Importações do código de referência para logo (ajustar caminhos conforme sua estrutura de projeto)
// import svgPathsImport from \'~/assets/svgPaths\'; // Se você estiver usando SVGs inline como no exemplo

// Estado do painel para alternar entre as telas
const loginAdminCimob = ref(false); // controla se está na tela de login admin ou cadastro usuário

// Dados Usuário CIMOB (para cadastro)
const nomeUserCimob = ref("");
const emailUserCimob = ref("");
const senhaUserCimob = ref("");
const mostrarSenhaUser = ref(false);

// Dados Administrador CIMOB (para login)
const emailAdminCimob = ref("");
const senhaAdminCimob = ref("");
const mostrarSenhaAdmin = ref(false);

// Controle de loading (opcional, se for integrar com API)
const loading = ref(false);

// Toasts (necessário instalar mosha-vue-toastify)
const toastAviso = (msg: string) =>
  createToast(msg, { type: "warning", position: "top-center", showIcon: true, timeout: 3000 });

const toastSucesso = (msg: string) =>
  createToast(msg, { type: "success", position: "top-center", showIcon: true, timeout: 3000 });

// Alternar tela
const togglePanel = () => {
  loginAdminCimob.value = !loginAdminCimob.value;
};

// Mostrar/ocultar senha para Usuário
const toggleSenhaUser = () => (mostrarSenhaUser.value = !mostrarSenhaUser.value);

// Mostrar/ocultar senha para Administrador
const toggleSenhaAdmin = () => (mostrarSenhaAdmin.value = !mostrarSenhaAdmin.value);

// Login Administrador
const loginAdmin = async () => {
  if (!emailAdminCimob.value || !senhaAdminCimob.value) {
    toastAviso("Preencha todos os campos!");
    return;
  }

  loading.value = true;
  try {
    // Exemplo de integração com sua API de autenticação
    // const data = await autenticarUsuario({
    //   userName: emailAdminCimob.value.trim(),
    //   senha: senhaAdminCimob.value.trim(),
    // });

    // localStorage.setItem("token", data.accessToken);
    console.log("Login Admin:", emailAdminCimob.value, senhaAdminCimob.value);
    toastSucesso("Login realizado com sucesso!");
    // window.location.href = "/home"; // Redirecionar após login
  } catch (error: any) {
    toastAviso("Erro ao autenticar, verifique suas credenciais.");
  } finally {
    loading.value = false;
  }
};

// Cadastro Usuário
const cadastrarUserCimob = async () => {
  if (!nomeUserCimob.value || !emailUserCimob.value || !senhaUserCimob.value) {
    toastAviso("Preencha todos os campos!");
    return;
  }

  loading.value = true;
  try {
    // Aqui tu chamaria a API de cadastro
    console.log("Cadastro:", {
      nome: nomeUserCimob.value.trim(),
      email: emailUserCimob.value.trim(),
      senha: senhaUserCimob.value.trim(),
    });

    toastSucesso("Usuário cadastrado com sucesso!");
  } catch (error: any) {
    toastAviso("Erro ao cadastrar usuário.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Importação de fontes e ícones */
@import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Nunito', sans-serif;
}

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.login-card {
  background-color: rgba(205, 232, 255, 0.8);
  /* Fundo azul claro com opacidade */
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 90%;
  /* Mais responsivo */
  max-width: 700px;
  /* Limite máximo */
  height: 90%;
  /* Mais responsivo */
  max-height: 490px;
  /* Limite máximo */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-background {
  position: absolute;
  background-color: #cde8ff;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 20px;
}


.decorative-line {
  position: absolute;
  top: 80px;
  /* Ajustado para ficar abaixo da nova posição da logo */
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  /* Mais responsivo */
  max-width: 524px;
  height: 3px;
  background-color: #113E63;
  z-index: 20;
}

.content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.75s ease-in-out;
}

.first-content {
  transform: translateX(0%);
}

.second-content {
  transform: translateX(100%);
}

.sign-in-js .first-content {
  transform: translateX(-100%);
}

.sign-in-js .second-content {
  transform: translateX(0%);
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  border-radius: 20px;
  /* Para as colunas internas */
}

.first-column-panel {
  background-color: #113E63;
  /* Cor principal do novo design */
  color: #fff;
}

.second-column-form {
  background-color: transparent;
  /* Será sobreposto pelo fundo do card */
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.title-primary {
  color: #fff;
}

.title-second {
  color: #113E63;
}

.description {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

.description-primary {
  color: #fff;
}

.social-media {
  margin: 20px 0;
}

.list-social-media {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.item-social-media {
  border: 1px solid #ccc;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
  color: #113E63;
}

.link-social-media {
  text-decoration: none;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.label-input {
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  max-width: 350px;
  /* Limite para inputs em telas maiores */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
}

.label-input i {
  color: #113E63;
  margin-right: 10px;
}

.label-input input {
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: #113E63;
  font-weight: bold;
  padding-right: 40px;
}

.toggle-password-visibility {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #113E63;
  padding: 0;
}

.btn {
  border-radius: 20px;
  border: 1px solid transparent;
  background-color: #113E63;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  margin-top: 10px;
}

.btn-primary {
  background-color: #fff;
  color: #113E63;
  border: 1px solid #fff;
}

.btn-primary:hover {
  background-color: #eee;
}

.btn-second {
  background-color: #113E63;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.btn-second:hover {
  background-color: #0f2b4a;
}

.password {
  color: #113E63;
  font-size: 14px;
  margin: 15px 0;
  text-align: center;
  text-decoration: none;
}

.footer-text {
  position: fixed;
  bottom: 20px;
  /* Ajustado para não ficar muito baixo */
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 50;
  color: #fff;
  font-size: 14px;
  opacity: 0.5;
  user-select: none;
}

/* Responsividade */
@media (max-width: 768px) {
  .login-card {
    width: 95%;
    height: auto;
    min-height: 400px;
    flex-direction: column;
    /* Empilha as colunas em telas menores */
  }

  .content-wrapper {
    flex-direction: column;
    /* Empilha as colunas internas */
  }

  .content {
    flex-direction: column;
    /* Empilha as colunas internas */
  }

  .first-column-panel,
  .second-column-form {
    width: 100%;
    padding: 20px 15px;
  }

  .logo-container {
    top: 10px;
    width: 150px;
  }

  .decorative-line {
    top: 70px;
    width: 90%;
  }

  .first-content .first-column-panel,
  .second-content .first-column-panel {
    border-radius: 20px 20px 0 0;
  }

  .first-content .second-column-form,
  .second-content .second-column-form {
    border-radius: 0 0 20px 20px;
  }

  /* Animações para telas pequenas */
  .sign-in-js .first-content {
    transform: translateY(-100%);
  }

  .sign-in-js .second-content {
    transform: translateY(0%);
  }

  .second-content {
    transform: translateY(100%);
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 20px;
  }

  .description {
    font-size: 12px;
  }

  .btn {
    padding: 10px 30px;
  }

  .label-input {
    width: 90%;
  }

  .logo-container {
    width: 120px;
  }

  .decorative-line {
    top: 60px;
    width: 95%;
  }
}
</style>
