const multer = require("multer");
const fs = require("fs");
const moment = require("moment");

const path = require("path");
const express = require("express");

const router = express.Router();


const NewBaseDir = path.join(__dirname, "..", "allParking");

// const startDate = "2023-01-14";
// const endDate = "2023-01-16";

const INTERVAL_TYPE = 2; // 1-hour or 2-hour intervals
const MAX_HOURS = 24; // 24 hours in a day

// const getHour = (timeStr) => {
//   const date = new Date(timeStr);
//   return date.getUTCHours(); // Always use UTC hours
// };


const getHour = (timeStr) => {
  const date = moment.utc(timeStr, "YYYY-MM-DD hh:mm A").toDate();
  return date.getUTCHours();
};





// Helper function to generate hourly ranges like "00:00-01:00", "01:00-02:00", etc.
const generateHourRanges = () => {
  const ranges = [];

  // Determine how many intervals we need based on the INTERVAL_TYPE
  const intervalDuration = INTERVAL_TYPE === 1 ? 1 : 2; // Set interval duration to 1 hour or 2 hours

  // Loop through the hours and generate the time intervals
  for (let i = 0; i < MAX_HOURS; i += intervalDuration) {
    const start = i;
    const end = start + intervalDuration;

    // Ensure the end hour is within the valid range (0-23 hours)
    const formattedStart = `${String(start).padStart(2, "0")}:00`;
    const formattedEnd = `${String(end % MAX_HOURS).padStart(2, "0")}:00`; // Wrap around using modulus

    ranges.push(`${formattedStart}-${formattedEnd}`);
  }

  return ranges;
};

// const processVehicleData = (startDate, endDate, vehicles) => {
//   // Convert input date strings to Date objects for comparison
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   // Initialize the result object to store vehicle counts
//   const result = {};

//   // Check if the start and end dates are the same
//   if (start.toISOString().split("T")[0] === end.toISOString().split("T")[0]) {
//     // Same date, calculate hourly breakdown for one day
//     const dateKey = start.toISOString().split("T")[0]; // YYYY-MM-DD format
//     if (!result[dateKey]) {
//       result[dateKey] = generateHourRanges().reduce((acc, hour) => {
//         acc[hour] = {
//           total: 0,
//           car: 0,
//           truck: 0,
//           bus: 0,
//           van: 0,
//           motorbike: 0,
//           totalDuration : 0,
//         };
//         return acc;
//       }, {});
//     }







//     // Loop through each vehicle and check if it fits within any hour of the day
//     vehicles.forEach((vehicle) => {
//       // const timeIn = new Date(vehicle.timeIn);
//       // const timeOut = new Date(vehicle.timeOut);
//       const timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
//       const timeOut = moment
//         .utc(vehicle.timeOut, "YYYY-MM-DD hh:mm A")
//         .toDate();

//       if (
//         timeIn.toISOString().split("T")[0] === dateKey ||
//         timeOut.toISOString().split("T")[0] === dateKey
//       ) {
//         generateHourRanges().forEach((hourRange) => {
//           // const [hourStart, hourEnd] = hourRange
//           //   .split("-")
//           //   .map((time) => parseInt(time.split(":")[0]));

// const standardizedRange = hourRange.replace("-00:00", "-24:00");
// const [hourStart, hourEnd] = standardizedRange.split("-").map((time) => parseInt(time.split(":")[0]));

// // console.log(`Hour Range: ${hourStart}-${hourEnd}`);

//           const vehicleStartHour = getHour(vehicle.timeIn);
//           const vehicleEndHour = getHour(vehicle.timeOut);



// // console.log("Vehicle Hours:", vehicleStartHour, "-", vehicleEndHour);

//           // if ((vehicleStartHour <= hourEnd && vehicleEndHour >= hourStart) || (vehicleStartHour === hourStart && vehicleEndHour === hourEnd)) {
//           if (
//             (vehicleStartHour >= hourStart && vehicleStartHour < hourEnd) ||
//             // (vehicleEndHour > hourStart && vehicleEndHour <= hourEnd) ||
//             (vehicleStartHour <= hourStart && vehicleEndHour >= hourEnd)
//           ) {
//             result[dateKey][hourRange].total += 1;
//             result[dateKey][hourRange][vehicle.vehicleType.toLowerCase()] += 1;
//           }
//         });
//       }
//     });
//   } else {
//     // Different date range, calculate daily totals
//     for (
//       let currentDate = new Date(start);
//       currentDate <= end;
//       currentDate.setDate(currentDate.getDate() + 1)
//     ) {
//       const dateKey = currentDate.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD

//       if (!result[dateKey]) {
//         result[dateKey] = {
//           total: 0,
//           car: 0,
//           truck: 0,
//           bus: 0,
//           van: 0,
//           motorbike: 0,
//         };
//       }



//       vehicles.forEach((vehicle) => {
//         const timeIn = moment
//           .utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A")
//           .toDate();
//         const timeOut = moment
//           .utc(vehicle.timeOut, "YYYY-MM-DD hh:mm A")
//           .toDate();

          


//         if (
//           timeIn <= end &&
//           timeOut >= start && // Vehicle overlaps with the selected date range
//           // new Date(dateKey).setHours(0, 0, 0, 0) <= timeOut.getTime() &&
//           // new Date(dateKey).setHours(23, 59, 59, 999) >= timeIn.getTime()
//           new Date(dateKey).setUTCHours(0, 0, 0, 0) <= timeOut.getTime() &&
//           new Date(dateKey).setUTCHours(23, 59, 59, 999) >= timeIn.getTime()
  

//         ) {
//           result[dateKey].total += 1;
//           result[dateKey][vehicle.vehicleType.toLowerCase()] += 1;
//         }
//       });
//     }
//   }

//   return result;
// };
  
// const processVehicleData = (startDate, endDate, vehicles) => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   const result = {};

//   if (start.toISOString().split("T")[0] === end.toISOString().split("T")[0]) {
//     const dateKey = start.toISOString().split("T")[0];

//     if (!result[dateKey]) {
//       result[dateKey] = generateHourRanges().reduce((acc, hour) => {
//         acc[hour] = {
//           total: 0,
//           car: 0,
//           truck: 0,
//           bus: 0,
//           van: 0,
//           motorbike: 0,
//           vehicles: [], // Store individual vehicle durations
//         };
//         return acc;
//       }, {});
//     }

//     vehicles.forEach((vehicle) => {
//       const timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
//       const timeOut = moment.utc(vehicle.timeOut, "YYYY-MM-DD hh:mm A").toDate();
//       const duration = (timeOut - timeIn) / 60000; // Convert milliseconds to minutes

//       if (
//         timeIn.toISOString().split("T")[0] === dateKey ||
//         timeOut.toISOString().split("T")[0] === dateKey
//       ) {
//         generateHourRanges().forEach((hourRange) => {
//           const standardizedRange = hourRange.replace("-00:00", "-24:00");
//           const [hourStart, hourEnd] = standardizedRange.split("-").map((time) => parseInt(time.split(":")[0]));

//           const vehicleStartHour = getHour(vehicle.timeIn);
//           const vehicleEndHour = getHour(vehicle.timeOut);

//           if (
//             (vehicleStartHour >= hourStart && vehicleStartHour < hourEnd) ||
//             (vehicleStartHour <= hourStart && vehicleEndHour >= hourEnd)
//           ) {
//             result[dateKey][hourRange].total += 1;
//             result[dateKey][hourRange][vehicle.vehicleType.toLowerCase()] += 1;
//             result[dateKey][hourRange].vehicles.push({
//               type: vehicle.vehicleType.toLowerCase(),
//               duration,
//             });
//           }
//         });
//       }
//     });
//   } else {
//     for (
//       let currentDate = new Date(start);
//       currentDate <= end;
//       currentDate.setDate(currentDate.getDate() + 1)
//     ) {
//       const dateKey = currentDate.toISOString().split("T")[0];

//       if (!result[dateKey]) {
//         result[dateKey] = {
//           total: 0,
//           car: 0,
//           truck: 0,
//           bus: 0,
//           van: 0,
//           motorbike: 0,
//           vehicles: [], // Store individual vehicle durations
//         };
//       }

//       vehicles.forEach((vehicle) => {
//         const timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
//         const timeOut = moment.utc(vehicle.timeOut, "YYYY-MM-DD hh:mm A").toDate();
//         const duration = (timeOut - timeIn) / 60000; // Convert milliseconds to minutes

//         if (
//           timeIn <= end &&
//           timeOut >= start &&
//           new Date(dateKey).setUTCHours(0, 0, 0, 0) <= timeOut.getTime() &&
//           new Date(dateKey).setUTCHours(23, 59, 59, 999) >= timeIn.getTime()
//         ) {
//           result[dateKey].total += 1;
//           result[dateKey][vehicle.vehicleType.toLowerCase()] += 1;
//           result[dateKey].vehicles.push({
//             type: vehicle.vehicleType.toLowerCase(),
//             duration,
//           });
//         }
//       });
//     }
//   }

//   return result;
// };


const processVehicleData = (startDate, endDate, vehicles) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const result = {};

  if (start.toISOString().split("T")[0] === end.toISOString().split("T")[0]) {
    const dateKey = start.toISOString().split("T")[0];

    if (!result[dateKey]) {
      result[dateKey] = generateHourRanges().reduce((acc, hour) => {
        acc[hour] = {
          total: 0,
          car: 0,
          truck: 0,
          bus: 0,
          van: 0,
          motorbike: 0,
          vehicles: {}, // Store grouped durations by vehicle type
        };
        return acc;
      }, {});
    }

    vehicles.forEach((vehicle) => {
      const timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
      const timeOut = moment.utc(vehicle.timeOut, "YYYY-MM-DD hh:mm A").toDate();
      const duration = (timeOut - timeIn) / 60000; // Convert milliseconds to minutes
      const vehicleType = vehicle.vehicleType.toLowerCase();

      if (
        timeIn.toISOString().split("T")[0] === dateKey ||
        timeOut.toISOString().split("T")[0] === dateKey
      ) {
        generateHourRanges().forEach((hourRange) => {
          const standardizedRange = hourRange.replace("-00:00", "-24:00");
          const [hourStart, hourEnd] = standardizedRange.split("-").map((time) => parseInt(time.split(":")[0]));

          const vehicleStartHour = getHour(vehicle.timeIn);
          const vehicleEndHour = getHour(vehicle.timeOut);

          if (
            (vehicleStartHour >= hourStart && vehicleStartHour < hourEnd) ||
            (vehicleStartHour <= hourStart && vehicleEndHour >= hourEnd)
          ) {
            result[dateKey][hourRange].total += 1;
            result[dateKey][hourRange][vehicleType] += 1;

            if (!result[dateKey][hourRange].vehicles[vehicleType]) {
              result[dateKey][hourRange].vehicles[vehicleType] = { totalDuration: 0, count: 0 };
            }

            result[dateKey][hourRange].vehicles[vehicleType].totalDuration += duration;
            result[dateKey][hourRange].vehicles[vehicleType].count += 1;
          }
        });
      }
    });

    // Convert stored durations to averages
    Object.keys(result[dateKey]).forEach((hourRange) => {
      const vehicleData = result[dateKey][hourRange].vehicles;
      result[dateKey][hourRange].vehicles = Object.keys(vehicleData).map((type) => ({
        type,
        duration: parseFloat((vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1)),
        avgDuration: parseFloat((vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1))
      }));
    });

  } else {
    for (
      let currentDate = new Date(start);
      currentDate <= end;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      const dateKey = currentDate.toISOString().split("T")[0];

      if (!result[dateKey]) {
        result[dateKey] = {
          total: 0,
          car: 0,
          truck: 0,
          bus: 0,
          van: 0,
          motorbike: 0,
          vehicles: {}, // Store grouped durations by vehicle type
        };
      }

      vehicles.forEach((vehicle) => {
        const timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
        const timeOut = moment.utc(vehicle.timeOut, "YYYY-MM-DD hh:mm A").toDate();
        const duration = (timeOut - timeIn) / 60000; // Convert milliseconds to minutes
        const vehicleType = vehicle.vehicleType.toLowerCase();

        if (
          timeIn <= end &&
          timeOut >= start &&
          new Date(dateKey).setUTCHours(0, 0, 0, 0) <= timeOut.getTime() &&
          new Date(dateKey).setUTCHours(23, 59, 59, 999) >= timeIn.getTime()
        ) {
          result[dateKey].total += 1;
          result[dateKey][vehicleType] += 1;

          if (!result[dateKey].vehicles[vehicleType]) {
            result[dateKey].vehicles[vehicleType] = { totalDuration: 0, count: 0 };
          }

          result[dateKey].vehicles[vehicleType].totalDuration += duration;
          result[dateKey].vehicles[vehicleType].count += 1;
        }
      });

      // Convert stored durations to averages
      const vehicleData = result[dateKey].vehicles;
      result[dateKey].vehicles = Object.keys(vehicleData).map((type) => ({
        type,
        duration: parseFloat((vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1)),
        avgDuration: parseFloat((vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1))
      }));
    }
  }

  return result;
};



function countVehicles(startDate, endDate, data) {
  // Create an empty object to store the count of each vehicle type
  const vehicleCount = {};
  const start = moment.utc(startDate, "YYYY-MM-DD hh:mm A").toDate();
  const end = moment.utc(endDate, "YYYY-MM-DD hh:mm A").toDate();

  // Iterate through the data and count each vehicle type within the date range
  Object.values(data).forEach((entry) => {
    const entryDate = moment.utc(entry.timeIn, "YYYY-MM-DD hh:mm A");
    if (entryDate.isBetween(start, end, "minute", "[]")) {
      const vehicleType = entry.vehicleType;
      vehicleCount[vehicleType] = (vehicleCount[vehicleType] || 0) + 1;
    }
  });

  // Calculate the total number of vehicles
  const totalVehicles = Object.values(vehicleCount).reduce(
    (total, count) => total + count,
    0
  );

  return { vehicleCount, totalVehicles };
}

function calculateDuration(startDate, endDate, data) {
  const durationData = [];
  const start = moment(startDate, "YYYY-MM-DD").startOf("day");
  const end = moment(endDate, "YYYY-MM-DD").endOf("day");

  Object.values(data).forEach((entry, index) => {
    const entryDate = moment(entry.timeIn, "YYYY-MM-DD hh:mm A");
    if (entryDate.isBetween(start, end, "minute", "[]")) {
      const timeIn = moment(entry.timeIn, "YYYY-MM-DD hh:mm A");
      const timeOut = moment(entry.timeOut, "YYYY-MM-DD hh:mm A");

      // Calculate duration in minutes
      const duration = timeOut.diff(timeIn, "minutes");

      durationData[index] = {
        duration: duration,
      };
    }
  });

  return durationData;
}

const Rate = 5;

// Function to calculate cost by multiplying duration with Rate
const calculateCost = (calculationDurations) => {
  return calculationDurations.map((item) => ({
    ...item,
    cost: item.duration * Rate,
  }));
};

const calculateTotalCost = (costData) => {
  return costData.reduce((total, item) => total + item.cost, 0);
};

// const formatParkingData = (data) => {
//   try {
//     const parsedData = JSON.parse(data); // Parse the JSON data
//     // Format the data into the required structure
//     return Object.values(parsedData).map(
//       (entry) =>
//         `${entry.vehicleType} - Time In: ${entry.timeIn}, Time Out: ${entry.timeOut}`
//     );
//   } catch (error) {
//     throw new Error("Invalid JSON data");
//   }
// };

// const calculateDurationByIntervals = (startDate, endDate, vehicles, rate) => {
//   // Generate all hour ranges
//   const generateHourRanges = () => {
//     const ranges = [];
//     for (let i = 0; i < 24; i += 2) {
//       const start = `${String(i).padStart(2, "0")}:00`;
//       const end = `${String((i + 2) % 24).padStart(2, "0")}:00`;
//       ranges.push(`${start}-${end}`);
//     }
//     return ranges;
//   };

//   const hourRanges = generateHourRanges();
//   const result = {};

//   // Initialize the result object for each hour range across all days
//   for (
//     let currentDate = new Date(startDate);
//     currentDate <= new Date(endDate);
//     currentDate.setDate(currentDate.getDate() + 1)
//   ) {
//     const dateKey = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
//     result[dateKey] = {};

//     hourRanges.forEach((hourRange) => {
//       result[dateKey][hourRange] = {
//         totalDuration: 0,
//         cost: 0, // Add cost to each interval
//       };
//     });
//   }

//   // Iterate through vehicles and calculate duration for each interval
//   vehicles.forEach((vehicle) => {
//     const timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
//     const timeOut = moment.utc(vehicle.timeOut, "YYYY-MM-DD hh:mm A").toDate();

//     for (
//       let currentDate = new Date(startDate);
//       currentDate <= new Date(endDate);
//       currentDate.setDate(currentDate.getDate() + 1)
//     ) {
//       const dateKey = currentDate.toISOString().split("T")[0];
//       // const dayStart = new Date(dateKey);
//       // const dayEnd = new Date(dateKey);

//       const dayStart = moment
//         .utc(dateKey, "YYYY-MM-DD")
//         .add(5, "hours")
//         .startOf("day")
//         .toDate();

//       const dayEnd = moment
//         .utc(dateKey, "YYYY-MM-DD")
//         .add(5, "hours")
//         .endOf("day")
//         .toDate();

//       //  dayEnd.setHours(23, 59, 59, 999);

//       // console.log("dayend  !!!!!!!35421244442154", dayEnd);

//       // Check if vehicle overlaps with the current day
//       if (timeIn <= dayEnd && timeOut >= dayStart) {
//         // Determine the actual overlap period for this day
//         const overlapStart = new Date(Math.max(dayStart, timeIn));
//         const overlapEnd = new Date(Math.min(dayEnd, timeOut));

//         hourRanges.forEach((hourRange) => {
//           // const [hourStart, hourEnd] = hourRange.split("-").map((time) => {
       


//             // Replace -00:00 with -24:00 for easier parsing
//   const adjustedHourRange = hourRange.replace("-00:00", "-24:00");

//   // Split adjusted hour range and map to date objects
//   const [hourStart, hourEnd] = adjustedHourRange.split("-").map((time) => {

//      const [hour, minute] = time.split(":").map(Number);
//             const rangeDate = new Date(dateKey); // Base date (e.g., 2023-01-14T00:00:00.000Z)
//             rangeDate.setUTCHours(hour, minute, 0, 0); // Use UTC to avoid timezone issues
//             return rangeDate;
//           });


      
//           // Special handling for the "22:00-00:00" range to ensure "End" remains on the same day
//           if (hourEnd.getUTCHours() === 0) {
//             hourEnd.setUTCDate(hourEnd.getUTCDate() - 1); // Adjust back to the same day
//             hourEnd.setUTCHours(24, 0, 0, 0); // Set to 00:00:00 on the same day
//             // hourEnd.setUTCHours(23, 59, 59, 999); // Set to 23:59:59.999 on the same day
//           }



          
//   // console.log("Hour Range:", hourStart, "-", hourEnd);
//           // Correctly compare the overlap
//           if (overlapStart <= hourEnd && overlapEnd >= hourStart) {
//             const intervalStart = new Date(Math.max(overlapStart, hourStart));
//             const intervalEnd = new Date(Math.min(overlapEnd, hourEnd));
//             const duration = (intervalEnd - intervalStart) / (1000 * 60); // Convert ms to minutes



            
//             result[dateKey][hourRange].totalDuration += duration;
//           }
//         });
//       }
//     }
//   });

//   // Aggregate totals for each interval across all days, and apply the rate for cost calculation
//   const aggregatedResult = hourRanges.reduce((acc, hourRange) => {
//     acc[hourRange] = { totalDuration: 0, cost: 0 }; // Initialize both totalDuration and cost
//     Object.values(result).forEach((dayData) => {
//       acc[hourRange].totalDuration += dayData[hourRange].totalDuration; // Sum up durations
//     });

//     acc[hourRange].cost = acc[hourRange].totalDuration * rate; // Apply the rate here for cost calculation

//     return acc;
//   }, {});

//   // Find the highest values
//   let highestDuration = { hourRange: "", totalDuration: 0 };
//   let highestCost = { hourRange: "", cost: 0 };

//   Object.entries(aggregatedResult).forEach(([hourRange, data]) => {
//     if (data.totalDuration > highestDuration.totalDuration) {
//       highestDuration = { hourRange, totalDuration: data.totalDuration };
//     }
//     if (data.cost > highestCost.cost) {
//       highestCost = { hourRange, cost: data.cost };
//     }
//   });

//   // Calculate total cost
//   const totalcost = Object.values(aggregatedResult).reduce(
//     (sum, data) => sum + data.cost,
//     0
//   );

// // Calculate the average cost for intervals with non-zero values
//   const nonZeroIntervals = Object.values(aggregatedResult).filter((data) => data.cost > 0);
//   const averageCost = nonZeroIntervals.reduce((sum, data) => sum + data.cost, 0) / nonZeroIntervals.length;
  

//   return {
//     dailyDurations: result,
//     totalByIntervals: aggregatedResult,
//     highestDuration,
//     highestCost,
//     totalcost,
//     averageCost,
//   };
// };



// const formatParkingData = (data, startDate, endDate) => {
//   try {
//     const parsedData = JSON.parse(data); // Parse JSON data

//     // Convert start and end dates to UTC string format
//     const startUTC = moment.utc(startDate).format("YYYY-MM-DD");
//     const endUTC = moment.utc(endDate).format("YYYY-MM-DD");

//     return Object.values(parsedData)
//       .filter((entry) => {
//         const entryDate = moment.utc(entry.timeIn, "YYYY-MM-DD h:mm A").format("YYYY-MM-DD");
//         console.log("Entry Date:", entryDate); //
//         return entryDate >= startUTC && entryDate <= endUTC;
//       })
//       .map((entry) => {
//         // Calculate the duration in minutes
//         const timeIn = moment.utc(entry.timeIn, "YYYY-MM-DD h:mm A");
//         const timeOut = moment.utc(entry.timeOut, "YYYY-MM-DD h:mm A");
//         const durationInMinutes = timeOut.diff(timeIn, 'minutes');

//         // Convert duration to hours and calculate cost
//         const durationInHours = durationInMinutes / 60;
//         const cost = (durationInHours * Rate).toFixed(2);

//         // return `${entry.vehicleType} - Time In: ${entry.timeIn}, Time Out: ${entry.timeOut}, Duration: ${durationInHours.toFixed(2)} minutes, Cost: $${cost}`;
     
//         return `${entry.vehicleType} - Time In: ${entry.timeIn}, Time Out: ${entry.timeOut},  Cost: $${cost}`;
//       });
//   } catch (error) {
//     throw new Error("Invalid JSON data");
//   }
// };

const formatParkingData = (data, startDate, endDate) => { 
  try {
    const parsedData = JSON.parse(data); // Parse JSON data

    // Convert start and end dates to UTC string format
    const startUTC = moment.utc(startDate).format("YYYY-MM-DD");
    const endUTC = moment.utc(endDate).format("YYYY-MM-DD");

    return Object.values(parsedData)
      .sort((a, b) => moment.utc(a.timeIn, "YYYY-MM-DD h:mm A").valueOf() - moment.utc(b.timeIn, "YYYY-MM-DD h:mm A").valueOf()) // Sort by timeIn
      .filter((entry) => {
        const entryDate = moment.utc(entry.timeIn, "YYYY-MM-DD h:mm A").format("YYYY-MM-DD");
        return entryDate >= startUTC && entryDate <= endUTC;
      })
      .map((entry) => {
        // Calculate the duration in minutes
        const timeIn = moment.utc(entry.timeIn, "YYYY-MM-DD h:mm A");
        const timeOut = moment.utc(entry.timeOut, "YYYY-MM-DD h:mm A");
        const durationInMinutes = timeOut.diff(timeIn, 'minutes');

        // Convert duration to hours for cost calculation
        const durationInHours = durationInMinutes / 60;
        const cost = (durationInHours * Rate).toFixed(2);

        return `${entry.vehicleType} - Time In: ${entry.timeIn}, Time Out: ${entry.timeOut}, Cost: ${cost}`;
      });
  } catch (error) {
    throw new Error("Invalid JSON data");
  }
};



const calculateDurationByIntervals = (startDate, endDate, vehicles, rate) => {
  // Generate all hour ranges
  const generateHourRanges = () => {
    const ranges = [];
    for (let i = 0; i < 24; i += 2) {
      const start = `${String(i).padStart(2, "0")}:00`;
      const end = `${String((i + 2) % 24).padStart(2, "0")}:00`;
      ranges.push(`${start}-${end}`);
    }
    return ranges;
  };

  const hourRanges = generateHourRanges();
  const result = {};

  // Initialize the result object for each hour range across all days
  for (
    let currentDate = new Date(startDate);
    currentDate <= new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dateKey = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    result[dateKey] = {};

    hourRanges.forEach((hourRange) => {
      result[dateKey][hourRange] = {
        totalDuration: 0,
        durations: [], // Initialize durations array to calculate average later
        cost: 0, // Add cost to each interval
      };
    });
  }

  // Iterate through vehicles and calculate duration for each interval
  vehicles.forEach((vehicle) => {
    const timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
    const timeOut = moment.utc(vehicle.timeOut, "YYYY-MM-DD hh:mm A").toDate();

    for (
      let currentDate = new Date(startDate);
      currentDate <= new Date(endDate);
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      const dateKey = currentDate.toISOString().split("T")[0];

      const dayStart = moment
        .utc(dateKey, "YYYY-MM-DD")
        .add(5, "hours")
        .startOf("day")
        .toDate();

      const dayEnd = moment
        .utc(dateKey, "YYYY-MM-DD")
        .add(5, "hours")
        .endOf("day")
        .toDate();

      // Check if vehicle overlaps with the current day
      if (timeIn <= dayEnd && timeOut >= dayStart) {
        // Determine the actual overlap period for this day
        const overlapStart = new Date(Math.max(dayStart, timeIn));
        const overlapEnd = new Date(Math.min(dayEnd, timeOut));

        hourRanges.forEach((hourRange) => {
          const adjustedHourRange = hourRange.replace("-00:00", "-24:00");

          const [hourStart, hourEnd] = adjustedHourRange.split("-").map((time) => {
            const [hour, minute] = time.split(":").map(Number);
            const rangeDate = new Date(dateKey); // Base date (e.g., 2023-01-14T00:00:00.000Z)
            rangeDate.setUTCHours(hour, minute, 0, 0); // Use UTC to avoid timezone issues
            return rangeDate;
          });

          // Special handling for the "22:00-00:00" range to ensure "End" remains on the same day
          if (hourEnd.getUTCHours() === 0) {
            hourEnd.setUTCDate(hourEnd.getUTCDate() - 1); // Adjust back to the same day
            hourEnd.setUTCHours(24, 0, 0, 0); // Set to 00:00:00 on the same day
          }

          // Correctly compare the overlap
          if (overlapStart <= hourEnd && overlapEnd >= hourStart) {
            const intervalStart = new Date(Math.max(overlapStart, hourStart));
            const intervalEnd = new Date(Math.min(overlapEnd, hourEnd));
            const duration = (intervalEnd - intervalStart) / (1000 * 60); // Convert ms to minutes

            // Store the duration for averaging later
            result[dateKey][hourRange].durations.push(duration);
          }
        });
      }
    }
  });

  // // After collecting all durations, calculate average durations and total cost
  // Object.keys(result).forEach((dateKey) => {
  //   Object.keys(result[dateKey]).forEach((hourRange) => {
  //     const durations = result[dateKey][hourRange].durations;

  //     if (durations.length > 1) {
  //       // If there are multiple durations, calculate the average
  //       result[dateKey][hourRange].totalDuration =
  //         durations.reduce((sum, dur) => sum + dur, 0) / durations.length;
  //     } else if (durations.length === 1) {
  //       // If there is only one vehicle, use that duration
  //       result[dateKey][hourRange].totalDuration = durations[0];
  //     } else {
  //       // No vehicles in this interval
  //       result[dateKey][hourRange].totalDuration = 0;
  //     }

  //     // Calculate cost based on the totalDuration
  //     result[dateKey][hourRange].cost = result[dateKey][hourRange].totalDuration * rate;
  //   });
  // });

  // // Aggregate totals for each interval across all days, and apply the rate for cost calculation
  // const aggregatedResult = hourRanges.reduce((acc, hourRange) => {
  //   acc[hourRange] = { totalDuration: 0, cost: 0 }; // Initialize both totalDuration and cost
  //   Object.values(result).forEach((dayData) => {
  //     acc[hourRange].totalDuration += dayData[hourRange].totalDuration; // Sum up durations
  //   });

  //   acc[hourRange].cost = acc[hourRange].totalDuration * rate; // Apply the rate here for cost calculation

  //   return acc;
  // }, {});

  // // Find the highest values
  // let highestDuration = { hourRange: "", totalDuration: 0 };
  // let highestCost = { hourRange: "", cost: 0 };

  // Object.entries(aggregatedResult).forEach(([hourRange, data]) => {
  //   if (data.totalDuration > highestDuration.totalDuration) {
  //     highestDuration = { hourRange, totalDuration: data.totalDuration };
  //   }
  //   if (data.cost > highestCost.cost) {
  //     highestCost = { hourRange, cost: data.cost };
  //   }
  // });

  // // Calculate total cost
  // const totalcost = Object.values(aggregatedResult).reduce(
  //   (sum, data) => sum + data.cost,
  //   0
  // );

  // // Calculate the average cost for intervals with non-zero values
  // const nonZeroIntervals = Object.values(aggregatedResult).filter((data) => data.cost > 0);
  // const averageCost = nonZeroIntervals.reduce((sum, data) => sum + data.cost, 0) / nonZeroIntervals.length;

  // return {
  //   dailyDurations: result,
  //   totalByIntervals: aggregatedResult,
  //   highestDuration,
  //   highestCost,
  //   totalcost,
  //   averageCost,
  // };


// After collecting all durations, calculate average durations and total cost
Object.keys(result).forEach((dateKey) => {
  let totalDailyDuration = 0;
  let totalVehicleCount = 0;

  Object.keys(result[dateKey]).forEach((hourRange) => {
    const durations = result[dateKey][hourRange].durations;
    const vehicleCount = durations.length;

    if (vehicleCount > 0) {
      totalVehicleCount += vehicleCount;

      // If there are multiple durations, calculate the average for the hour range
      const hourDuration = durations.reduce((sum, dur) => sum + dur, 0) / vehicleCount;
      result[dateKey][hourRange].totalDuration = hourDuration;

      // Add to the daily total duration
      totalDailyDuration += hourDuration;
    } else {
      // No vehicles in this interval
      result[dateKey][hourRange].totalDuration = 0;
    }

    // Calculate cost based on the totalDuration
    result[dateKey][hourRange].cost = result[dateKey][hourRange].totalDuration * rate;
  });

  // Calculate the daily average duration for this date
  // The average is the total daily duration divided by the total number of vehicles
  result[dateKey].dailyAverageDuration = totalVehicleCount > 0
    ? totalDailyDuration / totalVehicleCount
    : 0; // Handle the case where there are no vehicles
});

// Aggregate totals for each interval across all days, and apply the rate for cost calculation
const aggregatedResult = hourRanges.reduce((acc, hourRange) => {
  acc[hourRange] = { totalDuration: 0, cost: 0 }; // Initialize both totalDuration and cost
  Object.values(result).forEach((dayData) => {
    acc[hourRange].totalDuration += dayData[hourRange].totalDuration; // Sum up durations
  });

  acc[hourRange].cost = acc[hourRange].totalDuration * rate; // Apply the rate here for cost calculation

  return acc;
}, {});

// Find the highest values
let highestDuration = { hourRange: "", totalDuration: 0 };
let highestCost = { hourRange: "", cost: 0 };

Object.entries(aggregatedResult).forEach(([hourRange, data]) => {
  if (data.totalDuration > highestDuration.totalDuration) {
    highestDuration = { hourRange, totalDuration: data.totalDuration };
  }
  if (data.cost > highestCost.cost) {
    highestCost = { hourRange, cost: data.cost };
  }
});



  // Calculate total cost
  const totalcost = Object.values(aggregatedResult).reduce(
    (sum, data) => sum + data.cost,
    0
  );


// Calculate the average cost for intervals with non-zero values
const nonZeroIntervals = Object.values(aggregatedResult).filter((data) => data.cost > 0);
const averageCost = nonZeroIntervals.reduce((sum, data) => sum + data.cost, 0) / nonZeroIntervals.length;

// Calculate the whole day average across all days
const wholeDayAverage =
  Object.keys(result).reduce((sum, dateKey) => {
    const dailyAverage = result[dateKey].dailyAverageDuration;
    return sum + (isNaN(dailyAverage) ? 0 : dailyAverage); // Only add valid daily averages
  }, 0) / Object.keys(result).length;

return {
  dailyDurations: result,
  totalByIntervals: aggregatedResult,
  highestDuration,
  highestCost,
  totalcost,
  averageCost,
  wholeDayAverage,
};



};



router.get("/parkingNames", (req, res) => {
  fs.readdir(NewBaseDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error reading directory", details: err });
    }
    const parkingNames = files
      .filter((file) => file.isDirectory())
      .map((file) => file.name);
    res.json(parkingNames);
  });
});

router.get("/parkingData", (req, res) => {
  // const parking = req.query.parking; // Get parking name from query parameter

  const {
    startDate: queryStartDate,
    endDate: queryEndDate,
    parking,
  } = req.query;

  if (!parking) {
    return res.status(400).json({ error: "Parking name is required" });
  }

  const dynamicStartDate = queryStartDate
    ? moment.utc(queryStartDate).startOf("day").toDate()
    : moment.utc().startOf("day").toDate(); // Start of today in UTC

  const dynamicEndDate = queryEndDate
    ? moment.utc(queryEndDate).endOf("day").toDate() // End of queryEndDate in UTC
    : moment.utc().endOf("day").toDate();

  const parkingDir = path.join(NewBaseDir, parking, "data.json");

  // Read the JSON file inside the specified parking directory
  fs.readFile(parkingDir, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error reading parking data", details: err.message });
    }

    try {
      // Send the raw parsed JSON data
      const parsedData = JSON.parse(data);
      const result = formatParkingData(data,dynamicStartDate, dynamicEndDate);
      const vehicleCount = countVehicles(
        dynamicStartDate,
        dynamicEndDate,
        parsedData
      );
      const calculationDurations = calculateDuration(
        dynamicStartDate,
        dynamicEndDate,
        parsedData
      );
      const updatedDurationsWithCost = calculateCost(calculationDurations);
      // const dynamicStartDate = '2023-01-14';

      console.log("Start!!!!!!!!!!!!!!!!!!!!", dynamicStartDate);
      console.log("End!!!!!!!!!!!!!!!!!!!!", dynamicEndDate);

      // const totalCost = calculateTotalCost(updatedDurationsWithCost);

      const vehicles = Object.values(parsedData);
      //  Get filtered vehicles for the specified date range
      // const filteredVehicles = filterVehicles(parsedData, dynamicStartDate, dynamicEndDate);

      // console.log('Filtered:', filteredVehicles);

      const {
        dailyDurations,
        totalByIntervals,
        highestDuration,
        highestCost,
        totalcost,
        averageCost,
        wholeDayAverage,
      } = calculateDurationByIntervals(
        dynamicStartDate,
        dynamicEndDate,
        vehicles,
        Rate
      );
      console.log("Daily Durations:", dailyDurations);
      console.log("Total by Intervals:", totalByIntervals);
      console.log("Highest Duration Value", highestDuration);
      console.log("highest Cost value", highestCost);
      console.log("total cost", totalcost);
      console.log("averaegcost",averageCost);
      console.log("wholeDay",wholeDayAverage)

      const resultSameDate = processVehicleData(
        dynamicStartDate,
        dynamicEndDate,
        vehicles
      );
      // console.log("Result for Same Date Range:", resultSameDate);

     // const resultSameDate = processVehicleData(
     //   "2025-01-21T00:00:00.000Z",
     //   "2025-01-21T23:59:59.999Z",
     //   vehicles
     // );

     console.log("Result for Same Date Range:", resultSameDate);

      // Example usage for Different Date Range

      console.log("DisplayVehiclewithTime", result);
      console.log("vehcileCount", vehicleCount);
      console.log("calculationDuration", calculationDurations);
      console.log("Updated Durations with Cost:", updatedDurationsWithCost);
      // console.log('Total Cost:', totalCost); // 4265

      const combinedData = {
        dailyDurations,
        highestDuration,
        highestCost,
        totalcost,
        vehicleCount,
        resultSameDate,
        averageCost,
        totalByIntervals,
        result,
      };

      // res.json(parsedData);
      res.json(combinedData);
    } catch (parseError) {
      res.status(500).json({
        error: "Error parsing JSON data",
        details: parseError.message,
      });
    }
  });
});






const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = req.body.name; // Get folder name from request body
    const mainFolderPath = path.join(__dirname, "..", "allParking", folderName);

    // Create the main folder if it doesn't exist
    if (!fs.existsSync(mainFolderPath)) {
      fs.mkdirSync(mainFolderPath, { recursive: true });
    }

    cb(null, mainFolderPath); // Set the folder as the destination
  },
  filename: (req, file, cb) => {
    // Ensure the file is a JSON file
    if (file.mimetype === 'application/json') {
      const originalName = file.originalname;
      const extname = path.extname(originalName);
      
      // Ensure the file extension is .json
      const fileName = originalName.replace(extname, '.json'); 

      cb(null, fileName); // Use the original name but with .json extension
    } else {
      cb(new Error('Only .json files are allowed'), false); // Reject non-json files
    }
  },
});

const upload = multer({ storage });

// Route to handle JSON file upload
router.post('/upload', upload.single('data.json'), (req, res) => {
  const folderName = req.body.name;

  if (!folderName) {
    return res.status(400).json({ error: 'Folder name is required.' });
  }

  res.status(200).json({
    message: `JSON file uploaded successfully to folder: ${folderName}`,
  });
});




module.exports = router;