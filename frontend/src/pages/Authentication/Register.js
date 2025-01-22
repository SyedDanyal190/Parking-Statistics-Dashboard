import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Row, Col, Card, Alert, Container, Form, Input } from "reactstrap"


// action
import { registerUser, apiError, registerUserFailed } from "../../store/actions"

// Redux
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// import images
// import logo from "../../assets/images/logo-dark.png";
import logo from '../../assets/images/logo-light-dummy-2.png';
import logolight from "../../assets/images/logo-light.png"

const Register = props => {
  document.title = "Register |  React Admin & Dashboard Template";

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    props.registerUser(values)
  }

  useEffect(() => {
    props.apiError("")
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <div className="text-center mb-5">
                <Link to="/" className="auth-logo">
                  <img src={logo} alt="" height="32" className="auth-logo-dark" />
                  <img src={logolight} alt="" height="28" className="auth-logo-light" />
                </Link>
                {/* <p className="font-size-15 text-muted mt-3">Responsive <b>Bootstrap 5</b> Admin Dashboard</p> */}
              </div>
              <Card className="overflow-hidden">
                <Row className="g-0">
                  <Col lg={6}>
                    <div className="p-lg-5 p-4">
                      <div>
                        <h5>Register account</h5>
                        {/* <p className="text-muted">Get your free Samply account now.</p> */}
                      </div>

                      <div className="mt-4 pt-3">
                        <Form
                          className="form-horizontal"
                          onValidSubmit={(e, v) => {
                            handleValidSubmit(e, v)
                          }}
                        >
                          {props.user && props.user ? (
                            <Alert color="success">
                              Register User Successfully
                            </Alert>
                          ) : null}

                          {props.registrationError &&
                            props.registrationError ? (
                            <Alert color="danger">
                              {props.registrationError}
                            </Alert>
                          ) : null}

                          <div className="mb-3">
                            <Input
                              id="email"
                              name="email"
                              label="Email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <Input
                              name="username"
                              label="Username"
                              type="text"
                              required
                              placeholder="Enter username"
                            />
                          </div>
                          <div className="mb-3">
                            <Input
                              name="password"
                              label="Password"
                              type="password"
                              required
                              placeholder="Enter Password"
                            />
                          </div>

                          <div className="mt-3 text-end">
                            <button
                              className="btn btn-primary w-sm waves-effect waves-light"
                              type="submit"
                            >
                              Register
                        </button>
                          </div>

                          <div className="mt-4 text-center">
                            <p className="mb-0 text-muted">By registering you agree to the <Link to="#" className="text-primary fw-semibold text-decoration-underline">Terms of Use</Link></p>
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
                <p>Already have an account ? <Link to="login" className="fw-semibold text-decoration-underline"> Login </Link> </p>
                {/* <p>© {(new Date().getFullYear())} <b>Samply</b>. Crafted with <i className="mdi mdi-heart text-danger"></i> by Pichforest</p> */}
                <p>© {new Date().getFullYear()} <i className="mdi mdi-heart text-danger"></i> Applivity</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Register.propTypes = {
  registerUser: PropTypes.any,
  registerUserFailed: PropTypes.any,
  registrationError: PropTypes.any,
  user: PropTypes.any,
}

const mapStatetoProps = state => {
  const { user, registrationError, loading } = state.Account
  return { user, registrationError, loading }
}

export default connect(mapStatetoProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register)


