




// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const SalesAnalyticsChart = ({ trafficData }) => {
//   // Ensure trafficData exists and is structured as expected
//   if (!trafficData || !trafficData.resultSameDate) {
//     return <p>No traffic data available</p>;
//   }

// console.log("TrafficVehicle!!!!!!!!!!!!!! ",trafficData.resultSameDate);
   
//   // Extract time slots (x-axis labels)
//   const timeSlots = Object.keys(trafficData.resultSameDate);

//   const colorMapping = {
//      "text-danger": "#d9534f", // Bootstrap's danger color
//     "text-info": "#5bc0de", // Bootstrap's info color
//     "text-warning": "#f0ad4e", // Bootstrap's warning color
//     "text-success": "#5cb85c", // Bootstrap's success color
//   };

//   // Prepare the ApexCharts series dynamically based on trafficData
//   const chartSeries = [];

//   // Add Car series if data exists
//   if (timeSlots.some((timeSlot) => trafficData.resultSameDate[timeSlot].car > 0)) {
//     chartSeries.push({
//       name: "Cars",
//       type: "column",
//       data: timeSlots.map(
//         (timeSlot) => trafficData.resultSameDate[timeSlot].car
//       ),
//     });
//   }

//   // Add Van series if data exists
//   if (timeSlots.some((timeSlot) => trafficData.resultSameDate[timeSlot].van > 0)) {
//     chartSeries.push({
//       name: "Vans",
//       type: "column",
//       data: timeSlots.map(
//         (timeSlot) => trafficData.resultSameDate[timeSlot].van
//       ),
//     });
//   }

//   // Add Bus series if data exists
//   if (timeSlots.some((timeSlot) => trafficData.resultSameDate[timeSlot].bus > 0)) {
//     chartSeries.push({
//       name: "Buses",
//       type: "column",
//       data: timeSlots.map(
//         (timeSlot) => trafficData.resultSameDate[timeSlot].bus
//       ),
//     });
//   }

//   // Add Motorcycle series if data exists
//   if (timeSlots.some((timeSlot) => trafficData.resultSameDate[timeSlot].motorbike > 0)) {
//     chartSeries.push({
//       name: "Motorcycles",
//       type: "column",
//       data: timeSlots.map(
//         (timeSlot) => trafficData.resultSameDate[timeSlot].motorbike
//       ),
//     });
//   }

//   // ApexCharts options
//   const chartOptions = {
//     options: {
//       chart: {
//         height: 338,
//         type: "line",
//         stacked: false,
//         toolbar: {
//           show: false,
//         },
//       },
//       stroke: {
//         width: [1, 1, 1, 1],
//         curve: "smooth",
//       },
//       plotOptions: {
//         bar: {
//           columnWidth: "40%",
//         },
//       },
//       colors: [
//         colorMapping["text-danger"], // Cars
//                 colorMapping["text-info"], // Vans
//                 colorMapping["text-warning"], // Buses
//                 colorMapping["text-success"], // Motorcycles
//       ],
//       fill: {
//         opacity: [0.65, 1, 0.35, 1],
//         gradient: {
//           inverseColors: false,
//           shade: "light",
//           type: "vertical",
//           opacityFrom: 0.65,
//           opacityTo: 0.4,
//           stops: [0, 100, 100, 100],
//         },
//       },
//       labels: timeSlots, // Use the time slots as x-axis labels
//       markers: {
//         size: 0,
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       xaxis: {
//         categories: timeSlots, // Set categories as time slots
//         type: "category",
       
//       },
//       yaxis: {
//         title: {
//           text: "Number of vehicles",
//         },
//       },
//       tooltip: {
//         shared: true,
//         intersect: false,
//         y: {
//           formatter: "{value} vehicles",
//         },
//       },
//       grid: {
//         borderColor: "#f1f1f1",
//         padding: {
//           bottom: 15,
//           left: 100, 
//           right: 90, 
//         },
//       },
//     },
//   };




//   return (
//     <div>
//       <h1>Traffic Data Visualization</h1>
//       {timeSlots.length > 0 ? (
//         <ReactApexChart
//           options={chartOptions.options}
//           series={chartSeries}
//           type="line"
//           height={338}
//         />
//       ) : (
//         <p>Loading chart data...</p>
//       )}
//     </div>
//   );
// };

// export default SalesAnalyticsChart;



// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const SalesAnalyticsChart = ({ trafficData }) => {
//   // Ensure trafficData and the selected date exist
//   if (!trafficData || !trafficData.resultSameDate) {
//     return <p>No traffic data available</p>;
//   }

//   // Extract the dates available in resultSameDate
//   const dates = Object.keys(trafficData.resultSameDate);

//   // Check if there is more than one date
//   const isMultipleDates = dates.length > 1;

//   // Prepare the time slots or dates to display as chart labels
//   const chartLabels = isMultipleDates ? dates : Object.keys(trafficData.resultSameDate[dates[0]]);

//   const colorMapping = {
//     "text-danger": "#d9534f", // Car
//     "text-info": "#5bc0de", // Truck
//     "text-warning": "#f0ad4e", // Bus
//     "text-success": "#5cb85c", // Motorbike
//   };

//   // Prepare the ApexCharts series dynamically based on available vehicle types
//   const chartSeries = [];
//   const vehicleTypes = ['car', 'truck', 'bus', 'motorbike'];

//   vehicleTypes.forEach(vehicleType => {
//     // Gather the data for the vehicle type, based on either time slots or dates
//     const data = chartLabels.map(label => {
//       let total = 0;

//       if (isMultipleDates) {
//         // Accumulate the data across all dates for a specific vehicle type
//         total = dates.reduce((acc, date) => {
//           const vehicleData = trafficData.resultSameDate[date] || {};
//           return acc + (vehicleData[vehicleType] || 0);
//         }, 0);
//       } else {
//         // Accumulate the data across time slots for a single date
//         const vehicleData = trafficData.resultSameDate[dates[0]] || {};
//         total = Object.keys(vehicleData).reduce((acc, timeSlot) => {
//           return acc + (vehicleData[timeSlot][vehicleType] || 0);
//         }, 0);
//       }

//       return total;
//     });

//     // Only add the series if there is data to display (i.e., non-zero values)
//     if (data.some(value => value > 0)) {
//       chartSeries.push({
//         name: vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1), // Capitalize vehicle type
//         type: isMultipleDates ? "bar" : "line", // Change to bar chart if multiple dates
//         data: data,
//       });
//     }
//   });

//   // ApexCharts options
//   const chartOptions = {
//     chart: {
//       height: 338,
//       type: isMultipleDates ? "bar" : "line", // Use line chart for single date, bar for multiple dates
//       stacked: false,
//       toolbar: {
//         show: false,
//       },
//     },
//     stroke: {
//       width: [1, 1, 1, 1],
//       curve: "smooth",
//     },
//     plotOptions: {
//       bar: {
//         columnWidth: "40%",
//       },
//     },
//     colors: [
//       colorMapping["text-danger"], // Cars
//       colorMapping["text-info"], // Trucks
//       colorMapping["text-warning"], // Buses
//       colorMapping["text-success"], // Motorbikes
//     ],
//     fill: {
//       opacity: [0.65, 1, 0.35, 1],
//       gradient: {
//         inverseColors: false,
//         shade: "light",
//         type: "vertical",
//         opacityFrom: 0.65,
//         opacityTo: 0.4,
//         stops: [0, 100, 100, 100],
//       },
//     },
//     labels: chartLabels,
//     markers: {
//       size: 0,
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     xaxis: {
//       categories: chartLabels, // Display dates or time slots
//       type: "category",
//     },
//     yaxis: {
//       title: {
//         text: "Number of vehicles",
//       },
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//       y: {
//         formatter: "{value} vehicles",
//       },
//     },
//     grid: {
//       borderColor: "#f1f1f1",
//       padding: {
//         bottom: 15,
//         left: 100,
//         right: 90,
//       },
//     },
//   };

//   return (
//     <div>
//       <h1>Traffic Data Visualization</h1>
//       {chartLabels.length > 0 ? (
//         <ReactApexChart
//           options={chartOptions}
//           series={chartSeries}
//           type={isMultipleDates ? "bar" : "line"}
//           height={338}
//         />
//       ) : (
//         <p>Loading chart data...</p>
//       )}
//     </div>
//   );
// };

// export default SalesAnalyticsChart;
















// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const SalesAnalyticsChart = ({ trafficData }) => {
//   // Ensure trafficData exists and is structured as expected
//   if (!trafficData || !trafficData.resultSameDate) {
//     return <p>No traffic data available</p>;
//   }

//   console.log("TrafficVehicle!!!!!!!!!!!!!! ", trafficData.resultSameDate);

//   // Extract date keys (dates like "2025-01-14", "2025-01-15")
//   const dateKeys = Object.keys(trafficData.resultSameDate);

//   // Determine if all dates are the same
//   const allDatesSame = dateKeys.every(
//     (date) =>
//       date === dateKeys[0] // Check if every date is the same as the first date
//   );

//   // If dates are the same, use time slots (hours) as x-axis labels
//   const timeSlots = allDatesSame ? Object.keys(trafficData.resultSameDate[dateKeys[0]]) : dateKeys;

//   const colorMapping = {
//     "text-danger": "#d9534f", // Bootstrap's danger color
//     "text-info": "#5bc0de", // Bootstrap's info color
//     "text-warning": "#f0ad4e", // Bootstrap's warning color
//     "text-success": "#5cb85c", // Bootstrap's success color
//   };

  
//   // Prepare the ApexCharts series dynamically based on trafficData
//   const chartSeries = [];

//   // Add Car series if data exists
//   if (
//     timeSlots.some(
//       (timeSlot) =>
//         allDatesSame
//           ? trafficData.resultSameDate[dateKeys[0]][timeSlot].car > 0
//           : trafficData.resultSameDate[timeSlot].car > 0
//     )
//   ) {
//     chartSeries.push({
//       name: "Cars",
//       type: "column",
//       data: timeSlots.map((timeSlot) =>
//         allDatesSame
//           ? trafficData.resultSameDate[dateKeys[0]][timeSlot].car
//           : trafficData.resultSameDate[timeSlot].car
//       ),
//     });
//   }

//   // Add Van series if data exists
//   if (
//     timeSlots.some(
//       (timeSlot) =>
//         allDatesSame
//           ? trafficData.resultSameDate[dateKeys[0]][timeSlot].van > 0
//           : trafficData.resultSameDate[timeSlot].van > 0
//     )
//   ) {
//     chartSeries.push({
//       name: "Vans",
//       type: "column",
//       data: timeSlots.map((timeSlot) =>
//         allDatesSame
//           ? trafficData.resultSameDate[dateKeys[0]][timeSlot].van
//           : trafficData.resultSameDate[timeSlot].van
//       ),
//     });
//   }

//   // Add Bus series if data exists
//   if (
//     timeSlots.some(
//       (timeSlot) =>
//         allDatesSame
//           ? trafficData.resultSameDate[dateKeys[0]][timeSlot].bus > 0
//           : trafficData.resultSameDate[timeSlot].bus > 0
//     )
//   ) {
//     chartSeries.push({
//       name: "Buses",
//       type: "column",
//       data: timeSlots.map((timeSlot) =>
//         allDatesSame
//           ? trafficData.resultSameDate[dateKeys[0]][timeSlot].bus
//           : trafficData.resultSameDate[timeSlot].bus
//       ),
//     });
//   }

//   // Add Motorcycle series if data exists
//   // if (
//   //   timeSlots.some(
//   //     (timeSlot) =>
//   //       allDatesSame
//   //         ? trafficData.resultSameDate[dateKeys[0]][timeSlot].motorbike > 0
//   //         : trafficData.resultSameDate[timeSlot].motorbike > 0
//   //   )
//   // ) {
//   //   chartSeries.push({
//   //     name: "Motorcycles",
//   //     type: "column",
//   //     data: timeSlots.map((timeSlot) =>
//   //       allDatesSame
//   //         ? trafficData.resultSameDate[dateKeys[0]][timeSlot].motorbike
//   //         : trafficData.resultSameDate[timeSlot].motorbike
//   //     ),
//   //   });
//   // }

//   // // Add Trucks series  if data exists
//   // if (
//   //   timeSlots.some(
//   //     (timeSlot) =>
//   //       allDatesSame
//   //         ? trafficData.resultSameDate[dateKeys[0]][timeSlot].truck > 0
//   //         : trafficData.resultSameDate[timeSlot].truck > 0
//   //   )
//   // ) {
//   //   chartSeries.push({
//   //     name: "Trucks",
//   //     type: "column",
//   //     data: timeSlots.map((timeSlot) =>
//   //       allDatesSame
//   //         ? trafficData.resultSameDate[dateKeys[0]][timeSlot].motorbike
//   //         : trafficData.resultSameDate[timeSlot].motorbike
//   //     ),
//   //   });
//   // }

//   console.log("Chart Series: ", chartSeries);

//   // ApexCharts options
//   const chartOptions = {
//     options: {
//       chart: {
//         height: 338,
//         type: "line",
//         stacked: false,
//         toolbar: {
//           show: false,
//         },
//       },
//       stroke: {
//         width: [1, 1, 1, 1],
//         curve: "smooth",
//       },
//       plotOptions: {
//         bar: {
//           columnWidth: "40%",
//         },
//       },
//       colors: [
//         colorMapping["text-danger"], // Cars
//         colorMapping["text-info"], // Vans
//         colorMapping["text-warning"], // Buses
//         // colorMapping["text-success"], // Motorcycles
//       ],
//       fill: {
//         opacity: [0.65, 1, 0.35, 1],
//         gradient: {
//           inverseColors: false,
//           shade: "light",
//           type: "vertical",
//           opacityFrom: 0.65,
//           opacityTo: 0.4,
//           stops: [0, 100, 100, 100],
//         },
//       },
//       labels: timeSlots, // Use the time slots (or dates) as x-axis labels
//       markers: {
//         size: 0,
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       xaxis: {
//         categories: timeSlots, // Set categories as time slots or dates
//         type: "category",
//       },
//       yaxis: {
//         title: {
//           text: "Number of vehicles",
//         },
//       },
//       tooltip: {
//         shared: true,
//         intersect: false,
//         y: {
//           formatter: "{value} vehicles",
//         },
//       },
//       grid: {
//         borderColor: "#f1f1f1",
//         padding: {
//           bottom: 15,
//           left: 100,
//           right: 90,
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <h1>Parking Data Visualization</h1>
//       {timeSlots.length > 0 ? (
//         <ReactApexChart
//           options={chartOptions.options}
//           series={chartSeries}
//           type="line"
//           height={338}
//         />
//       ) : (
//         <p>Loading chart data...</p>
//       )}
//     </div>
//   );
// };

// export default SalesAnalyticsChart;















/// Dynmaic colors












import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesAnalyticsChart = ({ trafficData }) => {
  if (!trafficData || !trafficData.resultSameDate) {
    return <p>No traffic data available</p>;
  }

  const dateKeys = Object.keys(trafficData.resultSameDate);
  const allDatesSame = dateKeys.every(
    (date) => date === dateKeys[0]
  );

  const timeSlots = allDatesSame ? Object.keys(trafficData.resultSameDate[dateKeys[0]]) : dateKeys;

  const colorMapping = {
    "text-danger": "#d9534f", // Red for Cars
    "text-info": "#5bc0de", // Blue for Vans
    "text-warning": "#f0ad4e", // Yellow for Buses
    "text-success": "#5cb85c", // Green for Motorcycles
  };

  const chartSeries = [];

  
  // Dynamically add series if data exists for the vehicle types
  if (timeSlots.some(
    (timeSlot) => allDatesSame ? trafficData.resultSameDate[dateKeys[0]][timeSlot].car > 0 : trafficData.resultSameDate[timeSlot].car > 0)) {
    chartSeries.push({
      name: "Cars",
      type: "column",
      data: timeSlots.map((timeSlot) => allDatesSame ? trafficData.resultSameDate[dateKeys[0]][timeSlot].car : trafficData.resultSameDate[timeSlot].car),
      color: colorMapping["text-danger"]
    });
  }

  if (timeSlots.some(
    (timeSlot) => allDatesSame ? trafficData.resultSameDate[dateKeys[0]][timeSlot].van > 0 : trafficData.resultSameDate[timeSlot].van > 0)) {
    chartSeries.push({
      name: "Vans",
      type: "column",
      data: timeSlots.map((timeSlot) => allDatesSame ? trafficData.resultSameDate[dateKeys[0]][timeSlot].van : trafficData.resultSameDate[timeSlot].van),
      color: colorMapping["text-info"]
    });
  }

  if (timeSlots.some(
    (timeSlot) => allDatesSame ? trafficData.resultSameDate[dateKeys[0]][timeSlot].bus > 0 : trafficData.resultSameDate[timeSlot].bus > 0)) {
    chartSeries.push({
      name: "Buses",
      type: "column",
      data: timeSlots.map((timeSlot) => allDatesSame ? trafficData.resultSameDate[dateKeys[0]][timeSlot].bus : trafficData.resultSameDate[timeSlot].bus),
      color: colorMapping["text-warning"]
    });
  }

  
  const chartOptions = {
    options: {
      chart: {
        height: 338,
        type: "line",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [1, 1, 1, 1],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "40%",
        },
      },
      fill: {
        opacity: [0.65, 1, 0.35],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.65,
          opacityTo: 0.4,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 4,  // Ensure that the marker is visible even when only one series is present
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: timeSlots,
        type: "category",
      },
      yaxis: {
        title: {
          text: "Number of vehicles",
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: "{value} vehicles",
        },
      },
      grid: {
        borderColor: "#f1f1f1",
        padding: {
          bottom: 15,
          left: 100,
          right: 90,
        },
      },
    },
  };

  return (
    <div>
      <h1>Parking Data Visualization</h1>
      {timeSlots.length > 0 ? (
        <ReactApexChart
          options={chartOptions.options}
          series={chartSeries}
          type="line"
          height={338}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default SalesAnalyticsChart;
