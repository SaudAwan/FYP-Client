import React, { Component } from "react";
import { Button, Card } from "antd";

export default class BodyContainer extends Component {
  render() {
    var containerStyle = {};
    if (this.props.containerStyle) {
      containerStyle = { ...this.props.containerStyle };
    }
    return (
      <div className="body-container" id={`${this.props.className}`}>
        <Card
          style={{ fontWeight: "bold", fontSize: "20px", color: "#3C3C3F" }}
          bodyStyle={{
            padding: "12px 8px",
            fontSize: "16px",
            paddingLeft: "20px",
          }}
        >
          <span>{this.props.title}</span>
          {this.props.buttons && (
            <div style={{ float: "right" }}>
              {this.props.buttons.map((button, index) => (
                <Button key={index} type="primary" onClick={button.listener}>
                  {button.icon}
                  {button.text}
                </Button>
              ))}
            </div>
          )}
        </Card>
        <Card style={{ margin: "24px", ...containerStyle }}>
          <div
            className="children-container"
            style={{ position: "relative", background: "white" }}
          >
            {this.props.children}
          </div>
        </Card>
      </div>
    );
  }
}
