export const htmlCreateNotification = (event) => {
  console.log(`Nueva notificaciones ${event}`);

  let data = event.getData(); // get data from event
  console.log(data);
  
  if (data.tp && data.tp == "unm") {
    $("#root-notification-nobody").hide();
    // _notifacines.push(data)
    console.log(`Notificaciones filtrada ${data.txt}`);

    $("#root-notification").append(
      `<div class="toast show w-100 border-0 shadow-sm bg-white" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header bg-warning text-white rounded-top">
            <i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
            <strong class="me-auto">${data.name}</strong>
            <small class="text-light">Justo ahora</small>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body text-secondary fw-semibold">
            <span class="text-dark">${data.txt}</span>
          </div>
        </div>`)
  }
}

export function showData(event) {
  console.log('nuevo mensaje');

  //     {
  //     "t": 1748367945,
  //     "f": 896,
  //     "tp": "unm",
  //     "name": "BOMBA ENCENDIDA NORIA",
  //     "txt": " MONTE ALEGRE NUEVA BOMBA ENCENDIDA A LAS 27.05.2025 12:45:50",
  //     "color": "#00998b",
  //     "url": "",
  //     "unit": 26918639,
  //     "blink": 0,
  //     "x": -103.302702,
  //     "y": 25.618483,
  //     "nid": 4,
  //     "rt": 0,
  //     "p": {}
  // }

  var data = event.getData(); // get data from event

  if (data.tp && data.tp == "unm") {
    _notifacines.push(data)
    console.log(data);

    // $("#notification").append("<tr><td>" + data.name + "</td><td>" + data.txt + "</td><td id='" + data.t + "' class='close_btn'>x</td><tr>"); // add row with data to info-table
    // $("#count").text(parseInt($("#count").text()) + 1); // get notification count
    // $("#container").show();
  }
}