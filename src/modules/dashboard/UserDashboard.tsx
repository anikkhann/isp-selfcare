import PaymentHistory from "@/components/dashboard/PaymentHistory";
import TicketHistory from "@/components/dashboard/TicketHistory";
import TopHeader from "@/components/dashboard/TopHeader";
import { Col, Row } from "antd";
import React from "react";

const UserDashboard = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col lg={24}>
          <TopHeader />
        </Col>
        <Col lg={12} md={24}>
          <PaymentHistory />
        </Col>

        <Col lg={12} md={24}>
          <TicketHistory />
        </Col>
      </Row>
    </>
  );
};

export default UserDashboard;
