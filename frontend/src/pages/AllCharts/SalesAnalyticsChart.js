import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesAnalyticsChart = ({ trafficData }) => {
  const dateKeys = Object.keys(trafficData.resultSameDate);

  const vehicleTypes = ["car", "truck", "bus", "van", "motorbike"];

  const colorMapping = {
    car: "#d9534f", // Red
    truck: "#5bc0de", // Blue
    bus: "#f0ad4e", // Yellow
    van: "#5cb85c", // Green
    motorbike: "#9370DB", // Purple
    totalDuration: "#007bff", // Blue
  };

  // Check if we are dealing with a single day or multiple days
  const isSingleDay = dateKeys.length === 1;


  // // Generate data for vehicle types
  // const chartSeries = vehicleTypes.map((vehicle) => ({
  //   name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
  //   type: "column",
  //   data: isSingleDay
  //     ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
  //         (timeSlot) =>
  //           trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
  //       )
  //     : dateKeys.map(
  //         (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
  //       ),
  //   color: colorMapping[vehicle],
  // }));

  // // Generate data for total duration
  // const totalDurationSeries = {
  //   name: "Total Duration",
  //   type: "line",
  //   data: isSingleDay
  //     ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
  //         (timeSlot) =>
  //           trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration ||
  //           0
  //       )
  //     : dateKeys.map((date) =>
  //         Object.values(trafficData.dailyDurations[date] || {}).reduce(
  //           (sum, slot) => sum + (slot.totalDuration || 0),
  //           0
  //         )
  //       ),
  //   color: colorMapping.totalDuration,
    
  // };

// Generate data for vehicle types
// const chartSeries = vehicleTypes.map((vehicle) => ({
//   name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
//   type: "column", // This sets the chart type to "column" (bar/column chart)
//   data: isSingleDay
//     ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
//         (timeSlot) =>
//           trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
//       )
//     : dateKeys.map(
//         (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
//       ),
//   color: colorMapping[vehicle], // This sets the color of each vehicle type
// }));



// Generate data for total duration (as a bar)
// const totalDurationSeries = {
//   name: "Total Duration",
//   type: "column", // This sets the chart type to "column" (bar/column chart)
//   data: isSingleDay
//     ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
//         (timeSlot) =>
//           trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration ||
//           0
//       )
//     : dateKeys.map((date) =>
//         Object.values(trafficData.dailyDurations[date] || {}).reduce(
//           (sum, slot) => sum + (slot.totalDuration || 0),
//           0
//         )
//       ),
//   color: colorMapping.totalDuration, // This sets the color of the total duration bar
// };



// // Generate data for total duration (as a bar)
// const totalDurationSeries = {
//   name: "Total Duration",
//   type: "column", // This sets the chart type to "column" (bar/column chart)
//   data: isSingleDay
//     ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
//         (timeSlot) =>
//           trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration ||
//           0
//       )
//     : dateKeys.map((date) =>
//         Object.values(trafficData.dailyDurations[date] || {}).reduce(
//           (sum, slot) => sum + (slot.totalDuration || 0),
//           0
//         )
//       ),
//   color: colorMapping.totalDuration, // This sets the color of the total duration bar
// };

// Add totalDurationSeries to chartSeries
// const chartSeries = [totalDurationSeries];




  
  // Add totalDurationSeries to chartSeries
  // chartSeries.push(totalDurationSeries);

  // Chart configuration
  // const chartOptions = {
  //   chart: {
  //     height: 338,
  //     type: "line",
  //     stacked: false,
  //     toolbar: { show: false },
  //   },
  //   stroke: { width: [1, 1, 1, 2], curve: "smooth" },
  //   xaxis: {
  //     categories: isSingleDay ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}) : dateKeys,
  //     type: "category",
  //   },
  //   yaxis: [{ title: { text: "Total Duration" }, min: 0 }],
  //   tooltip: { shared: true, intersect: false },
  //   grid: {
  //     borderColor: "#f1f1f1",
  //     padding: { bottom: 15, left: 100, right: 90 },
  //   },
  // };

  // const chartOptions = {
  //   chart: {
  //     height: 338,
  //     type: "line",
  //     stacked: false,
  //     toolbar: { show: false },
  //   },
  //   stroke: { width: [1, 1, 1, 2], curve: "smooth" },
  //   xaxis: {
  //     categories: isSingleDay
  //       ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {})
  //       : dateKeys,
  //     type: "category",
  //   },
  //   // yaxis: [
  //   //   {
  //   //     title: { text: "Total Duration" },
  //   //     min: 0,
  //   //   },
  //   // ],

  //   // yaxis: [
  //   //   {
  //   //     title: { text: "Total Duration" },
  //   //     min: 0,
  //   //     labels: {
  //   //       formatter: (value) => `${value} mins`, // Append " mins" only for total duration values
  //   //     },
  //   //   },
  //   // ],

  //   yaxis: [
  //     {
  //       title: { text: "Total Duration" },
  //       min: 0,
  //       labels: {
  //         formatter: (value) => `${Math.round(value)} mins`, // Round value before adding " mins"
  //       },
  //     },
  //   ],

  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: {
  //       formatter: (value, { seriesIndex }) => {
  //         // Append " mins" only to the total duration (last series)
  //         return seriesIndex === chartSeries.length - 1
  //           ? `${value} mins`
  //           : value;
  //       },
  //     },
  //   },
  //   grid: {
  //     borderColor: "#f1f1f1",
  //     padding: { bottom: 15, left: 100, right: 90 },
  //   },
    
  // };



  
  



  // const chartSeries = [

  //   // Add the vehicle data series only for tooltip, but don't display the bars for them
  //   ...vehicleTypes.map((vehicle) => ({
  //     name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
  //     type: "column", // This sets the chart type to "column" (bar/column chart)
  //     data: isSingleDay
  //       ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
  //           (timeSlot) =>
  //             trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
  //         )
  //       : dateKeys.map(
  //           (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
  //         ),
  //     color: "transparent", // Make vehicle bars invisible (transparent)
  //     tooltip: { enabled: false }, // Disable vehicle bar tooltip
  //   })),
  //   {
  //     name: "Total Duration",
  //     type: "column", // This sets the chart type to "column" (bar/column chart)
  //     data: isSingleDay
  //       ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
  //           (timeSlot) =>
  //             trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration ||
  //             0
  //         )
  //       : dateKeys.map((date) =>
  //           Object.values(trafficData.dailyDurations[date] || {}).reduce(
  //             (sum, slot) => sum + (slot.totalDuration || 0),
  //             0
  //           )
  //         ),
        
  //     color: colorMapping.totalDuration, // This sets the color of the total duration bar
  //   },

  // ];
  
  // // Chart options for displaying total duration as a bar chart and vehicles only in tooltip
  // const chartOptions = {
  //   chart: {
  //     height: 338,
  //     type: "column", // We are using column type for bar chart display
  //     stacked: false,
  //     toolbar: { show: false },
  //   },
  //   stroke: { width: [2], curve: "smooth" },
  //   xaxis: {
  //     categories: isSingleDay
  //       ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}) // Time slots for a single day
  //       : dateKeys, // Date keys for multiple days
  //     type: "category",
  //   },
  //   yaxis: [
  //     {
  //       title: { text: "Duration & Vehicles" },
  //       min: 0,
  //       labels: {
  //         formatter: (value) => `${Math.round(value)} mins`, // Format the total duration as minutes
  //       },
  //     },
  //   ],
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: {
  //       formatter: (value, { seriesIndex, series }) => {
  //         if (seriesIndex === 0) {
  //           return `${value} mins`; // Show total duration for the first series (index 0)
  //         }
  //         // Show vehicle values in the tooltip for the corresponding series
  //         return `${series[seriesIndex].name}: ${value}`;
  //       },
  //     },
  //     // Custom styling to remove any unwanted underlining or styling in the tooltip
  //     style: {
  //       textDecoration: "none",  // Removes any underline
  //       fontWeight: "normal",    // Makes sure the font is normal
  //       fontSize: "14px",        // You can adjust the font size if necessary
  //     },
  //   },
  //   grid: {
  //     borderColor: "#f1f1f1",
  //     padding: { bottom: 15, left: 100, right: 90 },
  //   },
  // };
  // const chartSeries = [
  //   // Add the vehicle data series only for tooltip, but don't display the bars for them
  //   ...vehicleTypes.map((vehicle) => ({
  //     name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
  //     type: "column", // This sets the chart type to "column" (bar/column chart)
  //     data: isSingleDay
  //       ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
  //           (timeSlot) => {
  //             const value = trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0;
  //             return value > 0 ? value : null; // Only show data greater than 0, else hide it
  //           }
  //         )
  //       : dateKeys.map((date) => {
  //           const value = trafficData.resultSameDate[date]?.[vehicle] || 0;
  //           return value > 0 ? value : null; // Only show data greater than 0, else hide it
  //         }),
  //     color: "transparent", // Make vehicle bars invisible (transparent)
  //     tooltip: { enabled: false }, // Disable vehicle bar tooltip
  //   })),
  //   {
  //     name: "Total Duration",
  //     type: "column", // This sets the chart type to "column" (bar/column chart)
  //     data: isSingleDay
  //       ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
  //           (timeSlot) => {
  //             const value = trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration || 0;
  //             return value > 0 ? value : null; // Only show data greater than 0, else hide it
  //           }
  //         )
  //       : dateKeys.map((date) => {
  //           const totalDuration = Object.values(trafficData.dailyDurations[date] || {}).reduce(
  //             (sum, slot) => sum + (slot.totalDuration || 0),
  //             0
  //           );
  //           return totalDuration > 0 ? totalDuration : null; // Only show data greater than 0, else hide it
  //         }),
  //     color: colorMapping.totalDuration, // This sets the color of the total duration bar
  //   },
  // ];
  



  const chartSeries = [
    // Add the vehicle data series only if there is data and the value > 0
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
  


    // ...vehicleTypes.map((vehicle) => {
    //   const vehicleData = isSingleDay
    //     ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
    //         (timeSlot) =>
    //           trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
    //       )
    //     : dateKeys.map(
    //         (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
    //       );
    
    //   return {
    //     name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
    //     type: "column", // This sets the chart type to "column" (bar/column chart)
    //     data: vehicleData,
    //     color: "transparent", // Make vehicle bars invisible (transparent)
    //     tooltip: { enabled: false }, // Disable vehicle bar tooltip
    //   };
    // }),
    




    // The Total Duration series will always be shown, regardless of data
    {
      name: "Total Duration",
      type: "column", // This sets the chart type to "column" (bar/column chart)
      // data: isSingleDay
      //   ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
      //       (timeSlot) =>
      //         trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration ||
      //         0
      //     )
      //   : dateKeys.map((date) => {
      //       const totalDuration = Object.values(trafficData.dailyDurations[date] || {}).reduce(
      //         (sum, slot) => sum + (slot.totalDuration || 0),
      //         0
      //       );
      //       return totalDuration > 0 ? totalDuration : null; // Return null if no total duration (bar won't show)
      //     }),

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
  

  const chartOptions = {
    chart: {
      height: 338,
      type: "line",
      stacked: false,
      toolbar: { show: false },
    },
    stroke: { width: [1, 1, 1, 2], curve: "smooth" },
    xaxis: {
      categories: isSingleDay
        ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {})
        
        : dateKeys,
      type: "category",
    },
  
    // xaxis: {
    //   categories: isSingleDay
    //     ? ["00:00-02:00", "02:00-04:00", "04:00-06:00", "06:00-08:00", "08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-20:00", "20:00-22:00", "22:00-00:00"]
    //     : dateKeys,
    //   type: "category",
    // },
    yaxis: [
      {
        title: { text: "Total Duration" },
        min: 0,
        labels: {
          formatter: (value) => `${Math.round(value)} mins`, // Round value before adding " mins"
        },
      },
    ],
    // tooltip: {
    //   shared: true,
    //   intersect: false,
    //   y: {
    //     formatter: (value, { seriesIndex }) => {
    //       // Append " mins" only to the total duration (first series)
    //       return seriesIndex === 0 ? `${value} mins` : value;
    //     },
    //   },
    // },

    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value, { seriesIndex }) => {
          return seriesIndex === chartSeries.length - 1 ? `${value} mins` : value;
        },
      },
    },
    
    grid: {
      borderColor: "#f1f1f1",
      // padding: { bottom: 15, left: 10, right: 10 },
      padding: isSingleDay
      ? { bottom: 15, left: 60, right: 60 }
      : { bottom: 15, left: 100, right: 170 },
    },
    legend: {
      show: true,
      customLegendItems: ["Total Duration"],
      labels: {
        colors: ["#007bff"], // Manually set color for legend text
      },
      markers: {
        fillColors: ["#007bff"], // Set the legend marker color
      },
    },
    
      
    };
    // console.log(chartOptions);
    console.log("trafficData.resultSameDate:", trafficData.resultSameDate);
    console.log("dateKeys:", dateKeys);
    

  return (
    <div>
      <h1>Parking Data Visualization</h1>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={338}
      />
    </div>
  );
};

export default SalesAnalyticsChart;














