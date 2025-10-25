<template>
  <div class="flex h-screen w-full bg-gray-50">
    <!-- Sidebar (importado) -->
    <Sidebar />
    
    <div class="flex-1 overflow-auto">
      <div class="p-6 md:p-8 w-full">
        <!-- HEADER COM TÍTULO -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Gerenciamento de Usuários</h1>
          <p class="text-gray-600">Gerencie, adicione e edite usuários do sistema</p>
        </div>

        <!-- CARD DE ESTATÍSTICAS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-4">
              <div class="bg-blue-100 p-3 rounded-lg">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3.5A1.5 1.5 0 012 19.5V5.5A1.5 1.5 0 013.5 4h17A1.5 1.5 0 0122 5.5v14a1.5 1.5 0 01-1.5 1.5H15z"></path>
                </svg>
              </div>
              <div>
                <p class="text-gray-600 text-sm font-medium">Total de Usuários</p>
                <p class="text-3xl font-bold text-gray-900">{{ totalUsers }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-4">
              <div class="bg-green-100 p-3 rounded-lg">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <div>
                <p class="text-gray-600 text-sm font-medium">Usuários Comuns</p>
                <p class="text-3xl font-bold text-gray-900">{{ usuariosComuns }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-4">
              <div class="bg-purple-100 p-3 rounded-lg">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <p class="text-gray-600 text-sm font-medium">Administradores</p>
                <p class="text-3xl font-bold text-gray-900">{{ administradores }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SEÇÃO DE ADICIONAR USUÁRIO -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Adicionar Novo Usuário</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input 
                v-model="newUser.name" 
                type="text" 
                placeholder="Nome completo"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="newUser.email" 
                type="email" 
                placeholder="email@example.com"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">CPF</label>
              <input 
                v-model="newUser.cpf" 
                type="text" 
                placeholder="000.000.000-00"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Permissão</label>
              <select 
                v-model="newUser.role"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="user">Usuário</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div class="flex items-end">
              <button 
                @click="addNewUser"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Adicionar
              </button>
            </div>
          </div>
        </div>

        <!-- TABELA DE USUÁRIOS -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nome</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">CPF</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Permissão</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4">
                    <input 
                      v-model="user.name" 
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <input 
                      v-model="user.email" 
                      type="email"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <input 
                      v-model="user.cpf" 
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <select 
                      v-model="user.role"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    >
                      <option value="user">Usuário</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <button 
                        @click="updateUser(user)"
                        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center gap-1"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Salvar
                      </button>
                      <button 
                        @click="deleteUser(user.id)"
                        class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center gap-1"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mensagem quando não há usuários -->
          <div v-if="users.length === 0" class="text-center py-12">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3.5A1.5 1.5 0 012 19.5V5.5A1.5 1.5 0 013.5 4h17A1.5 1.5 0 0122 5.5v14a1.5 1.5 0 01-1.5 1.5H15z"></path>
            </svg>
            <p class="text-gray-500 text-lg">Nenhum usuário cadastrado ainda</p>
            <p class="text-gray-400 text-sm">Comece adicionando um novo usuário acima</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  cpf: string
  role: 'user' | 'admin'
}

const users = ref<User[]>([
  { id: 1, name: 'João da Silva', email: 'joao.silva@example.com', cpf: '111.222.333-44', role: 'user' },
  { id: 2, name: 'Maria Oliveira', email: 'maria.oliveria@example.com', cpf: '555.666.777-88', role: 'admin' },
  { id: 3, name: 'Pedro Santos', email: 'pedro.santos@example.com', cpf: '999.000.111-22', role: 'user' },
])

const newUser = ref<Omit<User, 'id'>>({
  name: '',
  email: '',
  cpf: '',
  role: 'user',
})

// Propriedades computadas para estatísticas
const totalUsers = computed(() => users.value.length)

const usuariosComuns = computed(() => 
  users.value.filter(u => u.role === 'user').length
)

const administradores = computed(() => 
  users.value.filter(u => u.role === 'admin').length
)

const addNewUser = () => {
  if (newUser.value.name && newUser.value.email && newUser.value.cpf) {
    const newId = Math.max(...users.value.map(u => u.id), 0) + 1
    users.value.push({ ...newUser.value, id: newId })
    newUser.value = { name: '', email: '', cpf: '', role: 'user' }
    console.log('Novo usuário adicionado:', users.value)
  } else {
    alert('Por favor, preencha todos os campos para adicionar um novo usuário.')
  }
}

const updateUser = (user: User) => {
  console.log('Atualizando usuário:', user)
  alert(`Usuário ${user.name} atualizado com sucesso!`)
}

const deleteUser = (userId: number) => {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    users.value = users.value.filter(user => user.id !== userId)
    console.log('Usuário excluído com ID:', userId)
  }
}
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
