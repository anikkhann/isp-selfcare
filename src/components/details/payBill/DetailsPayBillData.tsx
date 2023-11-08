import TopUpForm from "@/components/forms/payBill/TopUpForm";
import { Card, Col, Row } from "antd";
import React from "react";
import PaymentHistory from "./PaymentHistory";

const DetailsPayBillData = () => {
  return (
    <Card
      style={{
        width: "100%",
        backgroundColor: "#f5f5f5"

        // backgroundColor: "#d4e1ea"
      }}
    >
      <Row gutter={[16, 16]} justify={"center"}>
        <Col
          lg={6}
          md={6}
          sm={24}
          xs={24}
          style={
            {
              // backgroundColor: "#d4e1ea",
            }
          }
        >
          <Card
            title="Top Up"
            style={{
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #F15F22"
            }}
          >
            <TopUpForm />
          </Card>
        </Col>
        <Col
          lg={18}
          md={18}
          sm={24}
          xs={24}
          style={
            {
              // backgroundColor: "#d4e1ea",
            }
          }
        >
          <PaymentHistory />
        </Col>
      </Row>
    </Card>
  );
};

export default DetailsPayBillData;
