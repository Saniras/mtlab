function fetchContainerTradeData(containerTradeUrl) {
    Promise.all([
        fetch(containerTradeUrl).then(res => res.json())
    ]).then(([containerTradeData]) => {
        let ctx = document.getElementById('containerChart').getContext('2d');

        let chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: containerTradeData.plots[0].data.map(item => item.Date),
                datasets: [{
                    label: containerTradeData.plots[0].series[0].name,
                    data: containerTradeData.plots[0].data.map(item => item[containerTradeData.plots[0].series[0].code]),
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false
                },
                {
                    label: containerTradeData.plots[0].series[1].name,
                    data: containerTradeData.plots[0].data.map(item => item[containerTradeData.plots[0].series[1].code]),
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: containerTradeData.plots[0].title
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            autoSkip: true,
                            suggestedMax: containerTradeData.plots[0].axis0.ylim[1]
                        }
                    }]
                }
            }
        });
    }).catch(error => {
        console.log('Error:', error);
    });
}
