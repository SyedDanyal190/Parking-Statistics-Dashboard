import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";
import SalesAnalytics from "./SalesAnalytics";
import TimestampTraffic from "./TimestampTraffic";
// import TotalVehicleCount from "./TotalVehicleCount";
import Widget from "./Widget";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";
// import AllTollPlaza from "./AllTollPlaza";
import Welcome from "./Welcome";
import Loader from "./Loader";
// import Testing from "./Testing";
// import New from "./New";

// import DisplayVehicleWithTime from "./DisplayVehicleWithTime";
// import ChildComp from "./ChildComp";
import MyDisplay from "./MyDisplay";
// import Grapgh from "./Grapgh";


const Dashboard = ({ selectedGroup, optionGroup, tollPlazaData,

  MainApi,
  trafficData,
  handleSelectGroup,
  vehicleData,
  combinedCounts,
  totalVehicleCount,
  totalIsbToLhrCount,
  totalLhrToIsbCount,

}) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(false);
  const [vehicleWithHighestCount, setVehicleWithHighestCount] = useState(null);
  const [normalizedRatio, setNormalizedRatio] = useState(""); // State to store normalized ratio

  const [highestVehicleType, setHighestVehicleType] = useState(null);
  const [highestTimestamp, setHighestTimestamp] = useState(null);


// console.log("TrafficData!!!!!!!!!!!!!!",trafficData);


   // Function to handle receiving the highest timestamp
   const handleHighestTimestamp = (timestamp) => {
    setHighestTimestamp(timestamp);
  };

 
  // Callback function to receive the highest vehicle type from the Testing component
  const handleHighestVehicleType = (vehicleType) => {
    setHighestVehicleType(vehicleType);
  };



  useEffect(() => {
    if (selectedGroup) {
      setShowWelcome(false);
      setLoading(true);

      const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate fetch delay
        setLoading(false);
      };

      fetchData();
    } else {
      setShowWelcome(true);
      setLoading(false);
    }
  }, [selectedGroup, optionGroup]);

  // Function to handle normalized ratio from child component
  const handleNormalizedRatio = (ratio) => {
    // console.log("Received Normalized Ratio:", ratio); // Log ratio to the console
    setNormalizedRatio(ratio); // Optionally set it in the state if needed
  };




  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Pages" breadcrumbItem="Dashboard" />

          {/* Show Welcome component only if showWelcome is true */}
          {showWelcome && <Welcome />}

          {/* Show loader if loading */}
          {loading && !showWelcome && (
            <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
              <Col className="d-flex justify-content-center">
                <Loader />
              </Col>
            </Row>
          )}

          {/* Render components only if not loading */}
          {!loading && !showWelcome && (
            <>
               

              <Row id="TollPlaza">
              <Widget 
                  tollPlazaData={tollPlazaData}
                  vehicleData={vehicleData}
                  totalVehicleCount={totalVehicleCount}
                  totalIsbToLhrCount={totalIsbToLhrCount}
                  totalLhrToIsbCount={totalLhrToIsbCount}
                  combinedCounts={combinedCounts} // Pass the combined counts data here
                  highestVehicleType={highestVehicleType}
                  trafficData={trafficData}
                />
              </Row>

              <Row>
                <Col xl={12}>
                
                  <SalesAnalytics
                    trafficData={trafficData}
                    totalVehicleCount={totalVehicleCount}
                    highestTimestamp={highestTimestamp} 
                  
                    totalIsbToLhrCount={totalIsbToLhrCount}
                    totalLhrToIsbCount={totalLhrToIsbCount}
                    tollPlazaData={tollPlazaData}
                    combinedCounts={combinedCounts}
                  vehicleWithHighestCount={vehicleWithHighestCount} 
                   normalizedRatio={normalizedRatio}  
                   />
                </Col>
                {/* <Col xl={4}>
                 <Grapgh  trafficData={trafficData} />
                </Col> */}
                {/* <Col xl={4}>
                  <TotalVehicleCount 
                    tollPlazaData={tollPlazaData} 
                    onVehicleCountLogged={setVehicleWithHighestCount} 
                    onRatioLogged={handleNormalizedRatio} // Pass the handler to child component
                  />
                </Col> */}
                {/* <Col xl={4}>
                  <Testing
                    trafficData={trafficData}
                    vehicleData={vehicleData}
                    totalVehicleCount={totalVehicleCount}
                    totalIsbToLhrCount={totalIsbToLhrCount}
                    totalLhrToIsbCount={totalLhrToIsbCount}
                    tollPlazaData={tollPlazaData}
                    combinedCounts={combinedCounts} // Pass the combined counts data here
                    onHighestVehicleType={handleHighestVehicleType} // Pass the callback
                  />
                </Col> */}
              </Row>

              {/* <Row> */}
                {/* <Col xl={6}>
                  <AllTollPlaza tollPlazaData={tollPlazaData} selectedGroup={selectedGroup}  totalVehicleCount={tollPlazaData?.totalVehicleCount || 0}  />
                </Col> */}
                {/* <Col xl={12}>
                  <TimestampTraffic 
                    totalVehicleCount={totalVehicleCount}
                    trafficData={trafficData}
                  
                    totalIsbToLhrCount={totalIsbToLhrCount}
                    totalLhrToIsbCount={totalLhrToIsbCount}
                    tollPlazaData={tollPlazaData}
                    combinedCounts={combinedCounts}
                    onHighestTimestamp={handleHighestTimestamp}
                    // Pass the callback to TimestampTraffic

                />
                </Col>
              </Row> */}
                  
   {/* <Row>
         {/* <Col xl={8}>
           <DisplayVehicleWithTime   trafficData={trafficData} />
      
         </Col> */}
         {/* <Col xl={4}>
             <ChildComp  MainApi={MainApi}  trafficData={trafficData} />
         </Col> */}
        
   {/* </Row> */} 

   <Row>
   <Col xl={12}>
              <MyDisplay  trafficData={trafficData}   MainApi={MainApi}    parking={selectedGroup}   />
           </Col>
   </Row>
  

                 {/* <Row>
                 <Col xl={12}>
                   <New trafficData={trafficData} />
                 </Col>
                 </Row> */}
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  selectedGroup: PropTypes.object,
  optionGroup: PropTypes.array,
  handleSelectGroup: PropTypes.func,
  tollPlazaData: PropTypes.any,
};

export default withTranslation()(Dashboard);








