/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Space } from "antd";
import AppRowContainer from "@/lib/AppRowContainer";
import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";

import { sanitize } from "isomorphic-dompurify";

interface NoticeData {
  message: string;
}

const HomeNoticeHistory = () => {
  const [data, setData] = useState<NoticeData[]>([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const { data } = await axios.get(`/api/notice-board/get-customer-notices`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error, isFetching } = useQuery<boolean, any>({
    queryKey: ["notice-list"],
    queryFn: async () => {
      const response = await fetchData();
      return response;
    },
    onSuccess(data: any) {
      if (data) {
        // console.log("data.data", data);
        if (data.body) {
          setData(data.body);
        } else {
          setData([]);
        }
      }
    },
    onError(error: any) {
      console.log("error", error);
    }
  });

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  return (
    <>
      <AppRowContainer>
        <Col span={24} key="data-f">
          {isError && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: " 10px 5px"
                }}
              >
                <Card
                  title="Error"
                  style={{
                    width: 300,
                    color: "#FF5630",
                    backgroundColor: "#ffffff"
                  }}
                >
                  <p>
                    {error &&
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                      ? error.response.data.message
                      : error.message
                      ? error.message
                      : "Something went wrong"}
                  </p>
                </Card>
              </div>
            </>
          )}

          <Space direction="vertical" style={{ width: "100%" }}>
            <Card
              title="Notice Board"
              style={{
                width: "100%",
                backgroundColor: "#ffffff",
                border: "1px solid #F15F22"
              }}
              loading={isLoading || isFetching}
            >
              <Row gutter={[16, 16]} justify={"center"}>
                {data.length > 0 &&
                  data.map((item: NoticeData, index: number) => {
                    return (
                      <Col span={24} key={index}>
                        <Card
                          // title=""
                          style={{
                            width: "100%",
                            color: "#FF5630"
                            // backgroundColor: "#ffffff"
                          }}
                        >
                          <p
                            dangerouslySetInnerHTML={{
                              __html: sanitize(item.message)
                            }}
                          ></p>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </Card>
          </Space>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default HomeNoticeHistory;
