function fetcharriveDepartData(arriveDepartUrl) {
    Promise.all([
        fetch(arriveDepartUrl).then(res => res.json())
    ]).then(([arriveDepartData]) => {
        let chartData = {
            labels: [], // This will hold the dates
            datasets: []
        };

        // Prepare labels (dates)
        arriveDepartData.data.forEach(item => {
            chartData.labels.push(item.Date);
        });

        // Prepare datasets
        arriveDepartData.series.forEach(series => {
            let dataset = {
                label: series.name,
                data: [],
                backgroundColor: series.color,
                stack: 'Stack 0'
            };
            arriveDepartData.data.forEach(item => {
                dataset.data.push(item[series.code]);
            });
            chartData.datasets.push(dataset);
        });

        // Create chart
        let ctx = document.getElementById('arrivalChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    y: {
                        min: 0,
                        max: 1000
                    }
                }
            }
        });
    }).catch((error) => {
        console.error('Error:', error); // If there's an error, log it
    });
}

