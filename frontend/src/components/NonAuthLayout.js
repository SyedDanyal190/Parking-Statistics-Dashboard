import PropTypes from 'prop-types'
import React, { Component } from "react"

import { connect } from "react-redux";

class NonAuthLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.capitalizeFirstLetter.bind(this)
  }

  capitalizeFirstLetter = string => {
    return string.charAt(1).toUpperCase() + string.slice(2)
  }

  componentDidMount() {
   
    // let currentage = this.capitalizeFirstLetter(this.props.router.location.pathname)
    // document.title =
    //   currentage + " | Samply - React Admin & Dashboard Template"

      if(this.props.layoutMode === "dark"){
          document.body.setAttribute("data-bs-theme", "dark")
      }else {
        document.body.setAttribute("data-bs-theme", "light")
      }
  }
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.any,
  layoutMode : PropTypes.any
}
const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};

export default connect(mapStatetoProps, {
})(NonAuthLayout);
