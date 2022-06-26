import React from "react";
import BodyContainer from "../../../common/BodyContainer";
import ComposeEmail from "./composeEmail";
import SentEmails from "./sentEmails";
import { PlusOutlined } from "@ant-design/icons";
import { getEmailAddresses, getEmails } from "../../api";
import { Spinner } from "../../../../../common";

export default class Emails extends React.Component {
  constructor() {
    super();
    this.state = {
      composeEmail: false,
      emails: [],
      emailAddresses: [],
      loading: false,
      loadingAddresses: false
    };
    this.buttons = [
      {
        text: "Compose",
        icon: <PlusOutlined />,
        listener: () => {
          this.setState({ composeEmail: true });
        },
      },
    ];

    this.fetchEmails = this.fetchEmails.bind(this);
    this.pullEmailAddresses = this.pullEmailAddresses.bind(this);
  }

  fetchEmails() {
    this.setState({ loading: true });
    getEmails(this.props.userDetails.id).then(async (response) => {
      if (Array.isArray(response.emails)) {
        this.setState({ emails: response.emails });
      } else {
        alert("Couldn't fetch emails, Please Try Again!");
      }
      this.setState({ loading: false });
    });
  }

  pullEmailAddresses() {
    this.setState({loadingAddresses: true});
    getEmailAddresses().then(resp => {
      this.setState({loadingAddresses: false})
      if (resp.emailAddresses) {
        this.setState({
          emailAddresses: (resp.emailAddresses || []).map(({address}) => address)
        })
      }
    }).catch(()=> {
      this.setState({loadingAddresses: false})
    })
  }

  componentDidMount() {
    this.fetchEmails();
    this.pullEmailAddresses();
  }

  render() {
    return (
      <BodyContainer title="Emails Marketing" buttons={this.buttons}>
        {(this.state.loading || this.state.loadingAddresses) && <Spinner/>}
        <SentEmails
          userDetails={this.props.userDetails}
          emails={this.state.emails}
          fetchEmails={this.fetchEmails}
        />
        {this.state.composeEmail && (
          <ComposeEmail
            onSuccess={() => {
              this.setState({ composeEmail: false });
              this.fetchEmails();
              this.pullEmailAddresses();
            }}
            emailAddresses={this.state.emailAddresses || []}
            close={() => this.setState({ composeEmail: false })}
            userDetails={this.props.userDetails}
          />
        )}
      </BodyContainer>
    );
  }
}
