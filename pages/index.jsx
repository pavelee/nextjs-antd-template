import { useState, useEffect } from "react";
import { Row, Col } from "antd";

const Dashboard = (props) => {
  const { setCurrentMenuItem } = props;

  useEffect(() => {
    setCurrentMenuItem("dashboard");
  }, []);

  return (
    <>
      <Row>
        <Col>Hello world</Col>
      </Row>
    </>
  );
};

export default Dashboard;
