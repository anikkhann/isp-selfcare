import {
  ApartmentOutlined,
  CloudServerOutlined,
  DashboardOutlined,
  ExportOutlined,
  FundViewOutlined,
  MailOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined
} from "@ant-design/icons";

const mainRoutes = [
  {
    key: "/admin",
    label: "Dashboard",
    path: "/admin",
    icon: <DashboardOutlined />,
    permission: "dashboard"
  },
  {
    key: "/admin/purchase",
    label: "Purchase",
    path: "/admin/purchase",
    icon: <ShopOutlined />,
    permission: "purchase_module"
  },
  {
    key: "/admin/inventory",
    label: "Inventory",
    path: "/admin/inventory",
    icon: <CloudServerOutlined />,
    permission: "inventory_module"
  },
  {
    key: "/admin/pos",
    label: "Sales & POS",
    path: "/admin/sales",
    icon: <ShoppingCartOutlined />,
    permission: "pos_sale_module"
  },
  {
    key: "/admin/accounting",
    label: "Accounting",
    path: "/admin/accounting",
    icon: <FundViewOutlined />,
    permission: "accounting_module"
  },
  {
    key: "/admin/hr",
    label: "HRM",
    path: "/admin/hr",
    icon: <TeamOutlined />,
    permission: "hr_module"
  },
  {
    key: "/admin/csrm",
    label: "CSRM",
    path: "/admin/csrm",
    icon: <ApartmentOutlined />,
    permission: "ccsrm_module"
  },
  {
    key: "/admin/courier",
    label: "Courier",
    path: "/admin/courier",
    icon: <MailOutlined />,
    permission: "courier_module"
  },
  {
    key: "/admin/lc",
    label: "LC",
    path: "/admin/lc",
    icon: <ExportOutlined />,
    permission: "lc_module"
  },
  {
    key: "/admin/settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <SettingOutlined />,
    permission: "setting_module"
  }
];

export default mainRoutes;
