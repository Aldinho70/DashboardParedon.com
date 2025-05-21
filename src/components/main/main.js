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
                <h5 class="card-title fw-bold text-dark mb-2">
                  <i class="bi bi-gear-fill me-2"></i> ${unit.name}
                </h5>
                <p class="text-muted small mb-3">
                  <i class="bi bi-clock me-1"></i> Última actualización: ${unit.dateParsed} AM
                </p>

                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center border-start  border-4 rounded-start">
                    <span><i class="bi bi-toggle-on text-success me-2"></i> Estado</span>
                    <span class="fw-semibold text-success">${sensorEstado.valor}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-start  border-4 rounded-start">
                    <span><i class="bi bi-lock-fill text-info me-2"></i> Gabinete</span>
                    <span class="fw-semibold text-info">${sensorGabinete.valor}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-start border-4 rounded-start">
                    <span><i class="bi bi-battery-full text-warning me-2"></i> Voltaje</span>
                    <span class="fw-semibold text-warning">${voltaje.valor}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      <!-- Repetir dinámicamente -->`);
  })
}
