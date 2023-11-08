import React from "react";
import { Row, Col, Card } from "antd";
import { CustomerData } from "@/interfaces/CustomerData";
import { UserLoggedInData } from "@/store/features/auth/AuthSlice";

interface PropData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: UserLoggedInData;
  customer: CustomerData | null;
}

const DetailsProfileData = ({ item, customer }: PropData) => {
  // console.log("item", item);
  // const data = JSON.stringify(item);
  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          margin: "0 auto",
          // border: "1px solid #F15F22",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",

            // marginTop: "1rem",
            marginBottom: "1.5rem",
            color: "#F15F22",
            fontWeight: "bolder",
            padding: "0.5rem 0.5rem 0 0"
          }}
        >
          Profile Details
        </h1>
      </div>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="gutter-row"
        >
          <Card
            hoverable
            bordered={false}
            style={{
              textAlign: "start",
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #F15F22"
            }}
          >
            <div>
              <Row
                style={{
                  marginTop: "2px"
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "end"
                  }}
                >
                  <span className="font-bold text-base">Name :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{item.name}</span>
                </Col>
              </Row>
              <Row
                style={{
                  marginTop: "2px"
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "end"
                  }}
                >
                  <span className="font-bold text-base">ID :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{item.userId}</span>
                </Col>
              </Row>

              <Row
                style={{
                  marginTop: "2px"
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "end"
                  }}
                >
                  <span className="font-bold text-base">Contact :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{item.phone}</span>
                </Col>
              </Row>

              {/* <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Email :</span>
              </Col>
              <Col className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                <span
                  className="mx-1 text-base"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                >
                  {item.email}
                </span>
              </Col>
            </Row> */}
              <Row
                style={{
                  marginTop: "2px"
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "end"
                  }}
                >
                  <span className="font-bold text-base">Email :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{item.email}</span>
                </Col>
              </Row>
              <Row
                style={{
                  marginTop: "2px"
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "end"
                  }}
                >
                  <span className="font-bold text-base">Address :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{item.address}</span>
                </Col>
              </Row>
              {/* <Row
              style={{
                marginTop: "2px"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end"
                }}
              >
                <span className="font-bold text-base">Address :</span>
              </Col>
              <Col className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                <span
                  className="mx-1 text-base"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                >
                  {item ? item.address : null}
                </span>
              </Col>
            </Row> */}
            </div>
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="gutter-row"
        >
          <Card
            hoverable
            bordered={false}
            style={{
              textAlign: "start",
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #F15F22"
            }}
          >
            <div>
              <Row
                style={{
                  marginTop: "2px"
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "end"
                  }}
                >
                  <span className="font-bold text-base">Name :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{customer?.name}</span>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DetailsProfileData;
