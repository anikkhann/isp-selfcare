/* eslint-disable @typescript-eslint/no-explicit-any */

import AppLoader from "@/lib/AppLoader";
import AppRowContainer from "@/lib/AppRowContainer";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Space } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export interface UsageData {
  total_usages: string;
}

const UsageCard = () => {
  const authUser = useAppSelector(state => state.auth.user);

  const [item, SetItem] = useState<UsageData | null>(null);
  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `/api/customer/total-usages/${authUser?.userName}`
    );
    return response;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["usage", authUser?.userName],
    enabled: !!authUser?.userName,
    queryFn: async () => {
      const { data } = await fetchData();
      return data;
    },
    onSuccess(data: any) {
      if (data && data.body.length > 0) {
        SetItem(data.body[0]);
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
      <AppRowContainer>
        <Col span={24} key="data-f">
          {isLoading && isFetching && <AppLoader />}

          {isError && <div>{error.message}</div>}
          <Space direction="vertical" style={{ width: "100%" }}>
            <Card
              style={{
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #F15F22"
              }}
              title="Total Usage"
              loading={isLoading || isFetching}
              className="md:h-[23.4rem]"
            >
              <Row gutter={[16, 16]} justify={"center"}>
                <Col lg={24} md={24} sm={24}>
                  {item && (
                    <span className="text-center ">
                      <h1 className="font-bold text-[#3f51b5] md:pt-[4rem]">
                        {item.total_usages}
                      </h1>
                      <p>Till {dayjs().format("MMM D, YYYY")}</p>
                    </span>
                  )}
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      </AppRowContainer>

      {/*    
      <Row gutter={[16, 16]} justify={"center"}>
        <Col
          lg={24}
          md={24}
          sm={24}
          style={
            {
           
            }
          }
        >
          <Space className="w-full" direction="vertical" style={{ width: "100%" }}>
          <Card
            style={{
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #F15F22",
           
            }}
            title="Total Usage"
            loading={isLoading || isFetching}
            className="md:h-[23.4rem] w-full"
          >
            {item && (
              <span className="text-center ">
                <h1 className="font-bold text-[#3f51b5] md:pt-[4rem]">
                  {item.total_usages}
                </h1>
                <p>Till {dayjs().format("MMM D, YYYY")}</p>
              </span>
            )}
          </Card>
          </Space>
         
        
        </Col>
      </Row> */}
    </>
  );
};

export default UsageCard;
