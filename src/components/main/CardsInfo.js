export const htmlCreateCardInfo = (data, filters, owner) => {

  for (let i = 0; i < filters.length; i++) {
    const element = filters[i];
    const _data = {
      name: filters[i],
      data: data[filters[i]],
      length: Object.keys(data[filters[i]]).length,
      owner: owner
    }

    htmlCardInfo(_data);
  }
}

const htmlCardInfo = (data) => {
  if ($(`body .${data.owner}-card`).length == 0) {
    $("#root-card-info").append(`
        <div class="card mb-3 col-4 shadow-sm rounded-4 ">
          <div class="card-header fw-bold text-center">${data.owner.charAt(0).toUpperCase() + data.owner.slice(1)} de bombas</div>
          <div class="card-body ${data.owner}-card row" id=""></div>
        </div>`);
  }

  $(`.${data.owner}-card`).append(`      
      <div class="row g-0 align-items-center col-6 rounded-4 hover-animate btn-card-categori" id="root_card_${data.name}" onClick="getInfocard('${data.name}', '_${data.owner}', ${data.length})">
        <div class="col-auto p-3">
          <div class="bg-${severity[data.name]} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center " style="width: 50px; height: 50px;">
            <i class="bi bi-${icons[data.name]} text-${severity[data.name]} fs-4"></i>
          </div>
        </div>
        <div class="col ps-0">
          <div class="card-body py-3">
            <h6 class="card-title mb-1 text-muted text-center">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h6>
            <h4 class="mb-0 fw-bold text-center">${data.length}</h4>
          </div>
        </div>
      </div>`);
}

const icons = {
  encendido: 'toggle-on',
  apagado: 'toggle-off',
  abierto: 'unlock-fill',
  cerrado: 'lock-fill',
  ok: 'battery-charging',
  falla: 'battery'

}

const severity = {
  abierto: 'success',
  cerrado: 'danger',
  encendido: 'success',
  apagado: 'danger',
  ok: 'success',
  falla: 'danger'

}