/* eslint-disable @typescript-eslint/no-explicit-any */
import TopCarousel from "@/components/bookingDetailsItem/TopCarousel";
import BookingForm from "@/components/forms/booking/BookingForm";
import { Typography } from "antd";
import { sanitize } from "isomorphic-dompurify";
import React from "react";

interface ItemProps {
  item: any;
}

const BookingDetails = ({ item }: ItemProps) => {
  const { Title, Paragraph } = Typography;

  return (
    <>
      {item && (
        <>
          <TopCarousel item={item} />
          <Typography>
            <Title level={4}>{item?.name}</Title>
            <Paragraph>
              <p
                dangerouslySetInnerHTML={{
                  __html: sanitize(item.long_description)
                }}
              />
            </Paragraph>
          </Typography>
          <Typography>
            <Title level={4}>ফিচারস</Title>
            <Paragraph>
              <p
                dangerouslySetInnerHTML={{ __html: sanitize(item.facilities) }}
              />
            </Paragraph>
          </Typography>

          <BookingForm />
        </>
      )}
    </>
  );
};

export default BookingDetails;
