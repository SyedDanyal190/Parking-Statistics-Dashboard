import React from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col, Row } from "reactstrap";

const Widget = ({ trafficData }) => {
  const { result1, highestDuration, result13 } = trafficData || {};
  const { totalCost, averageCosting, vehicleCount } = result1 || {};

  // console.log("result13", result13);

  const getLevel = (text) => {
    if (!text) return "No data available";
    const match = String(text).match(/Level (\d+)/);
    return match ? match[1] : "No level found";
  };

  const getBay = (text) => {
    if (!text) return "NO data available";
    const match = String(text).match(/Bay (\d+)/);
    return match ? match[1] : "No bay found";
  };

  const level = result13 ? getLevel(result13) : "No data available";
  const Bay = result13 ? getBay(result13) : "No data available";

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

        <Col md={6} xl={3}>
          <Card style={{ height: "115px" }}>
            <CardBody>
              <Row
                className="align-items-center"
                style={{ display: "flex", flexWrap: "nowrap" }}
              >
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
                      <h4 className="mb-1">{level}</h4>
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
                        BUSIEST BAY
                      </p>
                      <h4 className="mb-1">{Bay}</h4>
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
