export const APP_CONFIG = {
  // Janela de tempo em minutos para busca de dados
  TIME_WINDOW_MINUTES: 5,
  
  // Intervalo de atualização automática em milissegundos
  AUTO_REFRESH_INTERVAL_MS: 5 * 60 * 1000, // 2 minutos
  
  // Debounce para filtros em milissegundos
  FILTER_DEBOUNCE_MS: 300,
  
  // Configurações da API
  API: {
    TIMEOUT_MS: 10000,
    RETRY_ATTEMPTS: 3
  }
} as const

// Função helper para calcular intervalos baseados na janela de tempo
export function getTimeWindowConfig() {
  return {
    windowMinutes: APP_CONFIG.TIME_WINDOW_MINUTES,
    windowMs: APP_CONFIG.TIME_WINDOW_MINUTES * 60 * 1000,
    refreshIntervalMs: APP_CONFIG.AUTO_REFRESH_INTERVAL_MS
  }
}

// Função para obter configuração de tempo em diferentes formatos
export function getTimeConfig() {
  const config = getTimeWindowConfig()
  return {
    windowMinutes: config.windowMinutes,
    windowMs: config.windowMs,
    refreshIntervalMs: config.refreshIntervalMs,
    refreshIntervalMinutes: config.refreshIntervalMs / (60 * 1000)
  }
}
