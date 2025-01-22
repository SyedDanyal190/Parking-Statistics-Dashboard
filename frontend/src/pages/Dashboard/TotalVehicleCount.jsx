import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../Dashboard/Style/Style.css";
import {
  FaCar,
  FaBus,
  FaTruck,
  FaMotorcycle,
  FaQuestionCircle,
  FaShuttleVan,
} from "react-icons/fa";

// Function to calculate the Greatest Common Divisor (GCD) to simplify the ratio
const gcd = (a, b) => {
  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

// Function to normalize the ratio so that it doesn't exceed a maximum value
const normalizeRatio = (numerator, denominator, maxRatio = 9) => {
  const largest = Math.max(numerator, denominator);
  if (largest <= maxRatio) {
    return {
      normalizedNumerator: numerator,
      normalizedDenominator: denominator,
    };
  }
  // Scale both the numerator and denominator to fit the max ratio limit
  const scale = largest / maxRatio;
  const normalizedNumerator = Math.round(numerator / scale);
  const normalizedDenominator = Math.round(denominator / scale);
  return { normalizedNumerator, normalizedDenominator };
};

const TotalVehicleCount = ({
  tollPlazaData,
  onVehicleCountLogged,
  onRatioLogged,
}) => {
  // Check if vehicleCountData is valid
  if (!tollPlazaData || !tollPlazaData.vehicleCountData) {
    return null; // Render nothing if data is unavailable
  }

  const VehicleCountData = tollPlazaData.vehicleCountData;

  // Aggregate data by vehicle type
  const aggregatedData = VehicleCountData.reduce((acc, curr) => {
    if (!acc[curr.Type]) {
      acc[curr.Type] = {
        ...curr,
        LHRTOISB: curr.LHRTOISB || 0,
        ISBTOLHR: curr.ISBTOLHR || 0,
      };
    } else {
      acc[curr.Type].LHRTOISB += curr.LHRTOISB || 0;
      acc[curr.Type].ISBTOLHR += curr.ISBTOLHR || 0;
    }
    return acc;
  }, {});

  const aggregatedArray = Object.values(aggregatedData);

  // Sort the aggregated data by total vehicle count (LHRTOISB + ISBTOLHR) in descending order
  aggregatedArray.sort(
    (a, b) => b.LHRTOISB + b.ISBTOLHR - (a.LHRTOISB + a.ISBTOLHR)
  );

  // Find the vehicle type with the highest vehicle count
  const vehicleWithHighestCount = aggregatedArray.reduce(
    (max, curr) =>
      curr.LHRTOISB + curr.ISBTOLHR > max.LHRTOISB + max.ISBTOLHR ? curr : max,
    { LHRTOISB: 0, ISBTOLHR: 0 }
  );

  // Log the type of vehicle with the highest count
  console.log(
    "Vehicle type with the highest count:",
    vehicleWithHighestCount.Type
  );

  // Log the highest total vehicle count (LHRTOISB + ISBTOLHR)
  console.log(
    "Highest total vehicle count:",
    vehicleWithHighestCount.LHRTOISB + vehicleWithHighestCount.ISBTOLHR
  );

  // Calculate the ratio between ISBTOLHR and LHRTOISB for each vehicle type
  aggregatedArray.forEach((Count) => {
    const totalLhrIsbAndIsbLhr = Count.LHRTOISB + Count.ISBTOLHR;
    const gcdValue = gcd(Count.LHRTOISB, Count.ISBTOLHR);

    const ratioLhrIsb = Count.LHRTOISB / gcdValue;
    const ratioIsbLhr = Count.ISBTOLHR / gcdValue;

    // Normalize the ratio to keep the values between 1 and 9
    const { normalizedNumerator, normalizedDenominator } = normalizeRatio(
      ratioIsbLhr,
      ratioLhrIsb
    );

    // // Log the ratio and send it to the parent via the onRatioLogged prop
    // console.log(`Vehicle Type: ${Count.Type}`);
    // console.log(`ISB-LHR: ${Count.ISBTOLHR}, LHR-ISB: ${Count.LHRTOISB}`);
    // console.log(`Total: ${totalLhrIsbAndIsbLhr}, Normalized Ratio: ${normalizedNumerator}:${normalizedDenominator}`);

    if (onRatioLogged) {
      // Send the ratio to the parent component
      onRatioLogged(`${normalizedNumerator}:${normalizedDenominator}`);
    }
  });

  // Update the parent component with the logged value for vehicle type with highest count
  if (onVehicleCountLogged) {
    onVehicleCountLogged(vehicleWithHighestCount.Type);
  }

  // Define a mapping of vehicle types to icons
  const iconMap = {
    Car: <FaCar className="text-primary" size={20} />,
    Bus: <FaBus className="text-warning" size={20} />,
    Van: <FaShuttleVan className="text-success" size={20} />,
    Trucks: <FaTruck className="text-danger" size={20} />,
    Motorcycle: <FaMotorcycle className="text-info" size={20} />,
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3" className="mb-4">
          Total Vehicle Count
        </CardTitle>
        <div className="table-responsive">
          <table className="table table-striped table-custom table-bordered mb-0">
            <thead>
              <tr>
                <th>Type</th>
                <th>Vehicle Count</th>
                <th>ISB-LHR</th>
                <th>LHR-ISB</th>
              </tr>
            </thead>
            <tbody>
              {aggregatedArray.map((Count, index) => {
                const totalLhrIsbAndIsbLhr = Count.LHRTOISB + Count.ISBTOLHR;

                return (
                  <tr key={index}>
                    <td>
                      <span className="d-flex align-items-center">
                        {iconMap[Count.Type] || (
                          <FaQuestionCircle className="text-muted" size={20} />
                        )}
                        <span className="ms-2">{Count.Type}</span>
                      </span>
                    </td>
                    <td>{totalLhrIsbAndIsbLhr}</td>{" "}
                    {/* Display combined total here */}
                    <td>{Count.ISBTOLHR}</td>
                    <td>{Count.LHRTOISB}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default TotalVehicleCount;
