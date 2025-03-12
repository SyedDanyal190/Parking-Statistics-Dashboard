// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const SalesAnalyticsChart = ({ trafficData }) => {
//   console.log("Data received:", trafficData);


//   const dateKeys = Object.keys(trafficData.resultSameDate);

//   const vehicleTypes = ["car", "truck", "bus", "van", "motorbike"];

//   const colorMapping = {
//     car: "#d9534f", // Red
//     truck: "#5bc0de", // Blue
//     bus: "#f0ad4e", // Yellow
//     van: "#5cb85c", // Green
//     motorbike: "#9370DB", // Purple
//     totalDuration: "#007bff", // Blue
//   };

//   // Check if we are dealing with a single day or multiple days
//   const isSingleDay = dateKeys.length === 1;


//   // // Generate data for vehicle types
//   // const chartSeries = vehicleTypes.map((vehicle) => ({
//   //   name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
//   //   type: "column",
//   //   data: isSingleDay
//   //     ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
//   //         (timeSlot) =>
//   //           trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
//   //       )
//   //     : dateKeys.map(
//   //         (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
//   //       ),
//   //   color: colorMapping[vehicle],
//   // }));

//   // // Generate data for total duration
//   // const totalDurationSeries = {
//   //   name: "Total Duration",
//   //   type: "line",
//   //   data: isSingleDay
//   //     ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
//   //         (timeSlot) =>
//   //           trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration ||
//   //           0
//   //       )
//   //     : dateKeys.map((date) =>
//   //         Object.values(trafficData.dailyDurations[date] || {}).reduce(
//   //           (sum, slot) => sum + (slot.totalDuration || 0),
//   //           0
//   //         )
//   //       ),
//   //   color: colorMapping.totalDuration,
    
//   // };

// // Generate data for vehicle types
// // const chartSeries = vehicleTypes.map((vehicle) => ({
// //   name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
// //   type: "column", // This sets the chart type to "column" (bar/column chart)
// //   data: isSingleDay
// //     ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
// //         (timeSlot) =>
// //           trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
// //       )
// //     : dateKeys.map(
// //         (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
// //       ),
// //   color: colorMapping[vehicle], // This sets the color of each vehicle type
// // }));



// // Generate data for total duration (as a bar)
// // const totalDurationSeries = {
// //   name: "Total Duration",
// //   type: "column", // This sets the chart type to "column" (bar/column chart)
// //   data: isSingleDay
// //     ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
// //         (timeSlot) =>
// //           trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration ||
// //           0
// //       )
// //     : dateKeys.map((date) =>
// //         Object.values(trafficData.dailyDurations[date] || {}).reduce(
// //           (sum, slot) => sum + (slot.totalDuration || 0),
// //           0
// //         )
// //       ),
// //   color: colorMapping.totalDuration, // This sets the color of the total duration bar
// // };



// // // Generate data for total duration (as a bar)
// // const totalDurationSeries = {
// //   name: "Total Duration",
// //   type: "column", // This sets the chart type to "column" (bar/column chart)
// //   data: isSingleDay
// //     ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
// //         (timeSlot) =>
// //           trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration ||
// //           0
// //       )
// //     : dateKeys.map((date) =>
// //         Object.values(trafficData.dailyDurations[date] || {}).reduce(
// //           (sum, slot) => sum + (slot.totalDuration || 0),
// //           0
// //         )
// //       ),
// //   color: colorMapping.totalDuration, // This sets the color of the total duration bar
// // };

// // Add totalDurationSeries to chartSeries
// // const chartSeries = [totalDurationSeries];




  
//   // Add totalDurationSeries to chartSeries
//   // chartSeries.push(totalDurationSeries);

//   // Chart configuration
//   // const chartOptions = {
//   //   chart: {
//   //     height: 338,
//   //     type: "line",
//   //     stacked: false,
//   //     toolbar: { show: false },
//   //   },
//   //   stroke: { width: [1, 1, 1, 2], curve: "smooth" },
//   //   xaxis: {
//   //     categories: isSingleDay ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}) : dateKeys,
//   //     type: "category",
//   //   },
//   //   yaxis: [{ title: { text: "Total Duration" }, min: 0 }],
//   //   tooltip: { shared: true, intersect: false },
//   //   grid: {
//   //     borderColor: "#f1f1f1",
//   //     padding: { bottom: 15, left: 100, right: 90 },
//   //   },
//   // };

//   // const chartOptions = {
//   //   chart: {
//   //     height: 338,
//   //     type: "line",
//   //     stacked: false,
//   //     toolbar: { show: false },
//   //   },
//   //   stroke: { width: [1, 1, 1, 2], curve: "smooth" },
//   //   xaxis: {
//   //     categories: isSingleDay
//   //       ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {})
//   //       : dateKeys,
//   //     type: "category",
//   //   },
//   //   // yaxis: [
//   //   //   {
//   //   //     title: { text: "Total Duration" },
//   //   //     min: 0,
//   //   //   },
//   //   // ],

//   //   // yaxis: [
//   //   //   {
//   //   //     title: { text: "Total Duration" },
//   //   //     min: 0,
//   //   //     labels: {
//   //   //       formatter: (value) => `${value} mins`, // Append " mins" only for total duration values
//   //   //     },
//   //   //   },
//   //   // ],

//   //   yaxis: [
//   //     {
//   //       title: { text: "Total Duration" },
//   //       min: 0,
//   //       labels: {
//   //         formatter: (value) => `${Math.round(value)} mins`, // Round value before adding " mins"
//   //       },
//   //     },
//   //   ],

//   //   tooltip: {
//   //     shared: true,
//   //     intersect: false,
//   //     y: {
//   //       formatter: (value, { seriesIndex }) => {
//   //         // Append " mins" only to the total duration (last series)
//   //         return seriesIndex === chartSeries.length - 1
//   //           ? `${value} mins`
//   //           : value;
//   //       },
//   //     },
//   //   },
//   //   grid: {
//   //     borderColor: "#f1f1f1",
//   //     padding: { bottom: 15, left: 100, right: 90 },
//   //   },
    
//   // };



  
  



//   // const chartSeries = [

//   //   // Add the vehicle data series only for tooltip, but don't display the bars for them
//   //   ...vehicleTypes.map((vehicle) => ({
//   //     name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
//   //     type: "column", // This sets the chart type to "column" (bar/column chart)
//   //     data: isSingleDay
//   //       ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
//   //           (timeSlot) =>
//   //             trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
//   //         )
//   //       : dateKeys.map(
//   //           (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
//   //         ),
//   //     color: "transparent", // Make vehicle bars invisible (transparent)
//   //     tooltip: { enabled: false }, // Disable vehicle bar tooltip
//   //   })),
//   //   {
//   //     name: "Total Duration",
//   //     type: "column", // This sets the chart type to "column" (bar/column chart)
//   //     data: isSingleDay
//   //       ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
//   //           (timeSlot) =>
//   //             trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration ||
//   //             0
//   //         )
//   //       : dateKeys.map((date) =>
//   //           Object.values(trafficData.dailyDurations[date] || {}).reduce(
//   //             (sum, slot) => sum + (slot.totalDuration || 0),
//   //             0
//   //           )
//   //         ),
        
//   //     color: colorMapping.totalDuration, // This sets the color of the total duration bar
//   //   },

//   // ];
  
//   // // Chart options for displaying total duration as a bar chart and vehicles only in tooltip
//   // const chartOptions = {
//   //   chart: {
//   //     height: 338,
//   //     type: "column", // We are using column type for bar chart display
//   //     stacked: false,
//   //     toolbar: { show: false },
//   //   },
//   //   stroke: { width: [2], curve: "smooth" },
//   //   xaxis: {
//   //     categories: isSingleDay
//   //       ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}) // Time slots for a single day
//   //       : dateKeys, // Date keys for multiple days
//   //     type: "category",
//   //   },
//   //   yaxis: [
//   //     {
//   //       title: { text: "Duration & Vehicles" },
//   //       min: 0,
//   //       labels: {
//   //         formatter: (value) => `${Math.round(value)} mins`, // Format the total duration as minutes
//   //       },
//   //     },
//   //   ],
//   //   tooltip: {
//   //     shared: true,
//   //     intersect: false,
//   //     y: {
//   //       formatter: (value, { seriesIndex, series }) => {
//   //         if (seriesIndex === 0) {
//   //           return `${value} mins`; // Show total duration for the first series (index 0)
//   //         }
//   //         // Show vehicle values in the tooltip for the corresponding series
//   //         return `${series[seriesIndex].name}: ${value}`;
//   //       },
//   //     },
//   //     // Custom styling to remove any unwanted underlining or styling in the tooltip
//   //     style: {
//   //       textDecoration: "none",  // Removes any underline
//   //       fontWeight: "normal",    // Makes sure the font is normal
//   //       fontSize: "14px",        // You can adjust the font size if necessary
//   //     },
//   //   },
//   //   grid: {
//   //     borderColor: "#f1f1f1",
//   //     padding: { bottom: 15, left: 100, right: 90 },
//   //   },
//   // };
//   // const chartSeries = [
//   //   // Add the vehicle data series only for tooltip, but don't display the bars for them
//   //   ...vehicleTypes.map((vehicle) => ({
//   //     name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
//   //     type: "column", // This sets the chart type to "column" (bar/column chart)
//   //     data: isSingleDay
//   //       ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
//   //           (timeSlot) => {
//   //             const value = trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0;
//   //             return value > 0 ? value : null; // Only show data greater than 0, else hide it
//   //           }
//   //         )
//   //       : dateKeys.map((date) => {
//   //           const value = trafficData.resultSameDate[date]?.[vehicle] || 0;
//   //           return value > 0 ? value : null; // Only show data greater than 0, else hide it
//   //         }),
//   //     color: "transparent", // Make vehicle bars invisible (transparent)
//   //     tooltip: { enabled: false }, // Disable vehicle bar tooltip
//   //   })),
//   //   {
//   //     name: "Total Duration",
//   //     type: "column", // This sets the chart type to "column" (bar/column chart)
//   //     data: isSingleDay
//   //       ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
//   //           (timeSlot) => {
//   //             const value = trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration || 0;
//   //             return value > 0 ? value : null; // Only show data greater than 0, else hide it
//   //           }
//   //         )
//   //       : dateKeys.map((date) => {
//   //           const totalDuration = Object.values(trafficData.dailyDurations[date] || {}).reduce(
//   //             (sum, slot) => sum + (slot.totalDuration || 0),
//   //             0
//   //           );
//   //           return totalDuration > 0 ? totalDuration : null; // Only show data greater than 0, else hide it
//   //         }),
//   //     color: colorMapping.totalDuration, // This sets the color of the total duration bar
//   //   },
//   // ];
  



//   const chartSeries = [
//     // Add the vehicle data series only if there is data and the value > 0
//     ...vehicleTypes.map((vehicle) => {
//       const vehicleData = isSingleDay
//         ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
//             (timeSlot) =>
//               trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
//           )
//         : dateKeys.map(
//             (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
//           );
  
  
  

    
//       // Only add the series if the data for that vehicle exists and is > 0
//       if (vehicleData.some((value) => value > 0)) {
//         return {
//           name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
//           type: "column", // This sets the chart type to "column" (bar/column chart)
//           data: vehicleData,
//           color: "transparent", // Make vehicle bars invisible (transparent)
//           tooltip: { enabled: false }, // Disable vehicle bar tooltip
//         };
//       }
//       return null; // Don't add the series if no data exists for this vehicle
//     }).filter(Boolean), // Filter out null values (series with no data)
  


//     // ...vehicleTypes.map((vehicle) => {
//     //   const vehicleData = isSingleDay
//     //     ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
//     //         (timeSlot) =>
//     //           trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
//     //       )
//     //     : dateKeys.map(
//     //         (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
//     //       );
    
//     //   return {
//     //     name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
//     //     type: "column", // This sets the chart type to "column" (bar/column chart)
//     //     data: vehicleData,
//     //     color: "transparent", // Make vehicle bars invisible (transparent)
//     //     tooltip: { enabled: false }, // Disable vehicle bar tooltip
//     //   };
//     // }),
    




//     // The Total Duration series will always be shown, regardless of data
//     {
//       name: "Total Duration",
//       type: "column", // This sets the chart type to "column" (bar/column chart)
//       // data: isSingleDay
//       //   ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
//       //       (timeSlot) =>
//       //         trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration ||
//       //         0
//       //     )
//       //   : dateKeys.map((date) => {
//       //       const totalDuration = Object.values(trafficData.dailyDurations[date] || {}).reduce(
//       //         (sum, slot) => sum + (slot.totalDuration || 0),
//       //         0
//       //       );
//       //       return totalDuration > 0 ? totalDuration : null; // Return null if no total duration (bar won't show)
//       //     }),

//       data: isSingleDay
//       ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
//           (timeSlot) =>
//             trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration || 0
//         )
//       : dateKeys.map((date) => {
//           // Get the pre-calculated daily average duration from the backend
//           const dailyAverage = trafficData.dailyDurations[date]?.dailyAverageDuration;
    
//           // Return the daily average if it exists, or null if no valid duration
//           return dailyAverage > 0 ? dailyAverage : null;
//         }),
    

//       color: colorMapping.totalDuration, // This sets the color of the total duration bar
//     },
//   ];
  

//   // const chartOptions = {
//   //   chart: {
//   //     height: 338,
//   //     type: "line",
//   //     stacked: false,
//   //     toolbar: { show: false },
//   //   },
//   //   stroke: { width: [1, 1, 1, 2], curve: "smooth" },
//   //   xaxis: {
//   //     categories: isSingleDay
//   //       ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {})
        
//   //       : dateKeys,
//   //     type: "category",
//   //   },
  
//   //   // xaxis: {
//   //   //   categories: isSingleDay
//   //   //     ? ["00:00-02:00", "02:00-04:00", "04:00-06:00", "06:00-08:00", "08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-20:00", "20:00-22:00", "22:00-00:00"]
//   //   //     : dateKeys,
//   //   //   type: "category",
//   //   // },
//   //   yaxis: [
//   //     {
//   //       title: { text: "Total Duration" },
//   //       min: 0,
//   //       labels: {
//   //         formatter: (value) => `${Math.round(value)} mins`, // Round value before adding " mins"
//   //       },
//   //     },
//   //   ],
//   //   // tooltip: {
//   //   //   shared: true,
//   //   //   intersect: false,
//   //   //   y: {
//   //   //     formatter: (value, { seriesIndex }) => {
//   //   //       // Append " mins" only to the total duration (first series)
//   //   //       return seriesIndex === 0 ? `${value} mins` : value;
//   //   //     },
//   //   //   },
//   //   // },

//   //   // tooltip: {
//   //   //   shared: true,
//   //   //   intersect: false,
//   //   //   y: {
//   //   //     formatter: (value, { seriesIndex }) => {
//   //   //       return seriesIndex === chartSeries.length - 1 ? `${value} mins` : value;
//   //   //     },
//   //   //   },
//   //   // },
    



//   //   tooltip: {
//   //     shared: true,
//   //     intersect: false,
//   //     custom: function ({ series, dataPointIndex, w }) {


//   //       const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e","#5cb85c","#007bff"]; // Custom tooltip colors
    
//   //       let tooltipHtml = `<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">`;
//   //       tooltipHtml += `<strong>${w.globals.labels[dataPointIndex]}</strong><br/>`;
    
//   //       series.forEach((s, i) => {
//   //         let formattedValue = i === series.length - 1 ? `${s[dataPointIndex]} mins` : s[dataPointIndex];
    
//   //         tooltipHtml += `
//   //           <span style="color: ${tooltipColors[i]}; font-size: 28px; line-height: 18px;">●</span>  
//   //           <span style=" color:black">${w.globals.seriesNames[i]}: ${formattedValue}</span> <br/>
//   //         `;
//   //       });
    
//   //       tooltipHtml += `</div>`;
//   //       return tooltipHtml;
//   //     }
//   //   },
    



//   //   grid: {
//   //     borderColor: "#f1f1f1",
//   //     // padding: { bottom: 15, left: 10, right: 10 },
//   //     padding: isSingleDay
//   //     ? { bottom: 15, left: 70, right: 70 }
//   //     : { bottom: 15, left: 100, right: 170 },
//   //   },
//   //   legend: {
//   //     show: true,
//   //     customLegendItems: ["Total Duration"],
//   //     labels: {
//   //       colors: ["#007bff", "red", "yellow"], // Manually set color for legend text
//   //     },
//   //     markers: { fillColors: ["#007bff", "red", "yellow"] }

//   //     // markers: {
//   //     //   fillColors: ["#007bff"], // Set the legend marker color
//   //     // },
//   //   },
    
      
//   //   };
//     // console.log(chartOptions);
    
    
//     const chartOptions = {
//       chart: {
//         height: 338,
//         type: "line",
//         stacked: false,
//         toolbar: { show: false },
//       },
//       stroke: { width: [1, 1, 1, 2], curve: "smooth" },
//       xaxis: {
//         categories: isSingleDay
//           ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {})
//           : dateKeys,
//         type: "category",
//       },
//       yaxis: [
//         {
//           title: { text: "Total Duration" },
//           min: 0,
//           labels: {
//             formatter: (value) => `${Math.round(value)} mins`, // Round value before adding " mins"
//           },
//         },
//       ],
//       tooltip: {
//         shared: true,
//         intersect: false,
//         custom: function({ series, dataPointIndex, w }) {
//           console.log("Data Point Index:", dataPointIndex);
//           console.log("Series Data:", series);
        

//           // Fetch the X-axis label (time range)
//           let xLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex];

//           // The rest of your tooltip logic
//           const tooltipColors = ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"];
//           let tooltipHtml = `<div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">`;
//           // tooltipHtml += `<strong>${w.globals.labels[dataPointIndex]}</strong><br/>`;
        
//   // Display X-axis value (time range)
//   tooltipHtml += `<strong style="color: #333;"> ${xLabel}</strong><br/>`;

//           series.forEach((s, i) => {
//             let formattedValue = i === series.length - 1 ? `${s[dataPointIndex]} mins` : s[dataPointIndex];
//             tooltipHtml += `
//               <span style="color: ${tooltipColors[i]}; font-size: 28px; line-height: 18px;">●</span>  
//               <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span> <br/>
//             `;
//           });
        
//           tooltipHtml += `</div>`;
        
//           console.log("X-Axis Labels:22222222222222222222222222", w.globals.labels); 

//           return tooltipHtml;
//         }
        
//       },
      
//       grid: {
//         borderColor: "#f1f1f1",
//         padding: isSingleDay
//           ? { bottom: 15, left: 70, right: 70 }
//           : { bottom: 15, left: 100, right: 170 },
//       },
//       legend: {
//         show: true,
//         customLegendItems: ["Total Duration"],
//         labels: {
//           colors: ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"], // Ensure the same colors as the tooltip
//         },
//         markers: {
//           fillColors: ["#d9534f", "#5bc0de", "#f0ad4e", "#5cb85c", "#007bff"], // Ensure the same colors as the tooltip
//         }
//       },
//     };
    
    
//     console.log("trafficData.resultSameDate:", trafficData.resultSameDate);
//     console.log("dateKeys:", dateKeys);



//   return (
//     <div>
//       <h1>Parking Data Visualization</h1>
//       <ReactApexChart
//         options={chartOptions}
//         series={chartSeries}
//         type="line"
//         height={338}
//       />
//     </div>
//   );
// };

// export default SalesAnalyticsChart;













import React from 'react';
import ReactApexChart from "react-apexcharts";



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
          color: "transparent",  // Apply color from colorMapping
     
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
          color: colorMapping.totalDuration,  // Apply color for the total duration series
          marker: {
            show: true,
            
            radius: 10, // This makes the marker circular
            fillColor: colorMapping.totalDuration, // This will color the marker based on total duration color
          },
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

                      let roundedValue = Math.round(value * 100) / 100; // Rounds to 2 decimal places
                      let formattedValue = Number.isInteger(roundedValue) ? roundedValue : roundedValue.toFixed(2);
                      

// Ensure "mins" is added only for the last series item
formattedValue = i === series.length - 1 ? `${formattedValue} mins` : formattedValue;

                        //  formattedValue = i === series.length - 1 ? `${value} mins` : value;
        
                        // Add vehicle data only once
                        if (!vehicleDataAdded) {
                            // Add vehicle data for this time slot (only once for each tooltip)
                            const vehicleData = trafficData.resultSameDate[dateKeys[0]]?.[xLabel]?.vehicles || [];
                            vehicleData.forEach((vehicle) => {
                                if (vehicle.type && !shownVehicles.has(vehicle.type + vehicleTypeIndices[vehicle.type])) {
                                    // Increment the index for each vehicle type
                                    const vehicleColor = colorMapping[vehicle.type]; // Get the color from colorMapping
                                      // <span style="color: black"> ${vehicle.type} : ${vehicle.avgDuration} avgDuration</span><br/>
                                    tooltipHtml += `
                                        <span style="color:${vehicleColor}; font-size: 18px; line-height: 18px;">●</span>  
                                         <span style="color: black"> ${vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} : ${vehicle.avgDuration} mins</span><br/>

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



                        if(seriesName === "Total Duration"){

                        tooltipHtml += `
                            <span style="color: ${color}; font-size: 18px; line-height: 18px;">●</span>  
                            <span style="color: black">${seriesName}: ${formattedValue}</span><br/>
                        `;
                        }
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
                            vehicleDurations[vehicle.type] += vehicle.avgDuration;
                        } else {
                            vehicleDurations[vehicle.type] = vehicle.avgDuration;
                        }
                    });
                });
        
                // Loop through vehicle data and display in the tooltip
                Object.keys(vehicleDurations).forEach((vehicleType) => {
                    const totalDuration = vehicleDurations[vehicleType];
                    const vehicleColor = colorMapping[vehicleType]; // Get the color from colorMapping

                    // <span style="color: black"> ${vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} : ${vehicle.avgDuration} Avg.Duration</span><br/>   
//                    <span style="color: black">${vehicleType}: ${totalDuration} avgDuration</span><br/>
                    tooltipHtml += `
                        <span style="color: ${vehicleColor}; font-size: 18px; line-height: 18px;">●</span>  
                        <span style="color: black"> ${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)} : ${totalDuration} mins</span><br/>
                    `;
                });
        
                // Add the general series info (total duration for the selected range)
                series.forEach((s, i) => {
                    const value = s[dataPointIndex];
                    if (value !== 0) {
           
                        
                      let roundedValue = Math.round(value * 100) / 100; // Rounds to 2 decimal places
                      let formattedValue = Number.isInteger(roundedValue) ? roundedValue : roundedValue.toFixed(2);                   
    // Ensure "mins" is added only for the last series item
   formattedValue = i === series.length - 1 ? `${formattedValue} mins` : formattedValue;
                        
             // let formattedValue = i === series.length - 1 ? `${value} mins` : value;
                        

                        const seriesName = w.globals.seriesNames[i];
                        const color = i === series.length - 1 ? colorMapping.totalDuration : colorMapping[w.globals.seriesNames[i].toLowerCase()];

                        if(seriesName === "Total Duration"){


                        tooltipHtml += `
                            <span style="color: ${color}; font-size: 18px; line-height: 18px;">●</span>  
                            <span style="color: black">${w.globals.seriesNames[i]}: ${formattedValue}</span><br/>
                        `;
                        }
                      }
                });
            }
        
            tooltipHtml += '</div>';
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

// other chart options...



    },
  };

  // console.log("filtered Data",filteredSeries);
  // console.log("chartdTAA series Data",chartData);
  
  return (

   


    <div >
    <h1>Parking Data Visualization</h1>
       <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
   </div>
  );
};

export default SalesAnalyticsChart;






