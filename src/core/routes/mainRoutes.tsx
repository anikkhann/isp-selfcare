import type { MenuProps } from "antd";

const mainRoutes: MenuProps["items"] = [
  {
    key: "/",
    label: "Dashboard"
  },
  {
    key: "/pay-bill",
    label: "Pay Bill"
  },
  {
    key: "/usage",
    label: "Usage"
  },
  {
    key: "/ticket",
    label: "Support Ticket"
  },
  {
    key: "/troubleshoot",
    label: "Troubleshoot"
  },

  {
    key: "/survey",
    label: "Survey"
  },

  {
    key: "/user/profile",
    label: "My Account"
  }
];

export default mainRoutes;
