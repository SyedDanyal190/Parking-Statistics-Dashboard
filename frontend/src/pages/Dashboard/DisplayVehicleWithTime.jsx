

import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

const DisplayVehicleWithTime = ({ trafficData }) => {
  console.log("TrafficData:", trafficData);

  if (!trafficData) {
    return (
      <Card>
        <CardBody>
          <CardTitle tag="h3" className="mb-4">
            Loading data...
          </CardTitle>
        </CardBody>
      </Card>
    );
  }

  const DisplayVehicleTime = trafficData.result;
  console.log("Dispay!!!!!!!!!!!!!!!!!!!!", DisplayVehicleTime);
  console.log("DisplayVehicleTime:", DisplayVehicleTime);

  return (
    <>
      <Card>
        <CardBody>
          <h1
            className="card-title mb-4"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            {/* Vehicle with Time In and Time Out */}
            Parking Statistics
          </h1>

          <div
            className="table-responsive"
            id="DisplayVehicleTimeTableResponsive"
          >
            <table className="table table-striped table-custom table-bordered mb-0">
              <thead>
                <tr>
                  <th>Vehicle Type</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Parking Level</th>
                  <th>Parking Bay</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {DisplayVehicleTime.map((entry, index) => {
                  console.log("Raw Entry:", entry);

                  // Adjust split logic for your backend response format
                  // const regex =
                  //   /(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]+), Cost: ([\d.]+),/;
                 
                  const regex = /(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]+), Cost: ([\d.]+), Bay: (\d+), Level\s*:(\d+),?/;

                  const match = entry.match(regex);

                  if (!match) return null; // Avoid errors if the format doesn't match

                  const vehicleType = match[1]; // Vehicle type
                  const capitalizedVehicleType =
                    vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
                  const vehicleNumber = match[2]; // Vehicle number
                  const timeIn = match[3]; // Time in
                  const timeOut = match[4]; // Time out
                  const cost = match[5]; // Cost
                  const parkingBay = match[6]; // Now correctly extracted
                  const parkingLevel = match[7]; // Now correctly extracted
                  
                  // Combine vehicle type and number
                  const vehicleDisplay = `${capitalizedVehicleType} (${vehicleNumber})`;

                  // For Extra Space
                  // const vehicleDisplay = `${capitalizedVehicleType} (${vehicleNumber})`; // Uses a non-breaking space ( )

                  // Check if timeIn and timeOut are the same
                  const isZeroDuration = timeIn === timeOut;

                  return (
                    <tr key={index}>
                      <td>{vehicleDisplay}</td>{" "}
                      {/* Show both vehicle type and number */}
                      <td>{timeIn}</td>
                      <td>{timeOut}</td>
                      <td>{parkingBay}</td>
                      <td>{parkingLevel}</td>
                      <td>
                        {isZeroDuration ? (
                          <button className="btn btn-primary btn-sm">
                            Pay Now
                          </button>
                        ) : (
                          `$${cost} Paid`
                        )}
                      </td>
                    
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default DisplayVehicleWithTime;
