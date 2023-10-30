import { Layout } from "antd";
import React from "react";
import FooterWidget from "./components/FooterWidget";
import FooterCopyright from "./components/FooterCopyRight";

const AppFooter = () => {
  const { Footer } = Layout;

  return (
    <>
      <div className="">
        <Footer
          // className="container"
          style={{
            width: "100%",
            margin: "0 auto"
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
