import { ref } from 'vue'
import { APP_CONFIG } from '~/config/app-config'

// Timestamp fixo definido quando a aplicação carrega
export const appStartTime = ref<Date>(new Date())

// Contador de ciclos para calcular o timestamp atual
export const cycleCount = ref<number>(0)

// Marca o último avanço bem-sucedido do ciclo (ms desde epoch)
export const lastAdvanceTime = ref<number>(0)

// Função para obter o timestamp inicial (X minutos antes do início da app)
export function getInitialTimestamp(): Date {
  const startTime = appStartTime.value
  const windowMinutesAgo = new Date(startTime.getTime() - APP_CONFIG.TIME_WINDOW_MINUTES * 60 * 1000)
  return windowMinutesAgo
}

// Função para obter o timestamp atual da janela (avança a cada ciclo)
export function getCurrentWindowTimestamp(): Date {
  const initialTime = getInitialTimestamp()
  // Avança o timestamp baseado no número de ciclos
  const currentWindow = new Date(initialTime.getTime() + (cycleCount.value * APP_CONFIG.TIME_WINDOW_MINUTES * 60 * 1000))
  return currentWindow
}

// Função para avançar o ciclo (chamada a cada auto-refresh)
export function advanceCycle(): void {
  const now = Date.now()
  const minInterval = APP_CONFIG.AUTO_REFRESH_INTERVAL_MS - 500 // tolerância de 500ms

  // Se nunca avançou ou se já passou o intervalo mínimo, incrementa o ciclo.
  // Isto evita que múltiplos componentes chamem advanceCycle() quase ao mesmo tempo
  // e causem avanços múltiplos no mesmo ciclo.
  if (lastAdvanceTime.value === 0 || (now - lastAdvanceTime.value) >= minInterval) {
    cycleCount.value++
    lastAdvanceTime.value = now
  }
}

// Função para obter a string formatada do timestamp inicial (SEM timezone)
export function getInitialTimestampString(): string {
  const date = getInitialTimestamp()
  // Formato local sem conversão para UTC
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

// Função para obter a string formatada do timestamp atual da janela (SEM timezone)
export function getCurrentWindowTimestampString(): string {
  const date = getCurrentWindowTimestamp()
  // Formato local sem conversão para UTC
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

// Função para obter informações sobre a janela de tempo atual
export function getTimeWindowInfo() {
  return {
    windowMinutes: APP_CONFIG.TIME_WINDOW_MINUTES,
    startTime: appStartTime.value,
    cycleCount: cycleCount.value,
    initialTimestamp: getInitialTimestamp(),
    currentWindowTimestamp: getCurrentWindowTimestamp(),
    initialTimestampString: getInitialTimestampString(),
    currentWindowTimestampString: getCurrentWindowTimestampString()
  }
}
