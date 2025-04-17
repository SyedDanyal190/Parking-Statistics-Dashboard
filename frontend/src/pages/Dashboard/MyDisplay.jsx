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















// import React, { useState, useEffect } from "react";
// import { Card, CardBody, CardTitle } from "reactstrap";
// import moment from "moment";

// const MyDisplay = ({ trafficData, MainApi , parking }) => {



//   const [payNowState, setPayNowState] = useState({});
//   const [calNowState, setCalNowState] = useState({});
//    const [defaultState , setDefaultState] =  useState({});  


//   //  console.log("defaultState111111111111111:", defaultState);
//   //  console.log("calNowState:1111", calNowState);
//   //  console.log("payNowState:11111", payNowState);
   
//   //   console.log("Parking!!!!!!!!!!!!!!!!!!!",parking);

//   useEffect(() => {
//     if (!trafficData || !Array.isArray(trafficData.result1233) || trafficData.result1233.length === 0) {
//       console.log("Traffic data is empty or not in the expected format.");
//       return;
//     }
  
//     const DisplayVehicleTime = trafficData.result1233; // Extract the array
//     const initialState = {};
  
//     DisplayVehicleTime.forEach((item) => {
//       // console.log("Processing item:", item); // Debugging each entry
  
//       const regex =
//         /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Bay: (\d+), Level:\s*(\d+)/;
//       const match = item.match(regex);
  
//       if (match) {
//         const vehicleNumber = match[2].trim();
//         const bayNumber = match[6].trim();
//         const timeOut = match[4].trim();
  
//         // console.log("Match found:", match);
//         // console.log("Vehicle:", vehicleNumber, "| Bay:", bayNumber, "| Time Out:", timeOut);
  
//         // Ensure all values are valid before updating state
//         if (timeOut && vehicleNumber && bayNumber) {
//           initialState[vehicleNumber] = "Paid";
//         }
//       } else {
//         console.log("No match for:", item);
//       }
//     });
  
//     console.log("Final defaultState:", initialState); // Debug final state
//     setDefaultState(initialState);
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

//   const DisplayVehicleTime = trafficData.result1233 || [];
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   // const handleCalculateNow = (key, vehicleNumber, timeIn) => {
//   //   const updatedTime = moment().format("YYYY-MM-DD h:mm A");
  
//   //   fetch(`${baseUrl}/apipsd/parking/updateTimeOut/calculatenow`, {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({
//   //       key,
//   //       timeOut: updatedTime,
//   //       vehicleNumber,
//   //       timeIn,
//   //     }),
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       console.log("API Response:", data);
//   //       if (data.success) {
//   //         setCalNowState((prevState) => ({
//   //           ...prevState,
//   //           [key]: true, // Enables "Pay Now"
//   //         }));
  
//   //         // Delay MainApi() slightly to allow UI to update first
//   //         setTimeout(() => {
//   //           MainApi();
//   //         }, 500);
//   //       } else {
//   //         console.error("Failed to update timeout.");
//   //       }
//   //     })
//   //     .catch((err) => console.error("Error updating timeout:", err));
//   // };
  
  

//   // Function to handle "Pay Now"



//   // const handlePayNow = (key, vehicleNumber, timeIn) => {
//   //   const updatedTime = moment().format("YYYY-MM-DD h:mm A");
  
//   //   fetch(`${baseUrl}/apipsd/parking/updateTimeOut`, {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({
//   //       key,
//   //       timeOut: updatedTime,
//   //       vehicleNumber,
//   //       timeIn,
//   //     }),
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       console.log("API Response:", data);
//   //       if (data.success) {
//   //         setPayNowState((prevState) => ({
//   //           ...prevState,
//   //           [key]: "Paid", // Updates UI to show "Paid"
//   //         }));
//   //         MainApi(); // Refresh data after payment
//   //       } else {
//   //         console.error("Failed to process payment.");
//   //       }
//   //     })
//   //     .catch((err) => console.error("Error processing payment:", err));
//   // };
  

//   const handleCalculateNow = (vehicleNumber, timeIn) => {
//     const updatedTime = moment().format("YYYY-MM-DD h:mm A");
  
//     fetch(`${baseUrl}/apipsd/parking/updateTimeOut/calculatenow`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         vehicleNumber,
//         timeOut: updatedTime,
//         timeIn,
//         parking: parking?.label,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         if (data.success) {
//           setCalNowState((prevState) => ({
//             ...prevState,
//             [vehicleNumber]: true, // Use vehicleNumber instead of index
//           }));
  
//           setTimeout(() => {
//             MainApi();
//           }, 300);
//         } else {
//           console.error("Failed to update timeout.");
//         }
//       })
//       .catch((err) => console.error("Error updating timeout:", err));
//   };
  
//   const handlePayNow = (vehicleNumber, timeIn) => {
//     const updatedTime = moment().format("YYYY-MM-DD h:mm A");
  
//     fetch(`${baseUrl}/apipsd/parking/updateTimeOut`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         vehicleNumber,
//         timeOut: updatedTime,
//         timeIn,
//         parking: parking?.label,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         if (data.success) {
//           setPayNowState((prevState) => ({
//             ...prevState,
//             [vehicleNumber]: "Paid", // Use vehicleNumber instead of index
//           }));
//           MainApi();
//         } else {
//           console.error("Failed to process payment.");
//         }
//       })
//       .catch((err) => console.error("Error processing payment:", err));
//   };
  

//   return (
//     <Card>
//       <CardBody>
//         <h1 className="card-title mb-4" style={{ fontSize: "20px", fontWeight: "bold" }}>
//           Parking Statistics
//         </h1>

//         <div className="table-responsive" id="DisplayVehicleTimeTableResponsive">
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
//   {DisplayVehicleTime.map((entry) => {
//     const regex =
//       /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Bay: (\d+), Level:\s*(\d+)/;
//     const match = entry.match(regex);

//     if (!match) {
//       console.error("Invalid entry format:", entry);
//       return null;
//     }

//     const vehicleType = match[1];
//     const capitalizedVehicleType =
//       vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
//     const vehicleNumber = match[2];
//     const timeIn = match[3];
//     const timeOut = match[4] || "";
//     const cost = match[5] || "";
//     const parkingBay = match[6];
//     const parkingLevel = match[7];

//     return (
//       <tr key={vehicleNumber}>

//         {/* <td>{`${capitalizedVehicleType} (${vehicleNumber})`}</td> */}
//         <td>
//   <span className="vehicle-tooltip-wrapper">
//     {`${capitalizedVehicleType} (`}
//     <span className="vehicle-tooltip" data-img={match[8]}>
//       {vehicleNumber}
//     </span>
//     {`)`}
//   </span>
// </td>

//         <td>{moment(timeIn, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A")}</td>
//         <td>{timeOut ? moment(timeOut, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A") : ""}</td>
//         <td>{parkingLevel}</td>
//         <td>{parkingBay}</td>
//         <td>{cost ? `$${cost}` : ""}</td>

//         <td>
//           {payNowState[vehicleNumber] === "Paid" ? (
//             "Paid"
//           ) : calNowState[vehicleNumber] ? (
//             <button
//               onClick={() => handlePayNow(vehicleNumber, timeIn)}
//               className="btn btn-success btn-sm"
//             >
//               Pay Now
//             </button>
//           ) : defaultState[vehicleNumber] === "Paid" ? (
//             "Paid"
//           ) : (
//             <button
//               onClick={() => handleCalculateNow(vehicleNumber, timeIn)}
//               className="btn btn-primary btn-sm"
//             >
//               Calculate Now
//             </button>
//           )}
//         </td>
//       </tr>
//     );
//   })}
// </tbody>

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
import { FaCar, FaBusAlt, FaShuttleVan  , FaMotorcycle } from "react-icons/fa";

import { FaTruckFront } from "react-icons/fa6";




// Style
import "../../../src/pages/Dashboard/Style/Style.css";


// const MyDisplay = ({ trafficData, MainApi, parking }) => {
//   const [payNowState, setPayNowState] = useState({});
//   const [calNowState, setCalNowState] = useState({});
//   const [defaultState, setDefaultState] = useState({});
//   const [vehicleImages, setVehicleImages] = useState({});

//   useEffect(() => {
//     if (!trafficData || !Array.isArray(trafficData.result1233) || trafficData.result1233.length === 0) {
//       console.log("Traffic data is empty or not in the expected format.");
//       return;
//     }

//     const DisplayVehicleTime = trafficData.result1233;
//     const initialState = {};
//     const imageMap = {};

//     DisplayVehicleTime.forEach((item) => {
//       const regex =
//         /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Bay: (\d+), Level:\s*(\d+), Image:\s*(https?:\/\/[^\s]+)/;
//       const match = item.match(regex);

//       if (match) {
//         const vehicleNumber = match[2].trim();
//         const bayNumber = match[6].trim();
//         const timeOut = match[4].trim();
//         const imageUrl = match[8].trim();

//         if (imageUrl) {
//           imageMap[vehicleNumber] = imageUrl;
//         }

//         if (timeOut && vehicleNumber && bayNumber) {
//           initialState[vehicleNumber] = "Paid";
//         }
//       } else {
//         console.log("No match for:", item);
//       }
//     });

//     // console.log("Final defaultState:", initialState);
//     setDefaultState(initialState);
//     setVehicleImages(imageMap);
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

//   const DisplayVehicleTime = trafficData.result1233 || [];
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   const handleCalculateNow = (vehicleNumber, timeIn) => {
//     const updatedTime = moment().format("YYYY-MM-DD h:mm A");

//     fetch(`${baseUrl}/apipsd/parking/updateTimeOut/calculatenow`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         vehicleNumber,
//         timeOut: updatedTime,
//         timeIn,
//         parking: parking?.label,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("API Response:", data);
//         if (data.success) {
//           setCalNowState((prevState) => ({
//             ...prevState,
//             [vehicleNumber]: true,
//           }));

//           setTimeout(() => {
//             MainApi();
//           }, 300);
//         } else {
//           console.error("Failed to update timeout.");
//         }
//       })
//       .catch((err) => console.error("Error updating timeout:", err));
//   };

//   const handlePayNow = (vehicleNumber, timeIn) => {
//     const updatedTime = moment().format("YYYY-MM-DD h:mm A");

//     fetch(`${baseUrl}/apipsd/parking/updateTimeOut`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         vehicleNumber,
//         timeOut: updatedTime,
//         timeIn,
//         parking: parking?.label,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // console.log("API Response:", data);
//         if (data.success) {
//           setPayNowState((prevState) => ({
//             ...prevState,
//             [vehicleNumber]: "Paid",
//           }));
//           MainApi();
//         } else {
//           console.error("Failed to process payment.");
//         }
//       })
//       .catch((err) => console.error("Error processing payment:", err));
//   };

//   return (
//     <Card>
//       <CardBody>
//         <h1 className="card-title mb-4" style={{ fontSize: "20px", fontWeight: "bold" }}>
//           Parking Statistics
//         </h1>

//         <div className="table-responsive" id="DisplayVehicleTimeTableResponsive">
//           <table className="table table-striped table-custom table-bordered mb-0">
//             <thead>
//               <tr>
//                 <th>Vehicle Type</th>
//                 <th>License Number</th>
//                 <th>Time In</th>
//                 <th>Time Out</th>
//                 <th>Parking Level</th>
//                 <th>Parking Bay</th>
//                 <th>Payment Due</th>
//                 <th>Payment Status</th>
//               </tr>
//             </thead>
           

//             <tbody>
//   {DisplayVehicleTime.map((entry) => {
//     const regex =
//       /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Bay: (\d+), Level:\s*(\d+), Image: (.+)$/;
//     const match = entry.match(regex);

//     if (!match) {
//       console.error("Invalid entry format:", entry);
//       return null;
//     }

//     const vehicleType = match[1];
//     const capitalizedVehicleType =
//       vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
//     const vehicleNumber = match[2];
//     const timeIn = match[3];
//     const timeOut = match[4] || "";
//     const cost = match[5] || "";
//     const parkingBay = match[6];
//     const parkingLevel = match[7];
//     const imageUrl = match[8]; // ✅ Extract image
  
//     // const imageUrl =
//     // match[8].includes("istockphoto") || !match[8].match(/\.(jpg|jpeg|png|gif)$/)
//     //   ? "https://via.placeholder.com/150"
//     //   : match[8];
  

//       // console.log("imageUrl1111",imageUrl);


//     return (
//       // <tr key={vehicleNumber}>
//       //   <td>
//       //     <span
//       //       style={{ position: "relative", cursor: "pointer" }}
//       //       onMouseEnter={(e) => {
//       //         const tooltip = document.createElement("div");
//       //         tooltip.style.position = "absolute";
//       //         tooltip.style.top = "20px";
//       //         tooltip.style.left = "0";
//       //         tooltip.style.zIndex = "999";
//       //         tooltip.style.background = "#fff";
//       //         // tooltip.style.border = "1px solid #ccc";
//       //         tooltip.style.border = "3px solid red";
//       //         tooltip.style.padding = "5px";
//       //         tooltip.style.borderRadius = "4px";
//       //         tooltip.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.2)";
//       //         tooltip.innerHTML = `<img src="${imageUrl}" alt="vehicle" width="150" />`;
//       //         tooltip.className = "custom-tooltip";
//       //         e.currentTarget.appendChild(tooltip);
//       //       }}
//       //       onMouseLeave={(e) => {
//       //         const tooltip = e.currentTarget.querySelector(".custom-tooltip");
//       //         if (tooltip) tooltip.remove();
//       //       }}
//       //     >
//       //       {`${capitalizedVehicleType} (${vehicleNumber})`}
//       //     </span>
//       //   </td>


// <tr key={vehicleNumber}>
//   {/* <td>
//     <span
//       style={{ position: "relative", cursor: "pointer" }}
//       onMouseEnter={(e) => {
//         const tooltip = document.createElement("div");
//         tooltip.style.position = "absolute";
//         tooltip.style.bottom = "100%"; // 👈 Instead of top, use bottom
//         tooltip.style.left = "0";
//         tooltip.style.marginBottom = "10px"; // 👈 Add spacing from the text
//         tooltip.style.zIndex = "2099";
//         tooltip.style.background = "#fff";
//         tooltip.style.border = "3px solid red";
//         tooltip.style.padding = "5px";
//         tooltip.style.borderRadius = "4px";
//         tooltip.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.2)";
//         tooltip.innerHTML = `<img src="${imageUrl}" alt="vehicle" width="150" />`;
//         tooltip.className = "custom-tooltip";
//         e.currentTarget.appendChild(tooltip);
//       }}
//       onMouseLeave={(e) => {
//         const tooltip = e.currentTarget.querySelector(".custom-tooltip");
//         if (tooltip) tooltip.remove();
//       }}
//     >
//       {`${capitalizedVehicleType} (${vehicleNumber})`}
//     </span>
//   </td> */}
// <td   id="Pakistan"  style={{ position: "relative", }}>
//   <span id="Pakistan1"
//     style={{ position: "relative", cursor: "pointer"}}
//     // onMouseEnter={(e) => {
//     //   const tooltip = document.createElement("div");
      
//     //   tooltip.id = "vehicleToolTip"; // 👈 Assign an ID
//     //   tooltip.style.position = "absolute";
//     //   tooltip.style.bottom = "100%";
//     //   tooltip.style.left = "0";
//     //   tooltip.style.marginBottom = "10px";
//     //   tooltip.style.zIndex = "999";
//     //   tooltip.style.background = "#fff";
//     //   tooltip.style.overflow = "visible"; 
//     //   // tooltip.style.border = "3px solid red";
//     //   tooltip.style.padding = "5px";
//     //   tooltip.style.borderRadius = "4px";
//     //   tooltip.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.2)";
//     //   tooltip.innerHTML = `<img src="${imageUrl}" alt="vehicle" width="190" height="90px" object-fit: "contain"/>`;
//     //   tooltip.className = "custom-tooltip";
//     //   e.currentTarget.appendChild(tooltip);
//     // }}


//     onMouseEnter={(e) => {
//       const rect = e.currentTarget.getBoundingClientRect();
//       const tooltip = document.createElement("div");
//       tooltip.id = "vehicleToolTip";
//       tooltip.className = "custom-tooltip";
    
//       tooltip.style.position = "absolute";
//       tooltip.style.top = `${rect.top + window.scrollY - 110}px`; // Try 40–100px

//       tooltip.style.left = `${rect.left}px`;
      
//       tooltip.style.zIndex = "9999";
//       tooltip.style.background = "#fff";
//       tooltip.style.padding = "5px";
//       tooltip.style.borderRadius = "4px";
//       tooltip.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.2)";
//       tooltip.innerHTML = `<img src="${imageUrl}" alt="vehicle" width="190" height="90" style="object-fit:cover;" />`;
    
//       document.body.appendChild(tooltip); // 👈 APPEND TO BODY
//     }}
    

//     // onMouseLeave={(e) => {
//     //   const tooltip = e.currentTarget.querySelector(".custom-tooltip");
//     //   if (tooltip) tooltip.remove();
//     // }}

//     onMouseLeave={() => {
//       const tooltip = document.getElementById("vehicleToolTip");
//       if (tooltip) tooltip.remove();
//     }}
    

//   >
//     {`${capitalizedVehicleType} (${vehicleNumber})`}
//   </span>
// </td>



//         <td>{moment(timeIn, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A")}</td>
//         <td>{timeOut ? moment(timeOut, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A") : ""}</td>
//         <td>{parkingLevel}</td>
//         <td>{parkingBay}</td>
//         <td>{cost ? `$${cost}` : ""}</td>
//         <td>
//           {payNowState[vehicleNumber] === "Paid" ? (
//             "Paid"
//           ) : calNowState[vehicleNumber] ? (
//             <button
//               onClick={() => handlePayNow(vehicleNumber, timeIn)}
//               className="btn btn-success btn-sm"
//             >
//               Pay Now
//             </button>
//           ) : defaultState[vehicleNumber] === "Paid" ? (
//             "Paid"
//           ) : (
//             <button
//               onClick={() => handleCalculateNow(vehicleNumber, timeIn)}
//               className="btn btn-primary btn-sm"
//             >
//               Calculate Now
//             </button>
//           )}
//         </td>
//       </tr>
//     );
//   })}
// </tbody>



//           </table>
//         </div>
//       </CardBody>
//     </Card>
//   );
// };

// export default MyDisplay;




const MyDisplay = ({ trafficData, MainApi, parking }) => {
  const [payNowState, setPayNowState] = useState({});
  const [calNowState, setCalNowState] = useState({});
  const [defaultState, setDefaultState] = useState({});
  const [vehicleImages, setVehicleImages] = useState({});





  useEffect(() => {
    if (!trafficData || !Array.isArray(trafficData.result1233) || trafficData.result1233.length === 0) {
      console.log("Traffic data is empty or not in the expected format.");
      return;
    }






    const DisplayVehicleTime = trafficData.result1233;
    const initialState = {};
    const imageMap = {};

    DisplayVehicleTime.forEach((item) => {
      const regex =
        /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Bay: (\d+), Level:\s*(\d+), Image:\s*(https?:\/\/[^\s]+)/;
      const match = item.match(regex);

      if (match) {
        const vehicleType = match[1].trim(); // "car", "bus", etc.
        const vehicleNumber = match[2].trim();
        const bayNumber = match[6].trim();
        const timeOut = match[4].trim();
        const imageUrl = match[8].trim();

        if (imageUrl) {
          imageMap[vehicleNumber] = imageUrl;
        }

        if (timeOut && vehicleNumber && bayNumber) {
          initialState[vehicleNumber] = "Paid";
        }
      } else {
        console.log("No match for:", item);
      }
    });

    setDefaultState(initialState);
    setVehicleImages(imageMap);
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


  const handleCalculateNow = (vehicleNumber, timeIn) => {
    const updatedTime = moment().format("YYYY-MM-DD h:mm A");

    fetch(`${baseUrl}/apipsd/parking/updateTimeOut/calculatenow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleNumber,
        timeOut: updatedTime,
        timeIn,
        parking: parking?.label,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCalNowState((prevState) => ({
            ...prevState,
            [vehicleNumber]: true,
          }));

          setTimeout(() => {
            MainApi();
          }, 300);
        } else {
          console.error("Failed to update timeout.");
        }
      })
      .catch((err) => console.error("Error updating timeout:", err));
  };

  const handlePayNow = (vehicleNumber, timeIn) => {
    const updatedTime = moment().format("YYYY-MM-DD h:mm A");

    fetch(`${baseUrl}/apipsd/parking/updateTimeOut`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleNumber,
        timeOut: updatedTime,
        timeIn,
        parking: parking?.label,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPayNowState((prevState) => ({
            ...prevState,
            [vehicleNumber]: "Paid",
          }));
          MainApi();
        } else {
          console.error("Failed to process payment.");
        }
      })
      .catch((err) => console.error("Error processing payment:", err));
  };






  const vehicleIconMap = {
    car: { icon: FaCar, color: "#d9534f" }, // Red
    bus: { icon: FaBusAlt, color: "#f0ad4e" }, // Yellow
    van: { icon: FaShuttleVan, color: "#5cb85c" }, //  Green
    truck: { icon: FaTruckFront, color: "#5bc0de" }, // Blue
    motorbike:{icon : FaMotorcycle ,color : "#9370DB" } // Purple
  };
  


  const renderVehicleIcon = (type) => {
    const lowerType = type.toLowerCase();
    const vehicle = vehicleIconMap[lowerType];
  
    if (!vehicle) return null;
  
    const Icon = vehicle.icon;
    return <Icon color={vehicle.color} size={20} style={{ marginRight: "5px" }} />;
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
                <th>License Number</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Parking Level</th>
                <th>Parking Bay</th>
                <th>Payment Due</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {DisplayVehicleTime.map((entry) => {
                const regex =
                  /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Bay: (\d+), Level:\s*(\d+), Image: (.+)$/;
                const match = entry.match(regex);

                if (!match) {
                  console.error("Invalid entry format:", entry);
                  return null;
                }

                const vehicleType = match[1];
                const capitalizedVehicleType = vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
                const vehicleNumber = match[2];
                const timeIn = match[3];
                const timeOut = match[4] || "";
                const cost = match[5] || "";
                const parkingBay = match[6];
                const parkingLevel = match[7];
                const imageUrl = match[8]; // ✅ Extract image

                return (
                  <tr key={vehicleNumber}>
                    {/* <td>
                      {capitalizedVehicleType}
                    </td> */}

<td>
  {renderVehicleIcon(vehicleType)}
  {capitalizedVehicleType}
</td>


                    <td
                      style={{ position: "relative", fontWeight:"bold" }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const tooltip = document.createElement("div");
                        tooltip.id = "vehicleToolTip";
                        tooltip.className = "custom-tooltip";

                        tooltip.style.position = "absolute";
                        tooltip.style.top = `${rect.top + window.scrollY - 110}px`; // Adjust based on your needs
                        tooltip.style.left = `${rect.left}px`;

                        tooltip.style.zIndex = "9999";
                        tooltip.style.background = "#fff";
                        tooltip.style.padding = "5px";
                        tooltip.style.borderRadius = "4px";
                        tooltip.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.2)";
                        tooltip.innerHTML = `<img src="${imageUrl}" alt="vehicle" width="190" height="90" style="object-fit:cover;" />`;

                        document.body.appendChild(tooltip);
                      }}
                      onMouseLeave={() => {
                        const tooltip = document.getElementById("vehicleToolTip");
                        if (tooltip) tooltip.remove();
                      }}
                    >
                      {vehicleNumber}
                    </td>
                    <td>{moment(timeIn, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A")}</td>
                    <td>{timeOut ? moment(timeOut, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A") : ""}</td>
                    <td>{parkingLevel}</td>
                    <td>{parkingBay}</td>
                    <td>{cost ? `$${cost}` : ""}</td>
                    <td>
                      {payNowState[vehicleNumber] === "Paid" ? (
                        "Paid"
                      ) : calNowState[vehicleNumber] ? (
                        <button onClick={() => handlePayNow(vehicleNumber, timeIn)} className="btn btn-success btn-sm">
                          Pay Now
                        </button>
                      ) : defaultState[vehicleNumber] === "Paid" ? (
                        "Paid"
                      ) : (
                        <button onClick={() => handleCalculateNow(vehicleNumber, timeIn)} className="btn btn-primary btn-sm">
                          Calculate Now
                        </button>
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
