import { Avatar, Button, Drawer, Dropdown, Layout, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import {
  // ControlOutlined,
  LogoutOutlined,
  MenuOutlined
  // UserOutlined
} from "@ant-design/icons";
import Link from "next/link";
import LogoTitle from "./LogoTitle";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TriggerBlock = styled.div`
  display: inline-block;
  height: 100%;
`;

const HeaderBlock = styled(TriggerBlock)`
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: ${({ theme }) => theme.font.size.lg};
`;

export const StyledCrUserInfoAvatar = styled(Avatar)`
  font-size: 24px;
  background-color: ${({ theme }) => theme.palette.orange[6]};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

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

const items: MenuProps["items"] = [
  /*  {
     key: "1",
     label: (
       <Link href="/">
         <Space>
           <UserOutlined />
           Profile
         </Space>
       </Link>
     )
   },
   {
     type: "divider"
   }, */
  // {
  //   key: "2",
  //   label: (
  //     <Link href="/">
  //       <Space>
  //         <ControlOutlined />
  //         Change Password
  //       </Space>
  //     </Link>
  //   )
  // },
  // {
  //   type: "divider"
  // },
  {
    key: "3",
    label: (
      <Space>
        <LogoutOutlined />
        Logout
      </Space>
    )
  },
  {
    type: "divider"
  }
];

function AppHeader() {
  const { Header } = Layout;

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const [open, setOpen] = useState(false);

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const [routeList, setRouteList] = useState(routes);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (isLoggedIn) {
      if (routeList) {
        const newRouteList = [
          ...routeList,
          {
            key: "/logout",
            label: "লগআউট"
          }
        ];
        setRouteList(newRouteList);
      }
    } else {
      if (routeList) {
        const newRouteList = [
          ...routeList,
          {
            key: "/login",
            label: "লগইন"
          },
          {
            key: "/register",
            label: "রেজিস্টার"
          }
        ];
        setRouteList(newRouteList);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const showDrawer = () => {
    setOpenMobileMenu(true);
  };

  const onClose = () => {
    setOpenMobileMenu(false);
  };

  const router = useRouter();
  const currentPath = router.route;

  const handleMenuClick: MenuProps["onClick"] = e => {
    if (e.key === "3") {
      setOpen(false);
      logout();
    }
  };

  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch({ type: "auth/logout" });

    MySwal.fire({
      title: "Success",
      text: "You have successfully logged out",
      icon: "success"
    }).then(() => {
      router.push("/login");
    });
  };
  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

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
            {!isLoggedIn && (
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
            )}
            {isLoggedIn && (
              <div
                style={{
                  marginLeft: "auto"
                }}
              >
                <Dropdown
                  menu={{
                    items,
                    onClick: handleMenuClick
                  }}
                  onOpenChange={handleOpenChange}
                  open={open}
                  className="flex justify-center"
                >
                  <HeaderBlock className="">
                    <a onClick={e => e.preventDefault()}>
                      <Space className="rounded-full">
                        <StyledCrUserInfoAvatar src="/assets/images/avatar/A11.jpg" />
                      </Space>
                    </a>
                  </HeaderBlock>
                </Dropdown>
              </div>
            )}
          </div>
        </div>

        <div
          className="mobileVisible"
          style={{
            margin: "0 20px"
          }}
        >
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          <Drawer
            title="Menu"
            placement="left"
            closable={false}
            onClose={onClose}
            open={openMobileMenu}
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
                if (key === "/logout") {
                  logout();
                  onClose();
                } else {
                  onClose();
                  router.push(key);
                }
              }}
              items={routeList}
            ></Menu>
          </Drawer>
        </div>
      </Header>
    </>
  );
}

export default AppHeader;
