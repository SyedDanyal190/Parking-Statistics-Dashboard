














import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import moment from "moment";
import { FaCar, FaBusAlt, FaShuttleVan, FaMotorcycle } from "react-icons/fa";

import { FaTruckFront } from "react-icons/fa6";

// Style
import "../../../src/pages/Dashboard/Style/Style.css";

const MyDisplay = ({ trafficData, MainApi, parking }) => {
  const [payNowState, setPayNowState] = useState({});
  const [calNowState, setCalNowState] = useState({});
  const [defaultState, setDefaultState] = useState({});
  const [vehicleImages, setVehicleImages] = useState({});





    
  useEffect(() => {
    if (!trafficData?.result12?.length) return;
  
    const DisplayVehicleTime = trafficData.result12;
    const initialState = {};
    const imageMap = {};
  
    DisplayVehicleTime.forEach((item) => {
      const regex =
        /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Paid: (\w+), Bay: (\d+), Level:\s*(\d+), Image:\s*(https?:\/\/[^\s]+)/;
      const match = item.match(regex);
  
      if (match) {
        const vehicleType = match[1].trim();
        const vehicleNumber = match[2].trim();
        const timeIn = match[3].trim();
        const timeOut = match[4].trim();
        const cost = match[5].trim();
        const isPaid = match[6].trim();
        const bayNumber = match[7].trim();
        const levelNumber = match[8].trim();
        const imageUrl = match[9].trim();
  

      
        // if (calNowState[vehicleNumber]) {
        //   timeOut = calNowState[vehicleNumber].timeOut;
        //   cost = calNowState[vehicleNumber].cost;
        // }
        


        if (imageUrl) imageMap[vehicleNumber] = imageUrl;
  
        if ((isPaid === "Yes" || timeOut) && vehicleNumber) {
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

  const DisplayVehicleTime = trafficData.result12|| [];

console.log("DisplayvehicleTime!!!!!!!!!!!!! 2222222",DisplayVehicleTime);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;



  
  const handleCalculateNow = (vehicleNumber, timeIn) => {
    const updatedTime = moment().format("YYYY-MM-DD h:mm A");
    const timeInMoment = moment(timeIn, "YYYY-MM-DD h:mm A");
    const timeDifference = moment(updatedTime).diff(timeInMoment, 'minutes');
    const cost = (timeDifference * 0.085).toFixed(2); // Rounded cost
  
    setCalNowState((prevState) => ({
      ...prevState,
      [vehicleNumber]: {
        calculated: true,
        cost,
        timeOut: updatedTime,
      },
    }));
  };
  



  const handlePayNow = (vehicleNumber, timeIn) => {
    const updatedTime = moment().format("YYYY-MM-DD h:mm A");

    fetch(`${baseUrl}/apipsd/parking/payNow`, {
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
    motorbike: { icon: FaMotorcycle, color: "#9370DB" }, // Purple
  };

  const renderVehicleIcon = (type) => {
    const lowerType = type.toLowerCase();
    const vehicle = vehicleIconMap[lowerType];

    if (!vehicle) return null;

    const Icon = vehicle.icon;
    return (
      <Icon color={vehicle.color} size={20} style={{ marginRight: "5px" }} />
    );
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
 

{DisplayVehicleTime.map((item) => {
  const initialState = {};
  const imageMap = {};

  const regex =
    /^(\w+) - Vehicle Number: ([^,]+), Time In: ([^,]+), Time Out: ([^,]*), Cost: ([^,]*), Paid: (\w+), Bay: (\d+), Level:\s*(\d+), Image:\s*(https?:\/\/[^\s]+)/;
  const match = item.match(regex);

  // Declare variables outside so they are accessible
  let vehicleType = "";
  let vehicleNumber = "";
  let timeIn = "";
  let timeOut = "";
  let cost = "";
  let isPaid = "";
  let bayNumber = "";
  let levelNumber = "";
  let imageUrl = "";

  if (match) {
    vehicleType = match[1].trim();
    vehicleNumber = match[2].trim();
    timeIn = match[3].trim();
    timeOut = match[4].trim();
    cost = match[5].trim();
    isPaid = match[6].trim();
    bayNumber = match[7].trim();
    levelNumber = match[8].trim();
    imageUrl = match[9].trim();

    if (calNowState[vehicleNumber]) {
      timeOut = calNowState[vehicleNumber].timeOut;
      cost = calNowState[vehicleNumber].cost;
    }

    if (imageUrl) imageMap[vehicleNumber] = imageUrl;

    if ((isPaid === "Yes" || timeOut) && vehicleNumber) {
      initialState[vehicleNumber] = "Paid";
    }
  } else {
    console.log("No match for:", item);
    return null; // Skip rendering if no match
  }

  const capitalizedVehicleType = vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1);
  const parkingBay = bayNumber;
  const parkingLevel = levelNumber;

  return (
    <tr key={vehicleNumber}>
      <td>
        {renderVehicleIcon(vehicleType)}
        {capitalizedVehicleType}
      </td>

      <td
        style={{ position: "relative", fontWeight: "bold" }}
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const tooltip = document.createElement("div");
          tooltip.id = "vehicleToolTip";
          tooltip.className = "custom-tooltip";

          tooltip.style.position = "absolute";
          tooltip.style.top = `${rect.top + window.scrollY - 110}px`;
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

      <td>
        {moment(timeIn, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A")}
      </td>
      <td>
        {timeOut
          ? moment(timeOut, "YYYY-MM-DD h:mm A").format("DD-MM-YYYY h:mm A")
          : ""}
      </td>
      <td>{parkingLevel}</td>
      <td>{parkingBay}</td>
      <td>{cost ? `$${cost}` : ""}</td>
      <td>
        {payNowState[vehicleNumber] === "Paid" || defaultState[vehicleNumber] === "Paid" ? (
          "Paid"
        ) : calNowState[vehicleNumber] ? (
          <button
            onClick={() => handlePayNow(vehicleNumber, timeIn)}
            className="btn btn-success btn-sm"
          >
            Pay Now
          </button>
        ) : (
          <button
            onClick={() => handleCalculateNow(vehicleNumber, timeIn)}
            className="btn btn-primary btn-sm"
          >
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