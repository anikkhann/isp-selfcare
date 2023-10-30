import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AppFooter from "./AppFooter";
import Cookies from "js-cookie";
import AppImageLoader from "@/components/loader/AppImageLoader";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { Content } = Layout;
  const auth = useAppSelector(state => state.auth);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    if (!auth.isLoggedIn) return;

    const token = Cookies.get("token");

    if (token) {
      dispatch({ type: "auth/setIsLoggedIn", payload: true });
      setLoading(false);
    }
  }, [dispatch, auth]);

  return (
    <>
      {loading && <AppImageLoader />}
      {auth.isLoading && <AppImageLoader />}
      {!loading && (
        <Layout
          className="layout container"
          style={{
            background: "#fff"
          }}
        >
          <AppHeader />

          <Content
            style={{
              margin: "20px",
              minHeight: "100vh !important"
            }}
          >
            {children}
          </Content>
          <AppFooter />
        </Layout>
      )}
    </>
  );
};

export default DefaultLayout;
