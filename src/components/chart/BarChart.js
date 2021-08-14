import { Bar } from 'react-chartjs-2';

function Chart(props) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        cornerRadius: 4,
        backgroundColor: "rgb(229, 231, 235)",
        titleColor: "#000000",
        bodyColor: '#000000',
        bodySpacing: 10,
        titleAlign: 'center',
        callbacks: {
          title: function (tooltipItems, data) {
            return tooltipItems.label;
          },
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              let time = Number(context.parsed.y);
              let [hours, minutes] = [Math.floor(time), Math.round((time % 1) * 60)];

              label += hours + 'h ' + minutes + 'm';
            }
            return label;
          }
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        }, 
        stacked: true,
        ticks: {
          padding: -2,
          callback: function (val, index) {
            return this.getLabelForValue(val).split(";")[0];
          }
        },
      },

      x2: {
        grid: {
          display: false,
          borderWidth: 0,
        },

        ticks: {
          padding: -2,
          callback: function (val, index) {
            return this.getLabelForValue(val).split(";")[1];
          }
        },
      },
      y: {
        grid: {
          borderWidth: 0,
        },
        stacked: true,
        ticks: {
          callback: function (value, index, values) {
            return value + ' h';
          }
        }
      },
    }
  }

  return (
    <div className="flex w-full -ml-2 items-center">
      <Bar data={props.data} options={options} />
    </div>
  );
}

export default Chart;