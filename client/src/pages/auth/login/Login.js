import React from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./Login.module.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      localStorage.setItem("token", result.token);

      console.log(result);

      navigate("/");
      toast.success("Login successful");

    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
            <Form.Label>
              Email address<span className={styles.red}>*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email..."
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className={styles.formGroup}>
            <Form.Label>
              Password<span className={styles.red}>*</span>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password..."
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="dark" type="submit" className={styles.button}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;