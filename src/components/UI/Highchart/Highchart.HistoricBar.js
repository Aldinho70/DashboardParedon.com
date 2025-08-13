export const createHistoricBarChart = ( data, index ) => {
    
    let arrayEncendida = [];
    let arrayApagada = [];

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            let sum_encendida = 0;
            let sum_apagado = 0;

            const dia = data[key];
            for (const key in dia) {
                if (Object.prototype.hasOwnProperty.call(dia, key)) {
                    const hora = dia[key];
                    
                    for (const key in hora) {
                        if (Object.prototype.hasOwnProperty.call(hora, key)) {
                            const element = hora[key];
                            if (element.BOMBA) {
                                if (element.BOMBA === 1) {
                                    sum_encendida ++;
                                } else {
                                    sum_apagado ++;
                                }
                            }
                        }
                    }
                    
                }
            }
            arrayEncendida.push(sum_encendida);
            arrayApagada.push(sum_apagado);
        }
    }
    
    
    Highcharts.chart(`root-chart-info-${index}`, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Historico de Encendido y Apagado de bombas.'
        },
        subtitle: {
            text:''
        },
        xAxis: {
            categories: Object.keys(data),
            crosshair: true,
            accessibility: {
                description: ''
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Horas del dia'
            }
        },
        tooltip: {
            valueSuffix: ' Horas'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Encendida',
                data: arrayEncendida,
                color: 'orange'
            },
            {
                name: 'Apagada',
                data: arrayApagada,
                color: '#dc3545'
            }
        ]
    });
}
