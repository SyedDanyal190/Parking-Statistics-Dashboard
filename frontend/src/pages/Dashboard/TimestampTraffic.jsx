import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../Dashboard/Style/Style.css";
import dayjs from "dayjs";

const TimestampTraffic = ({ totalVehicleCount, trafficData }) => {
  const [randomizedTotals, setRandomizedTotals] = useState([]);
  const [timeStampData, setTimeStampData] = useState([]);

  // console.log("!!!!!TimestampComp", trafficData);

  useEffect(() => {
    // Ensure trafficData is populated
    // console.log("Traffic Data:", trafficData);

    // Generate timestamps for the entire day with a 2-hour gap
    const generateTimestamps = () => {
      const timestamps = [];
      let currentTime = new Date();
      currentTime.setHours(0, 0, 0, 0); // Start at midnight

      // Generate 12 timestamps, each 2 hours apart
      for (let i = 0; i < 12; i++) {
        const start = new Date(currentTime.getTime());
        const end = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
        timestamps.push(`${formatTime(start)} - ${formatTime(end)}`);
        currentTime.setHours(currentTime.getHours() + 2); // Move 2 hours ahead
      }

      return timestamps;
    };

    // Format the time to a readable format like 'HH:mm:ss'
    const formatTime = (date) => {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    };

    // Set generated timestamps in state
    const generatedTimestamps = generateTimestamps();
    setTimeStampData(generatedTimestamps);

    // Ensure traffic data exists and contains vehicle count data
    if (
      !trafficData?.vehicleCountData ||
      trafficData?.vehicleCountData.length === 0
    ) {
      console.log("No vehicle count data available.");
      return;
    }

    // Get the backend timestamp (if available)
    const backendTimestamp = trafficData.vehicleCountData[0]?.frameTimestamp;
    if (backendTimestamp) {
      const startDate = dayjs(backendTimestamp); // Use the backend timestamp as the start date
      let currentDate = dayjs(); // Get today's date
      // let currentTime = new Date();
      currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Start from midnight

      // Generate timestamps from the backend timestamp with a 2-hour interval
      const DateFrame = [];
      for (let i = 0; i < 12; i++) {
        // DateFrame.push(currentDate.add(i * 2, "hour").format("MM/DD/YYYY HH:00")); // Format as "MM/DD/YYYY HH:00"
        const start = new Date(currentDate.getTime());
        const end = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000); // 2-hour duration
        DateFrame.push(`${start.getHours()}:00 - ${end.getHours()}:00`);
        currentDate.setHours(currentDate.getHours() + 2); // Increment by 2 hours
      }

      // console.log("Generated DateFrame:", DateFrame);
      setTimeStampData(DateFrame); // Update timestamp data with the generated values from backend
    }

    // Assuming you have totalVehicleCount available, and distributing it over 12 intervals
    const numRows = generatedTimestamps.length;

    let remainingTotal = totalVehicleCount;

    // Calculate row totals for vehicle count distribution
    const rowTotals = Array.from({ length: numRows }, (_, index) => {
      const baseCount = Math.floor(totalVehicleCount / numRows); // Base count per row
      const remainder = totalVehicleCount % numRows; // Remaining to distribute

      let rowCount = baseCount;
      if (index < remainder) {
        rowCount += 1; // Distribute remainder
      }

      return rowCount;
    });

    console.log("Row Totals:", rowTotals);

    // Ensure no negative values and apply slight random variations to the row totals
    const adjustedRowTotals = rowTotals.map((rowTotal) => {
      const variation = Math.floor(Math.random() * 5) - 2; // Random variation between -2, 0, and 2
      const newRowTotal = rowTotal + variation;

      // Ensure row total is not negative
      return newRowTotal >= 0 ? newRowTotal : 0;
    });

    console.log("Adjusted Row Totals:", adjustedRowTotals);

    // Ensure the sum of adjusted row totals equals totalVehicleCount
    const finalSum = adjustedRowTotals.reduce((acc, curr) => acc + curr, 0);
    if (finalSum !== totalVehicleCount) {
      const diff = totalVehicleCount - finalSum;
      for (let i = 0; i < Math.abs(diff); i++) {
        // Distribute the difference evenly across rows
        adjustedRowTotals[i % numRows] += diff > 0 ? 1 : -1;
      }
    }

    console.log(
      "Adjusted Row Totals after final adjustment:",
      adjustedRowTotals
    );

    // Generate LHR-ISB and ISB-LHR splits for each row and store in state
    const newRandomizedTotals = adjustedRowTotals.map((totalForRow) => {
      const lhrIsb = Math.floor(Math.random() * totalForRow); // Random split for LHR-ISB
      const isbLhr = totalForRow - lhrIsb; // Remaining value for ISB-LHR
      return { totalForRow, lhrIsb, isbLhr };
    });

    console.log("Randomized Totals:", newRandomizedTotals);

    // Set the randomized totals to state
    setRandomizedTotals(newRandomizedTotals);
  }, [totalVehicleCount, trafficData]); // Recalculate when totalVehicleCount or trafficData changes

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3" className="mb-4">
          TimeStamp
        </CardTitle>
        <div className="table-responsive">
          <table className="table table-striped table-custom table-bordered mb-0">
            <thead>
              <tr>
                <th>Time</th>
                <th>Total Vehicle</th>
                <th>LHR-ISB</th>
                <th>ISB-LHR</th>
              </tr>
            </thead>
            <tbody>
              {timeStampData.length > 0 && randomizedTotals.length > 0 ? (
                // Combine timeStampData and randomizedTotals with indices, then sort by totalForRow descending
                timeStampData
                  .map((TimeStamp, index) => ({
                    TimeStamp,
                    ...randomizedTotals[index],
                    index,
                  }))
                  .sort((a, b) => b.totalForRow - a.totalForRow) // Sort by total vehicle count descending
                  .map(({ TimeStamp, totalForRow, lhrIsb, isbLhr, index }) => (
                    <tr key={index}>
                      <td>{TimeStamp}</td>
                      <td>{totalForRow || 0}</td>
                      <td>{lhrIsb || 0}</td>
                      <td>{isbLhr || 0}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="4">Loading data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default TimestampTraffic;
