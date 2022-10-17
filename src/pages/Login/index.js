import { Col, Row } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/admin/apiCall";
import { createBrowserHistory } from "history";
import { message } from "antd";

import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillGooglePlusCircle } from "react-icons/ai";
import * as Yup from "yup";
import React, { useEffect } from "react";
import "./styleLogin.scss";
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "at least 2 characters!")
    .max(50, "no more than 50 characters")
    .required("Required!!!"),
  password: Yup.string()
    .min(2, "at least 2 characters!")
    .max(50, "no more than 50 characters")
    .required("Required!!!"),
});
function Login() {
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const history = createBrowserHistory();

  const success = useSelector((state) => state.user.success);
  useEffect(() => {
    if (success) {
      history.push("/");
      window.location.reload(false);
    }
  }, [success]);

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content">
          <Row>
            <Col span={24} className="text-center title">
              <p>Login</p>
            </Col>
            <Col span={24} className="form-group">
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                  // same shape as initial values
                  try {
                    await login(dispatch, {
                      username: values.username,
                      password: values.password,
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Form>
                  <p className="fiel_input">
                    <label htmlFor="username">Username:</label>
                    <Field
                      className="form-control"
                      name="username"
                      type="text"
                      placeholder="enter username"
                    />
                  </p>
                  <p style={{ color: "red" }}>
                    <ErrorMessage name="username" />
                  </p>
                  <p className="fiel_input">
                    <label htmlFor="password">Password:</label>
                    <Field
                      className="form-control"
                      name="password"
                      type="password"
                      placeholder="enter password"
                    />
                  </p>
                  <p style={{ color: "red" }}>
                    <ErrorMessage name="password" />
                  </p>

                  <button className="btn-button" type="submit">
                    Login
                  </button>
                  {error && (
                    <span
                      style={{
                        marginTop: "10px",
                        color: "red",
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      invalid email or password
                    </span>
                  )}

                  <p>
                    <Link style={{ fontSize: "16px" }} to={""}>
                      Forgot your password?
                    </Link>
                  </p>
                  <div className="network">
                    <p>Or sign in with:</p>
                    <p>
                      <span style={{ color: "#283AD2", marginRight: "10px" }}>
                        <BsFacebook size={30} />
                      </span>
                      <span style={{ color: "#28C8D2", marginRight: "10px" }}>
                        <AiFillTwitterCircle size={30} />
                      </span>

                      <span style={{ color: "#E46F1E", marginRight: "10px" }}>
                        <AiFillGooglePlusCircle size={30} />
                      </span>
                    </p>
                  </div>
                </Form>
              </Formik>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Login;
