import React from "react";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";

import FooterWidget from "./components/footerWidget";
import FooterCopyright from "./components/FooterCopyRight";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { Content, Footer } = Layout;

  return (
    <>
      <Layout
        className="layout container"
        style={{
          background: "#fff"
        }}
      >
        <AppHeader />

        <Content
          className="site-layout"
          style={{
            margin: "20px 16px 15px 16px"
          }}
        >
          {children}
        </Content>
        <Footer
          className="container"
          style={{
            margin: "20px 16px 15px 16px"
          }}
        >
          <FooterWidget />
          <FooterCopyright />
        </Footer>
      </Layout>
    </>
  );
};

export default DefaultLayout;
