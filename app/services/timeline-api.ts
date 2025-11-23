import type { Indicador } from '~/types/indicador'
import type { IndiceCritico } from '~/types/indice-critico'
import { getApi } from "~/config/axios-config";
import { reloadIndicadores } from '~/store/indicadores';
import { regiaoSelecionada } from '~/store/filtro';
import { getCurrentWindowTimestampString } from '~/store/timestamp';
import type { Timeline } from '~/types/timeline';

export async function fetchLogs(): Promise<Timeline[]> {
  let url = `/timeline`;
  
  const api = getApi();
  const response = await api.get(url);
  return response.data;
}
