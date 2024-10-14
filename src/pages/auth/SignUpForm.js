import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SignUpForm = () => {
  const history = useHistory();

  const [signUpFromData, setSignUpFormData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignUpFormData({
      ...signUpFromData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", signUpFromData.username);
    formData.append("password1", signUpFromData.password1);
    formData.append("password2", signUpFromData.password2);

    try {
      await axios.post("/dj-rest-auth/registration/", formData);
      history.push("/signin");
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col>
        <h3>Sign up to Tiny Wheels</h3>
        <h5>Join us to share your die cast vehicle adventures!</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>Username</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  name="username"
                  value={signUpFromData.username}
                  placeholder="Enter a unique username"
                  onChange={handleChange}
                ></Form.Control>
                {errors.username?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>Password</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  name="password1"
                  value={signUpFromData.password1}
                  placeholder="Enter a password"
                  onChange={handleChange}
                ></Form.Control>
                <p>Your password must contain at least 8 characters</p>
                {errors.password1?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label>Re-enter Password</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  name="password2"
                  value={signUpFromData.password2}
                  placeholder="Re-enter your password"
                  onChange={handleChange}
                ></Form.Control>
                {errors.password2?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}
              </Col>
            </Row>
          </Form.Group>
          <Button type="submit" variant="success">
            Sign Up
          </Button>
        </Form>
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
  );
};

export default SignUpForm;
