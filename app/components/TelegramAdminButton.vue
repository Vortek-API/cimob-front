<template>
  <div v-if="auth.isAdmin" class="telegram-admin-button-container">

    <!-- Versão Mobile: Botão Flutuante -->
    <div class="md:hidden fixed bottom-6 right-6 z-50">
      <a
        href="https://t.me/+rGmkfxYTzmYwYTMx"
        target="_blank"
        rel="noopener noreferrer"
        class="telegram-button-mobile"
        title="Acessar grupo do Telegram"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a11.955 11.955 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.365-1.337.175-.437-.148-1.33-.414-1.98-.742-.798-.329-1.424-.608-1.369-1.056.025-.168.325-.337.893-.501 3.5-1.33 5.228-2.223 6.3-3.843.652-1.01 1.077-2.35.923-3.595-.140-1.174-1.555-2.752-3.144-2.678z"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/authStore'

const auth = useAuthStore()
</script>

<style scoped>
/* Botão Desktop (na Sidebar) */
.telegram-button-desktop {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #0088cc 0%, #0077b5 100%);
  color: white;
  font-weight: 600;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-size: 0.875rem;
  text-decoration: none;
  width: 100%;
  text-align: center;
}

.telegram-button-desktop:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background: linear-gradient(135deg, #0077b5 0%, #005fa3 100%);
}

.telegram-button-desktop:active {
  transform: translateY(0);
}

/* Botão Mobile (Flutuante) */
.telegram-button-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #0088cc 0%, #0077b5 100%);
  color: white;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  text-decoration: none;
}

.telegram-button-mobile:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 25px 30px -5px rgba(0, 0, 0, 0.15), 0 12px 12px -6px rgba(0, 0, 0, 0.05);
  background: linear-gradient(135deg, #0077b5 0%, #005fa3 100%);
}

.telegram-button-mobile:active {
  transform: scale(0.95);
}

/* Container */
.telegram-admin-button-container {
  animation: fadeIn 300ms ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
