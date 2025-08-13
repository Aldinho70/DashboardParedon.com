import { SENSORES } from '../../config/config.js';
import { formatearTiempo } from '../../utils/timestamp.js';

export const getSensorValues = (unit) => {
    const sensores = unit.getSensors();
    const lastMessage = unit.getLastMessage();
    const result = [];

    for (const i in sensores) {
        if (Object.prototype.hasOwnProperty.call(sensores, i)) {
            const sensor = sensores[i];
            const sens = unit.getSensor(sensor.id);

            let valor = unit.calculateSensorValue(sens, lastMessage);
            if (valor === -348201.3876) valor = 'N/A';
            result.push({ nombre: sensor.n, valor });
        }
    }

    return result;
};

export const getSensorsValueByMessages = (unit, messages) => {
    const sensores = unit.getSensors();
    const result = [];

    for (const j in messages) {
        const sensAux = []; // Reiniciar aquí en cada mensaje

        for (const i in sensores) {
            if (Object.prototype.hasOwnProperty.call(sensores, i)) {
                const sensor = sensores[i];

                if (SENSORES.includes(sensor.n)) {
                    const sens = unit.getSensor(sensor.id);
                    let valor = unit.calculateSensorValue(sens, messages[j]);

                    if (valor === -348201.3876) {
                        valor = 'N/A';
                    }

                    sensAux.push({
                        nombre: sensor.n,
                        valor: valor,
                    });
                }
            }
        }

        result.push({ [messages[j].t]: sensAux });
    }

    // console.log(unit.getName(), result);
    return result;
}

export const getSensorsValueByMessagesWithDate = (unit, messages) => {
    // Objeto temporal para almacenar la SUMA y el CONTEO de lecturas
    const datosTemporales = {};

    // Se obtiene la lista de sensores una sola vez fuera del bucle para mayor eficiencia
    const sensores = unit.getSensors();

    // --- Bucle 'for...in' principal sobre los mensajes ---
    for (const j in messages) {
        if (!Object.prototype.hasOwnProperty.call(messages, j)) continue; // Guarda de seguridad para el bucle
        
        const message = messages[j];

        // Extraer la fecha y la hora
        const fechaObjeto = new Date(message.t * 1000);
        const fechaISOString = fechaObjeto.toISOString();
        const soloFecha = fechaISOString.substring(0, 10); // "YYYY-MM-DD"
        const horaDelDia = fechaISOString.substring(11, 13); // "HH"

        // --- Bucle 'for...in' restaurado para los sensores ---
        for (const i in sensores) {
            if (Object.prototype.hasOwnProperty.call(sensores, i)) {
                const sensorInfo = sensores[i]; // Se obtiene el objeto del sensor usando su índice 'i'

                if (SENSORES.includes(sensorInfo.n)) {
                    const sens = unit.getSensor(sensorInfo.id);
                    let valor = unit.calculateSensorValue(sens, message);

                    if (valor === -348201.3876) {
                        valor = 'N/A';
                    }

                    if (typeof valor === 'number') {
                        // Creación de la estructura anidada si no existe
                        if (!datosTemporales[soloFecha]) {
                            datosTemporales[soloFecha] = {};
                        }
                        if (!datosTemporales[soloFecha][horaDelDia]) {
                            datosTemporales[soloFecha][horaDelDia] = {};
                        }
                        if (!datosTemporales[soloFecha][horaDelDia][sensorInfo.n]) {
                            datosTemporales[soloFecha][horaDelDia][sensorInfo.n] = { suma: 0, conteo: 0 };
                        }
                        
                        // Acumular la suma y el conteo
                        datosTemporales[soloFecha][horaDelDia][sensorInfo.n].suma += valor;
                        datosTemporales[soloFecha][horaDelDia][sensorInfo.n].conteo++;
                    }
                }
            }
        }
    }

    // --- FASE 2: Calcular los promedios (esta parte no cambia) ---
    const promediosFinales = {};

    for (const fecha in datosTemporales) {
        promediosFinales[fecha] = {};
        for (const hora in datosTemporales[fecha]) {
            promediosFinales[fecha][hora] = {};
            for (const sensorNombre in datosTemporales[fecha][hora]) {
                const datosSensor = datosTemporales[fecha][hora][sensorNombre];
                const promedio = datosSensor.suma / datosSensor.conteo;

                promediosFinales[fecha][hora][sensorNombre] = parseFloat(promedio.toFixed(2));
            }
        }
    }

    return promediosFinales;
};

export const getValueByNameSensor = (unit, sensor) => {
    const sensors = getSensorValues(unit);
    const value = sensors.find(s => s.nombre === sensor);
    return value;
}

export const calcularTiemposBomba = (data) => {
    let tiempoEncendida = 0;
    let tiempoApagada = 0;

    const registros = data.map(entry => {
        const timestamp = Object.keys(entry)[0];
        const sensores = entry[timestamp];
        return {
            timestamp: parseInt(timestamp),
            sensores: sensores
        };
    });

    registros.sort((a, b) => a.timestamp - b.timestamp);

    for (let i = 0; i < registros.length - 1; i++) {
        const actual = registros[i];
        const siguiente = registros[i + 1];
        const delta = siguiente.timestamp - actual.timestamp;

        const bomba = actual.sensores.find(s => s.nombre === 'BOMBA');
        if (!bomba) continue;

        if (bomba.valor === 1) {
            tiempoEncendida += delta;
        } else if (bomba.valor === 0) {
            tiempoApagada += delta;
        }
    }

    return {
        encendida: formatearTiempo(tiempoEncendida),
        apagada: formatearTiempo(tiempoApagada),
        total: formatearTiempo(tiempoEncendida + tiempoApagada)
    };
};

export const obtenerEstadosYHoras = (data) => {
  const estados = [];
  const tiempos = [];

  const clavesOrdenadas = Object.keys(data).sort((a, b) => Number(a) - Number(b));

  for (const clave of clavesOrdenadas) {
    const registro = data[clave];

    // ✅ Verificamos que registro exista y sea un array
    if (Array.isArray(registro)) {
      const bomba = registro.find(item => item.nombre === 'BOMBA');

      if (bomba) {
        estados.push(bomba.valor);

        const timestampMs = Number(clave) * 1000;
        const fecha = new Date(timestampMs);
        const horaCorta = fecha.toLocaleTimeString('es-MX', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });

        tiempos.push(horaCorta);
      }
    } else {
      console.warn(`Clave ${clave} no tiene un array válido:`, registro);
    }
  }

  return {
    estados,
    tiempos
  };
}