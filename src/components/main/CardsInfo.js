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
  if ($(`body .${data.owner}-card`).length === 0) {
    $("#root-card-info").append(`
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <div class="card shadow-sm rounded-4 h-100">
          <div class="card-header fw-bold text-center">
            ${data.owner.charAt(0).toUpperCase() + data.owner.slice(1)} de bombas
          </div>
          <div class="card-body ${data.owner}-card row g-3 justify-content-center"></div>
        </div>
      </div>
    `);
  }

  $(`.${data.owner}-card`).append(`
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card border-0 shadow-sm rounded-4 hover-animate text-center btn-card-categori h-100"
           id="root_card_${data.name}"
           onClick="getInfocard('${data.name}', '_${data.owner}', ${data.length})">
        <div class="card-body d-flex flex-column align-items-center justify-content-center">
          <div class="bg-${severity[data.name]} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-2"
               style="width: 50px; height: 50px;">
            <i class="bi bi-${icons[data.name]} text-${severity[data.name]} fs-4"></i>
          </div>
          <h6 class="card-title mb-1 text-muted">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h6>
          <h4 class="fw-bold mb-0">${data.length}</h4>
        </div>
      </div>
    </div>
  `);
};

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