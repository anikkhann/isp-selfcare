import TicketHistory from "@/components/dashboard/HomeTicketHistory";
import { Button, Card, Col, Row } from "antd";
import Link from "next/link";
import React from "react";

const DetailsTicketData = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col
          lg={6}
          md={6}
          sm={24}
          xs={24}
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
            <p>
              This private ticketing system is developed to handle queries &
              complain of our direct customers.
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
    </>
  );
};

export default DetailsTicketData;
