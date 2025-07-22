import wialonSDK from './src/wialon/sdk/wialonSDK.js';
import { getSensorValues, getSensorsValueByMessages, calcularTiemposBomba, getValueByNameSensor, obtenerEstadosYHoras } from './src/wialon/utils/getSensors.js';
import { getInformation } from './src/wialon/utils/getInformation.js';
import { convertTimestamp, getFechaActual, toUnixTimestamp } from './src/utils/timestamp.js';
import { htmlCreateCard, htmListCard } from './src/components/main/main.js';
import { htmlCreateNotification } from './src/components/main/Notifications.js';
import { htmlCreateCardInfo } from './src/components/main/CardsInfo.js';
import { clearHTML, extraerHoras } from './src/utils/utils.js';
import HighChart from './src/wialon/api/Highchart.js/index.highchart.js'
import MessagesService from './src/wialon/utils/getMessages.js';
import { initChartDayBar } from './src/components/UI/Highchart/Highchart.DayBar.js';
import { initChartDayPie } from './src/components/UI/Highchart/Highchart.DayPie.js';

const TOKEN = "4074942dea57964c374ca3563fe09bf5723A204D0DF9BC90A8D20965BCC0D37210BCAB3D";

const from = '2025-05-13T23:59' /* startDate */
const to = '2025-05-14T23:59'; /* endDate */

const _voltaje = { falla: {}, ok: {} };
const _estado = { apagado: {}, encendido: {}, falla: {} };
const _gabinete = { abierto: {}, cerrado: {}, falla: {} };
let messageService;
let session;

export async function iniciarWialon() {
    try {
        const _units = [];
        session = await wialonSDK.init(TOKEN);
        const user = session.getCurrUser();
        const resource = session.getItems('avl_resource');
        messageService = new MessagesService(from, to);

        /* Obtener notificaciones */
            for (var i = 0; i < resource.length; i++) { // construct Select list using found resources		
                //addEvent(res[i].getId()); // add event to any resource object
                resource[i].addListener("messageRegistered", htmlCreateNotification); // register event when we will receive message
            }
        /* Obtener notificaciones */

        const data_units = session.getItems("avl_unit");
        data_units.forEach(async (_unit) => {

            const name = _unit.getName();
            const sensors = getSensorValues(_unit);
            const last_message = _unit.getLastMessage();
            const dateParsed = convertTimestamp(last_message.t);
            const id_unidad = _unit.getId(); /*console.log( id_unidad );*/
            const icon = _unit.getIconUrl(32);

            const unidad = {
                name,
                sensors,
                last_message,
                dateParsed,
                id_unidad,
                icon
            };

            /**Hacer funciones de cada una */
            const voltaje = getValueByNameSensor(_unit, "VOLTAJE EXTERNO");
            if (voltaje && voltaje.valor === 'N/A' || voltaje.valor < 5) {
                _voltaje.falla[name] = unidad;
            } else if (voltaje.valor) {
                _voltaje.ok[name] = unidad;
            }

            const gabinete = getValueByNameSensor(_unit, "GABINETE");
            if (gabinete) {
                if (gabinete.valor === 'N/A') {
                    _gabinete.cerrado[name] = unidad
                } else if (gabinete.valor === 1) {
                    _gabinete.abierto[name] = unidad
                } else {
                    _gabinete.cerrado[name] = unidad
                }
            }

            const estado = getValueByNameSensor(_unit, "BOMBA");
            if (estado) {
                if (estado.valor == 1) {
                    _estado.encendido[name] = unidad
                } else if (estado.valor == 0) {
                    _estado.apagado[name] = unidad
                } else if (estado.valor == 'N/A') {
                    _estado.falla[name] = unidad
                }
            }
            /**Hacer funciones de cada una */

            _units.push(unidad);
        });

        // console.log("_units", _units);
        // console.log("_voltaje", _voltaje);
        // console.log("_gabinete", _gabinete);
        // console.log("_estado", _estado);

        $('#root-fecha').val(`Ultima actualizacion: ${getFechaActual()}`)
        clearHTML("#root-card", "#root-card-info")

        htmlCreateCard(_units);
        htmlCreateCardInfo(_gabinete, ['abierto', 'cerrado'], 'gabinete');
        htmlCreateCardInfo(_estado, ['encendido', 'apagado'], 'estado');
        htmlCreateCardInfo(_voltaje, ['ok', 'falla'], 'voltaje');

        HighChart.initChartGabinetes(_gabinete);
        HighChart.initChartStatus(_estado);
        HighChart.initChartVoltaje(_voltaje);
        HighChart.initchartAll(_gabinete, _voltaje, _estado);

    } catch (error) {
        console.error("Error al iniciar Wialon:", error);
    }
}

const getInfocard = (name, owner, total) => {
    const all_data = { _voltaje, _gabinete, _estado }
    htmListCard(all_data[owner][name], name, total)
};
window.getInfocard = getInfocard;

const getMessagesbyId = async (id, index) =>{
    const unit_messages = await messageService.loadMessagesToday( id );
    // const unit_messages = await messageService.loadMessages(_unit.getId());
    const { messages, count } = unit_messages;
    let sensorsByMessages = getSensorsValueByMessages(session.getItem(id), messages); /*console.log( sensorsByMessages );*/
    const tiempos = calcularTiemposBomba(sensorsByMessages);        
    console.log( obtenerEstadosYHoras( sensorsByMessages ));
    $(`#${id}-encendido`).text(tiempos.encendida)
    $(`#${id}-apagado`).text(tiempos.apagada)

    initChartDayPie( index, Math.round(extraerHoras(tiempos.encendida)) );
    initChartDayBar( index, Math.round(extraerHoras(tiempos.encendida)) );
}
window.getMessagesbyId = getMessagesbyId;


iniciarWialon();
setInterval(() => {
    wialonSDK.logout(TOKEN) 
}, 1 * 60 * 1000);