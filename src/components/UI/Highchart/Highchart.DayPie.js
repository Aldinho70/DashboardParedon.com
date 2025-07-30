export const initChartDayPie = (id, data) => {
    const porcentaje = Math.round(data * 100 / (24 * 15));
    const tiempos = {
        Encendido: data,
        Apagado: (24 * 15) - data

    }
    Highcharts.chart(`root-chart-day-pie-${id}`, {
        chart: {
            type: 'pie',
            height: 300,
        },
        title: {
            text: 'Porcentajes de tiempos',
            floating: true,
            margin: 1,
        },
        // subtitle: {
        //     // text: 'Promedio de tiempo de las ultimas 24 horas',
        //     // floating: false,
        //     // margin: 5,
        // },
        tooltip: {
            useHTML: true,
            headerFormat: '',
            pointFormat: `
            <div class="text-start">
                <div class="d-flex align-items-center mb-1">
                    <span class="me-2" style="color:{point.color}">\u25CF</span>
                    <span class="fw-bold text-dark">{point.name}</span>
                </div>
                <div class="text-secondary small">
                    Porcentaje de <span class="text-capitalize">{point.name}</span> de las últimas 24 horas:
                </div>
                <div class="fw-semibold text-primary">
                    {point.y}% <span class="text-muted small">({point.y} horas de 24 horas)</span>
                </div>
            </div>` 
        },
        plotOptions: {
            pie: {
                innerSize: '50%',
                dataLabels: {
                    enabled: true,
                    format: `{point.name}: {point.y}% de las ultimas 15 dias`
                },
                point: {
                    events: {
                        click: function () {
                            console.log( this.name );
                            
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Porcentaje',
            data: [
                {
                    name: 'Encendido',
                    y: porcentaje,
                    color:'#28a745',
                    
                },
                {
                    name: 'Apagado',
                    y: (100 - porcentaje),
                    color: '#dc3545'
                }
            ]
        }]
    });

}