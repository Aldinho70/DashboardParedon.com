$(document).ready(function () { 
  $('#mainContent').html(`
    <h2 class="mb-4">📊 Dashboard de Monitoreo – 33 Norias</h2>
    <div class="container py-4" id="root-main">
      <div class="row row-cols-1 row-cols-md-3 g-4" id="root-card">
      </div>
    </div>`);
});

export const htmlCreateCard = (data) => {
  data.map( unit => {
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
                  <i class="bi bi-clock me-1"></i> Último mensaje: ${unit.dateParsed} AM
                </p>

                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center border-start border-4 rounded-start">
                    <span><i class="bi bi-${(sensorEstado.valor == 1) ? `toggle-on text-success` : `toggle-off text-danger`} me-2"></i> Estado</span>
                    <span class="fw-semibold text-${(sensorEstado.valor == 1 ) ? `success` : `danger`}">${(sensorEstado.valor == 1) ? `Encendido`: `Apagado`}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-start border-4 rounded-start">
                    <span><i class="bi bi-${(sensorGabinete.valor != 1) ? `lock-fill text-danger` : `unlock-fill text-success`} me-2"></i> Gabinete</span>
                    <span class="fw-semibold text-${(sensorGabinete.valor != 1) ? `danger` : `success`}">${(sensorGabinete.valor == 'N/A') ? `Error de sensor` : (sensorGabinete.valor) == 0 ? `Cerrado` : `Abierto` }</span>
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
