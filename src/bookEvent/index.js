import React from "react";
import { Form, Input, Button, Select } from "antd";
import { bookEvent, fetchEvent } from "./api.js";
import "../login/login.css";
import { Spinner } from "../common/spinner.js";
import history from "../utils/history.js";

class BookEvent extends React.Component {
  state = {
    eventDetails: null,
    loading: false,
    booking: false,
    booked: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ booking: true });
        const location = window.location.pathname.split("/"); // event key is at third index
        bookEvent({...values, eventKey: location[2]})
          .then((res) => {
            this.setState({ booking: false });
            if (res.message === "Event Booked") {
              this.setState({
                booked: true,
              });
            }
          })
          .catch((err) => {
            this.setState({ booking: false });
          });
      }
    });
  };

  fetchEventDetails() {
    this.setState({ loading: true });
    const location = window.location.pathname.split("/"); // event id is at third index
    fetchEvent(location[2]).then((res) => {
      this.setState({ loading: false });
      if (res.event) {
        this.setState({ eventDetails: res.event });
      } else {
        history.push("/");
      }
    });
  }

  componentDidMount() {
    this.fetchEventDetails();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="App-login" style={{ width: "100%", height: "100vh" }}>
            <div
              style={{ height: "70px", width: "240px", marginBottom: "10px" }}
            >
              <img src="/logo.png" style={{ height: "100%", width: "100%" }} />
            </div>
            {this.state.booked ? (
              <h2 style={{ color: "white", textAlign: "center" }}>
                You have successfully booked for{" "}
                {this.state.eventDetails?.name || "Event"}, please check your
                email.
              </h2>
            ) : (
              <Form
                onSubmit={this.handleSubmit}
                className="login-form"
                style={{ width: "100%" }}
              >
                <h1 style={{ color: "white", textAlign: "center" }}>
                  {this.state.eventDetails?.name || "..."}
                </h1>
                <Form.Item>
                  {getFieldDecorator("name", {
                    rules: [{ required: true, message: "Name is required" }],
                  })(<Input className="login-input" placeholder="Name..." />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("email", {
                    rules: [{ required: true,  type: "email", message: "Email not provided or invalid" }],
                  })(<Input className="login-input" placeholder="Email..." />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("phone", {
                    rules: [
                      { required: true, message: "Phone number is required" },
                    ],
                  })(<Input className="login-input" placeholder="Phone..." />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("gender", {
                    rules: [
                      { required: true, message: "Please select gender." },
                    ],
                  })(
                    <Select placeholder="Gender">
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ borderRadius: "20px" }}
                    disabled={this.state.booking}
                  >
                    {this.state.booking ? "Booking" : "Book Now"}
                  </Button>
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
        {this.state.loading && <Spinner />}
      </>
    );
  }
}

export default Form.create({ name: "book_event_form" })(BookEvent);