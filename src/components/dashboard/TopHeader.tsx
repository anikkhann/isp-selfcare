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
            loading={isLoading || isFetching}
          >
            {item && (
              <>
                <p>Name : {item.name}</p>
                <p>ID # {item.customerId}</p>
                <p>Package {item.customerPackage?.name}</p>
                <hr />
                <p>
                  validily : {item.customerPackage.validity}{" "}
                  {item.customerPackage.validityUnit}{" "}
                </p>
                <p>Price : {item.customerPackage.totalPrice} BDT</p>
              </>
            )}
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
          <UsageCard />
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
          <HomeNoticeHistory />
        </Col>
      </Row>
    </>
  );
};

export default TopHeader;
