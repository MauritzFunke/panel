const cpuColor = 'rgba(255, 99, 132, 1)';
let cpuChart;
function cpu(element_id) {
    const ctx = document.getElementById(element_id).getContext('2d');
    cpuChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '# CPU usage',
                cubicInterpolationMode: 'monotone',
                data: [],
                backgroundColor: []
            }]
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    suggestedMax: 100
                },
                x: {
                    max:30
                }
            }
        }
    });
}

function refreshCPU() {
    fetch("/api/cpu")
        .then((response) => response.json()).then((data) => {
            cpuChart.data.labels.push(data.time);
            cpuChart.data.datasets[0].data.push(data.load.currentLoad); // *100 to get percent
            cpuChart.data.datasets[0].backgroundColor.push(cpuColor);
            cpuChart.update();
            if(cpuChart.data.datasets[0].data.length > 30) {
                cpuChart.data.labels.shift();
                cpuChart.data.datasets[0].data.shift();
                cpuChart.data.datasets[0].backgroundColor.shift();
            }
        });
}