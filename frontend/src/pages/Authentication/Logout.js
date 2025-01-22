import React from "react";
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../store/actions";
import withRouter from "../../components/Common/withRouter";

const Logout = (props) => {

  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(logoutUser(props.router.navigate));
  });

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.any,
  logoutUser: PropTypes.any
};

export default withRouter(Logout);