<template>
  <div class="opening">
    <img src="/images/logo.png" alt="Logo" class="logo" />
    <h1 class="title">CIMOB</h1>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.replace("/login"); 
  }, 5000); 
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');

.opening {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #CDE8FF;
  animation: fadeIn 1s ease-in-out;
}

.logo {
  width: 180px;
  height: 180px; 
  margin-bottom: 30px; 
  animation: bounceLogo 2s ease-in-out infinite;
}

.title {
  font-family: 'Poppins', sans-serif;
  font-weight: 800; 
  font-size: 48px; 
  color: #113E63;
  animation: fadeIn 1.5s ease-in-out forwards;
}

@keyframes bounceLogo {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
