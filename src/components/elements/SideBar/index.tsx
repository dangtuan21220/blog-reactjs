import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectKey, setSelectKey] = useState<string>("dashboard")
  const navigate = useNavigate();
  const { pathname } = useLocation();


  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    getItem(<Link to={"/"}>Dashboard</Link>, "dashboard", <PieChartOutlined />),
    getItem(<Link to={"/user"}>User</Link>, "user", <UserOutlined />),
  ];

  useEffect(() => {
    if (pathname == "/") {
      navigate("/dashboard");
    }
  }, [pathname]);

  return (
    <div className="h-screen relative">
      <Menu
        className={`h-full ${collapsed ? "w-[80px]" : "w-[250px]"}`}
        defaultSelectedKeys={[selectKey]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
      <div
        className="absolute bottom-0 w-full flex justify-center items-center py-3"
        style={{ borderTop: "1px solid #EFF1F4" }}
      >
        <Button type="primary" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
