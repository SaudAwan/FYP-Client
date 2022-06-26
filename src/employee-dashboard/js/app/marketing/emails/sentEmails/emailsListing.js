import React from "react";
import moment from "moment";
import { removeHtmlTagsRegex } from "../../../../../../utils/general";

export default class EmailsListing extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="listing">
        {this.props.emails.map((email) => {
          const content = (email?.content?.body || '').replace(removeHtmlTagsRegex, '');
          return (
            <div
              className={`email-short ${
                this.props.selected === email.id && "selected"
              }`}
              onClick={() => this.props.onSelectEmail(email.id)}
              key={email.id}
            >
              <span className="font-12" style={{ float: "right" }}>
                {moment(email.createdAt).fromNow()}
              </span>
              <div className="font-16">
                <span className="bold">{email?.content?.title || ""}</span>
                <br />
                <span>{content.slice(0, 33)}</span>
                {content.length >= 33 ? '...' : '' }
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}