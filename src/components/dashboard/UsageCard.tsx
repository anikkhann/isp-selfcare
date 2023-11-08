/* eslint-disable @typescript-eslint/no-explicit-any */

import AppLoader from "@/lib/AppLoader";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
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
      {isLoading && isFetching && <AppLoader />}

      {isError && <div>{error.message}</div>}
      <Row gutter={[16, 16]} justify={"center"}>
        <Col
          lg={24}
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
              backgroundColor: "white",
              border: "1px solid #F15F22"
            }}
            title="Total Usage"
            loading={isLoading || isFetching}
          >
            {item && (
              <span className="text-center">
                <h1 className="font-bold text-[#3f51b5]">
                  {item.total_usages}
                </h1>
                <p>Till {dayjs().format("MMM D, YYYY")}</p>
              </span>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UsageCard;
