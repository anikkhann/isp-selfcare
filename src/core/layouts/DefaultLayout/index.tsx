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
        className="layout"
        style={{
          background: "#fff"
        }}
      >
        <AppHeader />

        <Content
          className="min-h-fit min-w-screen"
          style={{
            margin: "20px 16px 15px 16px"
          }}
        >
          {children}
        </Content>
        <Footer>
          <FooterWidget />
          <FooterCopyright />
        </Footer>
      </Layout>
    </>
  );
};

export default DefaultLayout;
