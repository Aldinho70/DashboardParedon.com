export const initChartDayBar = ( id, data ) =>{
    Highcharts.chart(`root-chart-day-bar-${id}`, {
    chart: {
        type: 'column',
        height: 300
    },
    title: {
        text: 'Horas encendidas o apagadas'
    },
    tooltip: {
  useHTML: true,
  headerFormat: '',
  formatter: function () {
    console.log(this);
    
    return `
        <div class="text-start">
            <div class="d-flex align-items-center mb-1">
            <span class="me-2" style="color:${this.point.color}">\u25CF</span>
            <span class="fw-bold text-dark">${this.key}</span>
            </div>
            <div class="text-secondary small">
            Horas de <span class="text-capitalize">${this.key}</span> de los últimos 15 dias:
            </div>
            <div class="fw-semibold text-primary">
            ${this.y} horas
            </div>
        </div>`;
    }
},
    xAxis: {
        categories: ['Encendido', 'Apagado']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Horas'
        }
    },    
    series: [{
        name: 'Estado',
        data: [
            {
                y: data,
                color: '#28a745'
            },
            {
                y: ((24 * 15)-data),
                color: '#dc3545'

            }
        ]  
    }]
});
}