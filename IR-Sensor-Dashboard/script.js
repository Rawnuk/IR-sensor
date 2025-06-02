const ctx = document.getElementById('sensorChart').getContext('2d');
const sensorChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'IR IN Status',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3, // smooth curves
      },
      {
        label: 'IR OUT Status',
        data: [],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.3,
      }
    ]
  },
  options: {
    animation: {
      duration: 500, // animation duration in ms
      easing: 'easeOutQuart',
    },
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: value => value === 1 ? 'DETECTED' : 'NOT',
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#34495e',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    }
  }
});

function updateStatus() {
  const data = {
    irIn: Math.random() > 0.5 ? 1 : 0,
    irOut: Math.random() > 0.5 ? 1 : 0,
    light: Math.random() > 0.5 ? 1 : 0
  };

  document.getElementById('irInStatus').textContent = data.irIn ? 'DETECTED' : 'NOT DETECTED';
  document.getElementById('irOutStatus').textContent = data.irOut ? 'DETECTED' : 'NOT DETECTED';
  document.getElementById('lightStatus').textContent = data.light ? 'ON' : 'OFF';

  document.getElementById('irInStatus').className = data.irIn ? 'detected' : 'not-detected';
  document.getElementById('irOutStatus').className = data.irOut ? 'detected' : 'not-detected';
  document.getElementById('lightStatus').className = data.light ? 'on' : 'off';

  const now = new Date().toLocaleTimeString();
  sensorChart.data.labels.push(now);
  sensorChart.data.datasets[0].data.push(data.irIn);
  sensorChart.data.datasets[1].data.push(data.irOut);

  const MAX_POINTS = 20;
  if (sensorChart.data.labels.length > MAX_POINTS) {
    sensorChart.data.labels.shift();
    sensorChart.data.datasets[0].data.shift();
    sensorChart.data.datasets[1].data.shift();
  }

  sensorChart.update();
}

// Update every 2 seconds
setInterval(updateStatus, 2000);

// Initial call so chart is not empty on load
updateStatus();
