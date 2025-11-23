<template>
  <div class="reset-container" 
    :style="{ backgroundImage: `url('/images/sao-jose-campos.png')` }">

    <div class="reset-card">

      <h2 class="title title-second">Redefinição de Senha</h2>
      <p class="subtitle">Crie uma nova senha para acessar sua conta.</p>

      <!-- ALERTA INTERNO -->
      <div v-if="mensagem" :class="['alerta', tipoMensagem]">
        {{ mensagem }}
      </div>

      <!-- Campo Nova Senha -->
      <div class="input-group">
        <label class="input-label">Nova senha</label>

        <div class="input-box">
          <i class="fas fa-lock icon"></i>

          <input 
            :type="mostrarSenha ? 'text' : 'password'" 
            v-model="novaSenha" 
            @input="validarSenha"
            placeholder="Digite a nova senha"
          />

          <button class="toggle" @click="mostrarSenha = !mostrarSenha">
            <svg v-if="!mostrarSenha" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
              class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
              class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3l18 18M4.465 4.465A10.95 10.95 0 0112 5c4.478 0 8.268 2.943 9.542 7-.344 1.096-.882 2.108-1.58 3.016M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18" />
            </svg>
          </button>
        </div>

        <!-- Regras -->
        <div class="rules">
          <p :class="{ ok: regraEspecial }">• Pelo menos 1 caractere especial</p>
          <p :class="{ ok: regraMaiuscula }">• Pelo menos 1 letra maiúscula</p>
          <p :class="{ ok: regraMinCaracteres }">• No mínimo 8 caracteres</p>
        </div>
      </div>

      <!-- Confirmar Senha -->
      <div class="input-group">
        <label class="input-label">Confirmar nova senha</label>

        <div class="input-box">
          <i class="fas fa-lock icon"></i>

          <input 
            :type="mostrarSenhaConfirm ? 'text' : 'password'"
            v-model="confirmarSenha"
            placeholder="Confirme a nova senha"
          />

          <button class="toggle" @click="mostrarSenhaConfirm = !mostrarSenhaConfirm">
            <svg v-if="!mostrarSenhaConfirm" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
              class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
              class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3l18 18M4.465 4.465A10.95 10.95 0 0112 5c4.478 0 8.268 2.943 9.542 7-.344 1.096-.882 2.108-1.58 3.016M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18" />
            </svg>
          </button>
        </div>
      </div>

      <button class="btn-save" @click="salvar">Salvar</button>

    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { redefinirSenha } from "~/services/autenticador-api";
import { alertSucesso, alertAviso } from "~/composables/useAlerts";

const route = useRoute();
const router = useRouter();

const novaSenha = ref("");
const confirmarSenha = ref("");
const token = ref("");

const mostrarSenha = ref(false);
const mostrarSenhaConfirm = ref(false);

const regraEspecial = ref(false);
const regraMaiuscula = ref(false);
const regraMinCaracteres = ref(false);

const mensagem = ref("");
const tipoMensagem = ref(""); // erro | sucesso

onMounted(() => {
  token.value = route.query.token as string;
  if (!token.value) {
    mensagem.value = "Token inválido ou ausente.";
    tipoMensagem.value = "erro";
    // Opcional: Redirecionar após um tempo
    // setTimeout(() => router.push('/login'), 3000);
  }
});

const validarSenha = () => {
  const s = novaSenha.value;

  regraEspecial.value = /[!@#$%^&*(),.?":{}|<>]/.test(s);
  regraMaiuscula.value = /[A-Z]/.test(s);
  regraMinCaracteres.value = s.length >= 8;
};

const salvar = async () => {
  if (!regraEspecial.value || !regraMaiuscula.value || !regraMinCaracteres.value) {
    mensagem.value = "A senha não atende aos requisitos.";
    tipoMensagem.value = "erro";
    return;
  }

  if (novaSenha.value !== confirmarSenha.value) {
    mensagem.value = "As senhas não coincidem.";
    tipoMensagem.value = "erro";
    return;
  }

  if (!token.value) {
    mensagem.value = "Token inválido.";
    tipoMensagem.value = "erro";
    return;
  }

  try {
    await redefinirSenha(token.value, novaSenha.value);
    mensagem.value = "Senha redefinida com sucesso!";
    tipoMensagem.value = "sucesso";
    alertSucesso("Senha redefinida com sucesso!");
    
    // Redirecionar para login após sucesso
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (error: any) {
    console.error("Erro ao redefinir:", error);
    mensagem.value = "Erro ao redefinir senha. O link pode ter expirado.";
    tipoMensagem.value = "erro";
  }
};
</script>
<style scoped>
.reset-container {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reset-card {
  width: 420px;
  padding: 32px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  text-align: left;
}

.title-second {
  color: #113E63;
}

.subtitle {
  font-size: 14px;
  color: #113E63;
  opacity: 0.8;
  margin-bottom: 20px;
}

/* ALERTA INTERNO */
.alerta {
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
}

.alerta.erro {
  background: #ffdddd;
  color: #b10000;
  border: 1px solid #ff8c8c;
}

.alerta.sucesso {
  background: #ddffdd;
  color: #0f7a24;
  border: 1px solid #7dff8c;
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  font-size: 14px;
  color: #113E63;
  font-weight: bold;
  margin-bottom: 6px;
  display: block;
}

.input-box {
  position: relative;
  display: flex;
  align-items: center;
}

.input-box input {
  width: 100%;
  background: #fff;
  padding: 12px 45px 12px 35px;
  border-radius: 10px;
  border: 1px solid #113E63;
  color: #113E63;
  font-size: 14px;
  font-weight: bold;
  outline: none;
}

.icon {
  position: absolute;
  left: 10px;
  color: #113E63;
}

.toggle {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #113E63;
}

.rules p {
  font-size: 12px;
  color: #113E63;
  opacity: 0.7;
  margin-top: 4px;
}

.rules .ok {
  color: #4ade80;
  opacity: 1;
}

.btn-save {
  width: 100%;
  background: #113E63;
  color: #fff;
  padding: 12px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
}

.btn-save:hover {
  background: #0f2b4a;
}
</style>
