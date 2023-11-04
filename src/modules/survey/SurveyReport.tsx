import SurveyForm from "@/components/forms/survey/SurveyForm";
import { Col, Row } from "antd";
import React from "react";

const SurveyReport = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col lg={24}>
          <SurveyForm />
        </Col>
      </Row>
    </>
  );
};

export default SurveyReport;
