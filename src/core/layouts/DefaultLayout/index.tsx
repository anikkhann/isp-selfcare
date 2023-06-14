import React, { useEffect } from "react";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";

import { useAppDispatch } from "@/store/hooks";
import { getCategories } from "@/store/features/category/categorySlice";
import AppFooter from "./AppFooter";
import Cookies from "js-cookie";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { Content } = Layout;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch({ type: "auth/setIsLoggedIn", payload: true });
    }

    dispatch(getCategories());
  }, [dispatch]);

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
        <AppFooter />
      </Layout>
    </>
  );
};

export default DefaultLayout;
