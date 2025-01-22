import React from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import {
  FaCar,
  FaBus,
  FaMotorcycle,
  FaShuttleVan,
  FaTruck,
  FaQuestionCircle,
} from "react-icons/fa";

const TrafficDataTable = ({ trafficData }) => {
  // Check if trafficData is available before processing
  if (!trafficData) {
    return <div>Loading data...</div>;
  }

  // Icon map for vehicle types
  const iconMap = {
    Car: <FaCar className="text-danger" size={20} />,
    Bus: <FaBus className="text-warning" size={20} />,
    Truck: <FaTruck className="text-primary" size={20} />,
    Motorcycle: <FaMotorcycle className="text-success" size={20} />,
    Van: <FaShuttleVan className="text-info" size={20} />,
    Bike: <FaMotorcycle className="text-success" size={20} />,
    Motor: <FaMotorcycle className="text-success" size={20} />,
    Motorbike: <FaMotorcycle className="text-success" size={20} />,
    Motercycle: <FaMotorcycle className="text-success" size={20} />,
  };

  // Prepare data for each vehicle type
  const vehicleData = [
    {
      type: "Car",
      total:
        (trafficData.totalCarIsbToLhr || 0) +
        (trafficData.totalCarLhrToIsb || 0),
      isbToLhr: trafficData.totalCarIsbToLhr || 0,
      lhrToIsb: trafficData.totalCarLhrToIsb || 0,
    },
    {
      type: "Bus",
      total:
        (trafficData.totalBusIsbToLhr || 0) +
        (trafficData.totalBusLhrToIsb || 0),
      isbToLhr: trafficData.totalBusIsbToLhr || 0,
      lhrToIsb: trafficData.totalBusLhrToIsb || 0,
    },
    {
      type: "Motorbike",
      total:
        (trafficData.totalMotorbikeIsbToLhr || 0) +
        (trafficData.totalMotorbikeLhrToIsb || 0),
      isbToLhr: trafficData.totalMotorbikeIsbToLhr || 0,
      lhrToIsb: trafficData.totalMotorbikeLhrToIsb || 0,
    },
    {
      type: "Van",
      total:
        (trafficData.totalVanIsbToLhr || 0) +
        (trafficData.totalVanLhrToIsb || 0),
      isbToLhr: trafficData.totalVanIsbToLhr || 0,
      lhrToIsb: trafficData.totalVanLhrToIsb || 0,
    },
    {
      type: "Truck",
      total:
        (trafficData.totalTruckIsbToLhr || 0) +
        (trafficData.totalTruckLhrToIsb || 0),
      isbToLhr: trafficData.totalTruckIsbToLhr || 0,
      lhrToIsb: trafficData.totalTruckLhrToIsb || 0,
    },
  ];

  // Filter the data to only include vehicles with a total count greater than 0
  const filteredData = vehicleData.filter((vehicle) => vehicle.total > 0);

  // Sort the filtered data based on the total count in descending order
  const sortedData = filteredData.sort((a, b) => b.total - a.total);

  // Calculate the totals for all vehicle types
  // const totalVehicleCount = sortedData.reduce(
  //   (sum, vehicle) => sum + vehicle.total,
  //   0
  // );
  // const totalIsbToLhrCount = sortedData.reduce(
  //   (sum, vehicle) => sum + vehicle.isbToLhr,
  //   0
  // );
  // const totalLhrToIsbCount = sortedData.reduce(
  //   (sum, vehicle) => sum + vehicle.lhrToIsb,
  //   0
  // );

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle className="mb-3">Vehicle Type Counts</CardTitle>
          <Table striped responsive>
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Vehicle Count</th>
                <th>ISB-LHR Count</th>
                <th>LHR-ISB Count</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((vehicle) => (
                <tr key={vehicle.type}>
                  <td>
                    <span className="d-flex align-items-center">
                      {iconMap[vehicle.type] || (
                        <FaQuestionCircle
                          className="text-secondary"
                          size={20}
                        />
                      )}
                      <span className="ms-2">{vehicle.type}</span>
                    </span>
                  </td>
                  <td>{vehicle.total}</td>
                  <td>{vehicle.isbToLhr}</td>
                  <td>{vehicle.lhrToIsb}</td>
                </tr>
              ))}
            </tbody>
            {/* <tfoot>
              <tr>
                <th>Total</th>
                <td>{totalVehicleCount}</td>
                <td>{totalIsbToLhrCount}</td>
                <td>{totalLhrToIsbCount}</td>
              </tr>
            </tfoot> */}
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TrafficDataTable;
