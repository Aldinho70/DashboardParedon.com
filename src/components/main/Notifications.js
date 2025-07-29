export const htmlCreateNotification = (event) => {
  let _notifications = []
  let data = event.getData(); // get data from event
  
  if (data.tp && data.tp == "unm") {
    $("#root-notification-nobody").hide();
    _notifications.push(data)

    console.log(_notifications);
    

   $("#notif-count").text(_notifications.length)

    $(".root-notification").append(`
  <div class="toast show border-0 shadow-lg overflow-hidden mb-3" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 420px;">
    <div class="d-flex bg-warning text-white align-items-center px-3 py-2">
      <i class="bi bi-exclamation-triangle-fill me-2 fs-4"></i>
      <div class="flex-grow-1">
        <strong class="d-block">${data.name}</strong>
        <small class="text-light">Justo ahora</small>
      </div>
      <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body bg-white text-dark fw-medium px-3 py-2 border-top">
      <span>${data.txt}</span>
    </div>
  </div>
`);

  }
}

export function htmlCreateModalNotifications(event) {

}