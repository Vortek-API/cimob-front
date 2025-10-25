<template>
  <div class="flex h-screen w-full">
    <!-- O componente Sidebar é importado, mas não está no escopo deste arquivo -->
    <Sidebar />
    <div class="flex-1 overflow-auto bg-gray-50">
      <div class="p-8 main-content-wrapper">
        <div class="user-management-card">
          <div class="card-background"></div>
          <div class="logo-container">
          </div>
          <div class="decorative-line"></div>

          <div class="content-wrapper">
            <h2 class="title">Gerenciamento de Usuários</h2>
            
            <!-- NOVO: Card de Estatísticas -->
            <div class="stats-card">
              <div class="stat-item">
                <i class="fas fa-users icon-blue"></i>
                <div class="stat-info">
                  <span class="stat-value">{{ totalUsers }}</span>
                  <span class="stat-label">Total de Usuários Criados</span>
                </div>
              </div>
            </div>
            <!-- FIM NOVO -->

            <div class="add-user-section">
              <h3>Adicionar Novo Usuário</h3>
              <div class="input-group">
                <input type="text" v-model="newUser.name" placeholder="Nome" />
                <input type="email" v-model="newUser.email" placeholder="Email" />
                <input type="text" v-model="newUser.cpf" placeholder="CPF" />
                <select v-model="newUser.role">
                  <option value="user">Usuário</option>
                  <option value="admin">Admin</option>
                </select>
                <button @click="addNewUser" class="btn btn-success">Adicionar</button>
              </div>
            </div>
            <div class="user-list">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Permissão</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td><input type="text" v-model="user.name" /></td>
                    <td><input type="email" v-model="user.email" /></td>
                    <td><input type="text" v-model="user.cpf" /></td>
                    <td>
                      <select v-model="user.role">
                        <option value="user">Usuário</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button @click="updateUser(user)" class="btn btn-primary">Salvar</button>
                      <button @click="deleteUser(user.id)" class="btn btn-danger">Excluir</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Sidebar from '~/components/Sidebar.vue' // Comentado pois o arquivo Sidebar não foi fornecido
import { ref, computed } from 'vue'; // Importando 'computed'

interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  role: 'user' | 'admin';
}

const users = ref<User[]>([
  { id: 1, name: 'João da Silva', email: 'joao.silva@example.com', cpf: '111.222.333-44', role: 'user' },
  { id: 2, name: 'Maria Oliveira', email: 'maria.oliveria@example.com', cpf: '555.666.777-88', role: 'admin' },
  { id: 3, name: 'Pedro Santos', email: 'pedro.santos@example.com', cpf: '999.000.111-22', role: 'user' },
]);

// NOVO: Propriedade computada para o total de usuários
const totalUsers = computed(() => users.value.length);

const newUser = ref<Omit<User, 'id'>>({
  name: '',
  email: '',
  cpf: '',
  role: 'user',
});

const addNewUser = () => {
  if (newUser.value.name && newUser.value.email && newUser.value.cpf) {
    const newId = Math.max(...users.value.map(u => u.id)) + 1;
    users.value.push({ ...newUser.value, id: newId });
    newUser.value = { name: '', email: '', cpf: '', role: 'user' }; // Reset form
    console.log('New user added:', users.value);
  } else {
    alert('Por favor, preencha todos os campos para adicionar um novo usuário.');
  }
};

const updateUser = (user: User) => {
  console.log('Updating user:', user);
  // Lógica para atualizar o usuário no backend
  alert(`Usuário ${user.name} atualizado!`);
};

const deleteUser = (userId: number) => {
  console.log('Deleting user with id:', userId);
  users.value = users.value.filter(user => user.id !== userId);
  alert(`Usuário com ID ${userId} excluído!`);
};
</script>

<style scoped>
@import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

:root {
  --primary-color: #1a73e8; /* Azul mais moderno/Google-like */
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --info-color: #17a2b8;
  --warning-color: #ffc107;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  --text-color: #5f6368; /* Cinza mais suave para texto */
  --header-color: #3c4043; /* Cinza escuro para cabeçalhos */
  --card-bg: #ffffff; /* Fundo branco puro */
  --card-border-radius: 15px;
  --box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15); /* Sombra mais moderna e sutil */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Nunito', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: #f4f4f4; /* Cor de fundo suave para o body */
}

.flex {
  display: flex;
}

.h-screen {
  height: 100vh;
}

.w-full {
  width: 100%;
}

.overflow-auto {
  overflow: auto;
}

.bg-gray-50 {
  background-color: #f9fafb;
}

.p-8 {
  padding: 2rem;
}

/* NOVO: Estilo para centralizar o conteúdo */
.main-content-wrapper {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: flex-start; /* Alinha o conteúdo ao topo */
  min-height: 100%; /* Garante que o wrapper ocupe a altura mínima */
  padding: 2rem;
}
/* FIM NOVO */




.logo-container {
  width: 120px;
  margin-bottom: 20px;
}

.logo-container img {
  max-width: 100%;
  height: auto;
}

.decorative-line {
  width: 100%;
  height: 2px;
  background-color: var(--header-color);
  margin-bottom: 25px;
}

.content-wrapper {
  width: 100%;
  color: var(--text-color);
  flex-grow: 1;
  overflow-y: auto;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 30px;
}

/* NOVO: Estilos para o Card de Estatísticas */
.stats-card {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.stat-item {
  color: #1e3a8a;
  padding: 20px 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  min-width: 280px;
}

.stat-item .icon-blue {
  font-size: 2.5rem;
  color: #1e3a8a;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.9;
}
/* FIM NOVO */

.add-user-section {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.add-user-section h3 {
  font-size: 1.5rem;
  color: var(--header-color);
  margin-bottom: 15px;
  text-align: center;
}

.input-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}

.input-group input, .input-group select {
  flex-grow: 1;
  flex-basis: 200px;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.input-group input:focus, .input-group select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.2);
  outline: none;
}

.input-group button {
  flex: 0 0 auto;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.user-list table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0; /* Adicionando borda externa sutil */
}

.user-list th,
.user-list td {
  padding: 15px 15px; /* Aumentando o padding horizontal */
  border-bottom: 1px solid #e9ecef;
  text-align: left;
  vertical-align: middle;
}

.user-list th {
  background-color: #f7f7f7;
  color: var(--header-color); /* Usando a cor de cabeçalho mais escura */
  font-weight: 700; /* Deixando o cabeçalho mais forte */
  font-size: 0.95rem; /* Aumentando um pouco o tamanho da fonte */
  padding: 15px 15px;
  border-bottom: 2px solid var(--primary-color); /* Linha de destaque na base do cabeçalho */
}

.user-list input,
.user-list select {
  width: 100%;
  padding: 10px 12px; /* Mais padding */
  border: 1px solid #e0e0e0;
  border-radius: 8px; /* Mais arredondado */
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.user-list input:focus,
.user-list select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  outline: none;
}

.btn {
  padding: 10px 18px;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  margin-right: 8px;
  transition: all 0.2s ease-in-out;
}

.btn:last-child {
  margin-right: 0;
}

.btn-primary {
  background-color: #1a73e8; /* Fundo azul sólido */
  color: white; /* Texto branco */
  border: 1px solid var(--primary-color);
}

.btn-danger {
  background-color: #dc3545;
  color: white; /* Texto branco */
  border: 1px solid var(--danger-color);
}

.btn-success {
  background-color: #28a745; /* Fundo verde sólido */
  color: white;
  border: 1px solid var(--success-color);
}

.footer-text {
  margin-top: 20px;
  font-size: 0.85rem;
  color: var(--secondary-color);
  text-align: center;
}

/* Responsividade */
@media (max-width: 768px) {
  .user-management-card {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    padding: 15px;
  }

  .title {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  
  .stats-card {
    margin-bottom: 20px;
  }

  .stat-item {
    min-width: unset;
    width: 100%;
  }

  .input-group {
    flex-direction: column;
    gap: 10px;
  }

  .input-group input, .input-group select, .input-group button {
    width: 100%;
    min-width: unset;
  }

  .user-list th, .user-list td {
    padding: 10px 5px;
    font-size: 0.85rem;
  }

  .user-list table, .user-list thead, .user-list tbody, .user-list th, .user-list td, .user-list tr {
    display: block;
  }

  .user-list thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .user-list tr {
    border: 1px solid #dee2e6;
    margin-bottom: 10px;
    border-radius: 8px;
    overflow: hidden;
  }

  .user-list td {
    border: 1px solid transparent;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
    text-align: right;
  }

  .user-list td:before {
    position: absolute;
    top: 0;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
  }

  .user-list td:nth-of-type(1):before { content: "Nome:"; }
  .user-list td:nth-of-type(2):before { content: "Email:"; }
  .user-list td:nth-of-type(3):before { content: "CPF:"; }
  .user-list td:nth-of-type(4):before { content: "Permissão:"; }
  .user-list td:nth-of-type(5):before { content: "Ações:"; }

  .btn {
    margin-bottom: 5px;
    margin-right: 0;
    width: 100%;
  }
}
</style>
