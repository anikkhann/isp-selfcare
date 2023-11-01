import DetailsTicketData from "@/components/details/ticket/DetailsTicketData";
import { Col, Row } from "antd";
import React from "react";

const TicketList = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col lg={24}>
          <DetailsTicketData />
        </Col>
      </Row>
    </>
  );
};

export default TicketList;
