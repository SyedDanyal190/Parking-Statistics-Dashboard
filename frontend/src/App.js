import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

// Import fake backend
import fakeBackend from "./helpers/AuthType/fakeBackend";
import { method } from "lodash";

// Activating fake backend
fakeBackend();

const App = (props) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [optionGroup, setOptionGroup] = useState([
    { label: "-- All Parking --", options: [] },
  ]);
  const [trafficData, setTrafficData] = useState(null);

  // const [dateRange, setDateRange] = useState({
  //   startDate: null,
  //   endDate: null,
  // });
  const [dateRange, setDateRange] = useState({
    startDate: moment.utc().startOf("day").subtract(5, "hours").toDate(),
    endDate: moment.utc().endOf("day").subtract(5, "hours").toDate(),
  });

  // const [dateRange, setDateRange] = useState({
  //   startDate: moment.utc("2025-01-10T00:00:00Z"),
  //   endDate: moment.utc("2025-01-17T23:59:59Z"),
  // });

  useEffect(() => {
    setDateRange({
      startDate: moment.utc().startOf("day").subtract(5, "hours").toDate(),
      endDate: moment.utc().endOf("day").subtract(5, "hours").toDate(),

      //   startDate: moment.utc("2025-01-10T00:00:00Z"),
      // endDate: moment.utc("2025-01-17T23:59:59Z"),
    });
  }, []);

  const handleDateChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
    // console.log('Received Start Date:!!!!!!!!!!!!!!', startDate);
    // console.log('Received End Date:!!!!!!!!!!!!!!', endDate);
  };

  useEffect(() => {
    // console.log("Updated Date Range in Parent:", dateRange);
  }, [dateRange]);


// Base Url for APis

 const baseUrl = process.env.REACT_APP_API_BASE_URL; 
 

  // Function to refresh the toll plaza data
  const refreshTollPlazaData = () => {
 
   fetch(`${baseUrl}/apipsd/parking/parkingNames` ,{ method: "GET" })

    // fetch("http://localhost:4002/apipsd/parking/parkingNames", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const tollPlazaOptions = data.map((parkingName) => ({
          label: parkingName,
          value: parkingName,
        }));
        setOptionGroup([{ label: "", options: tollPlazaOptions }]);
      })
      .catch((error) => console.error("Error fetching TollPlaza:", error));
  };

  useEffect(() => {
    refreshTollPlazaData();
  }, []);

  // Function to handle the selection of a toll plaza folder
  // const handleSelectGroup = (selectedOption) => {
  //   // console.log('Selected Folder: ', selectedOption); // Log the selected folder
  //   setSelectedGroup(selectedOption); // Set the selected toll plaza folder
  // };

  const handleSelectGroup = (selectedOption) => {
    setSelectedGroup(selectedOption); // Set the selected toll plaza folder
  
    // Reset date range to today's date when parking is changed
    setDateRange({
      startDate: moment.utc().startOf("day").subtract(5, "hours").toDate(),
      endDate: moment.utc().endOf("day").subtract(5, "hours").toDate(),
    });
  };
  






// Function to fetch traffic data (moved out of useEffect)
const fetchTrafficData = () => {
  if (selectedGroup && dateRange.startDate && dateRange.endDate) {
    const parkingName = encodeURIComponent(selectedGroup.value);

    // Adjust the time based on your logic
    const adjustTime = (date) => {
      if (!date) return null;
      return moment.utc(date).add(5, "hours");
    };

    // Adjusted dates with 5 hours added
    const adjustedStart = adjustTime(dateRange.startDate);
    const adjustedEnd = adjustTime(dateRange.endDate);

    // Convert the dates to UTC format
    const start = adjustedStart.utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
    const end = adjustedEnd.utc().endOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]");

    fetch(`${baseUrl}/apipsd/parking/parkingData?parking=${parkingName}&startDate=${start}&endDate=${end}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Received Traffic Data: ", data);
        setTrafficData(data);
      })
      .catch((error) => console.error("Error fetching dataset:", error));
  }
};

// Call API initially when dependencies change
useEffect(() => {
  fetchTrafficData();
}, [selectedGroup, dateRange]);

// Function for Pay Now button (calls API again)
const MainApi = () => {
  fetchTrafficData(); // Calls API again with existing data when Pay Now is clicked
};









  const getLayout = () => {
    switch (props.layout.layoutType) {
      case "horizontal":
        return HorizontalLayout;
      default:
        return VerticalLayout;
    }
  };

  const Layout = getLayout();

  return (
    <React.Fragment>
      <Routes>
        <Route>
          {authRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}
        </Route>

        <Route>
          {userRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Layout
                  selectedGroup={selectedGroup}
                  optionGroup={optionGroup}
                  handleSelectGroup={handleSelectGroup}
                  trafficData={trafficData}
                  refreshTollPlazaData={refreshTollPlazaData}
                  onDateChange={handleDateChange}
                 MainApi={MainApi}
                >
                  <Authmiddleware>
                    {React.cloneElement(route.component, {
                      selectedGroup,
                      optionGroup,
                      handleSelectGroup,
                      trafficData,
                      refreshTollPlazaData,
                     MainApi,
                      onDateChange: handleDateChange,
                    })}
                  </Authmiddleware>
                </Layout>
              }
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default connect((state) => ({ layout: state.Layout }), null)(App);
