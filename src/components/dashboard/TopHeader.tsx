/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomerData } from "@/interfaces/CustomerData";
import AppLoader from "@/lib/AppLoader";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import UsageCard from "./UsageCard";
import HomeNoticeHistory from "./HomeNoticeHistory";
import { format } from "date-fns";
const TopHeader = () => {
  const authUser = useAppSelector(state => state.auth.user);

  const [item, SetItem] = useState<CustomerData | null>(null);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api/customer/get-by-id/${authUser?.userId}`
    );
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["customer-list", authUser?.userId],
    enabled: !!authUser?.userId,
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    onSuccess(data: any) {
      if (data) {
        SetItem(data.body);
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    if (item) {
      SetItem(item);
    }
  }, [item]);

  function subOneDay(date = new Date()) {
    date.setDate(date.getDate() - 1);

    return date;
  }

  return (
    <>
      {isLoading && isFetching && <AppLoader />}

      {isError && <div>{error.message}</div>}
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
            loading={isLoading || isFetching}
          >
            {item && (
              <>
                <p>
                  Name : <span className="font-bold">{item.name}</span>
                </p>
                <p>
                  Customer ID :
                  <span className="font-bold">{item.customerId}</span>
                </p>
                <p>
                  Package :
                  <span className="font-bold ml-1">
                    {item.customerPackage?.name}
                  </span>
                </p>
                <hr />
                {/* <p>
                  - Validity Till :  <span className="font-bold">{item.customerPackage.validity}
                  {item.customerPackage.validityUnit}</span> 
                </p> */}
                <p>
                  Validity Till :
                  {item && (
                    <span className="font-bold ml-1">
                      {item.customerPackage.validity &&
                        format(
                          subOneDay(new Date(item.expirationTime)), // Assuming this holds the expiration date -1
                          "dd MMMM yyyy" // Format the date as "27 July 2023"
                        )}
                    </span>
                  )}
                </p>
                <p>
                  Charge :
                  <span className="font-bold ml-1">
                    {item.customerPackage.totalPrice} BDT
                  </span>
                </p>
                <p>
                  Current Balance :
                  <span className="font-bold ml-1">{item.credits} BDT</span>
                </p>
              </>
            )}
          </Card>
        </Col>
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
          <UsageCard />
        </Col>
        <Col
          lg={12}
          md={24}
          sm={24}
          xs={24}
          style={
            {
              // backgroundColor: "#d4e1ea",
            }
          }
        >
          <HomeNoticeHistory />
        </Col>
      </Row>
    </>
  );
};

export default TopHeader;
