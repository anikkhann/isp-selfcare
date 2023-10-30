import { Card, Col, Row } from "antd";
import React from "react";

const TopHeader = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col
          lg={6}
          md={12}
          sm={24}
          style={
            {
              // backgroundColor: "#d4e1ea",
            }
          }
        >
          <Card
            style={{ width: "100%" }}
            cover={
              <>
                <img
                  alt="example"
                  src="https://selfcare.carnival.com.bd/images/profile-bg.jpg"
                  style={{
                    height: "100px",
                    width: "100%",
                    objectFit: "cover"
                  }}
                />
              </>
            }
          >
            <p>Name</p>
            <p>ID #</p>
            <p>Half Yearly </p>
            <p>Package </p>
            <hr />
            <p>validily :</p>
            <p>Avaiable Balance :</p>
          </Card>
        </Col>
        <Col
          lg={4}
          md={12}
          sm={24}
          style={
            {
              // backgroundColor: "#d4e1ea",
            }
          }
        >
          <Card style={{ width: "100%" }} title="Total Usage">
            <h1>0.00 GB</h1>
            <p>Till</p>
          </Card>
        </Col>
        <Col
          lg={12}
          md={24}
          sm={24}
          style={
            {
              // backgroundColor: "#d4e1ea",
            }
          }
        >
          <Card
            style={{
              width: "100%",
              height: "100%"
            }}
            cover={
              <>
                <img
                  alt="example"
                  src="https://selfcare.carnival.com.bd/images/profile-bg.jpg"
                  style={{
                    height: "100px",
                    width: "100%",
                    objectFit: "cover"
                  }}
                />
              </>
            }
          >
            <p>Name</p>
            <p>ID #</p>
            <p>Half Yearly </p>
            <p>Package </p>
            <hr />
            <p>validily :</p>
            <p>Avaiable Balance :</p>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TopHeader;
