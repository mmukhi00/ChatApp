import React, { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);
  return (
    <>
      <Form onSubmit={registerUser}>
        <Row style={styles.row}>
          <Col xs={6}>
            <Stack gap={2}>
              <h2>Register</h2>

              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button style={styles.submit} type="submit">
                {isRegisterLoading ? "Creating New Account..." : "Register"}
              </Button>
              {registerError?.error && (
                <Alert style={styles.alert}>
                  <p style={styles.alertMessage}>{registerError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;

const styles = {
  row: {
    height: "100vh",
    justifyContent: "center",
    paddingTop: "10%",
  },
  submit: {
    backgroundColor: "#d45a54",
    borderColor: "#a54641",
  },
  alert: {
    marginTop: 20,
    backgroundColor: "#E5E4E2",
    borderColor: "#C0C0C0",
    borderWidth: 2,
    height: 70,
  },
  alertMessage: {
    marginTop: 5,
    color: "black",
    textAlign: "center",
  },
};
