import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import DateRangeButton from './DateRangeButton';
import "../Dashboard/Style/Style.css";

const Buttons = () => {
  // <button class="btn btn-primary" type="button" id="inputGroupFileAddon03">Button</button>

  return (
    <div className="container-fluid mt-1 mb-2" id="ButtonComp">
      {/* <div className="col-auto " id='DateButton'>
           <DateRangeButton />
      </div> */}

      <div className="row  ">
        <div className="col">
          <div className="d-flex gap-3">
            {/* <button className="btn btn-primary btn-lg">All Traffic</button> */}
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                id="inputGroupFileAddon03"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Toll Plaza
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    All Traffic
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Toll Plaza 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Toll Plaza 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Toll Plaza 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buttons;
