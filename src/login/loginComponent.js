import React from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { GoogleLogin } from "react-google-login";
import { getUser, joinWithGoogle, login } from "./api.js";
import "./login.css";
import history from "../utils/history.js";
const Option = Select.Option;
class LoginComponent extends React.Component {
  state = {
    thirdParthAuth: null,
    loading: false,
    companies: [],
    askCompleteProfile: false,
  };

  handleSubmit = (e) => {
    const { loginError, userDetailsHandler } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values).then(async (resp) => {
          if (resp.message) {
            loginError("Invalid email or password");
          } else {
            localStorage.setItem("EvenezyToken", resp.token);
            userDetailsHandler(resp.userDetails);
            history.push("/");
          }
        });
      }
    });
  };

  handleThirdPartyAuth = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.joinWithGoogleHandler(values);
    });
  };

  joinWithGoogleHandler(args) {
    const { loginError, userDetailsHandler } = this.props;
    const { company, phone } = args || {};
    const { email, name, googleId } = this.state.thirdParthAuth.profileObj;
    const data = {
      company,
      email,
      name,
      googleId,
      phone,
      details: this.state.thirdParthAuth,
    };
    joinWithGoogle(data).then((resp) => {
      if (resp && resp.token) {
        localStorage.setItem("EvenezyToken", resp.token);
        userDetailsHandler(resp.userDetails);
        history.push("/");
      } else {
        loginError("Something went wrong, please try again!");
      }
    });
  }

  onGoogleLogin = (response) => {
    if (!response.profileObj) {
      return;
    }
    this.setState({ loading: true });

    getUser(response.profileObj.email)
      .then((res) => {
        this.setState({ loading: false });
        if (res.user) {
          this.joinWithGoogleHandler({});
        } else {
          this.setState({ askCompleteProfile: true });
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
    this.setState({ thirdParthAuth: response });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="App-login" style={{ width: "55%", height: "100vh" }}>
          <div style={{ height: "70px", width: "240px", marginBottom: "10px" }}>
            <img src="/logo.png" style={{ height: "100%", width: "100%" }} />
          </div>
          {this.state.askCompleteProfile ? (
            <Form
              onSubmit={this.handleThirdPartyAuth}
              className="login-form"
              style={{ width: "300px" }}
            >
              <Form.Item>
                {getFieldDecorator("company", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter your company name.",
                    },
                  ],
                })(
                  <Input
                    className="login-input"
                    placeholder="Company Name"
                    style={{ borderRadius: "20px" }}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("phone", {
                  rules: [
                    { required: true, message: "Please provide phone number." },
                  ],
                })(
                  <Input
                    className="login-input"
                    placeholder="Phone Number"
                    style={{ borderRadius: "20px" }}
                  />
                )}
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ borderRadius: "20px" }}
                disabled={this.state.loading}
              >
                Join
              </Button>
            </Form>
          ) : (
            <Form onSubmit={this.handleSubmit} className="login-form" st>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "Email is required" }],
                })(
                  <Input
                    className="login-input"
                    placeholder="email..."
                    style={{ borderRadius: "20px" }}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "Password is required" }],
                })(
                  <Input
                    className="login-input"
                    type="password"
                    placeholder="password..."
                    style={{ borderRadius: "20px" }}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true,
                })(<Checkbox style={{ color: "white" }}>Remember me</Checkbox>)}
                <a
                  className="login-form-forgot"
                  href="/#/forgotPassword"
                  style={{ color: "white" }}
                >
                  Forgot password
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ borderRadius: "20px" }}
                  disabled={this.state.loading}
                >
                  Sign in
                </Button>
                <GoogleLogin
                  clientId="445843530428-9187ohjo81avdnvqof6getg73aebi0ev.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      type="danger"
                      className="login-form-button"
                      style={{ borderRadius: "20px" }}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled || this.state.loading}
                    >
                      <GoogleOutlined /> Join with Google
                    </Button>
                  )}
                  onSuccess={this.onGoogleLogin}
                />
              </Form.Item>
            </Form>
          )}
        </div>

        <img
          src={"/loginBackground.jpg"}
          alt="image"
          style={{ height: "100vh", width: "45%" }}
        />
      </div>
    );
  }
}

export default Form.create({ name: "login_from" })(LoginComponent);
