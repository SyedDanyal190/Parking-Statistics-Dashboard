// import React, { useEffect } from "react";
// import { Card, CardBody, CardTitle } from "reactstrap";
// import moment from "moment";

// const MyDisplay = ({ trafficData, MainApi }) => {
//   useEffect(() => {
//     // console.log("Received Traffic Data in MyDisplayComp:", trafficData);
//   }, [trafficData]);

//   if (!trafficData) {
//     return (
//       <Card>
//         <CardBody>
//           <CardTitle tag="h3" className="mb-4">
//             Loading data...
//           </CardTitle>
//         </CardBody>
//       </Card>
//     );
//   }

//   const DisplayVehicleTime = trafficData.result12 || [];
//   // console.log("DisplayVehicleTime:", DisplayVehicleTime);

//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handlePayNow = (key, vehicleNumber, timeIn) => {
//     // const updatedTime = moment().toString();

//     const updatedTime = moment().format("YYYY-MM-DD h:mm A");

//     fetch(`${baseUrl}/apipsd/parking/updateTimeOut`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         key,
//         timeOut: updatedTime,
//         vehicleNumber,
//         timeIn,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("API Response:", data); // Logging API response
//         if (data.success) {
//           // console.log("Time-out updated successfully");

//           // Call MainApi function to fetch updated data
//           MainApi();
//         } else {
//           console.error("Failed to update timeoutqqqqqqqqqqq.");
//         }
//       })
//       .catch((err) => console.error("Error updating timeout:", err));
//   };

//   return (
//     <Card>
//       <CardBody>
//         <h1
//           className="card-title mb-4"
//           style={{ fontSize: "20px", fontWeight: "bold" }}
//         >
//           Parking Statistics
//         </h1>

//         <div
//           className="table-responsive"
//           id="DisplayVehicleTimeTableResponsive"
//         >
//           <table className="table table-striped table-custom table-bordered mb-0">
//             <thead>
//               <tr>
//                 <th>Vehicle Type</th>
//                 <th>Time In</th>
//                 <th>Time Out</th>
//                 <th>Parking Level</th>
//                 <th>Parking Bay</th>
//                 <th>Payment Due</th>
//                 <th>Payment Status</th>
                
//               </tr>
//             </thead>
//             <tbody>
//               {DisplayVehicleTime.map((entry, key) => {
//                 // console.log("Raw Entry:", entry);

//                 const regex =
//                   /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Bay: (\d+), Level:\s*(\d+)/;
//                 const match = entry.match(regex);

//                 // if (!match) {
//                 //   console.error("Invalid entry format:", entry);
//                 //   return null;
//                 // }

//                 if (!match) {
//                   console.error("Invalid entry format:", entry); // Log the issue
//                   return null; // Prevent rendering if the format is incorrect
//                 }

//                 // console.log("Regex Match Groups:", match); // Check what was captured

//                 const vehicleType = match[1];
//                 const capitalizedVehicleType =
//                   vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
//                 const vehicleNumber = match[2];
//                 const timeIn = match[3];
//                 const timeOut = match[4] || "";
//                 const cost = match[5] || "";
//                 const parkingBay = match[6];
//                 const parkingLevel = match[7];
//                 const vehicleDisplay = `${capitalizedVehicleType} (${vehicleNumber})`;

//                 // console.log("Extracted Values - TimeOut:", timeOut);
//                 // console.log("Raw Time In:", timeIn, "Raw Time Out:", timeOut);

//                 return (
//                   // <tr key={key}>
//                   //   <td>{vehicleDisplay}</td>
//                   //   <td>{timeIn}</td>
//                   //   <td>{timeOut}</td>
//                   //   <td>{parkingLevel}</td>
//                   //   <td>{parkingBay}</td>
//                   //   <td></td>
//                   //   {/* <td>
//                   //     {!timeOut || !timeOut.trim() ? (
                        
//                   //       <button onClick={() => handlePayNow(key)}>Pay Now</button>
//                   //       // <button onClick={handlePayNow(key)} className="btn btn-primary btn-sm">
//                   //       //   Pay Now
//                   //       // </button>
//                   //     // ) : (
//                   //     //   <button onClick={() => handlePayNow(key)}>Pay Now</button>
//                   //     // ) }
//                   //   ) : (
//                   //       `$${cost} Paid`
//                   //    )} 
//                   //   </td> */}
//                   //   <td>
//                   //     {/* {console.log("Checking TimeOut for Row:", timeOut)} */}
//                   //     {!timeOut || timeOut.trim() === "" || timeOut === "" ? (
//                   //       <>
//                   //         {console.log(
//                   //           "Showing Pay Now button for:",
//                   //           vehicleNumber
//                   //         )}
//                   //         <button
//                   //           onClick={() =>
//                   //             handlePayNow(key, vehicleNumber, timeIn)
//                   //           }
//                   //           className="btn btn-primary btn-sm"
//                   //         >
//                   //           Pay Now
//                   //         </button>
//                   //       </>
//                   //     ) : (
//                   //       <>
//                   //         {console.log(
//                   //           "Showing Paid status for:",
//                   //           vehicleNumber
//                   //         )}
//                   //         `${cost || "0"} Paid`
//                   //       </>
//                   //     )}
//                   //   </td>
//                   // </tr>
                
//                 //   <tr key={key}>
//                 //   <td>{vehicleDisplay}</td>
//                 //   <td>{moment(timeIn, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A")}</td>
//                 //   <td>{timeOut ? moment(timeOut, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm  A") : ""}</td>
//                 //   <td>{parkingLevel}</td>
//                 //   <td>{parkingBay}</td>
//                 //   <td></td>
//                 //   <td>
//                 //     {!timeOut?.trim() ? (
//                 //       <>
//                 //         <button
//                 //           onClick={() => handlePayNow(key, vehicleNumber, timeIn)}
//                 //           className="btn btn-primary btn-sm"
//                 //         >
//                 //           Pay Now
//                 //         </button>
//                 //       </>
//                 //     ) : (
//                 //       <>
//                 //         {`${cost || "0"} Paid`}
//                 //       </>
//                 //     )}
//                 //   </td>
//                 // </tr>
                
                
// <tr key={key}>
//   <td>{vehicleDisplay}</td>
//   <td>{moment(timeIn, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A")}</td>
//   <td>{timeOut ? moment(timeOut, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A") : ""}</td>
//   <td>{parkingLevel}</td>
//   <td>{parkingBay}</td>
//   <td>{cost ? `$${cost}` : ""}</td>  {/* Payment Due column */}
//   <td>
//     {!timeOut?.trim() ? (
//       <button
//         onClick={() => handlePayNow(key, vehicleNumber, timeIn)}
//         className="btn btn-primary btn-sm"
//       >
//         Calculate Now 
//       </button>
//     ) : (
//       "Paid"
//     )}
//   </td>
// </tr>




//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </CardBody>
//     </Card>
//   );
// };

// export default MyDisplay;















import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import moment from "moment";

const MyDisplay = ({ trafficData, MainApi }) => {
  const [payNowState, setPayNowState] = useState({});
  const [calNowState, setCalNowState] = useState({});
   const [defaultState , setDefaultState] =  useState({});  


  useEffect(() => {
    if (!trafficData || !Array.isArray(trafficData.result1233) || trafficData.result1233.length === 0) {
      console.log("Traffic data is empty or not in the expected format.");
      return;
    }
  
    const DisplayVehicleTime = trafficData.result1233; // Extract the array
    const initialState = {};
  
    DisplayVehicleTime.forEach((item) => {
      // console.log("Processing item:", item); // Debugging each entry
  
      const regex =
        /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Bay: (\d+), Level:\s*(\d+)/;
      const match = item.match(regex);
  
      if (match) {
        const vehicleNumber = match[2].trim();
        const bayNumber = match[6].trim();
        const timeOut = match[4].trim();
  
        // console.log("Match found:", match);
        // console.log("Vehicle:", vehicleNumber, "| Bay:", bayNumber, "| Time Out:", timeOut);
  
        // Ensure all values are valid before updating state
        if (timeOut && vehicleNumber && bayNumber) {
          initialState[vehicleNumber] = "Paid";
        }
      } else {
        console.log("No match for:", item);
      }
    });
  
    console.log("Final defaultState:", initialState); // Debug final state
    setDefaultState(initialState);
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

  const DisplayVehicleTime = trafficData.result1233 || [];
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleCalculateNow = (key, vehicleNumber, timeIn) => {
    const updatedTime = moment().format("YYYY-MM-DD h:mm A");
  
    fetch(`${baseUrl}/apipsd/parking/updateTimeOut/calculatenow`, {
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
        console.log("API Response:", data);
        if (data.success) {
          setCalNowState((prevState) => ({
            ...prevState,
            [key]: true, // Enables "Pay Now"
          }));
  
          // Delay MainApi() slightly to allow UI to update first
          setTimeout(() => {
            MainApi();
          }, 500);
        } else {
          console.error("Failed to update timeout.");
        }
      })
      .catch((err) => console.error("Error updating timeout:", err));
  };
  
  

  // Function to handle "Pay Now"
  const handlePayNow = (key, vehicleNumber, timeIn) => {
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
        console.log("API Response:", data);
        if (data.success) {
          setPayNowState((prevState) => ({
            ...prevState,
            [key]: "Paid", // Updates UI to show "Paid"
          }));
          MainApi(); // Refresh data after payment
        } else {
          console.error("Failed to process payment.");
        }
      })
      .catch((err) => console.error("Error processing payment:", err));
  };
  
  return (
    <Card>
      <CardBody>
        <h1 className="card-title mb-4" style={{ fontSize: "20px", fontWeight: "bold" }}>
          Parking Statistics
        </h1>

        <div className="table-responsive" id="DisplayVehicleTimeTableResponsive">
          <table className="table table-striped table-custom table-bordered mb-0">
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Parking Level</th>
                <th>Parking Bay</th>
                <th>Payment Due</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {DisplayVehicleTime.map((entry, key) => {
                const regex =
                  /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Bay: (\d+), Level:\s*(\d+)/;
                const match = entry.match(regex);

                if (!match) {
                  console.error("Invalid entry format:", entry);
                  return null;
                }

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

                return (
                  <tr key={key}>
                    <td>{vehicleDisplay}</td>
                    <td>{moment(timeIn, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A")}</td>
                    <td>{timeOut ? moment(timeOut, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A") : ""}</td>
                    <td>{parkingLevel}</td>
                    <td>{parkingBay}</td>
                    <td>{cost ? `$${cost}` : ""}</td>

                    {/* Payment Status */}
                 
                     <td>
   {payNowState[key] === "Paid" ? (
    "Paid"
  ) : calNowState[key] ? (
    <button
      onClick={() => handlePayNow(key, vehicleNumber, timeIn)}
      className="btn btn-success btn-sm"
    >
      Pay Now
    </button>
  ) : defaultState[vehicleNumber] === "Paid" ? (
    "Paid"
  ) :  (
    <button
      onClick={() => handleCalculateNow(key, vehicleNumber, timeIn)}
      className="btn btn-primary btn-sm"
    >
      Calculate Now
    </button>
  )}
</td>

{/* <td>
  {timeOut?.trim() ? (
    "Paid" // If timeOut exists, show "Paid"
  ) : payNowState[key] === "Paid" ? (
    "Paid" // If the user clicked "Pay Now" and API responded, show "Paid"
  ) : calNowState[key] ? (
    <button
      onClick={() => handlePayNow(key, vehicleNumber, timeIn)}
      className="btn btn-success btn-sm"
    >
      Pay Now
    </button>
  ) : (
    <button
      onClick={() => handleCalculateNow(key, vehicleNumber, timeIn)}
      className="btn btn-primary btn-sm"
    >
      Calculate Now
    </button>
  )} 
</td> */}


                    
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
