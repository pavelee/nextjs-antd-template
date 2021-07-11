import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  Alert,
} from "antd";

const Login = (props) => {
  const { loginHandler, error } = props;

  const onFinish = (values) => {
    loginHandler(values.username, values.password);
  };

  return (
    <>
      <Row justify={"center"} style={styles.loginbox}>
        <Col>
          <Card>
            {error && (
              <Row style={styles.errorBox}>
                <Col span={24}>
                  <Alert
                    message="wrong creditenials"
                    type="error"
                    showIcon
                  />
                </Col>
              </Row>
            )}
            <Form
              name="basic"
              layout={"vertical"}
              onFinish={onFinish}
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="Login"
                name="username"
                rules={[{ required: true, message: "Login required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password required" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={false}
                  block
                  type="primary"
                  htmlType="submit"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const styles = {
  loginbox: {
    paddingTop: "15%",
  },
  logoBox: {
    marginBottom: 15,
  },
  errorBox: {
    marginBottom: 15,
  },
};

export default Login;
