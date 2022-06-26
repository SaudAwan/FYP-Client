import React from "react";
import { Layout } from "antd";
import "./employeedashboard.css";
import AppRouter from "./router";
import EvSidenav from "../../../layout/employeeSideNav";
import EvHeader from "../../../layout/Header";
const { Content } = Layout;
const navigation = [
  {
    path: "/employee/production",
    icon: "/Production.png",
    name: "Production",
    children: [
      {
        path: "/employee/production/speaker",
        name: "Speaker Management",
      },
      {
        path: "/employee/production/agenda",
        name: "Agenda Builder",
      },
      {
        path: "/employee/production/partner",
        name: "Partner Management",
      },
    ],
  },
  {
    path: "/employee/sponsor",
    icon: "/Sponsorship.png",
    name: "Sponsorship",
  },
  {
    path: "/employee/delegate",
    icon: "/DelegateSales.png",
    name: "Delegate Sales",
  },
  {
    path: "/employee/operation",
    icon: "/Operations.png",
    name: "Operations",
  },
  {
    path: "/employee/tasks",
    icon: "/TaskManagement.png",
    name: "Task Management",
  },
  {
    path: "/employee/template-factory",
    icon: "/TemplateFactory.png",
    name: "Template Factory",
  },
  {
    path: "/employee/settings",
    icon: "/Support.png",
    name: "Settings",
  },
];

export default class EmployeeDashboard extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <EvHeader onLogout={()=> typeof this.props.setUserDetails === "function" && this.props.setUserDetails(null)} />
        <Layout>
          <EvSidenav navigation={navigation}  />
          <Content>
            <AppRouter employeeDetails={this.props.employeeDetails} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
