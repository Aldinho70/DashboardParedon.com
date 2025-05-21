class HighChart {
    initChartGabinetes = () => {
        Highcharts.chart('root-gabinetes', {
            chart: {
                type: 'pie',
                height: 200
            },
            title: {
                text: 'dashboard'
            },
            series: [{
                name: 'Valores',
                data: [
                    { name: 'Abierto', y: 60 },
                    { name: 'Cerrado', y: 40 }
                ],
                showInLegend: true,
                size: '140%' // aquí agranda el gráfico dentro del chart
            }],
            tooltip: {
                pointFormat: '<b>{point.name}: {point.percentage:.1f}%</b>'
            }
        });
    }
    initChartGabinetes2 = () => {
        Highcharts.chart('root-gabinetes2', {
            chart: {
                type: 'pie',
                height: 200
            },
            title: {
                text: 'dashboard'
            },
            series: [{
                name: 'Valores',
                data: [
                    { name: 'Abierto', y: 60 },
                    { name: 'Cerrado', y: 40 }
                ],
                showInLegend: true,
                size: '140%' // aquí agranda el gráfico dentro del chart
            }],
            tooltip: {
                pointFormat: '<b>{point.name}: {point.percentage:.1f}%</b>'
            }
        });
    }
    initChartGabinetes3 = () => {
        Highcharts.chart('root-gabinetes3', {
            chart: {
                type: 'pie',
                height: 200
            },
            title: {
                text: 'dashboard'
            },
            series: [{
                name: 'Valores',
                data: [
                    { name: 'Abierto', y: 60 },
                    { name: 'Cerrado', y: 40 }
                ],
                showInLegend: true,
                size: '150%' // aquí agranda el gráfico dentro del chart
            }],
            tooltip: {
                pointFormat: '<b>{point.name}: {point.percentage:.1f}%</b>'
            }
        });
    }
}

export default new HighChart();
