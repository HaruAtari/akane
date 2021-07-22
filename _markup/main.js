document.addEventListener("DOMContentLoaded", () => {

    var options = {
        series: [
            {
                name: "Отработано",
                type: 'line',
                data: [
                    8, 16, 24, 32, 40, 40, 40,
                    45, 53, 61, 69, 77, 77, 77,
                    87, 95, 103, 111, 119, 119, 119,
                    127, 127, 130, 140, 150, 157, 167,
                    172, 184
                ],
            },
            {
                name: "План",
                type: 'area',
                data: [
                    8, 16, 24, 32, 40, 40, 40,
                    48, 56, 64, 72, 80, 80, 80,
                    88, 96, 104, 112, 120, 120, 120,
                    128, 136, 144, 152, 160, 160, 160,
                    168, 176
                ],
            },
            {
                name: "Опережение",
                type: 'column',
                data: [
                    0,0,0,0,0,0,0,
                    -3,-3,-3,-3,-3,-3,-3,
                    -1,-1,-1,-1,-1,-1,-1,
                    -1,-9,-14,-12,-10,-3,7,
                    4,8
                ],
            }
        ],
        colors:[
            '#008FFB',
            '#FF9800',
            function({ value, }) {
                if (value < 0) {
                    return '#FF4560'
                } else {
                    return '#4caf50'
                }
            },
        ],
        fill: {
            type:'solid',
            opacity: [1, 0.2,1],
        },
        chart: {
            toolbar: {
                show: false
            },
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },

        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: [1, 0, 1]
        },
        tooltip:{
            x: {
                formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                    return value+' июля'
                }
            },
            y: {
                formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                    if(seriesIndex===2){
                        value=Math.abs( series[seriesIndex][dataPointIndex])
                    }
                    return value+':00'
                },
                title:{
                    formatter(value, { series, seriesIndex, dataPointIndex, w }){
                        if(seriesIndex===2){
                            return series[seriesIndex][dataPointIndex]>0?'Опережение':'Отставание'
                        }
                        return value
                    }
                }
            },
        },
        xaxis: {
            categories: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
            ],
            labels: {
                maxHeight:40,
            },
        },
        yaxis: {
            min:-21,
            max:190,
            labels:{
                maxWidth:10
            }
        },
        grid: {
            padding: {
                left: 0,
                right: 0,
                top:0,
                bottom:0
            }
        },
        legend:{
            markers:{
                fillColors:[
                    '#008FFB',
                    '#FF9800',
                    '#4caf50',
                ]
            }
        },
    };
    var chart = new ApexCharts(document.querySelector(".user-summary-chart"), options);
    chart.render();
});
