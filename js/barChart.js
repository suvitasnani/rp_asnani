/* Fetch CSV temperature data and display via Chart.js 
Temperature values are differences from the mean of 14 deg-C.*/

async function getData() {
    const response = await fetch("data/plant_data.csv"); //.. moves up 1 folder level
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
        labels: data.conditions, // x-axis labels
        datasets: [{
            label: 'Average Change in Plant Length (cm)',
            data: data.avgChanges, // y-axis data
            backgroundColor: [
                "rgba(66, 133, 244, 0.2)",
                "rgba(234, 67, 53, 0.2)",
                "rgba(251, 188, 4, 0.2)",
                "rgba(52, 168, 83, 0.2)",
                "rgba(255, 109, 1, 0.2)"
            ],
            borderColor: [
                "rgba(66, 133, 244, 1)",
                "rgba(234, 67, 53, 1)",
                "rgba(251, 188, 4, 1)",
                "rgba(52, 168, 83, 1)",
                "rgba(255, 109, 1, 1)"
            ],
            borderWidth: 1
        }]
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
                          size: 18,
                          weight: 'bold'
                      },
                      color: '#black',
                  },
                  ticks: {
                      font: {
                          size: 14
                      }
                  },
                  grid: {
                      color: '#6c767e'
                  },
              },
              y: {
                  title: {
                      display: true,
                      text: 'Average Change in Plant Length (cm)',   // y-axis title
                      font: {         // font properties
                          size: 18,
                          weight: 'bold',
                      },
                      color: '#black',
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
                  text: 'Average Change in Plant Lengths (cm)',
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
                  display: false
              }
          }
      }
    });
}

createChart();
