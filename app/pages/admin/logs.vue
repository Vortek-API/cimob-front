<template>
  <div class="flex h-screen w-full">
    <Sidebar />
    <div class="flex-1 overflow-auto bg-gray-50">
      <div class="p-8 main-content-wrapper">
        <div class="log-management-card">
          <div class="card-background"></div>
          <div class="decorative-line"></div>

          <div class="content-wrapper">
            <h2 class="title">Logs de Atividades do Sistema</h2>
            
            <!-- Card de Estatísticas (Total de Logs) -->
            <div class="stats-card">
              <div class="stat-item">
                <i class="fas fa-history icon-blue"></i>
                <div class="stat-info">
                  <span class="stat-value">{{ totalLogs }}</span>
                  <span class="stat-label">Total de Registros de Logs</span>
                </div>
              </div>
            </div>
            <!-- FIM Card de Estatísticas -->

            <!-- Seção de Filtros (Opcional, mas útil para Logs) -->
            <div class="filter-section add-user-section">
              <h3>Filtrar Logs</h3>
              <div class="input-group">
                <input type="text" placeholder="Buscar por Usuário ou Indicador" />
                <select>
                  <option value="">Todos os Indicadores</option>
                  <option value="usuario">Usuário</option>
                  <option value="sistema">Sistema</option>
                  <option value="financeiro">Financeiro</option>
                </select>
                <input type="date" placeholder="Data Inicial" />
                <input type="date" placeholder="Data Final" />
                <button class="btn btn-primary">Aplicar Filtros</button>
              </div>
            </div>
            <!-- FIM Seção de Filtros -->

            <div class="log-list user-list">
              <table>
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Indicador</th>
                    <th>Descrição</th>
                    <th>Data</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="log in logs" :key="log.id">
                    <td>{{ log.usuario }}</td>
                    <td><span :class="['indicator-badge', log.indicador.toLowerCase()]">{{ log.indicador }}</span></td>
                    <td>{{ log.descricao }}</td>
                    <td>{{ formatDate(log.data) }}</td>
                    <td><button @click="viewDetails(log)" class="btn btn-info">Ver Detalhes</button></td>
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
import { ref, computed } from 'vue';

interface Log {
  id: number;
  usuario: string;
  indicador: 'Usuário' | 'Sistema' | 'Financeiro';
  descricao: string;
  data: Date;
  acao: string;
}

const logs = ref<Log[]>([
  { id: 1, usuario: 'joao.silva', indicador: 'Usuário', descricao: 'Tentativa de login falha.', data: new Date('2025-10-23T10:00:00'), acao: 'Login' },
  { id: 2, usuario: 'maria.oliveria', indicador: 'Sistema', descricao: 'Backup diário concluído com sucesso.', data: new Date('2025-10-23T03:00:00'), acao: 'Backup' },
  { id: 3, usuario: 'pedro.santos', indicador: 'Financeiro', descricao: 'Fatura #2025001 gerada.', data: new Date('2025-10-22T15:30:00'), acao: 'Geração de Fatura' },
  { id: 4, usuario: 'joao.silva', indicador: 'Usuário', descricao: 'Alteração de permissão do usuário X.', data: new Date('2025-10-22T10:00:00'), acao: 'Alteração' },
  { id: 5, usuario: 'sistema', indicador: 'Sistema', descricao: 'Atualização de biblioteca de segurança.', data: new Date('2025-10-21T02:00:00'), acao: 'Atualização' },
]);

const totalLogs = computed(() => logs.value.length);

const formatDate = (date: Date): string => {
  return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
};

const viewDetails = (log: Log) => {
  alert(`Detalhes do Log ID ${log.id}:\nUsuário: ${log.usuario}\nDescrição: ${log.descricao}\nData: ${formatDate(log.data)}`);
};
</script>

<style scoped>
/* Importando os estilos globais e variáveis de cor */
@import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

:root {
  --primary-color: #1a73e8; /* Azul mais moderno/Google-like */
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --info-color: #17a2b8; /* Cor para o botão de detalhes/info */
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
  background-color: #f4f4f4;
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

/* Estilo para centralizar o conteúdo */
.main-content-wrapper {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: flex-start; /* Alinha o conteúdo ao topo */
  min-height: 100%;
  padding: 2rem;
}

.log-management-card {
  background-color: var(--card-bg);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  width: 95%;
  max-width: 1400px; /* Aumentado um pouco o max-width para logs */
  height: auto;
  min-height: calc(100vh - 4rem);
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
  opacity: 0.1;
  z-index: -1;
  border-radius: var(--card-border-radius);
}

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

/* Estilos para o Card de Estatísticas */
.stats-card {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.stat-item {
  background-color: var(--primary-color);
  color: #1e3a8a;
  padding: 20px 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  min-width: 350px; /* Um pouco maior para o texto de logs */
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

/* Estilos para a seção de Filtros (reutilizando add-user-section) */
.filter-section {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.filter-section h3 {
  font-size: 1.5rem;
  color: #1e3a8a;
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
  flex-basis: 180px; /* Ajustado para caber mais itens */
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.input-group button {
  flex: 0 0 auto;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  transition: all 0.3s ease;
}

/* Estilos para a Tabela de Logs (reutilizando user-list) */
.log-list table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
}

.log-list th,
.log-list td {
  padding: 15px 15px;
  border-bottom: 1px solid #e9ecef;
  text-align: left;
  vertical-align: middle;
}

.log-list th {
  background-color: #f7f7f7;
  color: var(--header-color);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 15px 15px;
  border-bottom: 2px solid var(--primary-color);
}

.log-list tr:hover {
  background-color: #e8f0fe;
  transition: background-color 0.3s ease;
}

/* Estilo para os indicadores (badges) */
.indicator-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

.indicator-badge.usuário {
  background-color: var(--info-color);
}

.indicator-badge.sistema {
  background-color: var(--success-color);
}

.indicator-badge.financeiro {
  background-color: var(--warning-color);
}

/* Estilos de Botões */
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
  background-color: #0056b3;
  color: white;
  border: 1px solid var(--primary-color);
}

.btn-info {
  background-color: #0d8393;
  color: white;
  border: 1px solid var(--info-color);
}


/* Responsividade */
@media (max-width: 768px) {
  .log-management-card {
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

  .log-list th, .log-list td {
    padding: 10px 5px;
    font-size: 0.85rem;
  }

  .log-list table, .log-list thead, .log-list tbody, .log-list th, .log-list td, .log-list tr {
    display: block;
  }

  .log-list thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .log-list tr {
    border: 1px solid #dee2e6;
    margin-bottom: 10px;
    border-radius: 8px;
    overflow: hidden;
  }

  .log-list td {
    border: 1px solid transparent;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
    text-align: right;
  }

  .log-list td:before {
    position: absolute;
    top: 0;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
  }

  .log-list td:nth-of-type(1):before { content: "Usuário:"; }
  .log-list td:nth-of-type(2):before { content: "Indicador:"; }
  .log-list td:nth-of-type(3):before { content: "Descrição:"; }
  .log-list td:nth-of-type(4):before { content: "Data:"; }
  .log-list td:nth-of-type(5):before { content: "Ação:"; }

  .btn {
    margin-bottom: 5px;
    margin-right: 0;
    width: 100%;
  }
}
</style>
