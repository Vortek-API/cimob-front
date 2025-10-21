// app/utils/indicadorUtils.ts


export function getIndicadorEstilo(valor: number): { corCirculo: string, corTexto: string } {
  

  if (valor < 70) {
    return {
      corCirculo: 'bg-red-500',   
      corTexto: 'text-red-600'   
    };
  } else if (valor >= 70 && valor < 90) {
    return {
      corCirculo: 'bg-yellow-500', 
      corTexto: 'text-yellow-600' 
    };
  } else {
    return {
      corCirculo: 'bg-green-500',
      corTexto: 'text-green-600' 
    };
  }
}