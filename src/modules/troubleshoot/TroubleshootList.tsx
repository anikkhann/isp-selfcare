import DetailsTroubleshootData from "@/components/details/troubleshoot/DetailsTroubleshootData";
import { Col, Row } from "antd";
import React from "react";

const TroubleshootList = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col lg={24}>
          <DetailsTroubleshootData />
        </Col>
      </Row>
    </>
  );
};

export default TroubleshootList;
