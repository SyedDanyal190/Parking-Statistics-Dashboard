import React from "react";
import { Row, Col, Alert, Container, Card, Input, Form, FormFeedback } from "reactstrap";
import PropTypes from 'prop-types';
import withRouter from '../../components/Common/withRouter';

// Redux
import { Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { useDispatch, useSelector } from 'react-redux';

// actions
import { loginUser } from "../../store/actions";

// import images
// import logo from "../../assets/images/logo-dark.png";
import logo from '../../assets/images/logo-light-dummy-2.png';
import logolight from "../../assets/images/logo-light.png";
import { createSelector } from "reselect";

const Login = (props) => {
  document.title = "Login | React Admin & Dashboard Template";

  const dispatch = useDispatch();

  // const { error } = useSelector((state) => ({
  //   error: state.Login.error
  // }));
  const errorData = createSelector(
    (state) => state.Login.error,
    (error) => error
  );
// Inside your component
const error = useSelector(errorData);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    // //  orignial code
    // initialValues: {
    //   email: "admin@themesbrand.com" || '',
    //   password: "123456" || '',
    // },

    //  Edit code 
    initialValues: {
      email: "admin@applivity.com" || '',
      // password: "123456" || '',
    
      password : "letmein101" || '',
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your User Name"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    }
  });


  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="mdi mdi-home-variant h2"></i>
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <div className="text-center mb-5">
                <Link to="/" className="auth-logo">
                  <img src={logo} alt="" height="38" className="auth-logo-dark" />
                  <img src={logolight} alt="" height="28" className="auth-logo-light" />
                </Link>
                <p className="font-size-15 text-muted mt-3">Traffic Admin Dashboard</p>
              </div>
              <Card className="overflow-hidden">
                <Row className="g-0">
                  <Col lg={6}>
                    <div className="p-lg-5 p-4">
                      <div>
                        <h5>Welcome Back!</h5>
                        <p className="text-muted">Sign in to continue </p>
                      </div>
                      <div className="mt-4 pt-3">
                        <Form
                          className="form-horizontal"
                          onSubmit={(e, v) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}>

                          {error && typeof error === "string" ? (
                            <Alert color="danger">{error}</Alert>
                          ) : null}

                          <div className="mb-3">
                            <Input name="email"
                              label="Email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email && validation.errors.email ? true : false
                              }
                              required />
                            {validation.touched.email && validation.errors.email ? (
                              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <div className="float-end">
                              <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                            </div>
                            <Input name="password"
                              label="Password"
                              type="password"
                              required
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password && validation.errors.password ? true : false
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customControlInline" />
                            <label className="form-check-label" htmlFor="customControlInline"> Remember me </label>
                          </div>

                          <div className="mt-3">
                            <button className="btn btn-primary w-100 waves-effect waves-light" type="submit"> Log In </button>
                          </div>
                          <div className="mt-4 text-center">
                            <p className="mb-0">Don't have an account ? <a href="/register" className="fw-medium text-primary"> Signup now </a> </p>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="p-lg-5 p-4 bg-auth h-100 d-none d-lg-block">
                      <div className="bg-overlay"></div>
                    </div>
                  </Col>
                </Row>
              </Card>
              <div className="mt-5 text-center">
                <p>© {new Date().getFullYear()} <i className="mdi mdi-heart text-danger"></i> Applivity</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.any,
  loginUser: PropTypes.any,
  socialLogin: PropTypes.any
};
export default withRouter(Login);