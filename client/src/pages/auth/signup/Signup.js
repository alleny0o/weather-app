import React from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./Signup.module.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    password: "",
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {

      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      navigate("/login");
      toast.success("User created successfully");
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {

      setFormData({
        email: "",
        name: "",
        password: "",
      });

    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Form onSubmit={handleSubmit}>
          <h1>Signup</h1>
          <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
            <Form.Label>
              Email address (unique)<span className={styles.red}>*</span>
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
          <Form.Group controlId="formBasicName" className={styles.formGroup}>
            <Form.Label>
              Name<span className={styles.red}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name..."
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicPassword"
            className={styles.formGroup}
          >
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
            Signup
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
