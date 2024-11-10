/* Fetch CSV temperature data and display via Chart.js 
Temperature values are differences from the mean of 14 deg-C.*/

async function getData() {
    const response = await fetch("../data/plant-data.csv"); //.. moves up 1 folder level
    const data = await response.text(); // CSV in text format
  
    const conditions = []; // x-axis labels
    const avgChanges = []; // y-axis average changes
  
    const table = data.split("\n").slice(1); // Start from first index and go all the way to the end
  
    table.forEach((row) => {
      const columns = row.split(","); // split row into columns using commas
      const condition = columns[0].trim(); // assign condition value
      conditions.push(condition); // push condition values into conditions array
  
      const avgChange = parseFloat(columns[1]); // average change value
      avgChanges.push(avgChange);
    });
    return { conditions, avgChanges }; // return multiple values as an object
}
  
async function createChart() {
    const data = await getData(); // wait for getData() to send data for formatted chart
    const barChart = document.getElementById("barChart");

    const myChart = new Chart(barChart, {
        type: "bar",
        data: {
          labels: data.conditions,
          datasets: [
            {
              label: data.conditions[0],
              data: [data.avgChanges[0], null, null, null, null], // Only first value shown
              backgroundColor: "rgba(66, 133, 244, 0.2)",
              borderColor: "rgba(66, 133, 244, 1)",
              borderWidth: 1,
            },
            {
              label: data.conditions[1],
              data: [null, data.avgChanges[1], null, null, null], // Only second value shown
              backgroundColor: "rgba(234, 67, 53, 0.2)",
              borderColor: "rgba(234, 67, 53, 1)",
              borderWidth: 1,
            },
            {
              label: data.conditions[2],
              data: [null, null, data.avgChanges[2], null, null], // Only third value shown
              backgroundColor: "rgba(251, 188, 4, 0.2)",
              borderColor: "rgba(251, 188, 4, 1)",
              borderWidth: 1,
            },
            {
              label: data.conditions[3],
              data: [null, null, null, data.avgChanges[3], null], // Only fourth value shown
              backgroundColor: "rgba(52, 168, 83, 0.2)",
              borderColor: "rgba(52, 168, 83, 1)",
              borderWidth: 1,
            },
            {
              label: data.conditions[4],
              data: [null, null, null, null, data.avgChanges[4]], // Only fifth value shown
              backgroundColor: "rgba(255, 109, 1, 0.2)",
              borderColor: "rgba(255, 109, 1, 1)",
              borderWidth: 1,
            }
          ]
        },
      options: {
          responsive: true,            // re-size based on screen size
          maintainAspectRatio: false,
          scales: {                   // display options for x & y axes
              x: {
                  title: {
                      display: true,
                      text: 'Condition',   // x-axis title
                      font: {         // font properties
                          size: 14
                      },
                  },
                  ticks: {
                      font: {
                          size: 14
                      }
                  },
                  grid: {
                      color: '#6c767e'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Average Change in Plant Length (cm)',   // y-axis title
                      font: {         // font properties
                          size: 14
                      },
                  },
                  ticks: {
                      font: {
                          size: 14
                      }
                  },
                  grid: {
                      color: '#6c767e'
                  }
              }
          },
          plugins: {      // Display options for title and legend
              title: {
                  display:true,     // display chart title
                  text: 'Average Change in Plant Length by Condition',
                  font: {
                      size: 24,
                  },
                  color: '#black',
                  padding: {
                      top: 10,
                      bottom: 30
                  }
              },
              legend: {
                  align: 'start',
                  position: 'bottom',
              }
          }
      }
    });
}

createChart();