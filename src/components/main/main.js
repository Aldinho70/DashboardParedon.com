import { getFechaActual } from '../../utils/timestamp.js'
import { clearHTML } from '../../utils/utils.js';

$(document).ready(function () {
  $('#mainContent').html(`

    <div class="container-fluid py-3 px-4">
      <center>
          <div id="loading" class="p-5">
          <img src="./src/assets/img/logojd.png" alt="Cargando..." /><br>
          
          <h1 class="text-dark">Cargando informacion...</h1>
          </div>
      </center>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <span id="root-fecha" class="text-muted small fw-semibold">
          Última actualización: ${getFechaActual()}
        </span>
      </div>

      <!-- Grupos -->
      <div class="row g-3 mb-4" id="root-card-groups"></div>
      <hr class="border-top border-2"/>

      <!-- Sección principal -->
      <div class="container-fluid px-0" id="root-main-1">
        <!-- Categorías -->
        <div class="row gy-4" id="root-card-info"></div>
        <hr class="my-4"/>

        <!-- Bombas (Todas) -->
        <div class="row row-cols-1 row-cols-md-3 g-4" id="root-card"></div>
      </div>

      <!-- Bombas por categoría -->
      <div class="container-fluid px-0 d-none" id="root-main-2">
        <h2 class="mb-4 text-dark fw-bold" id="root-categori">
          📊 Dashboard de Monitoreo – 33 Norias
        </h2>
        <div class="accordion overflow-auto active shadow-sm " 
             id="root-list-card" style="max-height: 500px;"></div>
      </div>
    </div>

    <!-- Modal de notificaciones -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-light">
            <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">🔔 Panel de notificaciones</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body-notifications root-notification px-4 py-3"></div>
          <div class="modal-footer bg-light py-2"></div>
        </div>
      </div>
    </div>
  `);
  $("#loading").fadeIn();
});


export const htmlCreateCard = (data) => {
  clearHTML("#root-card");
  data.map(unit => {
    const sensorGabinete = unit.sensors.find(s => s.nombre === "GABINETE") ? unit.sensors.find(s => s.nombre === "GABINETE") : 'N/A';
    const sensorEstado = unit.sensors.find(s => s.nombre === "BOMBA") ? unit.sensors.find(s => s.nombre === "BOMBA") : 'N/A';
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
                    <span class="fw-semibold text-${(sensorGabinete.valor != 1) ? `danger` : `success`}">${(sensorGabinete.valor == 'N/A') ? `Cerrado` : (sensorGabinete.valor) == 0 ? `Cerrado` : `Abierto`}</span>
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

export const htmListCard = (data, name, total = 0) => {
  clearHTML("#root-list-card");
  $('#root-card').addClass('d-none')
  $('#root-main-2').removeClass('d-none')
  $('.btn-card-categori').removeClass('bg-warning')
  $(`#root_card_${name}`).addClass('bg-warning')
  $('#root-categori').html(`${name.charAt(0).toUpperCase() + name.slice(1)}: ${total} unidades.`)
  let index = 0;

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const unit = data[key];

      const sensorGabinete = (unit.sensors.find(s => s.nombre === "GABINETE")) ? unit.sensors.find(s => s.nombre === "GABINETE") : 0;
      const sensorEstado = (unit.sensors.find(s => s.nombre === "BOMBA")) ? unit.sensors.find(s => s.nombre === "BOMBA") : 0;
      const voltaje = (unit.sensors.find(s => s.nombre === "VOLTAJE EXTERNO")) ? unit.sensors.find(s => s.nombre === "VOLTAJE EXTERNO") : 0;

      const estadoIcon = (sensorEstado.valor == 1) ? `toggle-on text-success` : `toggle-off text-danger`;
      const gabineteIcon = (sensorGabinete.valor != 1) ? `lock-fill text-danger` : `unlock-fill text-success`;
      const voltajeIcon = (voltaje.valor != 'N/A') ? `battery-charging text-warning` : `battery text-danger`;
      const estado = (sensorEstado.valor == 1) ? 'encendido' : 'apagado'

      $('#root-list-card').append(`
        <div class="accordion-item border rounded-4 shadow-sm mb-3">
          <h2 class="accordion-header" id="heading-${index}">
            <button class="accordion-button collapsed d-flex justify-content-between align-items-center rounded-top-4"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-${index}"
                    onClick="getMessagesbyId('${unit.id_unidad}', ${index})"
                    aria-expanded="false"
                    aria-controls="collapse-${index}">
              <div class="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center gap-2">
                <div class="d-flex align-items-center gap-2">
                  <img src="${unit.icon}" class="img-thumbnail" style="width: 32px; height: 32px;" alt="Icono">
                  <span class="fw-semibold text-dark">${unit.name}</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <i class="bi bi-${estadoIcon} fs-5"></i>
                  <i class="bi bi-${gabineteIcon} fs-5"></i>
                  <i class="bi bi-${voltajeIcon} fs-5"></i>
                </div>
              </div>
            </button>
          </h2>
          <div id="collapse-${index}" class="accordion-collapse collapse" aria-labelledby="heading-${index}" data-bs-parent="#root-card">
            <div class="accordion-body bg-light-subtle rounded-bottom-4 px-3 py-3">

              <div class="row g-3">
                <!-- Columna 1: Info -->
                <div class="col-md-4">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <small class="text-muted d-block"><i class="bi bi-clock me-1"></i> Último mensaje:</small>
                      <strong>${unit.dateParsed}</strong>
                    </li>

                    <li class="list-group-item">
                      <div class="d-flex justify-content-between">
                        <span><i class="bi bi-clock me-1"></i> Tiempo encendido:</span>
                        <span class="fw-semibold text-success" id="${unit.id_unidad}-encendido"></span>
                      </div>
                    </li>

                    <li class="list-group-item">
                      <div class="d-flex justify-content-between">
                        <span><i class="bi bi-clock me-1"></i> Tiempo apagado:</span>
                        <span class="fw-semibold text-danger" id="${unit.id_unidad}-apagado"></span>
                      </div>
                    </li>

                    <li class="list-group-item">
                      <div class="d-flex justify-content-between">
                        <span><i class="bi bi-${estadoIcon} me-1"></i> Estado:</span>
                        <span class="fw-semibold text-${sensorEstado.valor == 1 ? 'success' : 'danger'}">${estado.charAt(0).toUpperCase() + estado.slice(1)}</span>
                      </div>
                    </li>

                    <li class="list-group-item">
                      <div class="d-flex justify-content-between">
                        <span><i class="bi bi-${gabineteIcon} me-1"></i> Gabinete:</span>
                        <span class="fw-semibold text-${(sensorGabinete.valor != 1) ? 'danger' : 'success'}">
                          ${(sensorGabinete.valor == 'N/A') ? 'Cerrado' : (sensorGabinete.valor == 0 ? 'Cerrado' : 'Abierto')}
                        </span>
                      </div>
                    </li>

                    <li class="list-group-item">
                      <div class="d-flex justify-content-between">
                        <span><i class="bi bi-${voltajeIcon} me-1"></i> Voltaje:</span>
                        <span class="fw-semibold text-${(voltaje.valor === 'N/A') ? 'danger' : 'warning'}">
                          ${voltaje.valor}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <!-- Columna 2: Pie Chart -->
                <div class="col-md-4 border-start">
                  <div class="h-100 d-flex align-items-center justify-content-center">
                    <div id="root-chart-day-pie-${index}" class="w-100"></div>
                  </div>
                </div>

                <!-- Columna 3: Bar Chart -->
                <div class="col-md-4 border-start">
                  <div class="h-100 d-flex align-items-center justify-content-center">
                    <div id="root-chart-day-bar-${index}" class="w-100"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      `);
      index++;
    }
  }
};

export const htmlListCardbyName = (name) => {
  console.log(name);
  console.log(units[name]);
}
