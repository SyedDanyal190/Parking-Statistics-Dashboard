import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";

//WithRouter
import withRouter from "../Common/withRouter";

import { Link, useLocation } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const location = useLocation();

  const ref = useRef();
  const path = location.pathname;
  const activateParentDropdown = useCallback((item) => {
    // console.log("item", item);
    item.classList.add("active");
    const parent = item.parentElement;
    // console.log("parent", parent);
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = window.location.pathname;
    const fullPath = pathName;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (fullPath === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activateParentDropdown, path]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  const scrollElement = (item) => {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  };

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/#" className="has-arrow">
                {" "}
                <i className="bx bxs-dashboard"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
              <ul className="sub-menu">
                {/* <li><Link to="/dashboard">{props.t("Ecommerce")}</Link></li> */}
                <li>
                  {/* <Link to="/dashboard">{props.t("Traffic Analysis")}</Link> */}
                  <Link to="/dashboard">{props.t("Parking Analysis")}</Link>
                </li>
                {/* <li><Link to="#">{props.t("Crypto")}</Link></li> */}
                <li>
                  <Link to="#">{props.t("Historical Data")}</Link>
                </li>
                <li>
                  <Link to="#">{props.t("Alerts & Notifications")}</Link>
                </li>

                <li>
                  {/* <Link to="#">{props.t("Add TollPLaza")}</Link> */}
                  <Link to="/add-Parking">{props.t("Add Parking")}</Link>
                </li>
                {/* <li>
                <Link to="/add-testing">{props.t("Add Testing TollPlaza")}</Link> 
                </li> */}

              </ul>
            </li>

            <li className="menu-title mt-3">Operational Management</li>

            <li>
              <Link to="#" className="waves-effect">
                <i className="bx bx-doughnut-chart"></i>
                <span key="t-charts">{props.t("Lane Management")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="waves-effect">
                <i className="bx bx-doughnut-chart"></i>
                <span key="t-charts">{props.t("Revenue Reports")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="waves-effect">
                <i className="bx bx-doughnut-chart"></i>
                <span key="t-charts">{props.t("Environmental Impact")}</span>
              </Link>
            </li>

            <li className="menu-title mt-3">System Administration</li>

            <li>
              <Link to="#" className="waves-effect">
                <i className="bx bx-doughnut-chart"></i>
                <span key="t-charts">{props.t("User Management")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="waves-effect">
                <i className="bx bx-doughnut-chart"></i>
                <span key="t-charts">{props.t("System Settings")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="waves-effect">
                <i className="bx bx-doughnut-chart"></i>
                <span key="t-charts">{props.t("Help & Support")}</span>
              </Link>
            </li>

            {/* <li>
              <Link to="#" className="has-arrow waves-effect">
                <i className='bx bxs-grid'></i>
                <span>{props.t("Apps")}</span>
               
                
              </Link>
              <ul className="sub-menu">
                <li><Link to="#"><span>{props.t("Calendar")}</span></Link></li>
                <li><Link to="#"><span>{props.t("Chat")}</span></Link></li>
                <li><Link to="#" className="has-arrow"><span>{props.t("Email")}</span></Link>
                  <ul className="sub-menu">
                    <li><Link to="#">{props.t("Inbox")}</Link></li>
                    <li><Link to="#">{props.t("Read Email")}</Link></li>
                  </ul>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="#" className="waves-effect">
                <span className="badge rounded-pill bg-success float-end">9</span>
                <i className='bx bx-user-circle' ></i>
                <span>{props.t("Authentication")}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="#">{props.t("Login")}</Link></li>
                <li><Link to="#">{props.t("Register")}</Link></li>
                <li><Link to="#">{props.t("Recover Password")}</Link></li>
                <li><Link to="#">{props.t("Lock Screen")}</Link></li>
                <li><Link to="#">{props.t("Confirm Mail")}</Link></li>
                <li><Link to="#">{props.t("Email Verification")}</Link></li>
                <li><Link to="#">{props.t("Two Step Verification")}</Link></li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="#" className="has-arrow waves-effect">
                <i className='bx bx-file'></i>
                <span>{props.t("Pages")}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="#">{props.t("Starter Page")}</Link></li>
                <li><Link to="#">{props.t("Preloader")}</Link></li>
                <li><Link to="#">{props.t("Profile")}</Link></li>
                <li><Link to="#">{props.t("Team")}<span class="badge rounded-pill bg-danger float-end">New</span></Link></li>
                <li><Link to="#">{props.t("Gallery")}<span class="badge rounded-pill bg-danger float-end">New</span></Link></li>
                <li><Link to="#">{props.t("Invoice")}</Link></li>
                <li><Link to="#">{props.t("Maintenance")}</Link></li>
                <li><Link to="#">{props.t("Coming Soon")}</Link></li>
                <li><Link to="#">{props.t("Timeline")}</Link></li>
                <li><Link to="#">{props.t("Pricing")}</Link></li>
                <li><Link to="#">{props.t("Error 404")}</Link></li>
                <li><Link to="#">{props.t("Error 500")}</Link></li>
              </ul>
            </li> */}

            {/* <li className="menu-title mt-3" key="t-adminkit">{props.t("Admin Kit")}</li>

            <li>
              <Link to="#" className="waves-effect">
                <i className='bx bx-briefcase'></i>
                <span key="t-ui-elements">{props.t("UI Elements")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="has-arrow waves-effect">
                <i className='bx bxs-cube-alt'></i>
                <span>{props.t("Advanced Kit")}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="#">{props.t("Range Slider")}</Link></li>
                <li><Link to="#">{props.t("Notifications")}</Link></li>
                <li><Link to="#">{props.t("Carousel")}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="#" className="waves-effect">
                <i className='bx bx-text'></i>
                <span>{props.t("Typography")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="waves-effect">
                <i className='bx bxs-magic-wand' ></i>
                <span className="badge rounded-pill bg-danger float-end">2</span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="#">{props.t("Form Elements")}</Link></li>
                <li><Link to="#">{props.t("Form Advanced")}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="#" className="has-arrow waves-effect">
                <i className='bx bx-table' ></i>
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="#">{props.t("Basic Tables")}</Link></li>
                <li><Link to="#">{props.t("Data Tables")}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="#" className="waves-effect">
                <i className='bx bx-doughnut-chart' ></i>
                <span key="t-charts">{props.t("Charts")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="has-arrow waves-effect">
                <i className='bx bx-layer' ></i>
                <span key="t-icons">{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="#">{props.t("Boxicons")}</Link></li>
                <li><Link to="#">{props.t("Material Design")}</Link></li>
                <li><Link to="#">{props.t("Dripicons")}</Link></li>
                <li><Link to="#">{props.t("Font Awesome 5")}</Link></li>
              </ul>
            </li>

            <li>
              <Link to="#" className="waves-effect">
                <i className='bx bx-map'></i>
                <span key="t-maps">{props.t("Maps")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className="has-arrow ">
                <i className="bx bx-share-alt"></i>
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.any,
  t: PropTypes.any,
};

export default withTranslation()(withRouter(SidebarContent));
