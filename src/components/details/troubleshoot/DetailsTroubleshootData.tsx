import { Card, Col, Row } from "antd";
import React from "react";
import TroubleshootListData from "./TroubleshootListData";

const DetailsTroubleshootData = () => {
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
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={
            {
              // backgroundColor: "#d4e1ea",
            }
          }
        >
          <TroubleshootListData />
        </Col>
      </Row>
    </Card>
  );
};

export default DetailsTroubleshootData;
