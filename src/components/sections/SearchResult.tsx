import { Alert, Col, Pagination, Row } from "antd";
import React from "react";
import SearchCard from "./SearchCard";
import type { PaginationProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
const SearchResult = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector(state => state.place.items);
  const total = useAppSelector(state => state.place.total);
  // const perPage = useAppSelector(state => state.place.perPage);
  const currentPage = useAppSelector(state => state.place.currentPage);

  const onChange: PaginationProps["onChange"] = page => {
    console.log(page);
    dispatch({ type: "place/setCurrentPage", payload: page });
  };
  return (
    <>
      <div>
        {total && total > 0 ? (
          <Alert
            message={`বুকিং এ মোট ${total} টি ফলাফল পাওয়া গিয়েছে`}
            type="success"
            style={{
              width: "100%",
              margin: "20px auto",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}
          />
        ) : (
          <Alert
            message={`কোন ফলাফল পাওয়া যায়নি`}
            type="error"
            style={{
              width: "100%",
              margin: "20px auto",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center"
            }}
          />
        )}

        <Row gutter={[24, 24]}>
          {items.map((item, index) => (
            <Col
              sm={{ span: 24 }}
              lg={{ span: 8 }}
              md={{ span: 12 }}
              key={index}
            >
              <SearchCard item={item} />
            </Col>
          ))}
        </Row>

        {total && total > 0 ? (
          <Pagination
            style={{
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            current={currentPage}
            onChange={onChange}
            total={total}
          />
        ) : null}
      </div>
    </>
  );
};

export default SearchResult;
