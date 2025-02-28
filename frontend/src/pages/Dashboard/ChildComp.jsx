import React, { useEffect } from "react";

const ChildComp = ({ MainApi, trafficData }) => {
  useEffect(() => {
    // console.log("Received Traffic Data in Child:", trafficData);
  }, [trafficData]); // Log whenever trafficData updates

  return <button onClick={MainApi}>Pay Now</button>;
};

export default ChildComp;
