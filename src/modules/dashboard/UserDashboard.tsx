import HomePaymentHistory from "@/components/dashboard/HomePaymentHistory";
import HomeTicketHistory from "@/components/dashboard/HomeTicketHistory";
import TopHeader from "@/components/dashboard/TopHeader";
import { useAppSelector } from "@/store/hooks";
import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);

  const auth = useAppSelector(state => state.auth.user);

  useEffect(() => {
    if (!auth) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [auth]);

  return (
    <>
      <Card
        title=""
        style={{
          width: "100%",
          backgroundColor: "#d4e1ea"
        }}
        loading={loading}
      >
        <Row gutter={[16, 16]} justify={"center"}>
          <Col lg={24}>{auth && <TopHeader />}</Col>
          <Col lg={12} md={24}>
            {auth && <HomePaymentHistory />}
          </Col>

          <Col lg={12} md={24}>
            {auth && <HomeTicketHistory />}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default UserDashboard;
