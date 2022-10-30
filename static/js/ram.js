const ramColor = 'rgba(255, 99, 132, 0.2)';
let ramChart;
function ram(element_id) {
    fetch('/api/ram').then(response => response.json()).then(data => {
        const ctx = document.getElementById(element_id).getContext('2d');
        ramChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: '# RAM usage',
                    cubicInterpolationMode: 'monotone',
                    data: [],
                    backgroundColor: []
                }]
            },
            options: {
                scales: {
                    y: {
                        min: 0,
                        max: data.load.total
                    },
                    x: {
                        max: 30
                    }
                }
            }
        });
    });
}

function refreshRAM() {
    fetch('/api/ram')
        .then((response) => response.json()).then((data) => {
            ramChart.data.labels.push(data.time);
            ramChart.data.datasets[0].data.push(data.load.used); // *100 to get percent
            ramChart.data.datasets[0].backgroundColor.push(ramColor);
            ramChart.update();
            if (ramChart.data.datasets[0].data.length > 30) {
                ramChart.data.labels.shift();
                ramChart.data.datasets[0].data.shift();
                ramChart.data.datasets[0].backgroundColor.shift();
            }
        });
}