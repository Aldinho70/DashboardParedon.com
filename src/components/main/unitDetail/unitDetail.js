import { IframeMap } from "../Map/Map.js"
import { showModal } from "../../../utils/utils.js"
import { agruparPorDia } from "../../../utils/utils.js";
import MessagesService from "../../../wialon/utils/getMessages.js";
import { createHistoricBarChart } from "../../UI/Highchart/Highchart.HistoricBar.js";
import { getSensorsValueByMessagesWithDate } from "../../../wialon/utils/getSensors.js";

const from = '2025-05-13T23:59';
const to = '2025-05-14T23:59';

const messageService = new MessagesService(from, to);

export const htmlCreateUnitDetail = async (unit, id_index) => {
    const unit_messages = await messageService.loadMessagesToday(unit.id_unidad);
    const { messages, count } = unit_messages;
    const sensorsByMessages = getSensorsValueByMessagesWithDate(messageService.session.getItem(unit.id_unidad), messages);
    const data_per_day = agruparPorDia(sensorsByMessages);
    
    // const tiempos = calcularTiemposBomba(sensorsByMessages);
    const { x : latitud, y : longitud } = unit.last_message.pos;
    
    $("#unitDetailModal").html( `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="d-flex flex-row gap-2 align-items-center">
                        <img class="img-fluid" src="${unit.icon}" alt="icon" width="32" height="32">
                        <h5 class="modal-title">${unit.name}</h5>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-6 " ">
                            ${$(`#root-column-info-${id_index}`).html()}
                        </div>
                        <div class="col-6 " style="height: 500px;">
                            ${IframeMap(longitud, latitud)}
                        </div>
                        <div class="col-12" id="root-chart-info-${id_index}"></div>
                    </div>
                </div>
            </div>
        </div>
    `);

    showModal("#unitDetailModal");
    createHistoricBarChart( data_per_day, id_index );
}