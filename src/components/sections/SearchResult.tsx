import { Alert, Col, Pagination, Row } from "antd";
import React, { useState } from "react";
import SearchCard from "./SearchCard";
import type { PaginationProps } from "antd";
const SearchResult = () => {
  const [current, setCurrent] = useState(3);

  const onChange: PaginationProps["onChange"] = page => {
    console.log(page);
    setCurrent(page);
  };
  return (
    <>
      <div
        style={{
          margin: "20px auto"
        }}
      >
        <Alert
          message="বুকিং এ মোট 2 টি ফলাফল পাওয়া গিয়েছে"
          type="success"
          style={{
            width: "100%",
            margin: "20px auto",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center"
          }}
        />

        <Row
          gutter={[24, 24]}
          style={{
            margin: "20px auto"
          }}
        >
          <Col sm={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
            <SearchCard />
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
            <SearchCard />
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
            <SearchCard />
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
            <SearchCard />
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
            <SearchCard />
          </Col>
          <Col sm={{ span: 24 }} lg={{ span: 8 }} md={{ span: 12 }}>
            <SearchCard />
          </Col>
        </Row>

        <Pagination
          style={{
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          current={current}
          onChange={onChange}
          total={50}
        />
      </div>
    </>
  );
};

export default SearchResult;
