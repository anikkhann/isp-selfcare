import DetailsPayBillData from "@/components/details/payBill/DetailsPayBillData";
import { Col, Row } from "antd";
import React from "react";

const PayBillList = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col lg={24}>
          <DetailsPayBillData />
        </Col>
      </Row>
    </>
  );
};

export default PayBillList;
