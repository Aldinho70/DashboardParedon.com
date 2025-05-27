import wialonSDK from './src/wialon/sdk/wialonSDK.js';
import { getSensorValues } from './src/wialon/utils/getSensors.js';
import { getInformation } from './src/wialon/utils/getInformation.js';
import { convertTimestamp } from './src/utils/timestamp.js';
import { htmlCreateCard } from './src/components/main/main.js';
import HighChart from './src/wialon/api/Highchart.js/index.highchart.js'

const TOKEN = "4074942dea57964c374ca3563fe09bf5723A204D0DF9BC90A8D20965BCC0D37210BCAB3D";


async function iniciarWialon() {
    try {
        const _units = [];
        const _voltaje = { falla: {}, ok: {} };
        const _estado = { apagado: {}, encendido: {}, falla: {} };
        const _gabinete = { abierto: {}, cerrado: {}, falla: {} };
        const _notifacines = {}

        const session = await wialonSDK.init(TOKEN);
        const user = session.getCurrUser();
        const resource = session.getItems('avl_resource');

        for (var i = 0; i< resource.length; i++) { // construct Select list using found resources		
		    //addEvent(res[i].getId()); // add event to any resource object
			resource[i].addListener("messageRegistered", showData); // register event when we will receive message
	    }

        console.log("Usuario:", user.getName());
        console.log( "resources", resource );
        console.log( "resources", resource[0].getNotifications() );
        

        const data_units = session.getItems("avl_unit");
        const units = getInformation(data_units);

        data_units.forEach(_unit => {
            const name = _unit.getName();
            const sensors = getSensorValues(_unit);
            const last_message = _unit.getLastMessage();
            const dateParsed = convertTimestamp(last_message.t);

            const unidad = {
                name,
                sensors,
                last_message,
                dateParsed
            };

            /**Hcaer funciones de cada una */
            const voltaje = sensors.find(s => s.nombre === "VOLTAJE EXTERNO");
            if (voltaje && voltaje.valor === 'N/A') {
                _voltaje.falla[name] = unidad;
            } else {
                _voltaje.ok[name] = unidad;
            }
            
            const gabinete = sensors.find(s => s.nombre === "GABINETE");
            if( gabinete ){
                if(gabinete.valor === 'N/A'){
                    _gabinete.cerrado[name] = unidad
                }else if(gabinete.valor === 1){
                    _gabinete.abierto[name] = unidad
                }else{
                    _gabinete.cerrado[name] = unidad
                }
            }
            
            const estado = sensors.find(s => s.nombre === "BOMBA");
            if( estado ){
                if( estado.valor == 1 ){
                    _estado.encendido[name] = unidad
                }else if ( estado.valor == 0 ){
                    _estado.apagado[name] = unidad
                }else if ( estado.valor == 'N/A' ){
                    _estado.falla[name] = unidad                    
                }
            }
            /**Hcaer funciones de cada una */
            
            _units.push(unidad);
        });
        
        // console.log("_units", _units);
        // console.log("_voltaje", _voltaje);
        // console.log("_gabinete", _gabinete);
        // console.log("_estado", _estado);
        
        htmlCreateCard(_units);
        HighChart.initChartGabinetes( _gabinete );
        HighChart.initChartStatus(_estado);
        HighChart.initChartVoltaje(_voltaje);
        HighChart.initchartAll(_gabinete,_voltaje, _estado);

    } catch (error) {
        console.error("Error al iniciar Wialon:", error);
    }
}

function showData(event) {
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
        _notifacines.push( data )
        console.log(data);
        
		// $("#notification").append("<tr><td>" + data.name + "</td><td>" + data.txt + "</td><td id='" + data.t + "' class='close_btn'>x</td><tr>"); // add row with data to info-table
		// $("#count").text(parseInt($("#count").text()) + 1); // get notification count
		// $("#container").show();
	}
}

iniciarWialon();
