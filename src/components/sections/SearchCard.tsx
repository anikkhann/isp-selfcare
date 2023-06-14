/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Card, Grid, Typography } from "antd";
import Link from "next/link";
import React from "react";
import { HiLocationMarker } from "react-icons/hi";

interface ItemProps {
  item: any;
}

const SearchCard = ({ item }: ItemProps) => {
  // const { Meta } = Card;

  const { Title, Paragraph } = Typography;

  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();
  const marginStyle = md ? "0 10px" : "0 0 10px 0";

  return (
    <>
      <Link href={`/booking/${item?.slug}`}>
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
              <img alt="example" style={{ height: "100%" }} src={item?.image} />
            </div>
          }
        >
          <Typography>
            <Title
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px"
              }}
            >
              {item?.name.length > 40
                ? item?.name.slice(0, 40) + "..."
                : item?.name.slice(0, 40)}
            </Title>
            <Paragraph
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {item?.category.name.length > 40
                ? item?.category.name.slice(0, 40) + "..."
                : item?.category.name.slice(0, 40)}
            </Paragraph>

            <Paragraph
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <HiLocationMarker className="h-4 w-4" />
              {/* check location more than  40 */}
              {item?.location.length > 40
                ? item?.location.slice(0, 40) + "..."
                : item?.location.slice(0, 40)}
            </Paragraph>
          </Typography>
        </Card>
      </Link>
    </>
  );
};

export default SearchCard;
