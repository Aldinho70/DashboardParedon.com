import { htmlCreateKpisUnitDetail } from "../../main/unitDetail/unitDetail.js";

export const createHistoricBarChart = ( data, index ) => {
    let arrayEncendida = [];
    let arrayApagada = [];
    let sumaTotalEncendido = 0;

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
                                if (element.BOMBA == 1) {
                                    sumaTotalEncendido ++
                                    sum_encendida ++;
                                } else if( element.BOMBA == 0 || element.BOMBA < 1 ) {
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
    
    $(`#root-kpis-info-${index}`).html(htmlCreateKpisUnitDetail( sumaTotalEncendido, data ));
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
            },
            series: {
                cursor: 'pointer', // cambia el cursor al pasar sobre las barras
                point: {
                    events: {

                        click: function () {
                            let array_bomba = []
                            console.log( data[this.category] );
                            for (const key in data[this.category]) {
                                if (Object.prototype.hasOwnProperty.call(data[this.category], key)) {
                                    const horas = data[this.category][key];
                                    for (const key in horas) {
                                        if (Object.prototype.hasOwnProperty.call(horas, key)) {
                                            const hora = horas[key];
                                            array_bomba.push( hora.BOMBA )
                                        }
                                    }
                                }
                            }
                            createHistoricDayAreaChart( array_bomba, index, this.category)
                        }
                    }
                }
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

const createHistoricDayAreaChart = ( data, index, dia ) =>{

    $( `#root-chart-info-per-dar-${index}` ).html('');
    Highcharts.chart(`root-chart-info-per-dar-${index}`, {
        chart: {
        type: 'area'
        },
        title: {
            text: `Resumen de estado de bomba del dia ${dia}`
        },
        xAxis: {
            categories: [...Array(24).keys()].map(hour => `${hour}:00`)
        },
        yAxis: {
            title: {
                text: 'Estado'
            },
            min: 0,
            max: 1,
            tickInterval: 1,
            labels: {
                formatter: function() {
                    return this.value === 1 ? 'Encendido' : 'Apagado';
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ''
        },
        series: [{
            name: 'Estado',
            // data: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            data: data,
            color: 'green',
            marker: {
                enabled: false
            }
        }]
    });

}
