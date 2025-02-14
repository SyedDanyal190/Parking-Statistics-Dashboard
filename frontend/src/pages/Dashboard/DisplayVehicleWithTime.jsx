import React from 'react'

import { Card, CardBody, CardTitle } from "reactstrap";

const DisplayVehicleWithTime = ({ trafficData }) => {
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

const DisplayVehicleTime =  trafficData.result;
console.log("Dispay!!!!!!!!!!!!!!!!!!!!",DisplayVehicleTime);


    // {DisplayVehiclewithTime.map((entry, index) => {
    //     // Splitting the string to extract data
    //     const [vehicleType, timeIn, timeOut] = entry
    //       .split(/ - Time In: |, Time Out: /);

    return (
    <>
         <Card>
              <CardBody >

              <h1 className="card-title mb-4" style={{ fontSize: "20px", fontWeight: "bold" }}>
  Vehicle with Time In and Time Out
</h1>

          

           <div className='table-responsive'>
               <table className='table  table-striped table-custom table-bordered mb-0 '>
                   <thead>
                         <tr>
                              <th>Vehicle Type Car</th>
                               <th>Time In</th>
                               <th>Time Out</th>
                               <th>Parking Status</th>
                         </tr>
                   </thead>
                     <tbody>
                     {DisplayVehicleTime.map((entry, index) => {
            // Splitting the string to extract data
            const [vehicleType, timeIn, timeOut] = entry
              .split(/ - Time In: |, Time Out: /);

            return (
              <tr key={index}>
                                <td>{vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}</td>

                                      <td>{timeIn}</td>
                                      <td>{timeOut}</td>
                                    </tr>
                                  );
                                })}
                     </tbody>
                </table>               
           </div>
              </CardBody>
              </Card>
             
    </>
  )
}

export default DisplayVehicleWithTime