export const clearHTML = ( ...ids ) =>{
    ids.forEach(id => {
        $(id).html('');
    });
}

export const extraerHoras = (tiempo) => {
  const match = tiempo.match(/(\d+)\s*h/); 
  return match ? parseInt(match[1], 10) : 0;
}

export const convertirTiempoADias = (tiempoStr) => {
    // Extraer horas, minutos y segundos con regex
    const horasMatch = tiempoStr.match(/(\d+)h/);
    const minutosMatch = tiempoStr.match(/(\d+)m/);
    const segundosMatch = tiempoStr.match(/(\d+)s/);

    const horasTotales = horasMatch ? parseInt(horasMatch[1]) : 0;
    const minutos = minutosMatch ? parseInt(minutosMatch[1]) : 0;
    const segundos = segundosMatch ? parseInt(segundosMatch[1]) : 0;

    // Convertir horas a días y horas restantes
    const dias = Math.floor(horasTotales / 24);
    const horasRestantes = horasTotales % 24;

    // Construir el resultado
    let resultado = '';
    if (dias > 0) resultado += `${dias}d `;
    if (horasRestantes > 0) resultado += `${horasRestantes}h `;
    if (minutos > 0) resultado += `${minutos}m `;
    if (segundos > 0) resultado += `${segundos}s`;

    return resultado.trim();
}

export function showModal(idModal) {
    $(idModal).modal("show");
}

export function agruparPorDia(historial) {
  const resultado = {};

  for (const [fechaStr, lecturas] of Object.entries(historial)) {
    const fecha = new Date(fechaStr); // parsea el string ISO

    // Obtener fecha en hora local
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');

    const dia = `${year}-${month}-${day}`;

    if (!resultado[dia]) {
      resultado[dia] = {};
    }

    resultado[dia][fechaStr] = lecturas;
  }

  return resultado;
}