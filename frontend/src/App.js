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
    console.log("Updated Date Range in Parent:", dateRange);
  }, [dateRange]);

  // Function to refresh the toll plaza data
  const refreshTollPlazaData = () => {
    fetch("http://localhost:4001/api/parking/parkingNames", { method: "GET" })
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
  const handleSelectGroup = (selectedOption) => {
    // console.log('Selected Folder: ', selectedOption); // Log the selected folder
    setSelectedGroup(selectedOption); // Set the selected toll plaza folder
  };

  useEffect(() => {
    console.log("Date Range Changed:", dateRange); // Log to verify the date range when it changes

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

      console.log("start!!!!!!!!!!!!!!!!!!!!!!!!!!!!", adjustedStart);
      console.log("End!!!!!!!!!!!!!!!!!!!!!!!!!!!!", adjustedEnd);

      // Ensure the end date is at the end of the same day
      // const adjustedEndDay = adjustedStart.clone().endOf('day');

      // Convert the dates to UTC format
      const start = adjustedStart.utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
      const end = adjustedEnd
        .utc()
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss[Z]");

      console.log("Start Date (UTC): ", start);
      console.log("End Date (UTC): ", end);

      if (adjustedStart && adjustedEnd) {
        // Fetch the combined data API
        fetch(
          `http://localhost:4001/api/parking/parkingData?parking=${parkingName}&startDate=${start}&endDate=${end}`,
          { method: "GET" }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Received Traffic Data: ", data); // Log the data received
            setTrafficData(data); // Update the traffic data with the new data from the server
          })
          .catch((error) => console.error("Error fetching dataset:", error));
      } else {
        console.error("Adjusted start or end date is invalid");
      }
    }
  }, [selectedGroup, dateRange]); // This will trigger whenever either selectedGroup or dateRange changes

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
                >
                  <Authmiddleware>
                    {React.cloneElement(route.component, {
                      selectedGroup,
                      optionGroup,
                      handleSelectGroup,
                      trafficData,
                      refreshTollPlazaData,

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
