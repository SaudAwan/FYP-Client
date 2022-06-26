import React from "react";
import { Spinner } from "../../../../../../common";
import { getEmails } from "../../../api";
import EmailsListing from "./emailsListing";
import FullEmailView from "./fullEmailView";
import { Empty } from "antd";
import "./index.css";

export default class SentEmails extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: null,
    };
    this.getSelectedEmail = this.getSelectedEmail.bind(this);
  }

  getSelectedEmail() {
    let email = null;
    if (this.state.selected) {
      email = this.props.emails.find(
        (email) => email.id === this.state.selected
      );
      if (!email) {
        email = this.props.emails.length && this.props.emails[0];
        email &&
          this.setState({
            selected: email.id,
          });
      }
    } else if (Array.isArray(this.props.emails) && this.props.emails.length) {
      email = this.props.emails.length && this.props.emails[0];
      email &&
        this.setState({
          selected: email.id,
        });
    }
    return email;
  }

  render() {
    const selectedEmail = this.getSelectedEmail();
    return (
      <>
        {!this.props.emails.length && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        {this.props.emails.length ? (
          <div className="sent-emails">
            <div style={{ overflow: "scroll" }}>
              <h2>Sent Emails</h2>
              <EmailsListing
                emails={this.props.emails}
                selected={selectedEmail && selectedEmail.id}
                onSelectEmail={(emailId) =>
                  this.setState({ selected: emailId })
                }
              />
            </div>
            <FullEmailView
              data={selectedEmail}
              fetchEmails={this.props.fetchEmails}
            />
          </div>
        ) : null}
      </>
    );
  }
}
