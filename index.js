import wialonSDK from './src/wialon/sdk/wialonSDK.js';
import { getSensorValues, getSensorsValueByMessages, calcularTiemposBomba, getValueByNameSensor } from './src/wialon/utils/getSensors.js';
import { convertTimestamp, getFechaActual } from './src/utils/timestamp.js';
import { htmlCreateCard, htmListCard } from './src/components/main/main.js';
import { htmlCreateNotification } from './src/components/main/Notifications.js';
import { htmlCreateCardInfo } from './src/components/main/CardsInfo.js';
import { htmlCreateUnitDetail } from './src/components/main/unitDetail/unitDetail.js';
import { clearHTML, extraerHoras, convertirTiempoADias } from './src/utils/utils.js';
import { getGroups } from './src/components/main/Groups/Groups.js';
import HighChart from './src/wialon/api/Highchart.js/index.highchart.js';
import MessagesService from './src/wialon/utils/getMessages.js';
import { initChartDayBar } from './src/components/UI/Highchart/Highchart.DayBar.js';
import { initChartDayPie } from './src/components/UI/Highchart/Highchart.DayPie.js';

const TOKEN = "4074942dea57964c374ca3563fe09bf5723A204D0DF9BC90A8D20965BCC0D37210BCAB3D";
const from = '2025-05-13T23:59';
const to = '2025-05-14T23:59';

let session;
let _groups;
let data_units = [];
let messageService;
let _group_select = 'all_units';

let _voltaje;
let _estado;
let _gabinete;

export async function iniciarWialon() {
    try {
        clearHTML("#root-card", "#root-card-info", "#root-card-groups", "#root-list-card" );
        const _units = [];

        _voltaje = { falla: {}, ok: {} };
        _estado = { apagado: {}, encendido: {}, falla: {} };
        _gabinete = { abierto: {}, cerrado: {}, falla: {} };

        session = await wialonSDK.init(TOKEN);
        const user = session.getCurrUser();
        
        const groups = session.getItems('avl_unit_group');
        const resources = session.getItems('avl_resource');
        const all_units = session.getItems('avl_unit');

        _groups = getGroups(groups);

        data_units = (_group_select !== 'all_units')
            ? all_units.filter(unit => _groups[_group_select].units.includes(unit.getId()))
            : all_units;

        messageService = new MessagesService(from, to);

        resources.forEach(resource => {
            resource.addListener("messageRegistered", htmlCreateNotification);
        });

        for (const _unit of data_units) {
            const unidad = crearObjetoUnidad(_unit);
            clasificarUnidad(unidad, _unit);
            _units.push(unidad);
        }

        $(`#root_card_${_group_select.replaceAll(' ', '_')}`).addClass('bg-warning');
        
        $('#root-fecha').html(`Ultima actualizacion: ${getFechaActual()}`);
        
        htmlCreateCard(_units);
        htmlCreateCardInfo(_estado, ['encendido', 'apagado'], 'estado');
        htmlCreateCardInfo(_gabinete, ['abierto', 'cerrado'], 'gabinete');
        htmlCreateCardInfo(_voltaje, ['ok', 'falla'], 'voltaje');
        
        if( sessionStorage.getItem('card_actived') ) {
            $(`#root_card_${sessionStorage.getItem('card_actived')}`).addClass('bg-warning');
            $(`#root_card_${sessionStorage.getItem('card_actived')}`).click();            
            
            if( sessionStorage.getItem('id_acordeon') ) {
                // $(`#collapse-${sessionStorage.getItem('id_acordeon')}`).addClass('show');
                $(`#button-accordion-${sessionStorage.getItem('id_acordeon')}`).click();
            }
        }

    
        HighChart.initChartGabinetes(_gabinete);
        HighChart.initChartVoltaje(_voltaje);
        HighChart.initChartStatus(_estado);
        HighChart.initchartAll(_gabinete, _voltaje, _estado);
         $("#loading").fadeOut();

    } catch (error) {
        console.error("Error al iniciar Wialon:", error);
    }
}

function crearObjetoUnidad(_unit) {
    return {
        name: _unit.getName(),
        sensors: getSensorValues(_unit),
        last_message: _unit.getLastMessage(),
        dateParsed: convertTimestamp(_unit.getLastMessage().t),
        id_unidad: _unit.getId(),
        icon: _unit.getIconUrl(32)
    };
}

function clasificarUnidad(unidad, _unit) {
    const name = unidad.name;

    const voltaje = getValueByNameSensor(_unit, "VOLTAJE EXTERNO");
    if (voltaje && (voltaje.valor === 'N/A' || voltaje.valor < 5)) {
        _voltaje.falla[name] = unidad;
    } else if (voltaje?.valor) {
        _voltaje.ok[name] = unidad;
    }

    const gabinete = getValueByNameSensor(_unit, "GABINETE");
    if (gabinete) {
        if (gabinete.valor === 'N/A') {
            _gabinete.cerrado[name] = unidad;
        } else if (gabinete.valor === 1) {
            _gabinete.abierto[name] = unidad;
        } else {
            _gabinete.cerrado[name] = unidad;
        }
    }

    const estado = getValueByNameSensor(_unit, "BOMBA");
    if (estado) {
        if (estado.valor == 1) {
            _estado.encendido[name] = unidad;
        } else if (estado.valor == 0) {
            _estado.apagado[name] = unidad;
        } else if (estado.valor === 'N/A') {
            _estado.falla[name] = unidad;
        }
    }
}

const getInfocard = (name, owner = '', total = 0, group_select ) => {
    if (group_select) {
        $("#loading").fadeIn();
        _group_select = group_select;
        wialonSDK.logout(TOKEN);
        clearHTML("#root-list-card", "#root-categori");
        $('#root-card').removeClass('d-none')
    } else {
        const all_data = { _voltaje, _gabinete, _estado };
        htmListCard(all_data[owner][name], name, total);
    }
};
window.getInfocard = getInfocard;

const getMessagesbyId = async (id, index) => {
    sessionStorage.setItem('id_acordeon', `${index}`);

    const unit_messages = await messageService.loadMessagesToday(id);
    const { messages } = unit_messages;
    const sensorsByMessages = getSensorsValueByMessages(session.getItem(id), messages);
    const tiempos = calcularTiemposBomba(sensorsByMessages);

    $(`#${id}-encendido`).text( convertirTiempoADias(tiempos.encendida) );
    $(`#${id}-apagado`).text( convertirTiempoADias(tiempos.apagada) );

    initChartDayPie(index, Math.round(extraerHoras(tiempos.encendida)));
    initChartDayBar(index, Math.round(extraerHoras(tiempos.encendida)));
};
window.getMessagesbyId = getMessagesbyId;


const getDetailUnit = (name) => {
    const all_data = { ..._voltaje, ..._gabinete, ..._estado };
    for (const key in all_data) {
        if (Object.prototype.hasOwnProperty.call(all_data, key)) {
            const group = all_data[key];            
            if(group[name]) {
                console.log(`group[name]`, group[name]);
                htmlCreateUnitDetail(group[name]);
                break;
            }
        }
    }
}

window.getDetailUnit = getDetailUnit;

iniciarWialon();
setInterval(() => {
    wialonSDK.logout(TOKEN);
}, 1 * 60 * 1000);
