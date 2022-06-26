import React from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;

class CEOSideNAV extends React.Component {
  render() {
    return (
      <Sider style={{ background: "#000000" }} id="ceoSider">
        <Menu mode="inline">
          <Menu.ItemGroup key="m1" title="Main">
            <Menu.Item key="1" id="eMenuItem">
              <Link to="/" className="menuItemWrap">
                <img src="/Dashboard.png" className="logoStyles" />
                <span className="spacer"></span>
                Dashboard
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="m2" title="Activity">
            <Menu.Item id="eMenuItem" key="2">
              <Link to="/teams" className="menuItemWrap">
                <img src="/TemplateFactory.png" className="logoStyles" />
                <span className="spacer"></span>
                Teams
              </Link>
            </Menu.Item>
            <Menu.Item id="eMenuItem" key="3">
              <Link to="/events/list" className="menuItemWrap">
                <img src="/TaskManagement.png" className="logoStyles" />
                <span className="spacer"></span>
                Events
              </Link>
            </Menu.Item>
            <Menu.Item id="eMenuItem" key="4">
              <Link to="/employees" className="menuItemWrap">
                <img src="/Calendar.png" className="logoStyles" />
                <span className="spacer"></span>
                Employees
              </Link>
            </Menu.Item>
            {/* <Menu.Item id="eMenuItem" key="5">
              <Link to="/reports" className="menuItemWrap">
                <img src="/Calendar.png" className="logoStyles" />
                <span className="spacer"></span>
                Reports
              </Link>
            </Menu.Item> */}
          </Menu.ItemGroup>
          <Menu.ItemGroup key="m3" title="Applications">
            <Menu.Item id="eMenuItem" key="6">
              <Link to="/template-factory" className="menuItemWrap">
                <img src="/TemplateFactory.png" className="logoStyles" />
                <span className="spacer"></span>
                Template Factory
              </Link>
            </Menu.Item>
            <Menu.Item id="eMenuItem" key="7">
              <Link to="/task-management" className="menuItemWrap">
                <img src="/TaskManagement.png" className="logoStyles" />
                <span className="spacer"></span>
                Task Management
              </Link>
            </Menu.Item>
            {/* <Menu.Item id="eMenuItem" key="8">
              <Link to="/calendar" className="menuItemWrap">
                <img src="/Calendar.png" className="logoStyles" />
                <span className="spacer"></span>
                Calendar
              </Link>
            </Menu.Item> */}
          </Menu.ItemGroup>
          {/* <Menu.ItemGroup key="m4" title="Help">
            <Menu.Item id="eMenuItem">
              <Link to="/support" className="menuItemWrap">
                <img src="/Support.png" className="logoStyles" />
                <span className="spacer"></span>
                Support
              </Link>
            </Menu.Item>
          </Menu.ItemGroup> */}
        </Menu>
      </Sider>
    );
  }
}
export default CEOSideNAV;
