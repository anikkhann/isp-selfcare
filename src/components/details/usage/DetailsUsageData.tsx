import UsageCard from "@/components/dashboard/UsageCard";
import { Col, Row } from "antd";
import React from "react";
import UsageHistory from "./UsageHistroy";

const DetailsUsageData = () => {
  return (
    <>
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
          <UsageCard />
        </Col>
        <Col
          lg={16}
          md={16}
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
    </>
  );
};

export default DetailsUsageData;
