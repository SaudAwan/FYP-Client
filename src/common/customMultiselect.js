import { Select, Tag } from "antd";
import React from "react";

const { Option } = Select;
const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
export class CustomMultiselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidEntries: false,
    };
    this.renderOptions = this.renderOptions.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.emailValidator = this.emailValidator.bind(this);
  }

  renderOptions() {
    return (this.props.emails || []).map((email) => (
      <Option key={email}>{email}</Option>
    ));
  }

  onChangeValue(values) {
    const invalidEntries = this.emailValidator(values);
    const isValid = !(Array.isArray(invalidEntries) && invalidEntries.length);
    this.setState({ invalidEntries: !isValid });
    this.props.onChangeEmail && this.props.onChangeEmail(values, isValid);
  }

  emailValidator = (values = []) => {
    const invalidInputs = (values || []).filter(
      (value) => !value.match(emailRegex)
    );
    return invalidInputs;
  };

  render() {
    return (
      <>
        {this.state.invalidEntries && <span style={{ fontSize: "10px", fontWeight: "bold", color: "red" }}>
          *one or more email addresses are invalid (will be filtered before sending)
        </span>}
        <Select
          mode="tags"
          style={{ width: "100%", backgroundColor: "#ffffff" }}
          onChange={this.onChangeValue}
          tokenSeparators={[","]}
          value={this.props?.values || []}
          className="custom-select"
          {...this.props}
        >
          {this.renderOptions()}
        </Select>
      </>
    );
  }
}

export default { CustomMultiselect };