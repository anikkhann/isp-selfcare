import { Button, Drawer, Layout, Menu, Space } from "antd";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import LogoTitle from "./LogoTitle";
import { useRouter } from "next/router";

const routes: MenuProps["items"] = [
  {
    key: "/",
    label: "মূলপাতা"
  },
  {
    key: "/popular",
    label: "পপুলার বুকিং"
  }
];

function AppHeader() {
  const { Header } = Layout;

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const currentPath = router.route;

  return (
    <>
      <Header
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          background: "#fff",
          justifyContent: "space-between",
          padding: "10px 40px",
          width: "100%",
          top: 0,
          left: 0,
          height: "64px"
        }}
      >
        <LogoTitle />

        <div
          className="mobileHidden"
          style={{
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center"
            }}
          >
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={[currentPath]}
              defaultSelectedKeys={["1"]}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                lineHeight: "64px",
                background: "#fff",
                color: "#000",
                width: "100%"
              }}
              onClick={({ key }) => {
                router.push(key);
              }}
              items={routes}
            />
            <Space
              size="large"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                lineHeight: "64px",
                background: "#fff",
                color: "#000"
              }}
            >
              <Link href="/login">
                <Button
                  type="primary"
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#2db38b",
                    color: "#ffffff",
                    borderColor: "#2db38b"
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button type="primary" danger>
                  Register
                </Button>
              </Link>
            </Space>
          </div>
        </div>

        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          <Drawer
            title="Menu"
            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
            style={{
              zIndex: 9999,
              background: "#fff",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              color: "#000",
              maxWidth: "80%"
            }}
          >
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={["2"]}
              style={{
                height: "100%",
                borderRight: 0,
                background: "#fff",
                color: "#000",
                maxWidth: "100%"
              }}
              onClick={({ key }) => {
                onClose();
                router.push(key);
              }}
              items={routes}
            ></Menu>
          </Drawer>
        </div>
      </Header>
    </>
  );
}

export default AppHeader;
