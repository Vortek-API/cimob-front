import { ref, onMounted, onUnmounted, readonly } from 'vue'
import { APP_CONFIG } from '~/config/app-config'

export function useAutoRefresh(callback: () => void | Promise<void>, intervalMs?: number) {
  const intervalId = ref<ReturnType<typeof setInterval> | null>(null)
  const isActive = ref(false)
  
  const actualIntervalMs = intervalMs || APP_CONFIG.AUTO_REFRESH_INTERVAL_MS

  function start() {
    if (isActive.value) return
    
    isActive.value = true
    callback()
    
    intervalId.value = setInterval(() => {
      callback()
    }, actualIntervalMs)
  }

  function stop() {
    if (intervalId.value) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    isActive.value = false
  }

  function restart() {
    stop()
    start()
  }

  onMounted(() => {
    start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    start,
    stop,
    restart,
    isActive: readonly(isActive),
    intervalMs: actualIntervalMs
  }
}
