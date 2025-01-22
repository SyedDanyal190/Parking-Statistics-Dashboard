import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Collapse } from "reactstrap"
import { Link, useLocation } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [dashboard, setDashboard] = useState(false)
  const [ui, setui] = useState(false);
  const [app, setapp] = useState(false)
  const [email, setemail] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [icon, seticon] = useState(false)
  const [extra, setextra] = useState(false)
  const [auth, setauth] = useState(false)

  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    // const pathName = location.pathname;
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [pathName]);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  
  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    to="/dashboard"
                    onClick={e => {
                      e.preventDefault()
                      setDashboard(!dashboard)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="bx bxs-dashboard me-2"></i>
                    {props.t("Dashboard")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: dashboard })}>
                    <Link to="/dashboard" className="dropdown-item">
                      {props.t("Ecommerce")}
                    </Link>
                    <Link to="#" className="dropdown-item">
                      {props.t("Crypto")}
                    </Link>
                  </div>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <i className="bx bx-briefcase me-2"></i><span>{props.t("UI Elements")}</span>
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    onClick={e => {
                      e.preventDefault()
                      setui(!ui)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="bx bxs-grid me-2"></i>
                    {props.t("Advanced Kit")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: ui })}>
                    <Link to="#" className="dropdown-item">
                      {props.t("Range Slider")}
                    </Link>
                    <Link to="#" className="dropdown-item">
                      {props.t("Notifications")}
                    </Link>
                    <Link to="#" className="dropdown-item">
                      {props.t("Carousel")}
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    onClick={e => {
                      e.preventDefault()
                      setapp(!app)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="bx bxs-cube-alt me-2"></i>
                    {props.t("Apps")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })} >
                    <Link to="#" className="dropdown-item" key="t-calendar">{props.t("Calendar")}</Link>
                    <Link to="#" className="dropdown-item" key="t-chat">{props.t("Chat")}</Link>
                    <div className="dropdown">
                      <Link
                        to="#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setemail(!email)
                        }}
                      >
                        {props.t("Email")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: email })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Inbox")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Read Email")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    to="#"
                    onClick={e => {
                      e.preventDefault()
                      setextra(!extra)
                    }}
                  >
                    <i className="bx bx-layer me-2"></i>
                    {props.t("Admin Kit")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: extra })}>
                    <Link to="#" className="dropdown-item" key="t-typography">{props.t("Typography")}</Link>
                    <div className="dropdown">
                      <Link
                        to="#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setform(!form)
                        }}
                      >
                        {props.t("Forms")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", {
                          show: form,
                        })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Form Elements")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Form Advanced")}
                        </Link>
                      </div>
                    </div>

                    <div className="dropdown">
                      <Link
                        to="#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          settable(!table)
                        }}
                      >
                        {props.t("Tables")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", {
                          show: table,
                        })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Bootstrap Tables")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Data Tables")}
                        </Link>
                      </div>
                    </div>
                    <Link to="#" className="dropdown-item" key="t-charts">{props.t("Charts")}</Link>
                    <div className="dropdown">
                      <Link
                        className="dropdown-item dropdown-toggle arrow-none"
                        to="#"
                        onClick={e => {
                          e.preventDefault()
                          seticon(!icon)
                        }}
                      >
                        {props.t("Icons")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", {
                          show: icon,
                        })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Boxicons")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Material Design")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Dripicons")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Font Awesome 5")}
                        </Link>
                      </div>
                    </div>
                    <Link to="#" className="dropdown-item" key="t-maps">{props.t("Maps")}</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="#"
                    onClick={e => {
                      e.preventDefault()
                      setauth(!auth)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="bx bx-file me-2"></i>
                    {props.t("Extra pages")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: auth })}>
                    <div className="dropdown">
                      <Link
                        to="#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setauth(!auth)
                        }}
                      >
                        {props.t("Authentication")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: auth })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Login")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Register")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Recover Password")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Lock Screen")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Confirm Mail")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Email verification")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Two step verification")}
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setauth(!auth)
                        }}
                      >
                        {props.t("Utility")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: auth })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Starter Page")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Preloader")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Profile")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Team")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Gallery")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Invoice")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Maintenance")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Coming Soon")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Timeline")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Pricing")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Error 404")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Error 500")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default (
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
