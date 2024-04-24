import React, { useEffect, useState } from "react";
import { CustomerData } from "@/interfaces/CustomerData";
import { UserLoggedInData } from "@/store/features/auth/AuthSlice";
import AppLoader from "@/lib/AppLoader";
// import { useAppSelector } from "@/store/hooks";

import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import ProfileDetailsForm from "@/components/forms/profileDetails/ProfileDetailsForm";

interface PropData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: UserLoggedInData;
  customer: CustomerData | null;
}
export interface UsageData {
  total_usages: string;
}
// , customer
const DetailsProfileData = ({ item, customer }: PropData) => {
  console.log("item", item);
  // const data = JSON.stringify(item);

  const [usageData, SetUsageData] = useState<UsageData | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api/customer/total-usages/${item?.userName}`
    );
    return response;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["usage", item?.userName],
    enabled: !!item?.userName,
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess(data: any) {
      if (data && data.body.length > 0) {
        SetUsageData(data.body[0]);
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    if (usageData) {
      SetUsageData(usageData);
    }
  }, [usageData]);

  function subOneDay(date = new Date()) {
    date.setDate(date.getDate() - 1);

    return date;
  }

  return (
    <>
      {isLoading && isFetching && <AppLoader />}

      {isError && <div>{error.message}</div>}
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
          md={24}
          lg={24}
          xl={24}
          xxl={24}
          className="gutter-row mb-4"
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
            <ProfileDetailsForm id={item?.userId} customer={customer} />
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="gutter-row "
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
                  <span className="font-bold text-base">Customer ID :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">{customer?.customerId}</span>
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
                  <span className="mx-1 text-base">
                    {customer?.connectionAddress}
                  </span>
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
          className="gutter-row sm: mt-3 md:mt-0"
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
            loading={isLoading || isFetching}
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
                  <span className="font-bold text-base">Package:</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">
                    {customer?.customerPackage?.name}
                  </span>
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
                  <span className="font-bold text-base">Package Price:</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">
                    {customer?.customerPackage.totalPrice} BDT
                  </span>
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
                  <span className="font-bold text-base">Validity Till :</span>
                </Col>
                <Col>
                  {/* <span className="mx-1 text-base">{usageData?.total_usages}</span> */}
                  <span>
                    {customer && (
                      <span className="ml-1">
                        {customer?.customerPackage.validity &&
                          format(
                            subOneDay(new Date(customer.expirationTime)), // Assuming this holds the expiration date -1
                            "dd MMMM yyyy" // Format the date as "27 July 2023"
                          )}
                      </span>
                    )}
                  </span>
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
                  <span className="font-bold text-base">Total Usage :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">
                    {usageData?.total_usages}
                  </span>
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
                  <span className="font-bold text-base">Current Balance :</span>
                </Col>
                <Col>
                  <span className="mx-1 text-base">
                    {customer?.credits} BDT
                  </span>
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
