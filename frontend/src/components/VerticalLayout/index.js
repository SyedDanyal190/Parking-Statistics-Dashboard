import PropTypes from "prop-types";
import React, { Component } from "react";

import { connect } from "react-redux";
import {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  showRightSidebarAction,
  changelayoutMode,
} from "../../store/actions";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Rightbar from "../CommonForBoth/Rightbar";
import classNames from "classnames";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleMenuCallback = this.toggleMenuCallback.bind(this);
    this.hideRightbar = this.hideRightbar.bind(this);
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  componentDidMount() {
    //init body click event for toggle rightbar
    document.body.addEventListener("click", this.hideRightbar, true);

    if (this.props.isPreloader === true) {
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("status").style.display = "none";
      }, 2500);
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }

    // Scroll Top to 0
    window.scrollTo(0, 0);

    if (this.props.layoutMode) {
      this.props.changelayoutMode(this.props.layoutMode);
    }
    if (this.props.leftSideBarTheme) {
      this.props.changeSidebarTheme(this.props.leftSideBarTheme);
    }

    if (this.props.layoutWidth) {
      this.props.changeLayoutWidth(this.props.layoutWidth);
    }

    if (this.props.leftSideBarType) {
      this.props.changeSidebarType(this.props.leftSideBarType);
    }
    if (this.props.topbarTheme) {
      this.props.changeTopbarTheme(this.props.topbarTheme);
    }
  }

  toggleMenuCallback = () => {
    if (this.props.leftSideBarType === "default") {
      this.props.changeSidebarType("condensed", this.state.isMobile);
    } else if (this.props.leftSideBarType === "condensed") {
      this.props.changeSidebarType("default", this.state.isMobile);
    }
  };

  //hides right sidebar on body click
  hideRightbar = (event) => {
    var rightbar = document.getElementById("right-bar");
    //if clicked in inside right bar, then do nothing
    if (rightbar && rightbar.contains(event.target)) {
      return;
    } else {
      //if clicked in outside of rightbar then fire action for hide rightbar
      this.props.showRightSidebarAction(false);
    }
  };

  componentWillUnmount() {
    //make sure to remove body click event for toggle rightbar
    document.body.removeEventListener("click", this.hideRightbar, true);
  }

  render() {
    // Destructure the specific props you want to log
    const { selectedGroup, optionGroup, handleSelectGroup, tollPlazaData,  onDateChange} =
      this.props;

    // Log only the specific props
    // console.log("Received specific props in Layout:", {
    //   selectedGroup,
    //   optionGroup,
    //   handleSelectGroup,
    //   tollPlazaData,
    // });
   
    

    const isUIpath = window.location.pathname === "/ui-components";
    return (
      <React.Fragment>
        <div id="preloader">
          <div id="status">
            <div className="spinner-chase">
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
              <div className="chase-dot" />
            </div>
          </div>
        </div>

        <div id="layout-wrapper">
          <Header
            toggleMenuCallback={this.toggleMenuCallback}
            selectedGroup={selectedGroup}
            optionGroup={optionGroup}
            handleSelectGroup={handleSelectGroup}
            tollPlazaData={tollPlazaData}
         
            onDateChange={onDateChange}
          />
          <Sidebar
            type={this.props.leftSideBarType}
            isMobile={this.state.isMobile}
          />

          <div
            className={classNames(
              { "main-content overflow-visible": isUIpath },
              { "main-content": !isUIpath }
            )}
          >
            {this.props.children}
          </div>

          <Footer />
        </div>
        {this.props.showRightSidebar ? <Rightbar /> : null}
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  changeLayoutWidth: PropTypes.any,
  changeSidebarTheme: PropTypes.any,
  changeSidebarType: PropTypes.any,
  changeTopbarTheme: PropTypes.any,
  children: PropTypes.any,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  layoutMode: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.any,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
  selectedGroup: PropTypes.any, // Add this line
  optionGroup: PropTypes.any, // Add this line
  handleSelectGroup: PropTypes.any, // Add this line
  tollPlazaData: PropTypes.any, // Add this line

  onDateChange : PropTypes.any,
};

const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};
export default connect(mapStatetoProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changelayoutMode,
  changeLayoutWidth,
  showRightSidebarAction,
})(Layout);
