import { Layout } from "antd";
import React from "react";
import FooterWidget from "./components/FooterWidget";
import FooterCopyright from "./components/FooterCopyRight";

const AppFooter = () => {
  const { Footer } = Layout;

  return (
    <>
      <div className="container">
        <Footer
          // className="container"
          style={{
            width: "100%",
            margin: "20px 16px 15px 16px"
          }}
        >
          <FooterWidget />
          <FooterCopyright />
        </Footer>
      </div>
    </>
  );
};

export default AppFooter;
