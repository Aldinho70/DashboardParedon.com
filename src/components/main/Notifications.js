$(document).ready(function () {
  $('#mainContent').html(`
    <div class="container py-4" id="root-main-notifation">
      <h2 class="mb-4">📊 Dashboard de Monitoreo – 33 Norias</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4" id="root-card"></div>
    </div>
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