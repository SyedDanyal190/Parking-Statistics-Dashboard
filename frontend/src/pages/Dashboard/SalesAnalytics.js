import React from "react";
import { Card, CardBody } from "reactstrap";
import SalesAnalyticsChart from "../AllCharts/SalesAnalyticsChart";

const SalesAnalytics = ({
  tollPlazaData,
  vehicleWithHighestCount,
  normalizedRatio,
  trafficData,
  totalVehicleCount,
  totalIsbToLhrCount,
  totalLhrToIsbCount,
  highestTimestamp,
  combinedCounts,
}) => {
  // Ensure tollPlazaData is correctly structured
  // if (!tollPlazaData || !tollPlazaData.totalTrafficData) {
  //   return <div>Loading...</div>; // Handle the loading state appropriately
  // }

  // const totalTrafficData = tollPlazaData.totalTrafficData;

  // console.log("hihets tiem stamp...!!!!!!!!!! ", highestTimestamp);

  // Check if the normalizedRatio is available
  let lhrIsbRatio = null;
  let isbLhrRatio = null;
  if (normalizedRatio) {
    // Split the normalizedRatio into two parts (for LHR-ISB and ISB-LHR)
    const [numerator, denominator] = normalizedRatio.split(":");
    lhrIsbRatio = numerator; // LHR-ISB ratio
    isbLhrRatio = denominator; // ISB-LHR ratio
  }

  return (
    <React.Fragment>
      <Card className="card-height-100">
        <CardBody>
          <h4 className="card-title mb-4">Parking Statistics</h4>

          <div className="mt-1">
            <ul className="list-inline main-chart mb-0">
              {/* <li className="list-inline-item chart-border-left me-0">
                <h3>
                  <span data-plugin="counterup">higgest</span>
                  <span className="text-muted d-inline-block fw-normal font-size-15 ms-3">
                    Most Common Vehicle Type
                  </span>
                </h3>
              </li> */}
              {/* <li className="list-inline-item chart-border-left me-0">
                <h3>
                  <span data-plugin="counterup">{highestTimestamp}</span>
                  <span className="text-muted d-inline-block fw-normal font-size-15 ms-3">
                    Peak Traffic Hour
                  </span>
                </h3>
              </li> */}
              {/* <li className="list-inline-item chart-border-left me-0">
                <h3>
                  <span data-plugin="counterup">Traffic Flow Ratio</span>
                  <span className="text-muted d-inline-block fw-normal font-size-15 ms-3">
                    ISB: {lhrIsbRatio}, LHR: {isbLhrRatio}
                  </span>
                </h3>
              </li> */}
            </ul>
          </div>

          <div className="mt-3">
            <SalesAnalyticsChart
              trafficData={trafficData}
              totalVehicleCount={totalVehicleCount}
              totalIsbToLhrCount={totalIsbToLhrCount}
              totalLhrToIsbCount={totalLhrToIsbCount}
              tollPlazaData={tollPlazaData}
              combinedCounts={combinedCounts}
            />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default SalesAnalytics;
