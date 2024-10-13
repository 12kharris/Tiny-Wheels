import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({});
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/new");
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col md={1} lg={2}></Col>
      <Col>
        <h3>Sign into your Tiny Wheels account</h3>
        {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>))}
        <Form onSubmit={handleSubmit} style={{marginTop: "40px"}}>
          <Form.Group controlId="username">
            <Row>
              <Col md={3}>
                <Form.Label>Username</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form.Group>
          {errors.username?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password">
            <Row>
              <Col md={3}>
                <Form.Label>Password</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form.Group>
          {errors.password?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}
          <Button type="submit">Sign in</Button>
        </Form>
      </Col>
      <Col md={1} lg={2}></Col>
    </Row>
  );
};

export default SignInForm;
