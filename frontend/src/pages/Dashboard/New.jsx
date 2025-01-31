













// import React from "react";
// import { Card, CardBody, CardTitle } from "reactstrap";

// const New = ({ trafficData }) => {
//   console.log("TrafficData:", trafficData);

//   if (!trafficData) {
//     return (
//       <Card>
//         <CardBody>
//           <CardTitle tag="h3" className="mb-4">
//             Loading data...
//           </CardTitle>
//         </CardBody>
//       </Card>
//     );
//   }

//   // Check if the data includes hourly breakdown
//   const isHourlyData = trafficData.resultSameDate && Object.values(trafficData.resultSameDate).some(item => typeof item === 'object' && item.hasOwnProperty('00:00-02:00'));
  
//   let tableData = [];

//   if (isHourlyData) {
//     // If the data contains hourly breakdown, process it accordingly
//     const dateKeys = Object.keys(trafficData.resultSameDate);
//     tableData = dateKeys.map(date => {
//       const hourlyData = trafficData.resultSameDate[date];
//       return Object.keys(hourlyData).map(hourRange => {
//         const count = hourlyData[hourRange];
//         return {
//           timestamp: `${hourRange}`,
//           total: count.total,
//            car  : count.car || 0,
//            bus   : count.bus || 0,
//            van : count.van || 0,
//           // lhrToIsb: count.lhrToIsb || 0,
//           // isbToLhr: count.isbToLhr || 0,
//         };
//       });
//     });

//     // Flatten the data if it's hourly
//     tableData = [].concat(...tableData);
//   } else {
//     // If no hourly breakdown, process total data for each date
//     const dateKeys = Object.keys(trafficData.resultSameDate);
//     tableData = dateKeys.map(date => {
//       const data = trafficData.resultSameDate[date];
//       return {
//         timestamp: date,
//         total: data.total,
//         // lhrToIsb: data.lhrToIsb || 0,
//         // isbToLhr: data.isbToLhr || 0,
//         car  : data.car || 0,
//         bus   : data.bus || 0,
//         van : data.van || 0,
//       };
//     });
//   }

//   return (
//     <Card>
//       <CardBody>
//         <CardTitle tag="h3" className="mb-4">
//           Parking Data Overview
//         </CardTitle>
//         <div className="table-responsive">
//           <table className="table table-striped table-custom table-bordered mb-0">
//             <thead>
//               <tr>
//                 {/* <th>Timestamp</th> */}
//                 <th>Time</th>
//                 <th>Total</th>
//                 <th>Car</th>
//                 <th>Bus</th>
//                 <th>Van</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.length > 0 ? (
//                 tableData.map(({ timestamp, total, car,bus,van }, index) => (
//                   <tr key={index}>
//                     <td>{timestamp}</td>
//                     <td>{total}</td>
//                     <td>{car}</td>
//                     <td>{bus}</td>
//                     <td>{van}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4">No data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </CardBody>
//     </Card>
//   );
// };

// export default New;










//// Dynmaic Logic of vehicle




import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

const New = ({ trafficData }) => {
  console.log("TrafficData:", trafficData);

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

  // Check if the data includes hourly breakdown
  const isHourlyData =
    trafficData.resultSameDate &&
    Object.values(trafficData.resultSameDate).some(
      (item) => typeof item === "object" && item.hasOwnProperty("00:00-02:00")
    );

  let tableData = [];
  const vehicleTypes = ["car", "bus", "van"]; // Define vehicle types for dynamic columns

  if (isHourlyData) {
    // If the data contains hourly breakdown, process it accordingly
    const dateKeys = Object.keys(trafficData.resultSameDate);
    tableData = dateKeys.map((date) => {
      const hourlyData = trafficData.resultSameDate[date];
      return Object.keys(hourlyData).map((hourRange) => {
        const count = hourlyData[hourRange];
        return {
          timestamp: `${hourRange}`,
          total: count.total,
          ...vehicleTypes.reduce((acc, type) => {
            acc[type] = count[type] || 0;
            return acc;
          }, {}),
        };
      });
    });

    // Flatten the data if it's hourly
    tableData = [].concat(...tableData);
  } else {
    // If no hourly breakdown, process total data for each date
    const dateKeys = Object.keys(trafficData.resultSameDate);
    tableData = dateKeys.map((date) => {
      const data = trafficData.resultSameDate[date];
      return {
        timestamp: date,
        total: data.total,
        ...vehicleTypes.reduce((acc, type) => {
          acc[type] = data[type] || 0;
          return acc;
        }, {}),
      };
    });
  }

  // Determine which vehicle columns to display based on the available data
  const availableColumns = vehicleTypes.filter((type) =>
    tableData.some((data) => data[type] > 0)
  );

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3" className="mb-4">
          Parking Data Overview
        </CardTitle>
        <div className="table-responsive">
          <table className="table table-striped table-custom table-bordered mb-0">
            <thead>
              <tr>
                <th>Time</th>
                <th>Total</th>
                {availableColumns.map((column, index) => (
                  <th key={index}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map(({ timestamp, total, ...vehicles }, index) => (
                  <tr key={index}>
                    <td>{timestamp}</td>
                    <td>{total}</td>
                    {availableColumns.map((column, colIndex) => (
                      <td key={colIndex}>{vehicles[column]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default New;
