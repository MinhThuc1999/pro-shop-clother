import React, { useEffect } from "react";

import { Col, Row } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, login } from "../../../redux/admin/apiCall";
import { createBrowserHistory } from "history";

import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillGooglePlusCircle } from "react-icons/ai";
import * as Yup from "yup";
import "./register.scss";
function Register() {
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "at least 2 characters!")
      .max(50, "no more than 50 characters")
      .required("Required!!!"),
    password: Yup.string()
      .min(2, "at least 2 characters!")
      .max(50, "no more than 50 characters")
      .required("Required!!!"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });
  const navigate = useNavigate();

  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const history = createBrowserHistory();

  const success = useSelector((state) => state.user.success);
  /*useEffect(() => {
    if (success) {
      history.push("/");
      window.location.reload(false);
    }
  }, [success]);*/
  const handleRegister = async (values) => {
    try {
      await addUsers(values, dispatch);
      if (success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content">
          <Row>
            <Col span={24} className="text-center title">
              <p>Register</p>
            </Col>
            <Col span={24} className="form-group">
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  email: "",
                  address: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  handleRegister(values);
                  // same shape as initial values
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
                  <p className="fiel_input">
                    <label htmlFor="email">Email:</label>
                    <Field
                      className="form-control"
                      name="email"
                      type="text"
                      placeholder="enter email"
                    />
                  </p>
                  <p style={{ color: "red" }}>
                    <ErrorMessage name="email" />
                  </p>
                  <p className="fiel_input">
                    <label htmlFor="address">Address:</label>
                    <Field
                      className="form-control"
                      name="address"
                      type="text"
                      placeholder="enter address"
                    />
                  </p>
                  <button className="btn-button" type="submit">
                    register
                  </button>
                </Form>
              </Formik>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Register;
