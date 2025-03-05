// import React from "react";
// import CountUp from "react-countup";
// import { Card, CardBody, Col, Row } from "reactstrap";

// const Widget = ({ trafficData }) => {
//   // const { result1, vehicleCount, highestDuration, averageCost } =
//   //   trafficData || {};

//   const { result1, highestDuration } =
//     trafficData || {};

//     const { totalCost, averageCosting , vehicleCount} = result1 || {};

//     console.log("Vehicle Count::::::::::::vv;;;;;;v;v;v;;v;v;v;vv", vehicleCount);

// const  roundValue =  totalCost ? Math.round(totalCost * 100) / 100 : 0;
// let  formattedTotalCostValue  =  Number.isInteger(roundValue) ? roundValue : roundValue.toFixed(2);

//   // Format the average cost similarly
// // const formattedAverageCostValue =
// // averageCost !== undefined && averageCost !== null
// //   ? Math.round(averageCost * 100) / 100 // Round to two decimal places
// //   : 0;

// const formattedAverageCostValue =
// averageCosting !== undefined && averageCosting !== null
//   ? Math.round(averageCosting * 100) / 100 // Round to two decimal places
//   : 0;

// let formattedAvgCost =
// Number.isInteger(formattedAverageCostValue)
//   ? formattedAverageCostValue
//   : formattedAverageCostValue.toFixed(2);

//   const widgetData = [
//     {
//       title: "Total Vehicle Count",
//       count: vehicleCount ?? 0,
//       icon: "mdi mdi-car text-primary",
//       color: "success",
//     },
//     {
//       title: "Total Cost",
//       icon : "mdi mdi-currency-usd text-primary",
//       // count: totalcost || 0,
//       // count: `$${totalcost || 0}`,
//       count  :  `$${formattedTotalCostValue}`,

//       // icon: "mdi mdi-cash-multiple text-success",
//       color: "warning",
//     },
//     {
//       title: "Busiest Parking Duration",
//       count: highestDuration?.hourRange || "No data available",
//       icon: "mdi mdi-clock text-primary",
//       color: "primary",
//     },
//     // New box added here
//     // {
//     //   title: "Average Cost", // Replace with your title

//     //   count:
//     //     averageCost !== undefined && averageCost !== null
//     //       ? `$${averageCost}`
//     //       : 0, // Show 0 if averageCost is missing
//     //   // count: `${averageCost}`,      // Replace with your data (can be a string or number)
//     //   icon: "mdi mdi-account-group text-primary", // Icon for the new box
//     //   color: "secondary", // Color for the new box
//     // },

//     {
//       title: "Average Cost", // Replace with your title
//       // count:
//       //   averageCost !== undefined && averageCost !== null
//       //     ? `$${Math.round(averageCost)}` // Round the value before adding "$"
//       //     : "$0", // Show "$0" if averageCost is missing

//           count: `$${formattedAvgCost}`,
//           icon: "mdi mdi-account-group text-primary", // Icon for the new box
//       color: "secondary", // Color for the new box
//     },

//   ];

//   return (
//     <React.Fragment>
//       <Row>
//         {widgetData.map((widget, index) => (
//           <Col md={6} xl={3} key={index}>
//             <Card>
//               <CardBody>
//                 <div className="float-end">
//                   <div className="avatar-sm mx-auto mb-4">
//                     <span
//                       className={`avatar-title rounded-circle bg-light font-size-24 text-${widget.color}`}
//                     >
//                       <i className={widget.icon}></i>
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-muted text-uppercase fw-semibold font-size-13">
//                     {widget.title}
//                   </p>
//                   <h4 className="mb-1 mt-1">
//                     {/* Render count with CountUp only if it's numeric */}
//                     {typeof widget.count === "number" ? (
//                       <CountUp start={0} end={widget.count} duration={1.5} />
//                     ) : (
//                       <span>{widget.count}</span>
//                     )}
//                   </h4>

//                   {/* <p className="text-muted mt-3 mb-0">
//                     <span className="badge badge-soft-danger me-1">...</span>
//                     Last synced 40 minutes ago
//                   </p> */}
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </React.Fragment>
//   );
// };

// export default Widget;

// import React from "react";
// import CountUp from "react-countup";
// import { Card, CardBody, Col, Row } from "reactstrap";

// const Widget = ({ trafficData }) => {
//   const { result1, highestDuration } = trafficData || {};
//   const { totalCost, averageCosting, vehicleCount } = result1 || {};

//   const roundValue = totalCost ? Math.round(totalCost * 100) / 100 : 0;
//   let formattedTotalCostValue = Number.isInteger(roundValue)
//     ? roundValue
//     : roundValue.toFixed(2);

//   const formattedAverageCostValue =
//     averageCosting !== undefined && averageCosting !== null
//       ? Math.round(averageCosting * 100) / 100
//       : 0;

//   let formattedAvgCost = Number.isInteger(formattedAverageCostValue)
//     ? formattedAverageCostValue
//     : formattedAverageCostValue.toFixed(2);

//   const widgetData = [
//     {
//       title: "Total Vehicle Count",
//       count: vehicleCount ?? 0,
//       icon: "mdi mdi-car text-primary",
//       color: "success",
//     },
//     {
//       title: "Total Cost",
//       icon: "mdi mdi-currency-usd text-primary",
//       count: `$${formattedTotalCostValue}`,
//       color: "warning",
//     },
//     {
//       title: "Busiest Parking Duration",
//       count: highestDuration?.hourRange || "No data available",
//       icon: "mdi mdi-clock text-primary",
//       color: "primary",
//     },

//   ];

//   return (
//     <React.Fragment>
//       <Row>
//         {widgetData.map((widget, index) => (
//           <Col md={6} xl={3} key={index}>
//             <Card>
//               <CardBody>
//                 <div className="float-end">
//                   <div className="avatar-sm mx-auto mb-4">
//                     <span
//                       className={`avatar-title rounded-circle bg-light font-size-24 text-${widget.color}`}
//                     >
//                       <i className={widget.icon}></i>
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-muted text-uppercase fw-semibold font-size-13">
//                     {widget.title}
//                   </p>
//                   <h4 className="mb-1 mt-1">
//                     {typeof widget.count === "number" ? (
//                       <CountUp start={0} end={widget.count} duration={1.5} />
//                     ) : (
//                       <span>{widget.count}</span>
//                     )}
//                   </h4>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         ))}

//         {/* Split Average Cost Box */}
//         <Col md={6} xl={3}>
//           <Card>
//           <CardBody>
//   <Row className="align-items-center">
//     <Col className="text-center border-end">
//       <div className="d-flex flex-column align-items-center">

//         <p className="text-muted text-uppercase fw-semibold font-size-13">
//           Average Cost (Left)
//         </p>
//         <h4 className="mb-1">
//           $<CountUp start={0} end={formattedAvgCost} duration={1.5} decimals={2} />
//         </h4>
//       </div>
//     </Col>

//     <Col className="text-center">
//       <div className="d-flex flex-column align-items-center">

//         <p className="text-muted text-uppercase fw-semibold font-size-13">
//           Average Cost (Right)
//         </p>
//         <h4 className="mb-1">
//           $<CountUp start={0} end={formattedAvgCost} duration={1.5} decimals={2} />
//         </h4>
//       </div>
//     </Col>
//   </Row>
// </CardBody>

//           </Card>
//         </Col>
//       </Row>
//     </React.Fragment>
//   );
// };

// export default Widget;

import React from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col, Row } from "reactstrap";

const Widget = ({ trafficData }) => {
  const { result1, highestDuration ,result13 } = trafficData || {};
  const { totalCost, averageCosting, vehicleCount } = result1 || {};

console.log("result13", result13);

const getLevel = (text) => {
  if (!text) return "No data available";
  const match = String(text).match(/Level (\d+)/); 
  return match ? match[1] : "No level found";
};

const level = result13 ? getLevel(result13) : "No data available";


  const roundValue = totalCost ? Math.round(totalCost * 100) / 100 : 0;
  let formattedTotalCostValue = Number.isInteger(roundValue)
    ? roundValue
    : roundValue.toFixed(2);

  const formattedAverageCostValue =
    averageCosting !== undefined && averageCosting !== null
      ? Math.round(averageCosting * 100) / 100
      : 0;

  let formattedAvgCost = Number.isInteger(formattedAverageCostValue)
    ? formattedAverageCostValue
    : formattedAverageCostValue.toFixed(2);

  return (
    <React.Fragment>
      <Row>
        {/* Total Vehicle Count */}
        <Col md={6} xl={3}>
          <Card>
            <CardBody>
              <div className="float-end">
                <div className="avatar-sm mx-auto mb-4">
                  <span className="avatar-title rounded-circle bg-light font-size-24 text-success">
                    <i className="mdi mdi-car text-primary"></i>
                  </span>
                </div>
              </div>
              <div>
                <p className="text-muted text-uppercase fw-semibold font-size-13">
                  Total Vehicle Count
                </p>
                <h4 className="mb-1 mt-1">
                  <CountUp start={0} end={vehicleCount ?? 0} duration={1.5} />
                </h4>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={6} xl={3}  >
          <Card style={{ height: "115px" }}>
            <CardBody>
              <Row className="align-items-center"  style={{ display:"flex", flexWrap:"nowrap"}}>
                {/* Total Costs Section */}
                <Col className="text-center border-end">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-start">
                      <p className="text-muted text-uppercase fw-semibold font-size-13">
                        Total Costs
                      </p>
                      <h4 className="mb-1">
                        $
                        <CountUp
                          start={0}
                          end={formattedTotalCostValue}
                          duration={1.5}
                          decimals={2}
                        />
                      </h4>
                    </div>
                    <div className="avatar-sm">
                      <span className="avatar-title rounded-circle bg-light font-size-24 text-primary">
                        <i className="mdi mdi-currency-usd text-primary"></i>
                      </span>
                    </div>
                  </div>
                </Col>

                {/* Average Cost Section */}
                <Col className="text-center">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-start">
                      <p className="text-muted text-uppercase fw-semibold font-size-13">
                        Average Cost
                      </p>
                      <h4 className="mb-1">
                        $
                        <CountUp
                          start={0}
                          end={formattedAvgCost}
                          duration={1.5}
                          decimals={2}
                        />
                      </h4>
                    </div>
                    <div className="avatar-sm">
                      <span className="avatar-title rounded-circle bg-light font-size-24 text-success">
                        <i className="mdi mdi-cash-multiple text-primary"></i>
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        {/* Busiest Parking Duration (Placed Last) */}
        <Col md={6} xl={3}>
          <Card>
            <CardBody>
              <div className="float-end">
                <div className="avatar-sm mx-auto mb-4">
                  <span className="avatar-title rounded-circle bg-light font-size-24 text-primary">
                    <i className="mdi mdi-clock text-primary"></i>
                  </span>
                </div>
              </div>
              <div>
                <p className="text-muted text-uppercase fw-semibold font-size-13">
                  Busiest Parking Duration
                </p>
                <h4 className="mb-1">
                  {highestDuration?.hourRange || "No data available"}
                </h4>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Combined Total Cost & Average Cost */}
        <Col md={6} xl={3}>
          <Card style={{ height: "115px" }}>
            <CardBody>
              <Row className="align-items-center">
                {/* Total Costs Section */}
                <Col className="text-center border-end">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-start">
                      <p className="text-muted text-uppercase fw-semibold font-size-13">
                        BUSIEST LEVEL
                      </p>
                      <h4 className="mb-1">
                        {level}
                      </h4>
                    </div>
                    <div className="avatar-sm">
                      <span className="avatar-title rounded-circle bg-light font-size-24 text-primary">
                        <i className="mdi mdi-floor-plan text-primary"></i>
                      </span>
                    </div>
                  </div>
                </Col>

                {/* Average Cost Section */}
                <Col className="text-center">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-start">
                      <p className="text-muted text-uppercase fw-semibold font-size-13">
                        BUSIEST WAY
                      </p>
                      <h4 className="mb-1">0</h4>
                    </div>
                    <div className="avatar-sm">
                      <span className="avatar-title rounded-circle bg-light font-size-24 text-success">
                        <i className="mdi mdi-road text-primary"></i>
                      </span>
                    </div>
                    
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Widget;
