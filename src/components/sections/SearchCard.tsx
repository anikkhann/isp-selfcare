import { Card, Grid } from "antd";
import React from "react";

const SearchCard = () => {
  const { Meta } = Card;

  const { useBreakpoint } = Grid;

  const { md } = useBreakpoint();

  const marginStyle = md ? "0 10px" : "0 0 10px 0";

  return (
    <>
      <Card
        hoverable
        style={{
          width: 300,
          margin: marginStyle
        }}
        cover={
          <div
            style={{
              overflow: "hidden",
              height: "150px"
            }}
          >
            <img
              alt="example"
              style={{ height: "100%" }}
              src="https://s3.amazonaws.com/thumbnails.venngage.com/template/a8897941-0545-4eaa-a427-76503a01b7e7.png"
            />
          </div>
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </>
  );
};

export default SearchCard;
