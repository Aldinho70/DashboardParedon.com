import { getFechaActual } from '../../utils/timestamp.js'
import { clearHTML } from '../../utils/utils.js';

$(document).ready(function () {
  $('#mainContent').html(`
    <span id="root-fecha" >Ultima actualizacion: ${getFechaActual()}<span>
    <!-- root-notification-->
      <div class="accordion" id="accordionNotificaciones">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingNotif">
            <button class="accordion-button collapsed w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNotif" aria-expanded="false" aria-controls="collapseNotif">
              <div class="d-flex justify-content-between align-items-center w-100">
                <div class="d-flex align-items-center">
                  <i class="bi bi-bell me-2 text-warning fs-4"></i>
                  <span class="fs-4">Grupos de Norias</span>                  
                </div>                
              </div>
            </button>
          </h2>

          <div id="collapseNotif" class="accordion-collapse collapse" aria-labelledby="headingNotif" data-bs-parent="#accordionNotificaciones">
            <div class="accordion-body">
              <div class="container" id="">
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- root-notification-->

    <hr>

    <div class="container " id="root-main-1">
      <!--Card info-->
      <div class="row" id="root-card-info"></div>
      <!--Card norias-->
      <div class="row row-cols-1 row-cols-md-3 g-4" id="root-card"></div>
      <!--Card-->
    </div>
    <div class="container py-4 d-none" id="root-main-2">
      <h2 class="mb-4" id="root-categori">📊 Dashboard de Monitoreo – 33 Norias</h2>
      <div class="accordion overflow-auto" id="root-list-card" style="max-height: 500px;"></div>
    </div>

    <!--modal-notification-->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Panel de notificaciones</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body-notifications root-notification"></div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
    <!--modal-notification-->
`);
});

export const htmlCreateCard = (data) => {
  $("#root-card").html('')
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
  $('#root-categori').html(`${name}: ${total} unidades.`)
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
        <div class="accordion-item mb-2">
          <h2 class="accordion-header" id="heading-${index}">
            <button class="accordion-button collapsed d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" onClick="getMessagesbyId('${unit.id_unidad}', ${index})" aria-expanded="false" aria-controls="collapse-${index}">
              <div class="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center">
                <span class="fw-bold">
                  <img src="${unit.icon}" class="img-thumbnail" alt="15">
                  ${unit.name}
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
              
              <!--<p class="text-muted mb-3"><i class="bi bi-clock me-1"></i> tiempo ${estado}: <span id="${unit.id_unidad}"></span></p>-->
              <div class="row">
                <div class="col-4 border" >
                  <ul class="list-group list-group-flush">
                    <!-- TIEMPO -->
                    <li class="list-group-item d-flex align-items-center justify-content-between">
                      <p class="text-muted mb-3"><i class="bi bi-clock me-1"></i> Último mensaje: ${unit.dateParsed}</p>
                    </li>
                    <li class="list-group-item d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center w-100">
                        <div class="me-2 text-nowrap" style="min-width: 130px;">
                          <i class="bi bi-clock me-2"></i> Tiempo encendido:
                        </div>
                        <div class="ms-auto fw-semibold text-end">
                          <span id="${unit.id_unidad}-encendido"></span>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center w-100">
                        <div class="me-2 text-nowrap" style="min-width: 130px;">
                          <i class="bi bi-clock me-2"></i> Tiempo apagado:
                        </div>
                        <div class="ms-auto fw-semibold text-end">
                          <span id="${unit.id_unidad}-apagado"></span>
                        </div>
                      </div>
                    </li>

                    <!-- ESTADO -->
                    <li class="list-group-item d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center w-100">
                        <div class="me-2 text-nowrap" style="min-width: 130px;">
                          <i class="bi bi-${estadoIcon} me-2"></i> Estado:
                        </div>
                        <div class="ms-auto fw-semibold text-${(sensorEstado.valor == 1) ? 'success' : 'danger'} text-end">
                          ${(sensorEstado.valor == 1) ? 'Encendido' : 'Apagado'}
                        </div>
                      </div>
                    </li>

                    <!-- GABINETE -->
                    <li class="list-group-item d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center w-100">
                        <div class="me-2 text-nowrap" style="min-width: 130px;">
                          <i class="bi bi-${gabineteIcon} me-2 text-start"></i> Gabinete:
                        </div>
                        <div class="ms-auto fw-semibold text-${(sensorGabinete.valor != 1) ? 'danger' : 'success'} text-end">
                          ${(sensorGabinete.valor == 'N/A') ? 'Cerrado' : (sensorGabinete.valor == 0 ? 'Cerrado' : 'Abierto')}
                        </div>
                      </div>
                    </li>

                    <!-- VOLTAJE -->
                    <li class="list-group-item d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center w-100">
                        <div class="me-2 text-nowrap" style="min-width: 130px;">
                          <i class="bi bi-${voltajeIcon} me-2 text-start"></i> Voltaje:
                        </div>
                        <div class="ms-auto fw-semibold text-${(voltaje.valor === 'N/A') ? 'danger' : 'warning'} text-end">
                          ${voltaje.valor}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="col-4 border" >
                  <div id="root-chart-day-pie-${index}"></div>
                </div>
                <div class="col-4 border " >
                  <div id="root-chart-day-bar-${index}"></div>
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
