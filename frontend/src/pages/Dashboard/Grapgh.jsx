// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const ApexChart = () => {
//   const [chartData] = useState({
//     series: [
//       {


//         name: "Total Duration",
//         data: [
//           { x: "00:00-02:00'", y: 1292, },
//           {x: "02:00-04:00",y: 4435},
//           {x: "04:00-06:00",y: 4432},
//  {x: "06:00-08:00",y:2321},
//  { x: "08:00-10:00", y: 1293, },
//  {x: "10:00-12:00",y: 4433},
// {x: "12:00-14:00",y:2323},
// { x: "14:00-16:00", y: 1294, },
// {x: "16:00-18:00",y: 4435},
// {x: "18:00-20:00",y: 4434},
// {x: "20:00-22:00",y:2324},
// { x: "22:00-00", y: 1295, },


//             // { x: "1", y: 4432, goals: [{ name: "Expected", value: 5400 }] }
//         ]
//       },
//       {
//         name: "Expected",
//         data: [
//           { x: "00:00-02:00'", y: 1292, },
//           {x: "02:00-04:00",y: 4435},
//           {x: "04:00-06:00",y: 4432},
//  {x: "06:00-08:00",y:2321},
//  { x: "08:00-10:00", y: 1293, },
//  {x: "10:00-12:00",y: 4433},
// {x: "12:00-14:00",y:2323},
// { x: "14:00-16:00", y: 1294, },
// {x: "16:00-18:00",y: 4435},
// {x: "18:00-20:00",y: 4434},
// {x: "20:00-22:00",y:2324},
// { x: "22:00-00", y: 1295, },
//         ]
//       },
//       {
//         name: "New", // Third series
//         data: [

//           { x: "00:00-02:00'", y: 1292, },
//           {x: "02:00-04:00",y: 4435},
//           {x: "04:00-06:00",y: 4432},
//  {x: "06:00-08:00",y:2321},
//  { x: "08:00-10:00", y: 1293, },
//  {x: "10:00-12:00",y: 4433},
// {x: "12:00-14:00",y:2323},
// { x: "14:00-16:00", y: 1294, },
// {x: "16:00-18:00",y: 4435},
// {x: "18:00-20:00",y: 4434},
// {x: "20:00-22:00",y:2324},
// { x: "22:00-00:00", y: 1295, },
//         ]
//       }
//     ],
//     options: {
//       chart: { height: 350, type: "bar" },
//       plotOptions: { bar: { columnWidth: "60%", grouped: true } },
//       colors: ["#00E396", "transparent", "transparent"], // Matching legend colors
//       // markers: { size: 5 },
//       dataLabels: { enabled: false },


//       // tooltip: {
//       //   shared: true, // Show all values in tooltip
//       //   intersect: false, // Ensures tooltip appears when hovering anywhere on the bar
//       //   y: {
//       //     formatter: (val) => `${val} units` // Customize tooltip text
//       //   }
//       // },
     
//       tooltip: {
//         shared: true,
//         intersect: false,
//         custom: function ({ series, dataPointIndex, w }) {
//           const tooltipColors = ["blue", "green", "purple"]; // Custom colors for tooltip markers
      
//           let tooltipHtml = `<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">`;
//           tooltipHtml += `<strong>${w.globals.labels[dataPointIndex]}</strong><br/>`;
          
//           series.forEach((s, i) => {
//             tooltipHtml += `
//               <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
//               <span style=" color: black;">${w.globals.seriesNames[i]}: ${s[dataPointIndex]} units</span> <br/>
//             `;
//           });
      
//           tooltipHtml += `</div>`;
//           return tooltipHtml;
//         }
//       },
      
      
//       legend: {
//         show: true,
//         customLegendItems: ["Actuals"], // Matches series
//         markers: { fillColors: ["#00E396", "transparent", "transparent"] },
     
//       },

// // Add custom CSS to change the marker to a circle
// chart: {
//   events: {
//     mounted: function (chart) {
//       const legendMarkers = document.querySelectorAll('.apexcharts-legend-series .apexcharts-legend-marker');
//       legendMarkers.forEach(marker => {
//         marker.style.width = '12px';
//         marker.style.height = '12px';
//         marker.style.borderRadius = '50%'; // Make it circular
//       });
//     }
//   }
// }
//     }
//   });
  
//   return (
//     <div id="chart">
//       <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
//     </div>
//   );
// };

// export default ApexChart;



// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const ApexChart = () => {
//   const [chartData] = useState({
//     series: [
//       {
//         name: "Car",
//         type: "bar",
//         data: [1292, 4435, 4432, 2321, 1293, 4433, 2323, 1294, 4435, 4434, 2324, 1295],
//       },
//       {
//         name: "Bus",
//         type: "bar",
//         data: [900, 3800, 4100, 2000, 1200, 4000, 2100, 1000, 4200, 4100, 2200, 1200],
//       },
//       {
//         name: "Van",
//         type: "bar",
//         data: [800, 3600, 4000, 1800, 1000, 3800, 1900, 900, 3900, 3800, 2000, 1100],
//       },
//       {
//         name: "Truck",
//         type: "bar",
//         data: [1000, 4200, 4300, 2200, 1400, 4300, 2300, 1200, 4400, 4300, 2400, 1300],
//       },
//       {
//         name: "Total Duration",
//         type: "bar", // Line chart to be above the bars
//         data: [3992, 16035, 16864, 8321, 4886, 16533, 8623, 4488, 16980, 16668, 8948, 4890],
//       },
//     ],
//     options: {
//       chart: { height: 350, type: "line", stacked: false },
//       plotOptions: { bar: { columnWidth: "50%" } },
//       stroke: { width: [0, 0, 0, 0, 3] }, // Line thickness for Total Duration
//       markers: { size: [0, 0, 0, 0, 5] }, // Marker for Total Duration
//       colors: ["transparent", "transparent", "transparent", "transparent", "#007bff"], // Custom colors
//       dataLabels: { enabled: false }, // Disable default data labels
//       xaxis: {
//         categories: [
//           "00:00-02:00", "02:00-04:00", "04:00-06:00", "06:00-08:00",
//           "08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00",
//           "16:00-18:00", "18:00-20:00", "20:00-22:00", "22:00-00:00"
//         ],
//       },
//       // tooltip: {
//       //   shared: true,
//       //   intersect: false,
//       //   custom: function({ series, dataPointIndex, w }) {
//       //     console.log("Data Point Index:", dataPointIndex);
//       //     console.log("Series Data:", series);
        
//       //     // The rest of your tooltip logic
//       //     const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"];
//       //     let tooltipHtml = `<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">`;
//       //     tooltipHtml += `<strong>${w.globals.labels[dataPointIndex]}</strong><br/>`;
        
//       //     series.forEach((s, i) => {
//       //       let formattedValue = i === series.length - 1 ? `${s[dataPointIndex]} mins` : s[dataPointIndex];
//       //       tooltipHtml += `
//       //         <span style="color: ${tooltipColors[i]}; font-size: 28px; line-height: 18px;">●</span>  
//       //         <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span> <br/>
//       //       `;
//       //     });
        
//       //     tooltipHtml += `</div>`;
        
//       //     console.log("X-Axis Labels:22222222222222222222222222", w.globals.labels); 

//       //     return tooltipHtml;
//       //   }
        
//       // },
 
//       //   shared: true,
//       //   intersect: false,
//       //   custom: function ({ series, dataPointIndex, w }) {
//       //     let tooltipHtml = `<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">`;
//       //     tooltipHtml += `<strong>${w.globals.labels[dataPointIndex]}</strong><br/>`;

//       //     series.forEach((s, i) => {
//       //       tooltipHtml += ` 
//       //         <span style="color: ${w.globals.colors[i]}; font-size: 18px; line-height: 18px;">●</span>  
//       //         <span style="color: black;">${w.globals.seriesNames[i]}: ${s[dataPointIndex]} units</span> <br/>
//       //       `;
//       //     });

//       //     tooltipHtml += `</div>`;
//       //     return tooltipHtml;
//       //   }
//       // },
     
     
//       tooltip: {
//         shared: true,
//         intersect: false,
//         custom: function({ series, seriesIndex, dataPointIndex, w }) {
//           console.log("Data Point Index:", dataPointIndex);
//           console.log("Series Data:", series);
      
//           // Fetch the X-axis label (time range)
//           let xLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];
      
//           const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"];
//           let tooltipHtml = `<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">`;
          
//           // Display X-axis value (time range)
//           tooltipHtml += `<strong style="color: #333;"> ${xLabel}</strong><br/>`;
      
//           series.forEach((s, i) => {
//             let formattedValue = i === series.length - 1 ? `${s[dataPointIndex]} mins` : s[dataPointIndex];
//             tooltipHtml += `
//               <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
//               <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span> <br/>
//             `;
//           });
      
//           tooltipHtml += `</div>`;
      
//           console.log("X-Axis Labels:", w.globals.categoryLabels); 
      
//           return tooltipHtml;
//         }
        
//       },
      
     
//       legend: { show: true },
//     },
//   });

//   return (
//     <div id="chart">
//       <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
//     </div>
//   );
// };

// export default ApexChart;


// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const ApexChart = () => {
//   const [chartData] = useState(() => {
//     // Original series data




    
//     const originalSeries = [
//       { name: "Car", type: "bar", data: [1292, 4435, 4432, 2321, 1293, 4433, 2323, 1294, 4435, 4434, 2324, 0] },
//       { name: "Bus", type: "bar", data: [900, 3800, 4100, 2000, 1200, 4000, 2100, 1000, 4200, 4100, 2200, 1200] },
//       { name: "Van", type: "bar", data: [800, 3600, 4000, 1800, 1000, 3800, 1900, 900, 3900, 3800, 2000, 1100] },
//       { name: "Truck", type: "bar", data: [1000, 4200, 4300, 2200, 1400, 4300, 2300, 1200, 4400, 4300, 2400, 1300] },
//       { name: "Total Duration", type: "bar", data: [3992, 16035, 16864, 8321, 4886, 16533, 8623, 4488, 16980, 16668, 8948, 4890] },
//     ];

    
//     // Filter out series where all data points are zero
//     const filteredSeries = originalSeries.filter(series => series.data.some(value => value !== 0));

//     return {
//       series: filteredSeries,
//       options: {
//         chart: { height: 350, type: "line", stacked: false },
//         plotOptions: { bar: { columnWidth: "50%" } },
//         stroke: { width: [0, 0, 0, 0, 3] }, // Line thickness for Total Duration
//         markers: { size: [0, 0, 0, 0, 5] }, // Marker for Total Duration
//         colors: ["transparent", "transparent", "transparent", "transparent", "#007bff"], // Custom colors
//         dataLabels: { enabled: false },
//         xaxis: {
//           categories: [
//             "00:00-02:00", "02:00-04:00", "04:00-06:00", "06:00-08:00",
//             "08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00",
//             "16:00-18:00", "18:00-20:00", "20:00-22:00", "22:00-00:00"
//           ],
//         },
//         tooltip: {
//         shared: true,
//         intersect: false,
//         custom: function({ series, seriesIndex, dataPointIndex, w }) {
//           console.log("Data Point Index:", dataPointIndex);
//           console.log("Series Data:", series);
      
//           // Fetch the X-axis label (time range)
//           let xLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];
      
//           const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"];
//           let tooltipHtml = `<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">`;
          
//           // Display X-axis value (time range)
//           tooltipHtml += `<strong style="color: #333;"> ${xLabel}</strong><br/>`;
      
//           series.forEach((s, i) => {
//             let formattedValue = i === series.length - 1 ? `${s[dataPointIndex]} mins` : s[dataPointIndex];
//             tooltipHtml += `
//               <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
//               <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span> <br/>
//             `;
//           });

          
      
//           tooltipHtml += `</div>`;
      
//           console.log("X-Axis Labels:", w.globals.categoryLabels); 
      
//           return tooltipHtml;
//         }
        
//       },
//         legend: { show: true },
//       },
//     };
//   });

//   return (
//     <div id="chart">
//       <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
//     </div>
//   );
// };

// export default ApexChart;





import React from 'react';
import ReactApexChart from 'react-apexcharts';




const SalesAnalyticsChart = ({trafficData}) => {

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
    ...vehicleTypes.map((vehicle) => {
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
    }).filter(Boolean), // Filter out null values (series with no data)
    {
        name: "Total Duration",
        type: "column",
        data: isSingleDay
        ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
            (timeSlot) =>
              trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration || 0
          )
        : dateKeys.map((date) => {
            // Get the pre-calculated daily average duration from the backend
            const dailyAverage = trafficData.dailyDurations[date]?.dailyAverageDuration;
      
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
        type: 'bar', // Updated to 'bar' for a bar chart
       
      },
 
      plotOptions: {
        bar: {
          columnWidth: '50%', // Adjust the width of the bars
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



    //   xaxis: {
    //     categories: [
    //       '00:00-02:00', '02:00-04:00', '04:00-06:00', '06:00-08:00',
    //       '08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00',
    //       '16:00-18:00', '18:00-20:00', '20:00-22:00', '22:00-00:00',
    //     ],
    //   },


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
    //   tooltip: {
    //             shared: true,
    //             intersect: false,
    //             custom: function({ series, seriesIndex, dataPointIndex, w }) {
    //               console.log("Data Point Index:", dataPointIndex);
    //               console.log("Series Data:", series);
              
    //               // Fetch the X-axis label (time range)
    //               let xLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];
              
    //             //   const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"];
               
    //             const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"]; // Blue color for "Total Duration"
    //             let tooltipHtml = `<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">`;
                  
    //               // Display X-axis value (time range)
    //               tooltipHtml += `<strong style="color: #333;"> ${xLabel}</strong><br/>`;
              

    //               series.forEach((s, i) => {
    //                 const value = s[dataPointIndex];
    //                 // Only display non-zero values
    //                 if (value !== 0) {
    //                   let formattedValue = i === series.length - 1 ? `${value} mins` : value;
    //                   tooltipHtml += `
    //                     <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //                     <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span> <br/>
    //                   `;
    //                 }
    //               })

    //             //   series.forEach((s, i) => {
    //             //     let formattedValue = i === series.length - 1 ? `${s[dataPointIndex]} mins` : s[dataPointIndex];
    //             //     tooltipHtml += `
    //             //       <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //             //       <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span> <br/>
    //             //     `;
    //             //   });
        
                  
              
    //               tooltipHtml += `</div>`;
              
    //               console.log("X-Axis Labels:1112222222222222222222222", w.globals.categoryLabels); 
              
    //               return tooltipHtml;
    //             },

    //         },

    // tooltip: {
    //     shared: true,
    //     intersect: false,
    //     custom: function({ series, seriesIndex, dataPointIndex, w }) {
    //       console.log("Data Point Index:", dataPointIndex);
    //       console.log("Series Data:", series);
      
    //       // Fetch the X-axis label (time range)
    //       let xLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];
      
    //       const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"]; // Blue color for "Total Duration"
    //       let tooltipHtml = `<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">`;
      
    //       // Display X-axis value (time range)
    //       tooltipHtml += `<strong style="color: #333;"> ${xLabel}</strong><br/>`;
      
    //       // Add vehicle info for each series in the tooltip
    //       series.forEach((s, i) => {
    //         const value = s[dataPointIndex];
    //         // Only display non-zero values
    //         if (value !== 0) {
    //           let formattedValue = i === series.length - 1 ? `${value} mins` : value;
              
    //           // Check for vehicles and their duration
    //           const vehicleData = trafficData.resultSameDate[dateKeys[0]]?.[xLabel]?.vehicles || [];
              
    //           vehicleData.forEach((vehicle, idx) => {
    //             if (vehicle.type && vehicle.duration > 0) {
    //               tooltipHtml += `
    //                 <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //                 <span style="color: black">${vehicle.type}${idx + 1} (Duration ${vehicle.duration})</span><br/>
    //               `;
    //             }
    //           });
      
    //           // Add the general series info
    //           tooltipHtml += `
    //             <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //             <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span> <br/>
    //           `;
    //         }
    //       });
      
    //       tooltipHtml += `</div>`;
      
    //       console.log("X-Axis Labels:", w.globals.categoryLabels);
      
    //       return tooltipHtml;
    //     },
    //   },
      
    
    // tooltip: {
    //     shared: true,
    //     intersect: false,
    //     custom: function({ series, seriesIndex, dataPointIndex, w }) {
    //       let xLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];
      
    //       // Tooltip color mapping
    //       const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"]; 
    //       let tooltipHtml = '<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">';
          
    //       // Display the X-axis value (time range)
    //       tooltipHtml += `<strong style="color: #333;">${xLabel}</strong><br/>`;
      
    //       // Loop through series and append values
    //       series.forEach((s, i) => {
    //         const value = s[dataPointIndex];
    //         if (value !== 0) {
    //           let formattedValue = i === series.length - 1 ? `${value} mins` : value;
      
    //           // Add vehicle type and duration
    //           if (dataPointIndex >= 0 && w.globals.seriesNames[i] === "Total Duration") {
    //             // Assuming you have the vehicle data for each time slot in the format (e.g., 'bus1 (duration 6)')
    //             const vehicleData = trafficData.resultSameDate[dateKeys[0]]?.[xLabel]?.vehicles || [];
    //             vehicleData.forEach((vehicle, idx) => {
    //               if (vehicle.type) {
    //                 const vehicleLabel = `${vehicle.type}${idx + 1} (Duration ${vehicle.duration})`;
    //                 tooltipHtml += `
    //                   <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //                   <span style="color: black">${vehicleLabel}</span><br/>
    //                 `;
    //               }
    //             });
    //           } else {
    //             tooltipHtml += `
    //               <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //               <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span><br/>
    //             `;
    //           }
    //         }
    //       });
      
    //       tooltipHtml += '</div>';
    //       return tooltipHtml;
    //     },
    //   },
    
    // // Single Day
    // tooltip: {
    //     shared: true,
    //     intersect: false,
    //     custom: function({ series, seriesIndex, dataPointIndex, w }) {
    //       let xLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];
      
    //       // Tooltip color mapping
    //       const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"];
    //       let tooltipHtml = '<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">';
      
    //       // Display the X-axis value (time range)
    //       tooltipHtml += `<strong style="color: #333;">${xLabel}</strong><br/>`;
      
    //       // Flag to check if vehicle data has been added already
    //       let vehicleDataAdded = false;
      
    //       // Keep track of separate vehicle type indices (car, van, etc.)
    //       const vehicleTypeIndices = {
    //         car: 1,
    //         van: 1,
    //         bus :1
    //       };
      
    //       // Store the vehicles already shown to avoid repeating them
    //       const shownVehicles = new Set();
      
    //       // Loop through series and append values
    //       series.forEach((s, i) => {
    //         const value = s[dataPointIndex];
    //         if (value !== 0) {
    //           let formattedValue = i === series.length - 1 ? `${value} mins` : value;
      
    //           // Add vehicle data only once
    //           if (!vehicleDataAdded) {
    //             // Add vehicle data for this time slot (only once for each tooltip)
    //             const vehicleData = trafficData.resultSameDate[dateKeys[0]]?.[xLabel]?.vehicles || [];
    //             vehicleData.forEach((vehicle) => {
    //               if (vehicle.type && !shownVehicles.has(vehicle.type + vehicleTypeIndices[vehicle.type])) {
    //                 // Increment the index for each vehicle type
    //                 if (vehicle.type === "car") {
    //                   tooltipHtml += `
    //                     <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //                     <span style="color: black">${vehicle.type}${vehicleTypeIndices.car} (Duration ${vehicle.duration})</span><br/>
    //                   `;
    //                   shownVehicles.add(vehicle.type + vehicleTypeIndices.car); // Mark this vehicle as shown
    //                   vehicleTypeIndices.car += 1; // Increment car index
    //                 } else if (vehicle.type === "van") {
    //                   tooltipHtml += `
    //                     <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //                     <span style="color: black">${vehicle.type}${vehicleTypeIndices.van} (Duration ${vehicle.duration})</span><br/>
    //                   `;
    //                   shownVehicles.add(vehicle.type + vehicleTypeIndices.van); // Mark this vehicle as shown
    //                   vehicleTypeIndices.van += 1; // Increment van index
    //                 }else if (vehicle.type === "bus") { // Handle bus similarly
    //                     tooltipHtml += `
    //                       <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //                       <span style="color: black">${vehicle.type}${vehicleTypeIndices.bus} (Duration ${vehicle.duration})</span><br/>
    //                     `;
    //                     shownVehicles.add(vehicle.type + vehicleTypeIndices.bus); // Mark bus as shown
    //                     vehicleTypeIndices.bus += 1; // Increment bus index
    //                   }
    //               }
    //             });
      
    //             vehicleDataAdded = true; // Mark vehicle data as added
    //           }
      
    //           // Add the general series info (total duration)
    //           tooltipHtml += `
    //             <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //             <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span><br/>
    //           `;
    //         }
    //       });
      
    //       tooltipHtml += '</div>';
    //       return tooltipHtml;
    //     },
    //   },
      
    //   //Mutiple  Day
    // tooltip: {
    //     shared: true,
    //     intersect: false,
    //     custom: function({ series, seriesIndex, dataPointIndex, w }) {
    //         let xLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];
    
    //         // Tooltip color mapping
    //         const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"];
    //         let tooltipHtml = '<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">';
    
    //         // Display the X-axis value (time range)
    //         tooltipHtml += `<strong style="color: #333;">${xLabel}</strong><br/>`;
    
    //         // Flag to check if vehicle data has been added already
    //         let vehicleDataAdded = false;
    
    //         // Store the vehicles and their total durations across all days
    //         const vehicleDurations = {};
    
    //         // Loop through all days and accumulate vehicle durations for each vehicle type
    //         Object.values(trafficData).forEach(dayData => {
    //             const vehicles = dayData?.[xLabel]?.vehicles || [];
    //             vehicles.forEach(vehicle => {
    //                 if (vehicleDurations[vehicle.type]) {
    //                     vehicleDurations[vehicle.type] += vehicle.duration;
    //                 } else {
    //                     vehicleDurations[vehicle.type] = vehicle.duration;
    //                 }
    //             });
    //         });
    
    //         // Loop through vehicle data and display in the tooltip
    //         Object.keys(vehicleDurations).forEach((vehicleType, i) => {
    //             const totalDuration = vehicleDurations[vehicleType];
    //             tooltipHtml += 
    //                 `<span style="color: ${tooltipColors[i % tooltipColors.length]}; font-size: 18px; line-height: 18px;">●</span>  
    //                 <span style="color: black">${vehicleType}: ${totalDuration} mins</span><br/>`;
    //         });
    
    //         // Add the general series info (total duration for the selected range)
    //         series.forEach((s, i) => {
    //             const value = s[dataPointIndex];
    //             if (value !== 0) {
    //                 let formattedValue = i === series.length - 1 ? `${value} mins` : value;
    //                 tooltipHtml += 
    //                     `<span style="color: ${tooltipColors[i % tooltipColors.length]}; font-size: 18px; line-height: 18px;">●</span>  
    //                     <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span><br/>`;
    //             }
    //         });
    
    //         tooltipHtml += '</div>';
    //         return tooltipHtml;
    //     },
    // },
    


    // tooltip: {
    //     shared: true,
    //     intersect: false,
    //     custom: function({ series, seriesIndex, dataPointIndex, w }) {
    //         let xLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];
    
    //         // Tooltip color mapping
    //         const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"];
    //         let tooltipHtml = '<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">';
    
    //         // Display the X-axis value (time range)
    //         tooltipHtml += `<strong style="color: #333;">${xLabel}</strong><br/>`;
    
    //         // Check if we are dealing with a single day or multiple days
    //         const isSingleDay = dateKeys.length === 1;
    
    //         // Flag to check if vehicle data has been added already
    //         let vehicleDataAdded = false;
    
    //         // If it's a single day, show the first tooltip
    //         if (isSingleDay) {
    //             // Keep track of separate vehicle type indices (car, van, bus, etc.)
    //             const vehicleTypeIndices = {
    //                 car: 1,
    //                 van: 1,
    //                 bus: 1
    //             };
    
    //             // Store the vehicles already shown to avoid repeating them
    //             const shownVehicles = new Set();
    

                
    //             // Loop through series and append values
    //             series.forEach((s, i) => {
    //                 const value = s[dataPointIndex];
    //                 if (value !== 0) {
    //                     let formattedValue = i === series.length - 1 ? `${value} mins` : value;
    
    //                     // Add vehicle data only once
    //                     if (!vehicleDataAdded) {
    //                         // Add vehicle data for this time slot (only once for each tooltip)
    //                         const vehicleData = trafficData.resultSameDate[dateKeys[0]]?.[xLabel]?.vehicles || [];
    //                         vehicleData.forEach((vehicle) => {
    //                             if (vehicle.type && !shownVehicles.has(vehicle.type + vehicleTypeIndices[vehicle.type])) {
    //                                 // Increment the index for each vehicle type
    //                                 if (vehicle.type === "car") {
    //                                     tooltipHtml += `
    //                                         <span style="color:red; font-size: 18px; line-height: 18px;">●</span>  
    //                                         <span style="color: black"> ${vehicle.type} : ${vehicle.duration} mins</span><br/>
    //                                     `;
    //                                     shownVehicles.add(vehicle.type + vehicleTypeIndices.car); // Mark this vehicle as shown
    //                                     vehicleTypeIndices.car += 1; // Increment car index
    //                                 } else if (vehicle.type === "van") {
    //                                     tooltipHtml += `
    //                                         <span style="color:red; font-size: 18px; line-height: 18px;">●</span>  
    //                                         <span style="color: black"> ${vehicle.type} : ${vehicle.duration} mins</span><br/>
    //                                     `;
    //                                     shownVehicles.add(vehicle.type + vehicleTypeIndices.van); // Mark this vehicle as shown
    //                                     vehicleTypeIndices.van += 1; // Increment van index
    //                                 } else if (vehicle.type === "bus") { // Handle bus similarly
    //                                     tooltipHtml += `
    //                                         <span style="color:red; font-size: 18px; line-height: 18px;">●</span>  
    //                                         <span style="color: black"> ${vehicle.type} : ${vehicle.duration} mins</span><br/>
    //                                     `;
    //                                     shownVehicles.add(vehicle.type + vehicleTypeIndices.bus); // Mark bus as shown
    //                                     vehicleTypeIndices.bus += 1; // Increment bus index
    //                                 }
    //                             }
    //                         });
    
    //                         vehicleDataAdded = true; // Mark vehicle data as added
    //                     }
    
    //                     // Add the general series info (total duration)
    //                     tooltipHtml += `
    //                         <span style="color: ${tooltipColors[i]}; font-size: 18px; line-height: 18px;">●</span>  
    //                         <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span><br/>
    //                     `;
    //                 }
    //             });
    
    //         } else {
    //             // If it's multiple days, show the second tooltip
                
    //             const vehicleDurations = {};
    
    //             // Loop through all days and accumulate vehicle durations for each vehicle type
    //             Object.values(trafficData).forEach(dayData => {
    //                 const vehicles = dayData?.[xLabel]?.vehicles || [];
    //                 vehicles.forEach(vehicle => {
    //                     if (vehicleDurations[vehicle.type]) {
    //                         vehicleDurations[vehicle.type] += vehicle.duration;
    //                     } else {
    //                         vehicleDurations[vehicle.type] = vehicle.duration;
    //                     }
    //                 });
    //             });
    
    //             // Loop through vehicle data and display in the tooltip
    //             Object.keys(vehicleDurations).forEach((vehicleType, i) => {
    //                 const totalDuration = vehicleDurations[vehicleType];
    //                 tooltipHtml += `
    //                     <span style="color: red; font-size: 18px; line-height: 18px;">●</span>  
    //                     <span style="color: black">${vehicleType}: ${totalDuration} mins</span><br/>
    //                 `;
    //             });
    
    //             // Add the general series info (total duration for the selected range)
    //             series.forEach((s, i) => {
    //                 const value = s[dataPointIndex];
    //                 if (value !== 0) {
    //                     let formattedValue = i === series.length - 1 ? `${value} mins` : value;
    //                     tooltipHtml += `
    //                         <span style="color: ${tooltipColors[i % tooltipColors.length]}; font-size: 18px; line-height: 18px;">●</span>  
    //                         <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span><br/>
    //                     `;
    //                 }
    //             });
    //         }
    
    //         tooltipHtml += '</div>';
    //         return tooltipHtml;
    //     },
    // },
    

    tooltip: {
        shared: true,
        intersect: false,
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
            let xLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];
        
            // Tooltip color mapping using colorMapping
            const colorMapping = {
                car: "#d9534f", // Red
                truck: "#5bc0de", // Blue
                bus: "#f0ad4e", // Yellow
                van: "#5cb85c", // Green
                motorbike: "#9370DB", // Purple
                totalDuration: "#007bff", // Blue
            };
    
            let tooltipHtml = '<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">';
        
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
                    motorbike: 1
                };
        
                // Store the vehicles already shown to avoid repeating them
                const shownVehicles = new Set();
        
                // Loop through series and append values
                series.forEach((s, i) => {
                    const value = s[dataPointIndex];
                    if (value !== 0) {
                        let formattedValue = i === series.length - 1 ? `${value} mins` : value;
        
                        // Add vehicle data only once
                        if (!vehicleDataAdded) {
                            // Add vehicle data for this time slot (only once for each tooltip)
                            const vehicleData = trafficData.resultSameDate[dateKeys[0]]?.[xLabel]?.vehicles || [];
                            vehicleData.forEach((vehicle) => {
                                if (vehicle.type && !shownVehicles.has(vehicle.type + vehicleTypeIndices[vehicle.type])) {
                                    // Increment the index for each vehicle type
                                    const vehicleColor = colorMapping[vehicle.type]; // Get the color from colorMapping
                                    tooltipHtml += `
                                        <span style="color:${vehicleColor}; font-size: 18px; line-height: 18px;">●</span>  
                                        <span style="color: black"> ${vehicle.type} : ${vehicle.duration} mins</span><br/>
                                    `;
                                    shownVehicles.add(vehicle.type + vehicleTypeIndices[vehicle.type]); // Mark this vehicle as shown
                                    vehicleTypeIndices[vehicle.type] += 1; // Increment the vehicle type index
                                }
                            });
        
                            vehicleDataAdded = true; // Mark vehicle data as added
                        }
        
                        // Add the general series info (total duration)
                        const seriesName = w.globals.seriesNames[i];
                        const color = i === series.length - 1 ? colorMapping.totalDuration : colorMapping[seriesName.toLowerCase()];
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
                Object.values(trafficData).forEach(dayData => {
                    const vehicles = dayData?.[xLabel]?.vehicles || [];
                    vehicles.forEach(vehicle => {
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
                        let formattedValue = i === series.length - 1 ? `${value} mins` : value;
                        const color = i === series.length - 1 ? colorMapping.totalDuration : colorMapping[w.globals.seriesNames[i].toLowerCase()];
                        tooltipHtml += `
                            <span style="color: ${color}; font-size: 18px; line-height: 18px;">●</span>  
                            <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span><br/>
                        `;
                    }
                });
            }
        
            tooltipHtml += '</div>';
            return tooltipHtml;
        },
    },
    
      legend: {
        show: true,
        customLegendItems: ["Total Duration"],
      },
    //   markers: {
    //     // fillColors: [ 'transparent', 'transparent', 'transparent', 'transparent', 'transparent', '#007bff'], // Ensure the same colors as the tooltip
    //     // fillColors: [
    //     //     '#d9534f', '#d9534f', '#d9534f', '#d9534f', '#d9534f', '#007bff', // Custom colors for each series
    //     //   ], 
        // fillColors: ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"], // Ensure the same colors as the tooltip
     

    // },

// Add custom CSS to change the marker to a circle
chart: {
  events: {
    mounted: function (chart) {
      const legendMarkers = document.querySelectorAll('.apexcharts-legend-series .apexcharts-legend-marker');
      legendMarkers.forEach(marker => {
        marker.style.width = '12px';
        marker.style.height = '12px';
        marker.style.borderRadius = '50%'; 
        marker.style.color = "#007bff";
        // Make it circular
      });
    }
  }
},

    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default SalesAnalyticsChart;






const data1 = 
{
  "dailyDurations": {
      "2025-01-22": {
          "00:00-02:00": {
              "totalDuration": 0,
              "durations": [],
              "cost": 0
          },
          "02:00-04:00": {
              "totalDuration": 8,
              "durations": [
                  8
              ],
              "cost": 40
          },
          "04:00-06:00": {
              "totalDuration": 0,
              "durations": [],
              "cost": 0
          },
          "06:00-08:00": {
              "totalDuration": 0,
              "durations": [],
              "cost": 0
          },
          "08:00-10:00": {
              "totalDuration": 0,
              "durations": [],
              "cost": 0
          },
          "10:00-12:00": {
              "totalDuration": 0,
              "durations": [],
              "cost": 0
          },
          "12:00-14:00": {
              "totalDuration": 0,
              "durations": [],
              "cost": 0
          },
          "14:00-16:00": {
              "totalDuration": 0,
              "durations": [],
              "cost": 0
          },
          "16:00-18:00": {
              "totalDuration": 0,
              "durations": [],
              "cost": 0
          },
          "18:00-20:00": {
              "totalDuration": 0,
              "durations": [],
              "cost": 0
          },
          "20:00-22:00": {
              "totalDuration": 0,
              "durations": [],
              "cost": 0
          },
          "22:00-00:00": {
              "totalDuration": 10,
              "durations": [
                  10
              ],
              "cost": 50
          },
          "dailyAverageDuration": 9
      }
  },
  "resultSameDate": {
      "2025-01-22": {
          "00:00-02:00": {
              "total": 0,
              "car": 0,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "02:00-04:00": {
              "total": 1,
              "car": 1,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "04:00-06:00": {
              "total": 0,
              "car": 0,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "06:00-08:00": {
              "total": 0,
              "car": 0,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "08:00-10:00": {
              "total": 0,
              "car": 0,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "10:00-12:00": {
              "total": 0,
              "car": 0,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "12:00-14:00": {
              "total": 0,
              "car": 0,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "14:00-16:00": {
              "total": 0,
              "car": 0,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "16:00-18:00": {
              "total": 0,
              "car": 0,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "18:00-20:00": {
              "total": 0,
              "car": 0,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "20:00-22:00": {
              "total": 0,
              "car": 0,
              "truck": 0,
              "bus": 0,
              "van": 0,
              "motorbike": 0
          },
          "22:00-00:00": {
              "total": 1,
              "car": 0,
              "truck": 0,
              "bus": 1,
              "van": 0,
              "motorbike": 0
          }
      }
  },
}

const  data2 = 
  {
    "dailyDurations": {
        "2025-01-21": {
            "00:00-02:00": {
                "totalDuration": 6,
                "durations": [
                    6
                ],
                "cost": 30
            },
            "02:00-04:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "04:00-06:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "06:00-08:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "08:00-10:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "10:00-12:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "12:00-14:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "14:00-16:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "16:00-18:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "18:00-20:00": {
                "totalDuration": 13.5,
                "durations": [
                    20,
                    7
                ],
                "cost": 67.5
            },
            "20:00-22:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "22:00-00:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "dailyAverageDuration": 6.5
        },
        "2025-01-22": {
            "00:00-02:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "02:00-04:00": {
                "totalDuration": 8,
                "durations": [
                    8
                ],
                "cost": 40
            },
            "04:00-06:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "06:00-08:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "08:00-10:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "10:00-12:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "12:00-14:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "14:00-16:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "16:00-18:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "18:00-20:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "20:00-22:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "22:00-00:00": {
                "totalDuration": 10,
                "durations": [
                    10
                ],
                "cost": 50
            },
            "dailyAverageDuration": 9
        },
        "2025-01-23": {
            "00:00-02:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "02:00-04:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "04:00-06:00": {
                "totalDuration": 15,
                "durations": [
                    15
                ],
                "cost": 75
            },
            "06:00-08:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "08:00-10:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "10:00-12:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "12:00-14:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "14:00-16:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "16:00-18:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "18:00-20:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "20:00-22:00": {
                "totalDuration": 39,
                "durations": [
                    39
                ],
                "cost": 195
            },
            "22:00-00:00": {
                "totalDuration": 0,
                "durations": [],
                "cost": 0
            },
            "dailyAverageDuration": 27
        }
    },
    "resultSameDate": {
        "2025-01-21": {
            "total": 3,
            "car": 1,
            "truck": 0,
            "bus": 1,
            "van": 1,
            "motorbike": 0
        },
        "2025-01-22": {
            "total": 2,
            "car": 1,
            "truck": 0,
            "bus": 1,
            "van": 0,
            "motorbike": 0
        },
        "2025-01-23": {
            "total": 2,
            "car": 1,
            "truck": 0,
            "bus": 0,
            "van": 1,
            "motorbike": 0
        }
    },
  
}