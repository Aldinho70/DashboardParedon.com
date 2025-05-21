import wialonSDK from './src/wialon/sdk/wialonSDK.js';
import { getSensorValues } from './src/wialon/utils/getSensors.js';
import { getInformation } from './src/wialon/utils/getInformation.js';
import { convertTimestamp } from './src/utils/timestamp.js';
import { htmlCreateCard } from './src/components/main/main.js';

const TOKEN = "4074942dea57964c374ca3563fe09bf5723A204D0DF9BC90A8D20965BCC0D37210BCAB3D";


async function iniciarWialon() {
    try {
        let _units = [];
        const session = await wialonSDK.init(TOKEN);
        const user = session.getCurrUser();
        console.log("Usuario:", user.getName());

        const data_units = session.getItems("avl_unit");
        const units = getInformation(data_units);
        // console.log(units);

        data_units.forEach(_unit => {
            const name = _unit.getName();
            const sensors = getSensorValues(_unit); 
            const last_message = _unit.getLastMessage();
            console.log( convertTimestamp(last_message.t) );
            const unidad = {
                name,
                sensors,
                last_message,
                dateParsed: convertTimestamp(last_message.t),
                // otrasKeys: ... si necesita agregar más cosas
            };

            _units.push(unidad);
        });

        console.log(_units);
        htmlCreateCard( _units )

    } catch (error) {
        console.error("Error al iniciar Wialon:", error);
    }
}


iniciarWialon();
