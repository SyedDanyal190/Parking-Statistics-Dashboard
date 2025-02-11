import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesAnalyticsChart = ({ trafficData }) => {
  const dateKeys = Object.keys(trafficData.resultSameDate);

  const vehicleTypes = ["car", "truck", "bus", "van", "motorbike"];

  // Check if we are dealing with a single day or multiple days
  const isSingleDay = dateKeys.length === 1;

  const colorMapping = {
    car: "#d9534f", // Red
    truck: "#5bc0de", // Blue
    bus: "#f0ad4e", // Yellow
    van: "#5cb85c", // Green
    motorbike: "#9370DB", // Purple
    totalDuration: "#007bff", // Blue
  };

  const filteredSeries = [
    ...vehicleTypes
      .map((vehicle) => {
        const vehicleData = isSingleDay
          ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
              (timeSlot) =>
                trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
            )
          : dateKeys.map(
              (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
            );
        // Only add the series if the data for that vehicle exists and is > 0
        if (vehicleData.some((value) => value > 0)) {
          return {
            name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
            type: "column", // This sets the chart type to "column" (bar/column chart)
            data: vehicleData,
            color: "transparent", // Make vehicle bars invisible (transparent)
            tooltip: { enabled: false }, // Disable vehicle bar tooltip
          };
        }
        return null; // Don't add the series if no data exists for this vehicle
      })
      .filter(Boolean), // Filter out null values (series with no data)
    {
      name: "Total Duration",
      type: "column",
      data: isSingleDay
        ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
            (timeSlot) =>
              trafficData.dailyDurations[dateKeys[0]][timeSlot]
                ?.totalDuration || 0
          )
        : dateKeys.map((date) => {
            // Get the pre-calculated daily average duration from the backend
            const dailyAverage =
              trafficData.dailyDurations[date]?.dailyAverageDuration;

            // Return the daily average if it exists, or null if no valid duration
            return dailyAverage > 0 ? dailyAverage : null;
          }),
      color: colorMapping.totalDuration, // This sets the color of the total duration bar
    },
  ];

  const chartData = {
    series: filteredSeries,
    options: {
      chart: {
        height: 350,
        type: "bar", // Updated to 'bar' for a bar chart
      },

      plotOptions: {
        bar: {
          columnWidth: "50%", // Adjust the width of the bars
        },
      },

      stroke: {
        width: 1, // Adjust stroke width if needed for bar chart
      },
      //   colors: [
      //     '#d9534f', '#d9534f', '#d9534f', '#d9534f', '#d9534f', '#007bff', // Custom colors for each series
      //   ],
      // colors: ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"], // Ensure the same colors as the tooltip

      dataLabels: {
        enabled: false,
      },

      xaxis: {
        categories: isSingleDay
          ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {})
          : dateKeys,
        type: "category",
      },
      yaxis: [
        {
          title: { text: "Total Duration" },
          min: 0,
          labels: {
            formatter: (value) => `${Math.round(value)} mins`, // Round value before adding " mins"
          },
        },
      ],

      tooltip: {
        shared: true,
        intersect: false,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          let xLabel =
            w.globals.categoryLabels[dataPointIndex] ||
            w.globals.labels[dataPointIndex];

          // Tooltip color mapping using colorMapping
          const colorMapping = {
            car: "#d9534f", // Red
            truck: "#5bc0de", // Blue
            bus: "#f0ad4e", // Yellow
            van: "#5cb85c", // Green
            motorbike: "#9370DB", // Purple
            totalDuration: "#007bff", // Blue
          };

          let tooltipHtml =
            '<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">';

          // Display the X-axis value (time range)
          tooltipHtml += `<strong style="color: #333;">${xLabel}</strong><br/>`;

          // Check if we are dealing with a single day or multiple days
          const isSingleDay = dateKeys.length === 1;

          // Flag to check if vehicle data has been added already
          let vehicleDataAdded = false;

          // If it's a single day, show the first tooltip
          if (isSingleDay) {
            // Keep track of separate vehicle type indices (car, van, bus, etc.)
            const vehicleTypeIndices = {
              car: 1,
              truck: 1,
              van: 1,
              bus: 1,
              motorbike: 1,
            };

            // Store the vehicles already shown to avoid repeating them
            const shownVehicles = new Set();

            // Loop through series and append values
            series.forEach((s, i) => {
              const value = s[dataPointIndex];
              if (value !== 0) {
                let formattedValue =
                  i === series.length - 1 ? `${value} mins` : value;

                // Add vehicle data only once
                if (!vehicleDataAdded) {
                  // Add vehicle data for this time slot (only once for each tooltip)
                  const vehicleData =
                    trafficData.resultSameDate[dateKeys[0]]?.[xLabel]
                      ?.vehicles || [];
                  vehicleData.forEach((vehicle) => {
                    if (
                      vehicle.type &&
                      !shownVehicles.has(
                        vehicle.type + vehicleTypeIndices[vehicle.type]
                      )
                    ) {
                      // Increment the index for each vehicle type
                      const vehicleColor = colorMapping[vehicle.type]; // Get the color from colorMapping
                      tooltipHtml += `
                                        <span style="color:${vehicleColor}; font-size: 18px; line-height: 18px;">●</span>  
                                        <span style="color: black"> ${vehicle.type} : ${vehicle.duration} mins</span><br/>
                                    `;
                      shownVehicles.add(
                        vehicle.type + vehicleTypeIndices[vehicle.type]
                      ); // Mark this vehicle as shown
                      vehicleTypeIndices[vehicle.type] += 1; // Increment the vehicle type index
                    }
                  });

                  vehicleDataAdded = true; // Mark vehicle data as added
                }

                // Add the general series info (total duration)
                const seriesName = w.globals.seriesNames[i];
                const color =
                  i === series.length - 1
                    ? colorMapping.totalDuration
                    : colorMapping[seriesName.toLowerCase()];
                tooltipHtml += `
                            <span style="color: ${color}; font-size: 18px; line-height: 18px;">●</span>  
                            <span style="color: black">${seriesName}: ${formattedValue}</span><br/>
                        `;
              }
            });
          } else {
            // If it's multiple days, show the second tooltip
            const vehicleDurations = {};

            // Loop through all days and accumulate vehicle durations for each vehicle type
            Object.values(trafficData).forEach((dayData) => {
              const vehicles = dayData?.[xLabel]?.vehicles || [];
              vehicles.forEach((vehicle) => {
                if (vehicleDurations[vehicle.type]) {
                  vehicleDurations[vehicle.type] += vehicle.duration;
                } else {
                  vehicleDurations[vehicle.type] = vehicle.duration;
                }
              });
            });

            // Loop through vehicle data and display in the tooltip
            Object.keys(vehicleDurations).forEach((vehicleType) => {
              const totalDuration = vehicleDurations[vehicleType];
              const vehicleColor = colorMapping[vehicleType]; // Get the color from colorMapping
              tooltipHtml += `
                        <span style="color: ${vehicleColor}; font-size: 18px; line-height: 18px;">●</span>  
                        <span style="color: black">${vehicleType}: ${totalDuration} mins</span><br/>
                    `;
            });

            // Add the general series info (total duration for the selected range)
            series.forEach((s, i) => {
              const value = s[dataPointIndex];
              if (value !== 0) {
                let formattedValue =
                  i === series.length - 1 ? `${value} mins` : value;
                const color =
                  i === series.length - 1
                    ? colorMapping.totalDuration
                    : colorMapping[w.globals.seriesNames[i].toLowerCase()];
                tooltipHtml += `
                            <span style="color: ${color}; font-size: 18px; line-height: 18px;">●</span>  
                            <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span><br/>
                        `;
              }
            });
          }

          tooltipHtml += "</div>";
          return tooltipHtml;
        },
      },

      legend: {
        // show: true,
        customLegendItems: ["Total Duration"],
      },

      chart: {
        events: {
          mounted: function (chart) {
            const legendMarkers = document.querySelectorAll(
              ".apexcharts-legend-series .apexcharts-legend-marker"
            );
            legendMarkers.forEach((marker) => {
              marker.style.width = "12px";
              marker.style.height = "12px";
              marker.style.borderRadius = "50%";
              marker.style.color = "#007bff";
              // Make it circular
            });
          },
        },
      },
    },
  };

  return (
    <div>
      <h1>Parking Data Visualization</h1>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default SalesAnalyticsChart;
