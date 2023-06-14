/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Grid } from "antd";
import React, { useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
interface ItemProps {
  item: any;
}

const TopCarousel = ({ item }: ItemProps) => {
  const { useBreakpoint } = Grid;
  const { lg } = useBreakpoint();

  const carouselRef = useRef(null);

  return (
    <>
      <div className="container">
        <Carousel
          showArrows={true}
          showStatus={true}
          infiniteLoop={true}
          showThumbs={lg ? true : false}
          useKeyboardArrows={true}
          autoPlay={true}
          stopOnHover={false}
          swipeable={true}
          emulateTouch={true}
          // dynamicHeight={true}
          // interval={2000}
          // transitionTime={500}
          ref={carouselRef}
          axis="vertical"
          width={lg ? "100%" : "100%"}
        >
          {item?.images.map((image: any, index: number) => (
            <div
              key={index}
              style={{
                height: "400px",
                width: "100%",
                objectFit: "contain"
              }}
            >
              <img
                src={image.path}
                alt="image"
                style={{
                  minWidth: "100%",
                  height: "100%",
                  width: "100%",
                  objectFit: "fill"
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default TopCarousel;
