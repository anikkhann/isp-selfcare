import AppAnimate from "@/lib/AppAnimate";
import AppRowContainer from "@/lib/AppRowContainer";

import React from "react";
import { Col } from "antd";

const MainDashboard = () => {
  return (
    <>
      <AppAnimate>
        <AppRowContainer
          style={{
            height: "80vh",
            margin: "0 30px"
          }}
        >
          <Col></Col>
        </AppRowContainer>
      </AppAnimate>
    </>
  );
};

export default MainDashboard;
