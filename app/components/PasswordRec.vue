<template>
  <!-- Modal de Recuperação de Senha -->
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-card">
      <button class="close-button" @click="closeModal">&times;</button>

      <!-- VISÃO 1: FORMULÁRIO DE E-MAIL -->
      <div v-if="!isSuccess">
        <div class="modal-header">
          <h2 class="title title-second">Recuperar Senha</h2>
          <p class="description">Digite seu e-mail para receber um link de redefinição.</p>
        </div>

        <form class="form" @submit.prevent="submitForm">
          <label class="label-input">
            <i class="far fa-envelope icon-modify"></i>
            <input type="email" v-model="email" placeholder="Seu Email" required>
          </label>

          <button class="btn btn-second" type="submit">Enviar Link</button>
        </form>
      </div>

      <!-- VISÃO 2: CONFIRMAÇÃO DE SUCESSO -->
      <div v-else class="success-view">
        <div class="success-icon-container">
          <!-- Ícone de Sucesso (Atualizado para o estilo azul) -->
          <svg class="success-icon" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Círculo Azul Claro -->
            <circle cx="26" cy="26" r="25" fill="#40B3C9" stroke="#40B3C9" stroke-width="2"/>
            <!-- Contorno Azul Escuro (simulando o arco ) -->
            <path d="M26 1C12.2 1 1 12.2 1 26s11.2 25 25 25" stroke="#113E63" stroke-width="3" fill="none"/>
            <!-- Checkmark Azul Escuro -->
            <path d="M14 27L22 35L38 19" stroke="#113E63" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="modal-header">
          <h2 class="title title-second">E-mail Enviado!</h2>
          <p class="description success-message">
            Enviamos um link de redefinição de senha para:
              

            <strong class="email-display">{{ email }}</strong>
          </p>
          <p class="description final-instruction">
            Verifique sua caixa de entrada (e spam) para continuar.
          </p>
        </div>

        <button class="btn btn-second" @click="closeModal">Voltar ao Login</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// IMPORTANTE: Certifique-se de que o caminho para suas funções de API e alerts está correto
import { recuperarSenha } from "~/services/autenticador-api";
import { alertAviso } from "~/composables/useAlerts";

// Define as props que o componente pai irá passar
const props = defineProps<{
  isVisible: boolean;
}>();

// Define os eventos que o componente pode emitir
const emit = defineEmits(['update:isVisible']);

// Estado local do modal
const email = ref('');
const isSuccess = ref(false);

// Função para fechar o modal
const closeModal = () => {
  emit('update:isVisible', false);
  // Resetar estado ao fechar
  email.value = '';
  isSuccess.value = false;
};

// Função para submeter o formulário de recuperação de senha
const submitForm = async () => {
  if (!email.value) {
    alertAviso("Informe um email!");
    return;
  }

  try {
    // Chamar a API de recuperação de senha
    await recuperarSenha(email.value.trim());
    console.log('Tentativa de recuperação de senha para:', email.value);
  } catch (err) {
    // Mesmo se der erro porque o email não existe, a resposta pro usuário é a mesma (por segurança)
    console.error("Erro ao recuperar senha:", err);
  }

  // Mostrar a Visão 2 de Sucesso
  isSuccess.value = true;
};
</script>

<style scoped>
/* Importação de fontes e ícones */
@import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css'  );
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap'  );

/* Variáveis de Cores */
:root {
  --primary-color: #113E63; /* Azul Escuro */
  --secondary-color: #0099FF; /* Azul Vibrante */
  --background-card: #FFFFFF; /* Fundo Branco Sólido */
  --text-color: #113E63;
  --shadow-heavy: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* ----------------------------------- */
/* ESTILOS DO MODAL (Adaptado do seu login) */
/* ----------------------------------- */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Fundo escuro para destacar o modal */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-family: 'Nunito', sans-serif;
}

.modal-card {
  background-color: white;
  border-radius: 20px;
  box-shadow: var(--shadow-heavy);
  width: 90%;
  max-width: 400px; /* Tamanho ideal para um modal de formulário */
  padding: 30px;
  position: relative;
  animation: slideIn 0.3s ease-out;
}

/* Animação de entrada do modal */
@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.title-second {
  color: var(--primary-color); /* Cor azul do seu login */
}

.description {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
  color: #333;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--primary-color);
  cursor: pointer;
  transition: color 0.2s;
}

.close-button:hover {
  color: var(--secondary-color);
}

/* ----------------------------------- */
/* ESTILOS DO FORMULÁRIO (Copiado do seu login) */
/* ----------------------------------- */

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px; /* Ajustado para melhor espaçamento */
}

.label-input {
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  width: 100%; /* Ajustado para preencher o modal */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  /* Contorno Preto */
  border: 0.01px solid #0f2b4a;
}

.label-input i {
  color: var(--primary-color);
  margin-right: 10px;
}

.label-input input {
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: var(--primary-color);
  font-weight: bold;
  padding-right: 40px;
}

/* Botão (Copiado do seu .btn-second) */
.btn {
  border-radius: 20px;
  border: 1px solid transparent;
  background-color: var(--primary-color);
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  margin-top: 10px;
  width: 100%; /* Ajustado para preencher o modal */
}

.btn-second {
  background-color: #0f2b4a;
  color: white;
  font-family: 'Nunito', sans-serif;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

/* ----------------------------------- */
/* ESTILOS DA VISÃO DE SUCESSO */
/* ----------------------------------- */

.success-view {
  text-align: center;
}

.success-icon-container {
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  /* Animação de pulso sutil para o ícone */
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(64, 179, 201, 0.7); /* Cor do pulso ajustada para o azul claro */
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(64, 179, 201, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(64, 179, 201, 0);
  }
}

.success-message {
  margin-top: 10px;
  margin-bottom: 10px;
}

.email-display {
  color: var(--primary-color);
  font-weight: 700;
  display: block;
  margin-top: 5px;
  word-break: break-all;
}

.final-instruction {
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 13px;
  color: #666;
}

/* Responsividade (Adaptado para o modal) */
@media (max-width: 480px) {
  .modal-card {
    max-width: 95%;
    padding: 20px;
  }

  .title {
    font-size: 20px;
  }

  .description {
    font-size: 12px;
  }

  .btn {
    padding: 10px 30px;
  }
}
</style>
