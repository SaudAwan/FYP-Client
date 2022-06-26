import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import ReactHtmlParser from "react-html-parser";
import { Tag, Modal } from "antd";
import moment from "moment";
import { Spinner } from "../../../../../../common";
import { deleteEmail } from "../../../api";

const confirm = Modal.confirm;

export default class FullEmailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.removeEmail = this.removeEmail.bind(this);
  }

  showRemoveConfirmDialog = () => {
    confirm({
      title: "Are you sure you want delete this email?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.removeEmail(this.props.data.id);
      },
      onCancel() {},
    });
  };

  removeEmail(emailId) {
    this.setState({ loading: true });
    deleteEmail(emailId).then((response) => {
      console.log(response);
      if (response.message === "Task deleted") {
        this.props.fetchEmails && this.props.fetchEmails();
      } else {
        alert("Couldn't delete email, Please Try Again!");
      }
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <>
        {this.state.loading && <Spinner />}
        <div className="full-view">
          <div className="header">
            <span
              className="pointer bold"
              onClick={this.showRemoveConfirmDialog}
            >
              <DeleteOutlined /> Delete
            </span>
            <span className="font-12" style={{ float: "right" }}>
              {moment(this.props.data?.createdAt || new Date()).format(
                "DD MMM YYYY, hh:mm A"
              )}
            </span>
            <br />
          </div>
          <div className="body">
            <div className="forwarded-group">
              <h4 className="bold">Recipients: </h4>
              <div>
                {(this.props.data?.recipients || []).map((email, index) => (
                  <Tag className="mr-2 mb-2" key={index}>
                    {email}
                  </Tag>
                ))}
              </div>
            </div>
            <h2>{this.props.data?.content?.title || ""}</h2>
            <div className="email-content">
              {ReactHtmlParser(this.props.data?.content?.body || "")}
            </div>
          </div>
        </div>
      </>
    );
  }
}
