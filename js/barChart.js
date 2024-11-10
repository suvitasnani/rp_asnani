/* Fetch CSV temperature data and display via Chart.js 
Temperature values are differences from the mean of 14 deg-C.*/

async function getData() {
    const response = await fetch("../data/global-mean-temp.csv"); //.. moves up 1 folder level
    const data = await response.text(); // CSV in text format
  
    //console.log(data);
  
    const conditions = []; // x-axis labels
    const avgChanges = []; // y-axis average changes
  
    // \n - new line character
    // split('\n') - separate the table into an array of individual rows
    // slice(start, end) - return a new array starting at index start up to but not including 'end'
  
    const table = data.split("\n").slice(1); // Start from first index and go all the way to the end
  
    //console.log(table);
  
    table.forEach((row) => {
      const columns = row.split(","); // split row into columns using commas
      const condition = columns[0].trim(); // assign condition value
      conditions.push(condition); // push condition values into conditions array
  
      const avgChange = parseFloat(columns[1]); // average change value
      avgChanges.push(avgChange);
  
      //console.log(condition, avgChange);
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
        datasets: [
          {
            label: 'Average Change in Plant Length (cm)',
            data: data.avgChanges,
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
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
                      text: 'Groups',   // x-axis title
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
                      }
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
                  align: 'start',
                  position: 'bottom',
              }
          }
      }
    });
}

createChart();