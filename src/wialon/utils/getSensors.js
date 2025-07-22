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