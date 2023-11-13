import TicketHistory from "@/components/dashboard/HomeTicketHistory";
import { Button, Card, Col, Row } from "antd";
import Link from "next/link";
import React from "react";

const DetailsTicketData = () => {
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
          lg={8}
          md={8}
          sm={24}
          xs={24}
          style={
            {
              // backgroundColor: "#d4e1ea",
            }
          }
        >
          <Card
            style={{
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #F15F22"
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
            <p className="text-justify">
              Welcome to our Support Center! If you have any questions,
              concerns, or require assistance, our team is here to help. To get
              started, simply click on the Create Ticket option below. Our
              dedicated support staff will promptly address your needs and
              provide the assistance you require. We are committed to delivering
              top-notch customer service, and your satisfaction is our priority.
              Thank you for choosing our services.
            </p>
            <Link href="/ticket/create">
              <Button type="primary" block>
                Create Ticket
              </Button>
            </Link>
          </Card>
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
          <TicketHistory />
        </Col>
      </Row>
    </Card>
  );
};

export default DetailsTicketData;
