import DetailsUsageData from "@/components/details/usage/DetailsUsageData";
import { Col, Row } from "antd";
import React from "react";

const PayBillList = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col lg={24}>
          <DetailsUsageData />
        </Col>
      </Row>
    </>
  );
};

export default PayBillList;
