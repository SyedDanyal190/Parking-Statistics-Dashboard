import React, { useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import moment from "moment";

const MyDisplay = ({ trafficData, MainApi }) => {
  useEffect(() => {
    // console.log("Received Traffic Data in MyDisplayComp:", trafficData);
  }, [trafficData]);

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

  const DisplayVehicleTime = trafficData.result12 || [];
  // console.log("DisplayVehicleTime:", DisplayVehicleTime);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handlePayNow = (key, vehicleNumber, timeIn) => {
    // const updatedTime = moment().toString();

    const updatedTime = moment().format("YYYY-MM-DD h:mm A");

    fetch(`${baseUrl}/apipsd/parking/updateTimeOut`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        timeOut: updatedTime,
        vehicleNumber,
        timeIn,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); // Logging API response
        if (data.success) {
          // console.log("Time-out updated successfully");

          // Call MainApi function to fetch updated data
          MainApi();
        } else {
          console.error("Failed to update timeoutqqqqqqqqqqq.");
        }
      })
      .catch((err) => console.error("Error updating timeout:", err));
  };

  return (
    <Card>
      <CardBody>
        <h1
          className="card-title mb-4"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
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
              {DisplayVehicleTime.map((entry, key) => {
                console.log("Raw Entry:", entry);

                const regex =
                  /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Bay: (\d+), Level:\s*(\d+)/;
                const match = entry.match(regex);

                // if (!match) {
                //   console.error("Invalid entry format:", entry);
                //   return null;
                // }

                if (!match) {
                  console.error("Invalid entry format:", entry); // Log the issue
                  return null; // Prevent rendering if the format is incorrect
                }

                // console.log("Regex Match Groups:", match); // Check what was captured

                const vehicleType = match[1];
                const capitalizedVehicleType =
                  vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
                const vehicleNumber = match[2];
                const timeIn = match[3];
                const timeOut = match[4] || "";
                const cost = match[5] || "";
                const parkingBay = match[6];
                const parkingLevel = match[7];
                const vehicleDisplay = `${capitalizedVehicleType} (${vehicleNumber})`;

                // console.log("Extracted Values - TimeOut:", timeOut);

                return (
                  <tr key={key}>
                    <td>{vehicleDisplay}</td>
                    <td>{timeIn}</td>
                    <td>{timeOut}</td>
                    <td>{parkingLevel}</td>
                    <td>{parkingBay}</td>
                    {/* <td>
                      {!timeOut || !timeOut.trim() ? (
                        
                        <button onClick={() => handlePayNow(key)}>Pay Now</button>
                        // <button onClick={handlePayNow(key)} className="btn btn-primary btn-sm">
                        //   Pay Now
                        // </button>
                      // ) : (
                      //   <button onClick={() => handlePayNow(key)}>Pay Now</button>
                      // ) }
                    ) : (
                        `$${cost} Paid`
                     )} 
                    </td> */}
                    <td>
                      {/* {console.log("Checking TimeOut for Row:", timeOut)} */}
                      {!timeOut || timeOut.trim() === "" || timeOut === "" ? (
                        <>
                          {console.log(
                            "Showing Pay Now button for:",
                            vehicleNumber
                          )}
                          <button
                            onClick={() =>
                              handlePayNow(key, vehicleNumber, timeIn)
                            }
                            className="btn btn-primary btn-sm"
                          >
                            Pay Now
                          </button>
                        </>
                      ) : (
                        <>
                          {console.log(
                            "Showing Paid status for:",
                            vehicleNumber
                          )}
                          `${cost || "0"} Paid`
                        </>
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
  );
};

export default MyDisplay;
