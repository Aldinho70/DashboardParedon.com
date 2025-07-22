export const clearHTML = ( ...ids ) =>{
    ids.forEach(id => {
        $(id).html('');
    });
}

export const extraerHoras = (tiempo) => {
  const match = tiempo.match(/(\d+)\s*h/); 
  return match ? parseInt(match[1], 10) : 0;
}
