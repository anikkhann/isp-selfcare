import { Col, Row } from "antd";
import React from "react";
import TroubleshootListData from "./TroubleshootListData";

const DetailsTroubleshootData = () => {
  return (
    <>
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
    </>
  );
};

export default DetailsTroubleshootData;
