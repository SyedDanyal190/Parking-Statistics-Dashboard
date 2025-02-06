import React from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col, Row } from "reactstrap";

const Widget = ({ trafficData }) => {
  const { totalcost, vehicleCount, highestDuration, averageCost } =
    trafficData || {};

  const widgetData = [
    {
      title: "Total Vehicle Count",
      count: vehicleCount?.totalVehicles || 0,
      icon: "mdi mdi-car text-primary",
      color: "success",
    },
    {
      title: "Total Cost",
      // count: totalcost || 0,
      count: `$${totalcost || 0}`,
      icon: "mdi mdi-cash-multiple text-success",
      color: "warning",
    },
    {
      title: "Highest Duration Hour Range",
      count: highestDuration?.hourRange || "No data available",
      icon: "mdi mdi-clock text-primary",
      color: "primary",
    },
    // New box added here
    // {
    //   title: "Average Cost", // Replace with your title

    //   count:
    //     averageCost !== undefined && averageCost !== null
    //       ? `$${averageCost}`
    //       : 0, // Show 0 if averageCost is missing
    //   // count: `${averageCost}`,      // Replace with your data (can be a string or number)
    //   icon: "mdi mdi-account-group text-primary", // Icon for the new box
    //   color: "secondary", // Color for the new box
    // },

    {
      title: "Average Cost", // Replace with your title
      count:
        averageCost !== undefined && averageCost !== null
          ? `$${Math.round(averageCost)}` // Round the value before adding "$"
          : "$0", // Show "$0" if averageCost is missing
      icon: "mdi mdi-account-group text-primary", // Icon for the new box
      color: "secondary", // Color for the new box
    },
    

  ];

  return (
    <React.Fragment>
      <Row>
        {widgetData.map((widget, index) => (
          <Col md={6} xl={3} key={index}>
            <Card>
              <CardBody>
                <div className="float-end">
                  <div className="avatar-sm mx-auto mb-4">
                    <span
                      className={`avatar-title rounded-circle bg-light font-size-24 text-${widget.color}`}
                    >
                      <i className={widget.icon}></i>
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-muted text-uppercase fw-semibold font-size-13">
                    {widget.title}
                  </p>
                  <h4 className="mb-1 mt-1">
                    {/* Render count with CountUp only if it's numeric */}
                    {typeof widget.count === "number" ? (
                      <CountUp start={0} end={widget.count} duration={1.5} />
                    ) : (
                      <span>{widget.count}</span>
                    )}
                  </h4>

                  <p className="text-muted mt-3 mb-0">
                    <span className="badge badge-soft-danger me-1">...</span>
                    Last synced 40 minutes ago
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default Widget;
