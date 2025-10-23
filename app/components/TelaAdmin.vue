<template>
  <div class="main-container">
    <div class="user-management-card">
      <div class="card-background"></div>
      <div class="logo-container">
        <img src="/images/cimob.png" alt="Logo CIMOB" />
      </div>
      <div class="decorative-line"></div>

      <div class="content-wrapper">
        <h2 class="title">Gerenciamento de Usuários</h2>
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
      <div class="footer-text">
        <span>© VORTEK 2025</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --info-color: #17a2b8;
  --warning-color: #ffc107;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  --text-color: #333;
  --header-color: #113E63;
  --card-bg: rgba(255, 255, 255, 0.95);
  --card-border-radius: 15px;
  --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
  background-color: #f4f7f6; /* Cor de fundo suave para o body */
}

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #fafafa;
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Ajustado para 0, pois o card terá z-index maior */
  padding: 20px; /* Adicionado padding para telas menores */
}

.user-management-card {
  background-color: var(--card-bg);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  width: 95%; /* Ocupa mais largura */
  max-width: 1200px; /* Aumentado o max-width */
  height: 95vh; /* Ocupa mais altura */
  max-height: 95vh; /* Ocupa mais altura */
  position: relative;
  overflow: hidden;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary-color, #CDE8FF);
  opacity: 0.1; /* Opacidade reduzida para um visual mais suave */
  z-index: -1;
  border-radius: var(--card-border-radius);
}

.logo-container {
  width: 120px; /* Tamanho do logo ajustado */
  margin-bottom: 20px;
}

.logo-container img {
  max-width: 100%;
  height: auto;
}

.decorative-line {
  width: 100%;
  height: 2px; /* Linha mais fina */
  background-color: var(--header-color);
  margin-bottom: 25px;
}

.content-wrapper {
  width: 100%;
  color: var(--text-color);
  flex-grow: 1; /* Permite que o conteúdo ocupe o espaço disponível */
  overflow-y: auto; /* Adiciona scroll se o conteúdo for muito grande */
}

.title {
  font-size: 2.2rem; /* Tamanho da fonte ajustado */
  font-weight: 700;
  color: var(--header-color);
  text-align: center;
  margin-bottom: 30px;
}

.add-user-section {
  background-color: var(--light-color);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.add-user-section h3 {
  font-size: 1.5rem;
  color: var(--header-color);
  margin-bottom: 15px;
  text-align: center;
}

.input-group {
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */
  gap: 15px; /* Espaçamento entre os inputs */
  justify-content: center;
  align-items: center;
}

.input-group input, .input-group select {
  flex: 1; /* Permite que os inputs ocupem o espaço disponível */
  min-width: 180px; /* Largura mínima para inputs */
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.input-group input:focus, .input-group select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  outline: none;
}

.user-list table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-list th,
.user-list td {
  padding: 15px 10px;
  border-bottom: 1px solid #e9ecef;
  text-align: left;
  vertical-align: middle;
}

.user-list th {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}

.user-list tr:nth-child(even) {
  background-color: #f8f9fa;
}

.user-list input,
.user-list select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.95rem;
}

.btn {
  padding: 10px 18px;
  border: none;
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
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

.btn-danger {
  background-color: var(--danger-color);
  color: white;
}

.btn-danger:hover {
  background-color: #bd2130;
  transform: translateY(-1px);
}

.btn-success {
  background-color: var(--success-color);
  color: white;
}

.btn-success:hover {
  background-color: #218838;
  transform: translateY(-1px);
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
    border: none;
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

