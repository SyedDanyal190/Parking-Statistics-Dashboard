import React from "react";

const Welcome = () => {
  return (
    <div
      className="container mt-5 text-left"
      style={{
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 className="mb-4" style={{ fontWeight: "bold", color: "black" }}>
        Welcome to the Parking Dashboard
      </h1>
      <h4 className="text-xl" style={{ color: "#7F8C8D" }}>
      Elevate parking management with a robust data analytics platform.
      </h4>
      <p
        className="mt-3"
        style={{ color: "#7F8C8D", fontSize: "1.1rem", lineHeight: "1.5" }}
      >
         Gain insights into vehicle counts, occupancy rates, and total parking
  statistics. The dashboard provides real-time data visualizations,
  including graphs and tables, to facilitate performance tracking with
  ease.
      </p>
      <p
        className="mt-3"
        style={{ color: "#7F8C8D", fontSize: "1.1rem", lineHeight: "1.5" }}
      >
       Analyze parking patterns and vehicle classifications using intuitive
  dropdown menus, enabling filtering and viewing of specific data
  pertinent to parking operations. Informed decision-making is
  supported by accurate and up-to-date information.
      </p>
      <p
        className="mt-3"
        style={{ color: "#7F8C8D", fontSize: "1.1rem", lineHeight: "1.5" }}
      >
       The platform is designed for a seamless user experience, ensuring easy
  access to insights that optimize revenue and enhance operational
  efficiency.
      </p>
    </div>
  );
};

export default Welcome;
