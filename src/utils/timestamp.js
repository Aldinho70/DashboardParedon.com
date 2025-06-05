export const convertTimestamp = (timestamp) =>{
    const _date =  new Date(timestamp * 1000);
    return (_date.toLocaleString());
}

export const getFechaActual = () => {
  const hoy = new Date();

  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const año = hoy.getFullYear();

  const horas = String(hoy.getHours()).padStart(2, '0');
  const minutos = String(hoy.getMinutes()).padStart(2, '0');
  const segundos = String(hoy.getSeconds()).padStart(2, '0');

  return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
}

export const toUnixTimestamp = (datetime) => {
    // Convertimos el string a un objeto Date
    const date = new Date(datetime);

    // Retornamos el timestamp en segundos
    return Math.floor(date.getTime() / 1000);

    // Ejemplo de uso
    // const datetime = "2025-01-23T11:11";
    // const unixTimestamp = toUnixTimestamp(datetime);
}

export const formatearTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const seg = segundos % 60;
    return `${horas}h ${minutos}m ${seg}s`;
};