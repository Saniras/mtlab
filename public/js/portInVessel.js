function fetchportInVesselData(portInVesselUrl) {
Promise.all([
    fetch(portInVesselUrl).then(res => res.json())
]).then(([portInVesselData]) => {
    let ctx = document.getElementById('portChart').getContext('2d');

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: portInVesselData.plots[0].data.map(item => item.Date),
            datasets: [{
                label: portInVesselData.plots[0].series[0].name,
                data: portInVesselData.plots[0].data.map(item => item[portInVesselData.plots[0].series[0].code]),
                borderColor: 'rgb(255, 99, 132)',
                fill: false
            },
            {
                label: portInVesselData.plots[0].series[1].name,
                data: portInVesselData.plots[0].data.map(item => item[portInVesselData.plots[0].series[1].code]),
                borderColor: 'rgb(54, 162, 235)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: portInVesselData.plots[0].title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        autoSkip: true,
                        suggestedMax: portInVesselData.plots[0].axis0.ylim[1]
                    }
                }]
            }
        }
    });
}).catch(error => {
    console.log('Error:', error);
});
};
