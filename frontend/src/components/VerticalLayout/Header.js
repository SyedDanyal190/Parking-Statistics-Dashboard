import PropTypes from "prop-types";
import React, { useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import logoSm from "../../assets/images/logo-sm.png";
import logoSmLight from "../../assets/images/logo-sm-light.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import { withTranslation } from "react-i18next";
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";
import DateRangeButton from "../../pages/Dashboard/DateRangeButton";

// Style
import "../../pages/Dashboard/Style/Style.css";

const Header = ({
  leftSideBarType,
  showRightSidebar,
  showRightSidebarAction,
  selectedGroup,
  optionGroup,
  handleSelectGroup,
   onDateChange,
   

}) => {
  const [search, setSearch] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const tToggle = () => {
    const screenWidth = window.innerWidth;
    document.body.classList.toggle("sidebar-enable");
    changeSidebarType(leftSideBarType === "default" ? "small" : "default");

    // Hide the date range when toggling the sidebar
    setShowDateRange(false);
  };

  const handleDropdownChange = (selectedOption) => {
    handleSelectGroup(selectedOption);
    setShowDateRange(true); // Show date range when an item is selected
  };

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
    // Hide the date range if the dropdown is opened
    if (isOpen) {
      setShowDateRange(false);
    }
  };



  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header" id="navbarHeaderID">
          <div id="navbarHeaderIDSub">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="23" />
                </span>
              </Link>
              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSmLight} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="33" />
                </span>
              </Link>
            </div>
            <div id="ToggleButton">
              <button
                type="button"
                onClick={tToggle}
                className="btn btn-sm px-3 pt-2 font-size-18 header-item"
                id="vertical-menu-btn"
              >
                <i className="fa fa-fw fa-bars" />
              </button>
            </div>

            <div style={{ padding: "10px" }} id="lll">
              <div className="d-flex flex-column flex-md-row gap-5" id="Blue">
                <div className="mt-2">
                  <Select
                    value={selectedGroup}
                    onChange={handleDropdownChange}
                    options={optionGroup}
                    classNamePrefix="select2-selection"
                    onMenuOpen={() => handleDropdownToggle(true)}
                    onMenuClose={() => handleDropdownToggle(false)}
                    styles={{
                      control: (base) => ({
                        ...base,
                        minWidth: "220px",
                        width: "auto",
                      }),
                    }}
                  />
                </div>
                {showDateRange && (
                  <div className="TopDivDateButton1 mt-1">
                    <div className="Dumy col-auto" id="DateButton1">
                    <DateRangeButton onDateChange={onDateChange} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="Header-dropDown">
            <div className="dropdown d-lg-none ms-2">
              <button
                onClick={() => setSearch(!search)}
                type="button"
                className="btn header-item noti-icon"
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div className={search ? "dropdown-menu show" : "dropdown-menu"}>
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                      />
                      <button className="btn btn-primary" type="submit">
                        <i className="mdi mdi-magnify" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <LanguageDropdown />
            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="btn header-item noti-icon"
                data-toggle="fullscreen"
              >
                <i className="mdi mdi-fullscreen" />
              </button>
            </div>
          
            <NotificationDropdown />
            <ProfileMenu />
            <div
              onClick={() => showRightSidebarAction(!showRightSidebar)}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle"
              >
                <i className="bx bx-cog bx-spin" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func.isRequired,
  leftSideBarType: PropTypes.string.isRequired,
  showRightSidebar: PropTypes.bool.isRequired,
  showRightSidebarAction: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object,
  optionGroup: PropTypes.array.isRequired,
  handleSelectGroup: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => {
  const { leftSideBarType, showRightSidebar } = state.Layout;
  return { leftSideBarType, showRightSidebar };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
