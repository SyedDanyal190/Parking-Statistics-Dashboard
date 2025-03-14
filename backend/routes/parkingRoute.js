const multer = require("multer");
const fs = require("fs");
const moment = require("moment");

const path = require("path");
const express = require("express");

const router = express.Router();

const NewBaseDir = path.join(__dirname, "..", "allParking");

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

// const Rate = 5;
const Rate = 5 / 60; // 0.0833 (5 dollars per hour)


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

const formatParkingData = (data, startDate, endDate) => {
  try {
    const parsedData = JSON.parse(data); // Parse JSON data

    // Convert start and end dates to UTC string format
    const startUTC = moment.utc(startDate).format("YYYY-MM-DD");
    const endUTC = moment.utc(endDate).format("YYYY-MM-DD");

    return Object.values(parsedData)
      .sort(
        (a, b) =>
          moment.utc(a.timeIn, "YYYY-MM-DD h:mm A").valueOf() -
          moment.utc(b.timeIn, "YYYY-MM-DD h:mm A").valueOf()
      ) // Sort by timeIn
      .filter((entry) => {
        const entryDate = moment
          .utc(entry.timeIn, "YYYY-MM-DD h:mm A")
          .format("YYYY-MM-DD");
        return entryDate >= startUTC && entryDate <= endUTC;
      })
      .map((entry) => {
        // Replace missing timeOut with current date and time
        if (!entry.timeOut || entry.timeOut.trim() === "") {
          entry.timeOut = moment.utc().format("YYYY-MM-DD h:mm A");
        }
        // Calculate the duration in minutes
        const timeIn = moment.utc(entry.timeIn, "YYYY-MM-DD h:mm A");
        const timeOut = moment.utc(entry.timeOut, "YYYY-MM-DD h:mm A");
        const durationInMinutes = timeOut.diff(timeIn, "minutes");

        // Convert duration to hours for cost calculation
        // const durationInHours = durationInMinutes / 60;
        // const cost = (durationInHours * Rate).toFixed(2);

        const cost = (durationInMinutes * Rate).toFixed(2);

        // return `${entry.vehicleType} - Time In: ${entry.timeIn}, Time Out: ${entry.timeOut}, Cost: ${cost}`;
        //// Add  VehicleNumber
        return `${entry.vehicleType} - Vehicle Number: ${entry.vehicleNumber}, Time In: ${entry.timeIn}, Time Out: ${entry.timeOut}, Cost: ${cost}, Bay: ${entry.bay}, Level :${entry.level},`;
      });
  } catch (error) {
    throw new Error("Invalid JSON data");
  }
};

const formatParkingDataOtherValues = (
  data,
  startDate,
  endDate,
  updatedTimeOuts
) => {
  try {
    const parsedData = typeof data === "string" ? JSON.parse(data) : data;
    if (!parsedData || Object.keys(parsedData).length === 0) {
      return { totalCost: 0, vehicleCount: 0 };
    }

    const startUTC = moment.utc(startDate).format("YYYY-MM-DD");
    const endUTC = moment.utc(endDate).format("YYYY-MM-DD");
    // const Rate = 5; // Cost per minute
    const Rate = 5 / 60; // 0.0833 (5 dollars per hour)
    let totalCost = 0;
    let vehicleCount = 0;

    Object.values(parsedData)
      .sort(
        (a, b) =>
          moment.utc(a.timeIn, "YYYY-MM-DD h:mm A").valueOf() -
          moment.utc(b.timeIn, "YYYY-MM-DD h:mm A").valueOf()
      )
      .filter((entry) => {
        const entryDate = moment
          .utc(entry.timeIn, "YYYY-MM-DD h:mm A")
          .format("YYYY-MM-DD");
        return entryDate >= startUTC && entryDate <= endUTC;
      })
      .forEach((entry) => {
        let timeOut = entry.timeOut;

        // ✅ If `timeOut` is missing, try getting it from `updatedTimeOuts`
        if (!timeOut) {
          const matchedTimeout = Object.values(updatedTimeOuts).find(
            (item) =>
              item.vehicleNumber === entry.vehicleNumber &&
              item.timeIn === entry.timeIn
          );

          if (matchedTimeout) {
            timeOut = matchedTimeout.timeOut;
            // console.log(
            //   `✅ Applied updated timeout for ${entry.vehicleNumber}: ${timeOut}`
            // );
          } else {
            // console.log(
            //   `❌ No updated timeout for vehicle: ${entry.vehicleNumber}, Skipping...`
            // );
            return; // Skip this entry
          }
        }

        // ✅ Calculate cost if `timeOut` is available
        const timeIn = moment.utc(entry.timeIn, "YYYY-MM-DD h:mm A");
        const timeOutMoment = moment.utc(timeOut, "YYYY-MM-DD h:mm A");
        const durationInMinutes = timeOutMoment.diff(timeIn, "minutes");
        const cost = (durationInMinutes * Rate).toFixed(2);

        totalCost += parseFloat(cost);
        vehicleCount++;
      });

    const averageCosting =
      vehicleCount > 0 ? parseFloat((totalCost / vehicleCount).toFixed(2)) : 0;

    return { totalCost, averageCosting, vehicleCount };
  } catch (error) {
    console.error("❌ Error parsing data:", error);
    throw new Error("Invalid JSON data");
  }
};


const calculateDurationByIntervals = (
  startDate,
  endDate,
  vehicles,
  rate,
  updatedTimeOuts
) => {
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
        durations: [],
        cost: 0,
      };
    });
  }

  // Iterate through vehicles and calculate duration for each interval
  vehicles.forEach((vehicle) => {
    let timeOut = vehicle.timeOut;

    // ✅ If timeOut is missing, try getting it from updatedTimeOuts
    if (!timeOut) {
      const matchedTimeout = Object.values(updatedTimeOuts).find(
        (item) =>
          item.vehicleNumber === vehicle.vehicleNumber &&
          item.timeIn === vehicle.timeIn
      );

      if (matchedTimeout) {
        timeOut = matchedTimeout.timeOut;
        // console.log(
        //   `✅ Applied updated timeout for ${vehicle.vehicleNumber}: ${timeOut}`
        // );
      } else {
        // console.log(
        //   `❌ No updated timeout for vehicle: ${vehicle.vehicleNumber}, Skipping...`
        // );
        return; // Skip this entry
      }
    }

    const timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
    timeOut = moment.utc(timeOut, "YYYY-MM-DD hh:mm A").toDate(); // Ensure timeOut is parsed correctly

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
        const overlapStart = new Date(Math.max(dayStart, timeIn));
        const overlapEnd = new Date(Math.min(dayEnd, timeOut));

        hourRanges.forEach((hourRange) => {
          const adjustedHourRange = hourRange.replace("-00:00", "-24:00");

          const [hourStart, hourEnd] = adjustedHourRange
            .split("-")
            .map((time) => {
              const [hour, minute] = time.split(":").map(Number);
              const rangeDate = new Date(dateKey);
              rangeDate.setUTCHours(hour, minute, 0, 0);
              return rangeDate;
            });

          if (hourEnd.getUTCHours() === 0) {
            hourEnd.setUTCDate(hourEnd.getUTCDate() - 1);
            hourEnd.setUTCHours(24, 0, 0, 0);
          }

          if (overlapStart <= hourEnd && overlapEnd >= hourStart) {
            const intervalStart = new Date(Math.max(overlapStart, hourStart));
            const intervalEnd = new Date(Math.min(overlapEnd, hourEnd));
            const duration = (intervalEnd - intervalStart) / (1000 * 60);

            result[dateKey][hourRange].durations.push(duration);
          }
        });
      }
    }
  });

  // After collecting all durations, calculate average durations and total cost
  Object.keys(result).forEach((dateKey) => {
    let totalDailyDuration = 0;
    let totalVehicleCount = 0;

    Object.keys(result[dateKey]).forEach((hourRange) => {
      const durations = result[dateKey][hourRange].durations;
      const vehicleCount = durations.length;

      if (vehicleCount > 0) {
        totalVehicleCount += vehicleCount;

        const hourDuration =
          durations.reduce((sum, dur) => sum + dur, 0) / vehicleCount;
        result[dateKey][hourRange].totalDuration = hourDuration;
        totalDailyDuration += hourDuration;
      } else {
        result[dateKey][hourRange].totalDuration = 0;
      }

      result[dateKey][hourRange].cost =
        result[dateKey][hourRange].totalDuration * rate;
    });

    result[dateKey].dailyAverageDuration =
      totalVehicleCount > 0 ? totalDailyDuration / totalVehicleCount : 0;
  });

  const aggregatedResult = hourRanges.reduce((acc, hourRange) => {
    acc[hourRange] = { totalDuration: 0, cost: 0 };
    Object.values(result).forEach((dayData) => {
      acc[hourRange].totalDuration += dayData[hourRange].totalDuration;
    });

    acc[hourRange].cost = acc[hourRange].totalDuration * rate;

    return acc;
  }, {});

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

  const totalcost = Object.values(aggregatedResult).reduce(
    (sum, data) => sum + data.cost,
    0
  );

  const nonZeroIntervals = Object.values(aggregatedResult).filter(
    (data) => data.cost > 0
  );
  const averageCost =
    nonZeroIntervals.reduce((sum, data) => sum + data.cost, 0) /
    nonZeroIntervals.length;

  const wholeDayAverage =
    Object.keys(result).reduce((sum, dateKey) => {
      const dailyAverage = result[dateKey].dailyAverageDuration;
      return sum + (isNaN(dailyAverage) ? 0 : dailyAverage);
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

const formatParkingData11 = (data2, startDate, endDate) => {
  try {
    // Parse JSON safely
    const parsedData = typeof data2 === "string" ? JSON.parse(data2) : data2;
    // console.log("Parsed Data:", parsedData);

    if (!parsedData || Object.keys(parsedData).length === 0) {
      console.warn("No valid parking data found.");
      return [];
    }

    const startUTC = moment.utc(startDate).format("YYYY-MM-DD");
    const endUTC = moment.utc(endDate).format("YYYY-MM-DD");
    // const Rate = 5;
    const Rate = 5 / 60; // 0.0833 (5 dollars per hour)
    return Object.values(parsedData)
      .sort((a, b) => {
        const timeA = moment.utc(a.timeIn, "YYYY-MM-DD h:mm A").valueOf();
        const timeB = moment.utc(b.timeIn, "YYYY-MM-DD h:mm A").valueOf();

        // console.log("Sorting:", a.timeIn, "->", timeA, "vs", b.timeIn, "->", timeB);

        return timeA - timeB;
      }) // Sort by timeIn
      .filter((entry) => {
        const entryDate = moment
          .utc(entry.timeIn, "YYYY-MM-DD h:mm A")
          .format("YYYY-MM-DD");

        // console.log("Filtering Entry:", entry.timeIn, "Parsed Date:", entryDate);
        // console.log("Start Date:", startUTC, "End Date:", endUTC);

        return entryDate >= startUTC && entryDate <= endUTC;
      })
      .map((entry) => {
        // console.log("Before Processing:", entry);

        // If timeOut is missing, set it to current time
        if (!entry.timeOut || entry.timeOut.trim() === "") {
          entry.timeOut = moment
            .utc()
            .add(5, "hours")
            .format("YYYY-MM-DD h:mm A");
          // console.log("Updated Missing timeOut:", entry.timeOut);
        }

        // Calculate the duration in minutes
        const timeIn = moment.utc(entry.timeIn, "YYYY-MM-DD h:mm A");
        const timeOut = moment.utc(entry.timeOut, "YYYY-MM-DD h:mm A");
        const durationInMinutes = timeOut.diff(timeIn, "minutes");

        // console.log("Duration:", entry.vehicleNumber, durationInMinutes, "minutes");

        // Calculate cost
        const cost = (durationInMinutes * Rate).toFixed(2);
        // console.log("Cost for", entry.vehicleNumber, ":", cost);

        return `${entry.vehicleType} - Vehicle Number: ${entry.vehicleNumber}, Time In: ${entry.timeIn}, Time Out: ${entry.timeOut}, Cost: ${cost}, Bay: ${entry.bay}, Level :${entry.level}`;

        // return {
        //   vehicleType: entry.vehicleType,
        //   vehicleNumber: entry.vehicleNumber,
        //   timeIn: entry.timeIn,
        //   timeOut: entry.timeOut,
        //   cost: cost,
        //   bay: entry.bay,
        //   level: entry.level,
        // };
      });
  } catch (error) {
    console.error("Error parsing data:", error);
    throw new Error("Invalid JSON data");
  }
};

const formatParkingData1223 = (updatedTimeOuts) => {
  // console.log("formatedddhjahjahjshaja", updatedTimeOuts);
  return updatedTimeOuts;
};

const formatParkingData122 = (data2, startDate, endDate, updatedTimeOuts) => {
  // console.log(
  //   "Received updatedTimeOuts inside formatParkingData122:",
  //   updatedTimeOuts
  // );

  try {
    const parsedData = typeof data2 === "string" ? JSON.parse(data2) : data2;
    if (!parsedData || Object.keys(parsedData).length === 0) {
      return [];
    }

    // console.log("Updated TimeOuts before processing:", updatedTimeOuts);

    const startUTC = moment.utc(startDate).format("YYYY-MM-DD");
    const endUTC = moment.utc(endDate).format("YYYY-MM-DD");
    // const Rate = 5; // Cost per minute
    const Rate = 5 / 60; // 0.0833 (5 dollars per hour)
    return Object.values(parsedData)
      .sort(
        (a, b) =>
          moment.utc(a.timeIn, "YYYY-MM-DD h:mm A").valueOf() -
          moment.utc(b.timeIn, "YYYY-MM-DD h:mm A").valueOf()
      ) // Sort by timeIn
      .filter((entry) => {
        const entryDate = moment
          .utc(entry.timeIn, "YYYY-MM-DD h:mm A")
          .format("YYYY-MM-DD");
        return entryDate >= startUTC && entryDate <= endUTC;
      })
      .map((entry) => {
        let timeOut = entry.timeOut;

        // ✅ Find the timeout in `updatedTimeOuts` using vehicleNumber & timeIn
        const matchedTimeout = Object.values(updatedTimeOuts).find(
          (item) =>
            item.vehicleNumber === entry.vehicleNumber &&
            item.timeIn === entry.timeIn
        );

        if (!timeOut && matchedTimeout) {
          timeOut = matchedTimeout.timeOut;
          console.log(
            `✅ Applied updated timeout for ${entry.vehicleNumber}: ${timeOut}`
          );
        } else if (!timeOut) {
          console.log(
            `❌ No updated timeout for vehicle: ${entry.vehicleNumber}`
          );
        }

        let cost = "";
        if (timeOut) {
          const timeIn = moment.utc(entry.timeIn, "YYYY-MM-DD h:mm A");
          // const timeOutMoment = moment.utc(timeOut, "ddd MMM DD YYYY HH:mm:ss [GMT]Z"); // Parse the new format
          const timeOutMoment = moment.utc(timeOut, "YYYY-MM-DD h:mm A");
          const durationInMinutes = timeOutMoment.diff(timeIn, "minutes");
          cost = (durationInMinutes * Rate).toFixed(2);
        }

        return `${entry.vehicleType} - Vehicle Number: ${entry.vehicleNumber}, Time In: ${entry.timeIn}, Time Out: ${timeOut}, Cost: ${cost}, Bay: ${entry.bay}, Level: ${entry.level}`;
      });
  } catch (error) {
    console.error("Error parsing data:", error);
    throw new Error("Invalid JSON data");
  }
};



const formatParkingData12233 = (data2, startDate, endDate, updatedTimeOuts) => {
  // console.log(
  //   "Received updatedTimeOuts inside formatParkingData122:",
  //   updatedTimeOuts
  // );

  try {
    const parsedData = typeof data2 === "string" ? JSON.parse(data2) : data2;
    if (!parsedData || Object.keys(parsedData).length === 0) {
      return [];
    }

    // console.log("Updated TimeOuts before processing:", updatedTimeOuts);

    const startUTC = moment.utc(startDate).format("YYYY-MM-DD");
    const endUTC = moment.utc(endDate).format("YYYY-MM-DD");
    // const Rate = 5; // Cost per minute
    const Rate = 5 / 60; // 0.0833 (5 dollars per hour)
    return Object.values(parsedData)
      .sort(
        (a, b) =>
          moment.utc(a.timeIn, "YYYY-MM-DD h:mm A").valueOf() -
          moment.utc(b.timeIn, "YYYY-MM-DD h:mm A").valueOf()
      ) // Sort by timeIn
      .filter((entry) => {
        const entryDate = moment
          .utc(entry.timeIn, "YYYY-MM-DD h:mm A")
          .format("YYYY-MM-DD");
        return entryDate >= startUTC && entryDate <= endUTC;
      })
      .map((entry) => {
        let timeOut = entry.timeOut;

        // ✅ Find the timeout in `updatedTimeOuts` using vehicleNumber & timeIn
        const matchedTimeout = Object.values(updatedTimeOuts).find(
          (item) =>
            item.vehicleNumber === entry.vehicleNumber &&
            item.timeIn === entry.timeIn
        );

        if (!timeOut && matchedTimeout) {
          timeOut = matchedTimeout.timeOut;
          console.log(
            `✅ Applied updated timeout for ${entry.vehicleNumber}: ${timeOut}`
          );
        } else if (!timeOut) {
          console.log(
            `❌ No updated timeout for vehicle: ${entry.vehicleNumber}`
          );
        }

        let cost = "";
        if (timeOut) {
          const timeIn = moment.utc(entry.timeIn, "YYYY-MM-DD h:mm A");
          // const timeOutMoment = moment.utc(timeOut, "ddd MMM DD YYYY HH:mm:ss [GMT]Z"); // Parse the new format
          const timeOutMoment = moment.utc(timeOut, "YYYY-MM-DD h:mm A");
          const durationInMinutes = timeOutMoment.diff(timeIn, "minutes");
          cost = (durationInMinutes * Rate).toFixed(2);
        }

        return `${entry.vehicleType} - Vehicle Number: ${entry.vehicleNumber}, Time In: ${entry.timeIn}, Time Out: ${timeOut}, Cost: ${cost}, Bay: ${entry.bay}, Level: ${entry.level}`;
      });
  } catch (error) {
    console.error("Error parsing data:", error);
    throw new Error("Invalid JSON data");
  }
};



// const processVehicleData = (startDate, endDate, vehicles, updatedTimeOuts) => {
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
//           vehicles: {},
//         };
//         return acc;
//       }, {});
//     }

//     vehicles.forEach((vehicle) => {
//       let timeOut = vehicle.timeOut; // Original timeOut

//       // ✅ If timeOut is missing, check updatedTimeOuts
//       if (!timeOut) {
//         const matchedTimeout = Object.values(updatedTimeOuts).find(
//           (item) =>
//             item.vehicleNumber === vehicle.vehicleNumber &&
//             item.timeIn === vehicle.timeIn
//         );

//         if (matchedTimeout) {
//           timeOut = matchedTimeout.timeOut;
//           // console.log(
//           //   `✅ Applied updated timeout for ${vehicle.vehicleNumber}: ${timeOut}`
//           // );
//         } else {
//           // console.log(
//           //   `❌ No updated timeout for vehicle: ${vehicle.vehicleNumber}, Skipping...`
//           // );
//           return; // Skip this vehicle
//         }
//       }

//       const timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
//       timeOut = moment.utc(timeOut, "YYYY-MM-DD hh:mm A").toDate();
//       const duration = (timeOut - timeIn) / 60000; // Convert milliseconds to minutes
//       const vehicleType = vehicle.vehicleType.toLowerCase();

//       if (
//         timeIn.toISOString().split("T")[0] === dateKey ||
//         timeOut.toISOString().split("T")[0] === dateKey
//       ) {
//         generateHourRanges().forEach((hourRange) => {
//           const standardizedRange = hourRange.replace("-00:00", "-24:00");
//           const [hourStart, hourEnd] = standardizedRange
//             .split("-")
//             .map((time) => parseInt(time.split(":")[0]));

//           const vehicleStartHour = getHour(vehicle.timeIn);
//           const vehicleEndHour = getHour(timeOut);

//           if (
//             (vehicleStartHour >= hourStart && vehicleStartHour < hourEnd) ||
//             (vehicleStartHour <= hourStart && vehicleEndHour >= hourEnd)
//           ) {
//             result[dateKey][hourRange].total += 1;
//             result[dateKey][hourRange][vehicleType] += 1;

//             if (!result[dateKey][hourRange].vehicles[vehicleType]) {
//               result[dateKey][hourRange].vehicles[vehicleType] = {
//                 totalDuration: 0,
//                 count: 0,
//               };
//             }

//             result[dateKey][hourRange].vehicles[vehicleType].totalDuration +=
//               duration;
//             result[dateKey][hourRange].vehicles[vehicleType].count += 1;
//           }
//         });
//       }
//     });

//     // Convert stored durations to averages
//     Object.keys(result[dateKey]).forEach((hourRange) => {
//       const vehicleData = result[dateKey][hourRange].vehicles;
//       result[dateKey][hourRange].vehicles = Object.keys(vehicleData).map(
//         (type) => ({
//           type,
//           duration: parseFloat(
//             (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(
//               1
//             )
//           ),
//           avgDuration: parseFloat(
//             (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(
//               1
//             )
//           ),
//         })
//       );
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
//           vehicles: {},
//         };
//       }

//       vehicles.forEach((vehicle) => {
//         let timeOut = vehicle.timeOut; // Original timeOut

//         // ✅ If timeOut is missing, check updatedTimeOuts
//         if (!timeOut) {
//           const matchedTimeout = Object.values(updatedTimeOuts).find(
//             (item) =>
//               item.vehicleNumber === vehicle.vehicleNumber &&
//               item.timeIn === vehicle.timeIn
//           );

//           if (matchedTimeout) {
//             timeOut = matchedTimeout.timeOut;
//             // console.log(
//             //   `✅ Applied updated timeout for ${vehicle.vehicleNumber}: ${timeOut}`
//             // );
//           } else {
//             // console.log(
//             //   `❌ No updated timeout for vehicle: ${vehicle.vehicleNumber}, Skipping...`
//             // );
//             return; // Skip this vehicle
//           }
//         }

//         const timeIn = moment
//           .utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A")
//           .toDate();
//         timeOut = moment.utc(timeOut, "YYYY-MM-DD hh:mm A").toDate();
//         const duration = (timeOut - timeIn) / 60000;
//         const vehicleType = vehicle.vehicleType.toLowerCase();

//         if (
//           timeIn <= end &&
//           timeOut >= start &&
//           new Date(dateKey).setUTCHours(0, 0, 0, 0) <= timeOut.getTime() &&
//           new Date(dateKey).setUTCHours(23, 59, 59, 999) >= timeIn.getTime()
//         ) {
//           result[dateKey].total += 1;
//           result[dateKey][vehicleType] += 1;

//           if (!result[dateKey].vehicles[vehicleType]) {
//             result[dateKey].vehicles[vehicleType] = {
//               totalDuration: 0,
//               count: 0,
//             };
//           }

//           result[dateKey].vehicles[vehicleType].totalDuration += duration;
//           result[dateKey].vehicles[vehicleType].count += 1;
//         }
//       });

//       // Convert stored durations to averages
//       const vehicleData = result[dateKey].vehicles;
//       result[dateKey].vehicles = Object.keys(vehicleData).map((type) => ({
//         type,
//         duration: parseFloat(
//           (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1)
//         ),
//         avgDuration: parseFloat(
//           (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1)
//         ),
//       }));
//     }
//   }

//   return result;
// };


// const processVehicleData = (startDate, endDate, vehicles, updatedTimeOuts) => {
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
//           vehicles: {},
//         };
//         return acc;
//       }, {});
//     }

//     vehicles.forEach((vehicle) => {
//       let timeOut = vehicle.timeOut;

//       if (!timeOut) {
//         const matchedTimeout = Object.values(updatedTimeOuts).find(
//           (item) =>
//             item.vehicleNumber === vehicle.vehicleNumber &&
//             item.timeIn === vehicle.timeIn
//         );

//         if (matchedTimeout) {
//           timeOut = matchedTimeout.timeOut;
//         } else {
//           return;
//         }
//       }

//       let timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
//       timeOut = moment.utc(timeOut, "YYYY-MM-DD hh:mm A").toDate();
//       const vehicleType = vehicle.vehicleType.toLowerCase();

//       // Ensure duration is only for the specific day
//       let dailyDuration = Math.min(
//         (timeOut - timeIn) / 60000,
//         1440 - timeIn.getUTCHours() * 60 - timeIn.getUTCMinutes()
//       );

//       if (
//         timeIn.toISOString().split("T")[0] === dateKey ||
//         timeOut.toISOString().split("T")[0] === dateKey
//       ) {
//         generateHourRanges().forEach((hourRange) => {
//           const standardizedRange = hourRange.replace("-00:00", "-24:00");
//           const [hourStart, hourEnd] = standardizedRange
//             .split("-")
//             .map((time) => parseInt(time.split(":")[0]));

//           const vehicleStartHour = getHour(vehicle.timeIn);
//           const vehicleEndHour = getHour(timeOut);

//           if (
//             (vehicleStartHour >= hourStart && vehicleStartHour < hourEnd) ||
//             (vehicleStartHour <= hourStart && vehicleEndHour >= hourEnd)
//           ) {
//             result[dateKey][hourRange].total += 1;
//             result[dateKey][hourRange][vehicleType] += 1;

//             if (!result[dateKey][hourRange].vehicles[vehicleType]) {
//               result[dateKey][hourRange].vehicles[vehicleType] = {
//                 totalDuration: 0,
//                 count: 0,
//               };
//             }

//             result[dateKey][hourRange].vehicles[vehicleType].totalDuration +=
//               dailyDuration;
//             result[dateKey][hourRange].vehicles[vehicleType].count += 1;
//           }
//         });
//       }
//     });

//     Object.keys(result[dateKey]).forEach((hourRange) => {
//       const vehicleData = result[dateKey][hourRange].vehicles;
//       result[dateKey][hourRange].vehicles = Object.keys(vehicleData).map(
//         (type) => ({
//           type,
//           duration: parseFloat(
//             (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(
//               1
//             )
//           ),
//           avgDuration: parseFloat(
//             (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(
//               1
//             )
//           ),
//         })
//       );
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
//           vehicles: {},
//         };
//       }

//       vehicles.forEach((vehicle) => {
//         let timeOut = vehicle.timeOut;

//         if (!timeOut) {
//           const matchedTimeout = Object.values(updatedTimeOuts).find(
//             (item) =>
//               item.vehicleNumber === vehicle.vehicleNumber &&
//               item.timeIn === vehicle.timeIn
//           );

//           if (matchedTimeout) {
//             timeOut = matchedTimeout.timeOut;
//           } else {
//             return;
//           }
//         }

//         let timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
//         timeOut = moment.utc(timeOut, "YYYY-MM-DD hh:mm A").toDate();
//         const vehicleType = vehicle.vehicleType.toLowerCase();

//         let dailyStart = new Date(dateKey);
//         dailyStart.setUTCHours(0, 0, 0, 0);
//         let dailyEnd = new Date(dateKey);
//         dailyEnd.setUTCHours(23, 59, 59, 999);

//         let adjustedTimeIn = timeIn < dailyStart ? dailyStart : timeIn;
//         let adjustedTimeOut = timeOut > dailyEnd ? dailyEnd : timeOut;

//         let dailyDuration = (adjustedTimeOut - adjustedTimeIn) / 60000;

//         if (
//           timeIn <= end &&
//           timeOut >= start &&
//           dailyStart.getTime() <= timeOut.getTime() &&
//           dailyEnd.getTime() >= timeIn.getTime()
//         ) {
//           result[dateKey].total += 1;
//           result[dateKey][vehicleType] += 1;

//           if (!result[dateKey].vehicles[vehicleType]) {
//             result[dateKey].vehicles[vehicleType] = {
//               totalDuration: 0,
//               count: 0,
//             };
//           }

//           result[dateKey].vehicles[vehicleType].totalDuration += dailyDuration;
//           result[dateKey].vehicles[vehicleType].count += 1;
//         }
//       });

//       const vehicleData = result[dateKey].vehicles;
//       result[dateKey].vehicles = Object.keys(vehicleData).map((type) => ({
//         type,
//         duration: parseFloat(
//           (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1)
//         ),
//         avgDuration: parseFloat(
//           (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1)
//         ),
//       }));
//     }
//   }

//   return result;
// };


// const rate = 5; // Fixed cost per minute
const rate = 5 / 60; // 0.0833 (5 dollars per hour)
const processVehicleData = (startDate, endDate, vehicles, updatedTimeOuts) => {
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
          vehicles: {},
          totalCost: 0, // Initialize total cost
        };
        return acc;
      }, {});
    }

    vehicles.forEach((vehicle) => {
      let timeOut = vehicle.timeOut;

      if (!timeOut) {
        const matchedTimeout = Object.values(updatedTimeOuts).find(
          (item) =>
            item.vehicleNumber === vehicle.vehicleNumber &&
            item.timeIn === vehicle.timeIn
        );

        if (matchedTimeout) {
          timeOut = matchedTimeout.timeOut;
        } else {
          return;
        }
      }

      let timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
      timeOut = moment.utc(timeOut, "YYYY-MM-DD hh:mm A").toDate();
      const vehicleType = vehicle.vehicleType.toLowerCase();

      let dailyDuration = Math.min(
        (timeOut - timeIn) / 60000,
        1440 - timeIn.getUTCHours() * 60 - timeIn.getUTCMinutes()
      );

      if (
        timeIn.toISOString().split("T")[0] === dateKey ||
        timeOut.toISOString().split("T")[0] === dateKey
      ) {
        generateHourRanges().forEach((hourRange) => {
          const standardizedRange = hourRange.replace("-00:00", "-24:00");
          const [hourStart, hourEnd] = standardizedRange
            .split("-")
            .map((time) => parseInt(time.split(":")[0]));

          const vehicleStartHour = getHour(vehicle.timeIn);
          const vehicleEndHour = getHour(timeOut);

          if (
            (vehicleStartHour >= hourStart && vehicleStartHour < hourEnd) ||
            (vehicleStartHour <= hourStart && vehicleEndHour >= hourEnd)
          ) {
            result[dateKey][hourRange].total += 1;
            result[dateKey][hourRange][vehicleType] += 1;

            if (!result[dateKey][hourRange].vehicles[vehicleType]) {
              result[dateKey][hourRange].vehicles[vehicleType] = {
                totalDuration: 0,
                count: 0,
                cost: 0,
              };
            }

            result[dateKey][hourRange].vehicles[vehicleType].totalDuration += dailyDuration;
            result[dateKey][hourRange].vehicles[vehicleType].count += 1;

            // Calculate cost per vehicle type
            const vehicleCost = dailyDuration * rate;
            result[dateKey][hourRange].vehicles[vehicleType].cost += vehicleCost;
            result[dateKey][hourRange].totalCost += vehicleCost;
          }
        });
      }
    });

    Object.keys(result[dateKey]).forEach((hourRange) => {
      const vehicleData = result[dateKey][hourRange].vehicles;
      result[dateKey][hourRange].vehicles = Object.keys(vehicleData).map(
        (type) => ({
          type,
          duration: parseFloat(
            (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1)
          ),
          avgDuration: parseFloat(
            (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1)
          ),
          cost: vehicleData[type].cost, // Add cost per vehicle type
        })
      );
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
          vehicles: {},
          totalCost: 0, // Initialize total cost
        };
      }

      vehicles.forEach((vehicle) => {
        let timeOut = vehicle.timeOut;

        if (!timeOut) {
          const matchedTimeout = Object.values(updatedTimeOuts).find(
            (item) =>
              item.vehicleNumber === vehicle.vehicleNumber &&
              item.timeIn === vehicle.timeIn
          );

          if (matchedTimeout) {
            timeOut = matchedTimeout.timeOut;
          } else {
            return;
          }
        }

        let timeIn = moment.utc(vehicle.timeIn, "YYYY-MM-DD hh:mm A").toDate();
        timeOut = moment.utc(timeOut, "YYYY-MM-DD hh:mm A").toDate();
        const vehicleType = vehicle.vehicleType.toLowerCase();

        let dailyStart = new Date(dateKey);
        dailyStart.setUTCHours(0, 0, 0, 0);
        let dailyEnd = new Date(dateKey);
        dailyEnd.setUTCHours(23, 59, 59, 999);

        let adjustedTimeIn = timeIn < dailyStart ? dailyStart : timeIn;
        let adjustedTimeOut = timeOut > dailyEnd ? dailyEnd : timeOut;

        let dailyDuration = (adjustedTimeOut - adjustedTimeIn) / 60000;

        if (
          timeIn <= end &&
          timeOut >= start &&
          dailyStart.getTime() <= timeOut.getTime() &&
          dailyEnd.getTime() >= timeIn.getTime()
        ) {
          result[dateKey].total += 1;
          result[dateKey][vehicleType] += 1;

          if (!result[dateKey].vehicles[vehicleType]) {
            result[dateKey].vehicles[vehicleType] = {
              totalDuration: 0,
              count: 0,
              cost: 0,
            };
          }

          result[dateKey].vehicles[vehicleType].totalDuration += dailyDuration;
          result[dateKey].vehicles[vehicleType].count += 1;

          // Calculate cost per vehicle type
          const vehicleCost = dailyDuration * rate;
          result[dateKey].vehicles[vehicleType].cost += vehicleCost;
          result[dateKey].totalCost += vehicleCost;
        }
      });

      const vehicleData = result[dateKey].vehicles;
      result[dateKey].vehicles = Object.keys(vehicleData).map((type) => ({
        type,
        duration: parseFloat(
          (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1)
        ),
        avgDuration: parseFloat(
          (vehicleData[type].totalDuration / vehicleData[type].count).toFixed(1)
        ),
        cost: vehicleData[type].cost, // Add cost per vehicle type
      }));
    }
  }

  return result;
};



const findLongestParkingDuration = (data2, startDate, endDate, updatedTimeOuts) => {
  try {
    const parsedData = typeof data2 === "string" ? JSON.parse(data2) : data2;
    if (!parsedData || Object.keys(parsedData).length === 0) {
      return "No data available."; // No entries
    }

    const startUTC = moment.utc(startDate).format("YYYY-MM-DD");
    const endUTC = moment.utc(endDate).format("YYYY-MM-DD");

    let maxDuration = 0;
    let longestEntry = null;

    Object.values(parsedData).forEach((entry) => {
      let timeOut = entry.timeOut;

      // Check for updated timeout
      const matchedTimeout = Object.values(updatedTimeOuts).find(
        (item) =>
          item.vehicleNumber === entry.vehicleNumber &&
          item.timeIn === entry.timeIn
      );

      if (!timeOut && matchedTimeout) {
        timeOut = matchedTimeout.timeOut;
      }

      if (!timeOut) return; // Skip if no timeout

      const timeInMoment = moment.utc(entry.timeIn, "YYYY-MM-DD h:mm A");
      const timeOutMoment = moment.utc(timeOut, "YYYY-MM-DD h:mm A");

      const entryDate = timeInMoment.format("YYYY-MM-DD");
      if (entryDate < startUTC || entryDate > endUTC) return; // Skip out-of-range entries

      const duration = timeOutMoment.diff(timeInMoment, "minutes"); // Duration in minutes

      if (duration > maxDuration) {
        maxDuration = duration;
        longestEntry = entry;
      }
    });

    return longestEntry
      ? `${longestEntry.vehicleType} ${longestEntry.vehicleNumber} had the longest stay of ${maxDuration} minutes at Level ${longestEntry.level}, Bay ${longestEntry.bay}.`
      : "No valid entries found within the time range.";
  } catch (error) {
    console.error("Error processing data:", error);
    return "Error processing data.";
  }
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

  const queryStartDate1 = "2025-01-21";
  const queryEndDate1 = "2025-01-21";

  const dynamicStartDate = queryStartDate
    ? moment.utc(queryStartDate1).startOf("day").toDate()
    : moment.utc().startOf("day").toDate(); // Start of today in UTC

  const dynamicEndDate = queryEndDate
    ? moment.utc(queryEndDate1).endOf("day").toDate() // End of queryEndDate in UTC
    : moment.utc().endOf("day").toDate();

  const dynamicStartDate1 = queryStartDate
    ? moment.utc(queryStartDate).startOf("day").toDate()
    : moment.utc().startOf("day").toDate(); // Start of today in UTC

  const dynamicEndDate1 = queryEndDate
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
      const result = formatParkingData(data, dynamicStartDate, dynamicEndDate);
      const result11 = formatParkingData11(
        data,
        dynamicStartDate1,
        dynamicEndDate1
      );

      const result1 = formatParkingDataOtherValues(
        data,
        dynamicStartDate1,
        dynamicEndDate1,
        updatedTimeOuts
      );

      // console.log("Updated TimeOuts before calling formatParkingData122:", updatedTimeOuts);

      const result12 = formatParkingData122(
        data,
        dynamicStartDate1,
        dynamicEndDate1,
        updatedTimeOuts
      );

    const  result1233 = formatParkingData12233(data , dynamicStartDate1 , dynamicEndDate1 , updatedTimeOutsCalculate );

 
    const  result13 =  findLongestParkingDuration(data ,  dynamicStartDate1 , dynamicEndDate1,  updatedTimeOuts  );
    

      // const result11 = formatParkingData11(data,dynamicStartDate, dynamicEndDate);
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

      const vehicles = Object.values(parsedData);

      const {
        dailyDurations,
        totalByIntervals,
        highestDuration,
        highestCost,
        totalcost,
        averageCost,
        wholeDayAverage,
      } = calculateDurationByIntervals(
        dynamicStartDate1,
        dynamicEndDate1,
        vehicles,
        Rate,
        updatedTimeOuts
      );

      const resultSameDate = processVehicleData(
        dynamicStartDate1,
        dynamicEndDate1,
        vehicles,
        updatedTimeOuts
      );

    
      console.log("result12",    result12);
      console.log("result1233",  result1233);  

      
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
        result1,
        result11,
        result12,
        result1233,
        result13,
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
    if (file.mimetype === "application/json") {
      const originalName = file.originalname;
      const extname = path.extname(originalName);

      // Ensure the file extension is .json
      const fileName = originalName.replace(extname, ".json");

      cb(null, fileName); // Use the original name but with .json extension
    } else {
      cb(new Error("Only .json files are allowed"), false); // Reject non-json files
    }
  },
});

const upload = multer({ storage });

// Route to handle JSON file upload
router.post("/upload", upload.single("data.json"), (req, res) => {
  const folderName = req.body.name;

  if (!folderName) {
    return res.status(400).json({ error: "Folder name is required." });
  }

  res.status(200).json({
    message: `JSON file uploaded successfully to folder: ${folderName}`,
  });
});

const updatedTimeOuts = {}; // Store updated timeouts globally
const  updatedTimeOutsCalculate = {}; 
router.post("/updateTimeOut", async (req, res) => {
  try {
    const { key, timeOut, vehicleNumber, timeIn } = req.body;

    // if (!key || !timeOut) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Missing key or timeOut value." });
    // }


    if (key === undefined || key === null || !timeOut) {
      return res.status(400).json({
        success: false,
        message: "Missing key or timeOut value.",
      });
    }

    // updatedTimeOuts[key] = timeOut; // Store new timeout
    updatedTimeOuts[key] = { timeOut, vehicleNumber, timeIn };

    // console.log(`Updating timeout for key: ${key}, new timeout: ${timeOut}`);

    console.log(
      `Updating timeout for key: ${key},Vehicle Number: ${vehicleNumber}, Time In: ${timeIn}, New Timeout: ${timeOut}`
    ); // Log values

    res.json({
      success: true,
      message: "Timeout updated successfully",
      updatedData: updatedTimeOuts,
    });
  } catch (error) {
    console.error("Error updating timeout:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.post("/updateTimeOut/calculatenow", async (req, res) => {
  try {
    const { key, timeOut, vehicleNumber, timeIn } = req.body;

    // if (!key || !timeOut) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Missing key or timeOut value." });
    // }

    if (key === undefined || key === null || !timeOut) {
      return res.status(400).json({
        success: false,
        message: "Missing key or timeOut value.",
      });
    }


    // updatedTimeOuts[key] = timeOut; // Store new timeout
    updatedTimeOutsCalculate[key] = { timeOut, vehicleNumber, timeIn };

    // console.log(`Updating timeout for key: ${key}, new timeout: ${timeOut}`);

    // console.log(
    //   `Updating timeout for key: ${key},Vehicle Number: ${vehicleNumber}, Time In: ${timeIn}, New Timeout: ${timeOut}`
    // ); // Log values

    res.json({
      success: true,
      message: "Timeout updated successfully",
      updatedData:updatedTimeOutsCalculate,
    });
  } catch (error) {
    console.error("Error updating timeout:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router;
