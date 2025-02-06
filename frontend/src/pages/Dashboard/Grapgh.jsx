















import React from "react";
import ReactApexChart from "react-apexcharts";

const Graph = ({ trafficData }) => {
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
  
  // Generate data for vehicle types
  const chartSeries = vehicleTypes.map((vehicle) => ({
    name: vehicle.charAt(0).toUpperCase() + vehicle.slice(1),
    type: "column",
    data: isSingleDay
      ? Object.keys(trafficData.resultSameDate[dateKeys[0]] || {}).map(
          (timeSlot) =>
            trafficData.resultSameDate[dateKeys[0]][timeSlot][vehicle] || 0
        )
      : dateKeys.map(
          (date) => trafficData.resultSameDate[date]?.[vehicle] || 0
        ),
    color: colorMapping[vehicle],
  }));

  // Generate data for total duration
  const totalDurationSeries = {
    name: "Total Duration",
    type: "line",
    data: isSingleDay
      ? Object.keys(trafficData.dailyDurations[dateKeys[0]] || {}).map(
          (timeSlot) =>
            trafficData.dailyDurations[dateKeys[0]][timeSlot]?.totalDuration || 0
        )
      : dateKeys.map((date) =>
          Object.values(trafficData.dailyDurations[date] || {}).reduce(
            (sum, slot) => sum + (slot.totalDuration || 0),
            0
          )
        ),
    color: colorMapping.totalDuration,
  };

  // Add totalDurationSeries to chartSeries
  chartSeries.push(totalDurationSeries);

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
    // yaxis: [
    //   {
    //     title: { text: "Total Duration" },
    //     min: 0,
    //   },
    // ],

  
  // yaxis: [
  //   {
  //     title: { text: "Total Duration" },
  //     min: 0,
  //     labels: {
  //       formatter: (value) => `${value} mins`, // Append " mins" only for total duration values
  //     },
  //   },
  // ],


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
      y: {
        formatter: (value, { seriesIndex }) => {
          // Append " mins" only to the total duration (last series)
          return seriesIndex === chartSeries.length - 1 ? `${value} mins` : value;
        },
      },
    },
    grid: {
      borderColor: "#f1f1f1",
      padding: { bottom: 15, left: 100, right: 90 },
    },
  };
  


  
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

export default Graph;










//   resultSameDate: {
//     "2025-01-21": {
//       total: 3,
//       car: 1,
//       truck: 0,
//       bus: 1,
//       van: 1,
//       motorbike: 0,
//     },

//     "2025-01-22": { total: 2, car: 1, truck: 0, bus: 1, van: 0, motorbike: 0 },
//     "2025-01-23": { total: 2, car: 1, truck: 0, bus: 0, van: 1, motorbike: 0 },
//   },

//   dailyDurations: {
//     "2025-01-21": {
//       "00:00-02:00": {
//         totalDuration: 5,
//         cost: 0,
//       },
//       "02:00-04:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "04:00-06:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "06:00-08:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "08:00-10:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "10:00-12:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "12:00-14:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "14:00-16:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "16:00-18:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "18:00-20:00": {
//         totalDuration: 27,
//         cost: 0,
//       },
//       "20:00-22:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "22:00-00:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//     },

//     "2025-01-22": {
//       "00:00-02:00": { totalDuration: 0, cost: 0 },
//       "02:00-04:00": { totalDuration: 8, cost: 0 },
//       "04:00-06:00": { totalDuration: 0, cost: 0 },
//       "06:00-08:00": { totalDuration: 0, cost: 0 },
//       "08:00-10:00": { totalDuration: 0, cost: 0 },
//       "10:00-12:00": { totalDuration: 0, cost: 0 },
//       "12:00-14:00": { totalDuration: 0, cost: 0 },
//       "14:00-16:00": { totalDuration: 0, cost: 0 },
//       "16:00-18:00": { totalDuration: 0, cost: 0 },
//       "18:00-20:00": { totalDuration: 0, cost: 0 },
//       "20:00-22:00": { totalDuration: 0, cost: 0 },
//       "22:00-00:00": { totalDuration: 10, cost: 0 },
//     },
//     "2025-01-23": {
//       "00:00-02:00": { totalDuration: 0, cost: 0 },
//       "02:00-04:00": { totalDuration: 0, cost: 0 },
//       "04:00-06:00": { totalDuration: 15, cost: 0 },
//       "06:00-08:00": { totalDuration: 0, cost: 0 },
//       "08:00-10:00": { totalDuration: 0, cost: 0 },
//       "10:00-12:00": { totalDuration: 0, cost: 0 },
//       "12:00-14:00": { totalDuration: 0, cost: 0 },
//       "14:00-16:00": { totalDuration: 0, cost: 0 },
//       "16:00-18:00": { totalDuration: 0, cost: 0 },
//       "18:00-20:00": { totalDuration: 0, cost: 0 },
//       "20:00-22:00": { totalDuration: 39, cost: 0 },
//       "22:00-00:00": { totalDuration: 0, cost: 0 },
//     },
//   },
// };


// const data1 = {
//   resultSameDate: {
//     "2025-01-21": {
//       "00:00-02:00": {
//         total: 1,
//         car: 0,
//         truck: 0,
//         bus: 1,
//         van: 0,
//         motorbike: 0,
//       },
//       "02:00-04:00": {
//         total: 0,
//         car: 0,
//         truck: 0,
//         bus: 0,
//         van: 0,
//         motorbike: 0,
//       },
//       "04:00-06:00": {
//         total: 0,
//         car: 0,
//         truck: 0,
//         bus: 0,
//         van: 0,
//         motorbike: 0,
//       },
//       "06:00-08:00": {
//         total: 0,
//         car: 0,
//         truck: 0,
//         bus: 0,
//         van: 0,
//         motorbike: 0,
//       },
//       "08:00-10:00": {
//         total: 0,
//         car: 0,
//         truck: 0,
//         bus: 0,
//         van: 0,
//         motorbike: 0,
//       },
//       "10:00-12:00": {
//         total: 0,
//         car: 0,
//         truck: 0,
//         bus: 0,
//         van: 0,
//         motorbike: 0,
//       },
//       "12:00-14:00": {
//         total: 0,
//         car: 0,
//         truck: 0,
//         bus: 0,
//         van: 0,
//         motorbike: 0,
//       },
//       "14:00-16:00": {
//         total: 0,
//         car: 0,
//         truck: 0,
//         bus: 0,
//         van: 0,
//         motorbike: 0,
//       },
//       "16:00-18:00": {
//         total: 0,
//         car: 0,
//         truck: 0,
//         bus: 0,
//         van: 0,
//         motorbike: 0,
//       },
//       "18:00-20:00": {
//         total: 2,
//         car: 1,
//         truck: 0,
//         bus: 0,
//         van: 1,
//         motorbike: 0,
//       },
//       "20:00-22:00": {
//         total: 0,
//         car: 0,
//         truck: 0,
//         bus: 0,
//         van: 0,
//         motorbike: 0,
//       },
//       "22:00-00:00": {
//         total: 0,
//         car: 0,
//         truck: 0,
//         bus: 0,
//         van: 0,
//         motorbike: 0,
//       },
//     },
//   },
//   dailyDurations: {
//     "2025-01-21": {
//       "00:00-02:00": {
//         totalDuration: 5,
//         cost: 0,
//       },
//       "02:00-04:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "04:00-06:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "06:00-08:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "08:00-10:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "10:00-12:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "12:00-14:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "14:00-16:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "16:00-18:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "18:00-20:00": {
//         totalDuration: 27,
//         cost: 0,
//       },
//       "20:00-22:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//       "22:00-00:00": {
//         totalDuration: 0,
//         cost: 0,
//       },
//     },
//   },
// };

