import React from "react";
import { Layout } from "antd";
import "./Ceo.css";
import AppRouter from "./router";
import EvHeader from "../../../layout/Header";
import EvSidenav from "../../../layout/ceoSideNav";
const { Content } = Layout;
export default class Ceo extends React.Component {
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
          <EvSidenav />
          <Content>
            <AppRouter CEODetails={this.props.CEODetails} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
