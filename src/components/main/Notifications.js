export const htmlCreateNotification = (event) => {
  console.log(`Nueva notificaciones ${event}`);

  var data = event.getData(); // get data from event

  if (data.tp && data.tp == "unm") {
    // _notifacines.push(data)
    console.log(`Notificaciones filtrada ${data.txt}`);

    $("#root-notification").append(
      `<div class="toast show w-100" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <!-- <img src="" class="rounded me-2" alt="..."> -->
            <strong class="me-auto">Nombre de unidad</strong>
            <small>Justo ahora</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            Notifiacion de prueba
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