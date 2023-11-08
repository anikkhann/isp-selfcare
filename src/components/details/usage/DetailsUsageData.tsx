import UsageCard from "@/components/dashboard/UsageCard";
import { Card, Col, Row } from "antd";
import React from "react";
import UsageHistory from "./UsageHistroy";

const DetailsUsageData = () => {
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
          lg={10}
          md={10}
          sm={24}
          xs={24}
          style={
            {
              // backgroundColor: "#d4e1ea",
            }
          }
        >
          <UsageCard />
        </Col>
        <Col
          lg={14}
          md={14}
          sm={24}
          xs={24}
          style={
            {
              // backgroundColor: "#d4e1ea",
            }
          }
        >
          <UsageHistory />
        </Col>
      </Row>
    </Card>
  );
};

export default DetailsUsageData;
