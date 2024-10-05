import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
    //console.log(signInData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      console.log(data);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label className="d-none">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.username?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}

      <Form.Group controlId="password">
        <Form.Label className="d-none">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.password?.map((message, idx) => (
        <Alert key={idx} variant="warning">
          {message}
        </Alert>
      ))}
      <Button type="submit">Sign in</Button>
    </Form>
  );
};

export default SignInForm;
