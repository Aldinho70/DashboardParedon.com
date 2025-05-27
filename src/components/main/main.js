$(document).ready(function () {
  $('#mainContent').html(`
    <div class="container py-4" id="root-main-1">
      <h2 class="mb-4">📊 Dashboard de Monitoreo – 33 Norias</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4" id="root-card"></div>
    </div>
    <div class="container py-4 d-none" id="root-main-2">
      <h2 class="mb-4" id="root-categori">📊 Dashboard de Monitoreo – 33 Norias</h2>
      <div class="accordion" id="root-list-card"></div>
    </div>
`);
});

export const htmlCreateCard = (data) => {
  data.map(unit => {
    const sensorGabinete = unit.sensors.find(s => s.nombre === "GABINETE");
    const sensorEstado = unit.sensors.find(s => s.nombre === "BOMBA");
    const voltaje = unit.sensors.find(s => s.nombre === "VOLTAJE EXTERNO");

    $('#root-card').append(`
      <!-- Tarjeta Noria -->
          <div class="col">
            <div class="card shadow-lg border-0 rounded-4 bg-light">
              <div class="card-body">
                <h5 class="card-title fw-bold fs-5 text-dark mb-2">
                  <i class="bi bi-gear-fill me-2"></i> ${unit.name}
                </h5>
                <p class="text-muted small mb-3">
                  <i class="bi bi-clock me-1"></i> Último mensaje: ${unit.dateParsed}
                </p>

                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center border-start border-4 rounded-start">
                    <span><i class="bi bi-${(sensorEstado.valor == 1) ? `toggle-on text-success` : `toggle-off text-danger`} me-2"></i> Estado</span>
                    <span class="fw-semibold text-${(sensorEstado.valor == 1) ? `success` : `danger`}">${(sensorEstado.valor == 1) ? `Encendido` : `Apagado`}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-start border-4 rounded-start">
                    <span><i class="bi bi-${(sensorGabinete.valor != 1) ? `lock-fill text-danger` : `unlock-fill text-success`} me-2"></i> Gabinete</span>
                    <span class="fw-semibold text-${(sensorGabinete.valor != 1) ? `danger` : `success`}">${(sensorGabinete.valor == 'N/A') ? `Error de sensor` : (sensorGabinete.valor) == 0 ? `Cerrado` : `Abierto`}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-start border-4 rounded-start">
                    <span><i class="bi bi-${(voltaje.valor != 'N/A') ? `battery-charging text-warning` : `battery text-danger`} me-2"></i> Voltaje</span>
                    <span class="fw-semibold text-${(voltaje.valor === 'N/A') ? `danger` : `warning`}">${(voltaje.valor === 'N/A') ? 'Error de sensor' : voltaje.valor}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      <!-- Repetir dinámicamente -->`);
  })
}

// export const htmListCard = (data) => {
//   $('#root-card').html('');
//   console.log(data);
//   for (const key in data) {
//     if (Object.prototype.hasOwnProperty.call(data, key)) {
//       const unit = data[key];

//       const sensorGabinete = unit.sensors.find(s => s.nombre === "GABINETE");
//       const sensorEstado = unit.sensors.find(s => s.nombre === "BOMBA");
//       const voltaje = unit.sensors.find(s => s.nombre === "VOLTAJE EXTERNO");

//       $('#root-card').append(`
//          <!-- Tarjeta estilo lista -->
// <div class="mb-3">
//   <div class="card border-0 shadow-sm rounded-3">
//     <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center">
//       <div>
//         <h5 class="fw-bold text-dark mb-1">
//           <i class="bi bi-gear-fill me-2"></i> ${unit.name}
//         </h5>
//         <small class="text-muted">
//           <i class="bi bi-clock me-1"></i> Último mensaje: ${unit.dateParsed}
//         </small>
//       </div>

//       <ul class="list-unstyled mt-3 mt-md-0 mb-0">
//         <li class="d-flex align-items-center mb-1">
//           <i class="bi bi-${(sensorEstado.valor == 1) ? `toggle-on text-success` : `toggle-off text-danger`} me-2"></i>
//           <span class="me-2">Estado:</span>
//           <span class="fw-semibold text-${(sensorEstado.valor == 1) ? `success` : `danger`}">
//             ${(sensorEstado.valor == 1) ? `Encendido` : `Apagado`}
//           </span>
//         </li>
//         <li class="d-flex align-items-center mb-1">
//           <i class="bi bi-${(sensorGabinete.valor != 1) ? `lock-fill text-danger` : `unlock-fill text-success`} me-2"></i>
//           <span class="me-2">Gabinete:</span>
//           <span class="fw-semibold text-${(sensorGabinete.valor != 1) ? `danger` : `success`}">
//             ${(sensorGabinete.valor == 'N/A') ? `Error de sensor` : (sensorGabinete.valor) == 0 ? `Cerrado` : `Abierto`}
//           </span>
//         </li>
//         <li class="d-flex align-items-center">
//           <i class="bi bi-${(voltaje.valor != 'N/A') ? `battery-charging text-warning` : `battery text-danger`} me-2"></i>
//           <span class="me-2">Voltaje:</span>
//           <span class="fw-semibold text-${(voltaje.valor === 'N/A') ? `danger` : `warning`}">
//             ${(voltaje.valor === 'N/A') ? 'Error de sensor' : voltaje.valor}
//           </span>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
// `);
//     }
//   }
// }

export const htmListCard = (data, name, total) => {
  $('#root-list-card').html('');
  $('#root-main-1').addClass('d-none')
  $('#root-main-2').removeClass('d-none')
  $('#root-categori').html(`${name}: ${total} unidades.`)
  let index = 0;

  console.log( data );
  

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const unit = data[key];
      const sensorGabinete = unit.sensors.find(s => s.nombre === "GABINETE");
      const sensorEstado = unit.sensors.find(s => s.nombre === "BOMBA");
      const voltaje = unit.sensors.find(s => s.nombre === "VOLTAJE EXTERNO");

      const estadoIcon = (sensorEstado.valor == 1) ? `toggle-on text-success` : `toggle-off text-danger`;
      const gabineteIcon = (sensorGabinete.valor != 1) ? `lock-fill text-danger` : `unlock-fill text-success`;
      const voltajeIcon = (voltaje.valor != 'N/A') ? `battery-charging text-warning` : `battery text-danger`;

      $('#root-list-card').append(`
        <div class="accordion-item mb-2">
          <h2 class="accordion-header" id="heading-${index}">
            <button class="accordion-button collapsed d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
              <div class="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center">
                <span class="fw-bold">
                  <i class="bi bi-gear-fill me-2"></i> ${unit.name}
                </span>
                <span>
                  <i class="bi bi-${estadoIcon} me-2"></i>
                  <i class="bi bi-${gabineteIcon} me-2"></i>
                  <i class="bi bi-${voltajeIcon}"></i>
                </span>
              </div>
            </button>
          </h2>
          <div id="collapse-${index}" class="accordion-collapse collapse" aria-labelledby="heading-${index}" data-bs-parent="#root-card">
            <div class="accordion-body">
              <p class="text-muted mb-3"><i class="bi bi-clock me-1"></i> Último mensaje: ${unit.dateParsed}</p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <span><i class="bi bi-${estadoIcon} me-2"></i> Estado</span>
                  <span class="fw-semibold text-${(sensorEstado.valor == 1) ? 'success' : 'danger'}">${(sensorEstado.valor == 1) ? 'Encendido' : 'Apagado'}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <span><i class="bi bi-${gabineteIcon} me-2"></i> Gabinete</span>
                  <span class="fw-semibold text-${(sensorGabinete.valor != 1) ? 'danger' : 'success'}">
                    ${(sensorGabinete.valor == 'N/A') ? 'Error de sensor' : (sensorGabinete.valor == 0 ? 'Cerrado' : 'Abierto')}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <span><i class="bi bi-${voltajeIcon} me-2"></i> Voltaje</span>
                  <span class="fw-semibold text-${(voltaje.valor === 'N/A') ? 'danger' : 'warning'}">
                    ${(voltaje.valor === 'N/A') ? 'Error de sensor' : voltaje.valor}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      `);
      index++;
    }
  }
};
