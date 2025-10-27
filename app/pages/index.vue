<template>
  <div>
    <OpeningScreen v-if="showOpening" />
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/authStore'
import OpeningScreen from '~/pages/opening.vue'

const showOpening = ref(true)
const router = useRouter()
const auth = useAuthStore()

onMounted(() => {
  setTimeout(() => {
    showOpening.value = false
    router.push(auth.isAuthenticated ? '/home' : '/login')
  }, 3000)
})
</script>
