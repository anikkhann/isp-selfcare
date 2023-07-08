import React from "react";
import { Carousel, Grid } from "antd";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: " url('/images/banner.png') no-repeat center center fixed",
  backgroundSize: "contain",
  backgroundPosition: "30% 50%",
  opacity: "0.8 !important"
};

const HeroSection: React.FC = () => {
  const { useBreakpoint } = Grid;

  const { lg } = useBreakpoint();

  const fontSizes = lg ? "30px" : "20px";

  return (
    <>
      <Carousel autoplay>
        <div>
          <div style={contentStyle}>
            <h3
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                color: "#000000",
                fontSize: fontSizes,
                fontWeight: "bold",
                opacity: "1 !important",
                paddingRight: "50px"
              }}
            >
              অনুসন্ধান এবং বুক করুন সহজে
            </h3>
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default HeroSection;
