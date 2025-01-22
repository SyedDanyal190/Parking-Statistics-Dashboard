

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../Dashboard/Style/Style.css";

// Function to divide total vehicle count into LHR-ISB and ISB-LHR
const divideTotalIntoLHR_ISB_ISB_LHR = (total) => {
  const lhrIsb = Math.floor(Math.random() * total); // Random value between 0 and total
  const isbLhr = total - lhrIsb; // Ensure the sum is equal to the total
  return {
    lhrIsb,
    isbLhr,
  };
};

const AllTollPlaza = ({ tollPlazaData, selectedGroup, totalVehicleCount }) => {
  const [randomizedTotals, setRandomizedTotals] = useState([]);

  // Calculate row totals with proper distribution logic for Total Vehicle count
  useEffect(() => {
    if (tollPlazaData && tollPlazaData.tollPlazaData) {
      const AllTollPlazaData = tollPlazaData.tollPlazaData;
      const numRows = AllTollPlazaData.length;

      let remainingTotal = totalVehicleCount;

      // Calculate row totals with some distribution logic
      const rowTotals = Array.from({ length: numRows }, (_, index) => {
        const baseCount = Math.floor(totalVehicleCount / numRows); // Base count for each row
        const remainder = totalVehicleCount % numRows; // Remainder to distribute

        let rowCount = baseCount;
        if (index < remainder) {
          rowCount += 1;
        }

        return rowCount;
      });

      // Apply some random variation to the row totals
      const adjustedRowTotals = rowTotals.map((rowTotal) => {
        const variation = Math.floor(Math.random() * 5) - 2; // Random variation between -2 and 2
        return rowTotal + variation;
      });

      // Calculate LHR-ISB and ISB-LHR for each row with the adjusted totals
      const newRandomizedTotals = adjustedRowTotals.map((totalForRow) => {
        const { lhrIsb, isbLhr } = divideTotalIntoLHR_ISB_ISB_LHR(totalForRow);
        return { totalForRow, lhrIsb, isbLhr };
      });

      // Store the results in state
      setRandomizedTotals(newRandomizedTotals);

      // Sort the toll plazas based on the total vehicle count in descending order
      const sortedTollPlazaData = AllTollPlazaData.map((TollPlaza, index) => ({
        ...TollPlaza,
        totalForRow: newRandomizedTotals[index]?.totalForRow || 0, // Add the total vehicle count
        lhrIsb: newRandomizedTotals[index]?.lhrIsb || 0, // Add LHR-ISB count
        isbLhr: newRandomizedTotals[index]?.isbLhr || 0, // Add ISB-LHR count
      })).sort((a, b) => b.totalForRow - a.totalForRow); // Sort in descending order

      // Update the state with sorted data
      setRandomizedTotals(sortedTollPlazaData);
    }
  }, [tollPlazaData, totalVehicleCount]); // Recalculate only when tollPlazaData or totalVehicleCount changes

  if (!tollPlazaData || !tollPlazaData.tollPlazaData) {
    return null;
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3" className="mb-4">
          <p>Total Toll Plazas</p>
          {/* {selectedGroup ? selectedGroup.value || selectedGroup : "No Group Selected"} */}
        </CardTitle>
        <div className="table-responsive">
          <table className="table table-striped table-custom table-bordered mb-0">
            <thead>
              <tr>
                <th>Toll Plaza</th>
                <th>Total Vehicle</th>
                <th>LHR-ISB</th>
                <th>ISB-LHR</th>
              </tr>
            </thead>
            <tbody>
              {randomizedTotals.map((TollPlaza, index) => (
                <tr key={index}>
                  <td>{TollPlaza.TollPlaza}</td>
                  <td>{TollPlaza.totalForRow}</td>{" "}
                  {/* Display the total vehicle count for each toll plaza */}
                  <td>{TollPlaza.lhrIsb}</td> {/* Random split for LHR-ISB */}
                  <td>{TollPlaza.isbLhr}</td>{" "}
                  {/* Remaining value for ISB-LHR */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default AllTollPlaza;
