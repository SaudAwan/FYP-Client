import React, { useState } from 'react'
import {Icon, Layout, Row, Col} from 'antd'
import history from '../utils/history'
const {Header} = Layout

const EvHeader = props => {
    const onLogout = () => {
        localStorage.clear();
        props.onLogout();
        history.push('/login');
    }
    return (
      <Header
        id="ev-header"
        style={{
          backgroundColor: "#272727",
          borderBottom: "2px solid #162AA5",
        }}
      >
        <Row
          type="flex"
          justify="space-between"
          align="middle"
          style={{ height: "100%" }}
        >
          <div
            style={{
              width: "180px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/logoWhite.png"
              style={{ height: "40px", width: "140px" }}
            />
          </div>
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Col id="ev-app-notification">
              <Icon
                type="bell"
                style={{
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              />
            </Col>
            <Col
              style={{
                color: "white",
                fontWeight: 900,
                cursor: "pointer",
                marginRight: "12px",
                fontSize: "14px",
              }}
              onClick={onLogout}
            >
              Logout
            </Col>
            {/* <div>
                <span style={{fontWeight: 'bold', color: 'white'}}>Kasper</span>
                <span style={{color: 'white'}}>Manager</span>
            </div> */}
          </Row>
        </Row>
      </Header>
    );
}

export default EvHeader