import React from "react";
import { Form, Input, Button } from "antd";
import {
  CloseOutlined,
  LineOutlined,
  SendOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "./index.css";
import { QuillInput, CustomMultiselect } from "../../../../../../common";
import { sendEmails } from "../../../api";

export default class ComposeEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      minimized: false,
      emails: [],
      body: "",
      title: "",
      sending: false,
      isValidContent: false
    };

    this.toggle = this.toggle.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.onSend = this.onSend.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  toggle() {
    this.setState({
      minimized: !this.state.minimized,
    });
  }

  setTitle(ev) {
    this.setState({
      title: ev.target.value,
    });
  }

  resetState() {
    this.setState({
      minimized: false,
      emails: [],
      body: "",
      title: "",
      sending: false,
    });
  }

  onSend() {
    if (!this.state.isValidContent || !this.state.emails.length) return;
    const data = {
      content: {
        title: this.state.title,
        body: this.state.body,
      },
      recipients: this.state.emails,
      sender_id: this.props.userDetails.id,
    };
    this.setState({ sending: true });
    sendEmails(data).then(async (resp) => {
      this.resetState();
      if (resp && resp.message == "Emails sent successfully") {
        this.props.onSuccess && this.props.onSuccess();
      } else {
        alert("Couldn't send email! Please Try Again.")
      }
    });
  }

  componentDidMount() {
    const { emailAddresses } = this.props;
    console.log('mouting')
    console.log({emailAddresses})
    emailAddresses && this.setState({
      emails: emailAddresses
    });
  }

  render() {
    return (
      <div
        className={`compose-email ${
          this.state.minimized ? "mimized-box" : ""
        } `}
      >
        <div className="compose-email__header">
          <LineOutlined onClick={this.toggle} />
          <CloseOutlined onClick={this.props.close}/>
        </div>
        {!this.state.minimized && (
          <>
            <div className="compose-email__body flex flex-flow_column">
              <CustomMultiselect
                values={this.state.emails}
                onChangeEmail={(value, isValid) => {
                  this.setState({
                    emails: value,
                    isValidContent: isValid
                  });
                }}
                placeholder="Recipients"
              />
              <Input
                id="email-title"
                value={this.state.title}
                placeholder="Title of Email"
                onChange={this.setTitle}
                style={{height: '40px'}}
              />
              <QuillInput
                value={this.state.body}
                onChange={(value) => {
                  this.setState({
                    body: value,
                  });
                }}
                //   isError={touchedQuestion && !isQuestionValid()}
                placeholder="Please write you email here..."
              />
            </div>
            <div className="flex flex-justify__end mr-10 pt-4">
              {this.state.sending ? (
                <LoadingOutlined
                  className="control-icon"
                  style={{ disabled: true }}
                />
              ) : (
                <SendOutlined className="control-icon" onClick={this.onSend} disabled={!this.state.isValidContent || !this.state.emails.length} />
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}
