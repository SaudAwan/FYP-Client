import React from "react";
import { Drawer, message, Form, Button, Col, Row, Input, Select, DatePicker } from "antd";
import ReusableButtons from "../../common/reusableButtons";
import { getEmployeeEvents, addTask } from "../api";
import { getEvents } from "../../../../ceo-dashboard/js/app/event/api";
import { getUsers } from "../../../../ceo-dashboard/js/app/user/api";
import moment from "moment";
const { TextArea } = Input;
class AddTask extends React.Component {
  state = {
    status: null,
    events: null,
    users: null,
    subTasks: [],
    subTaskEnabled: null,
  };
  componentDidMount = async () => {
    await getUsers(this.props.userDetails.company_id).then(async ({ users }) => {
      if (users) {
        this.setState({ users });
        let events;
        if (this.props.userDetails.user_role === "CEO") {
          let response = await getEvents(this.props.userDetails.company_id);
          events = response.events;
        } else {
          let response = await getEmployeeEvents(this.props.userDetails.id);
          events = response.events;
        }
        this.setState({ events });
      } else {
        //error handeling
      }
    });
  };
  addTask = (e) => {
    const { userDetails } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { title, task_description, operator, task_priority, due_date, event, sub_task1, sub_task2, sub_task3, points } =
          values;
        const parsedEvent = JSON.parse(event);
        const parsedOperator = JSON.parse(operator);
        const formattedDate = moment(due_date._d).format("YYYY-MM-DD");
        let data;
        if (this.state.subTaskEnabled) {
          data = {
            title,
            task_description,
            operator_id: parsedOperator,
            due_date: formattedDate,
            event_id: parsedEvent,
            task_priority,
            company_id: userDetails.company_id,
            created_by: userDetails.id,
            points,
            sub_task_enabled: true,
            sub_task1,
            sub_task2,
            sub_task3,
          };
        } else {
          data = {
            title,
            task_description,
            operator_id: parsedOperator,
            due_date: formattedDate,
            event_id: parsedEvent,
            task_priority,
            points,
            company_id: userDetails.company_id,
            created_by: userDetails.id,
            sub_task_enabled: null,
          };
        }
        addTask(data).then((resp) => {
          if (resp.message === "Task created") {
            message.success("Task added successfully");
            this.props.hideWindow(1);
            this.setState({ subTasks: [], subTaskEnabled: null });
          } else {
            //error handeling
          }
        });
        setTimeout(() => {
          this.props.form.resetFields();
        }, 0);
      }
    });
  };
  options = () => {
    const { events } = this.state;
    return events
      ? events.map((val, index) => {
          return (
            <Select.Option value={JSON.stringify(val.id)} key={index}>
              {val.name}
            </Select.Option>
          );
        })
      : [];
  };
  options1 = () => {
    const { users } = this.state;
    return users
      ? users.map((val, index) => {
          return (
            <Select.Option value={JSON.stringify(val.id)} key={index}>
              {val.name}
            </Select.Option>
          );
        })
      : [];
  };
  onAddSubtask = () => {
    const { subTasks } = this.state;
    let length = subTasks.length;
    length = length++;
    const object = { title: `sub_task${length + 1}` };
    this.setState({ subTasks: [...subTasks, object], subTaskEnabled: true });
  };
  render() {
    const { visible, onClose } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { subTasks } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Drawer
        title="Add Task"
        width={600}
        className="sivakrishna"
        bodyStyle={{ height: "calc(100% - 108px)", overflowY: "auto" }}
        onClose={onClose}
        visible={visible}
      >
        <Form {...formItemLayout} layout="vertical" hideRequiredMark>
          <Col gutter={16}>
            <Row span={16}>
              <Form.Item style={{ marginBottom: "6px" }} label="Task Title">
                {getFieldDecorator("title", {
                  rules: [{ required: true, message: "Please enter the task title" }],
                })(<Input />)}
              </Form.Item>
            </Row>
            <Row span={16}>
              <Form.Item style={{ marginBottom: "6px" }} label="Task Description">
                {getFieldDecorator("task_description", {
                  rules: [{ required: true, message: "Please enter the task" }],
                })(<TextArea rows={3} />)}
              </Form.Item>
            </Row>
            <Row span={16}>
              <Form.Item style={{ marginBottom: "6px" }} label="Operator">
                {getFieldDecorator("operator", {
                  rules: [{ required: true, message: "Please select the operator" }],
                })(<Select>{this.options1()}</Select>)}
              </Form.Item>
            </Row>
            <Row span={16}>
              <Form.Item style={{ marginBottom: "6px" }} label="Due Date">
                {getFieldDecorator("due_date", {
                  rules: [{ required: true, message: "Please enter the date" }],
                })(<DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} placeholder="" />)}
              </Form.Item>
            </Row>
            <Row span={16}>
              <Form.Item style={{ marginBottom: "6px" }} label="Event">
                {getFieldDecorator("event", {
                  rules: [{ required: true, message: "Please select the event" }],
                })(<Select>{this.options()}</Select>)}
              </Form.Item>
            </Row>
            <Row span={16}>
              <Form.Item style={{ marginBottom: "6px" }} label="Priority">
                {getFieldDecorator("task_priority", {
                  rules: [{ required: true, message: "Please select the priority" }],
                })(
                  <Select>
                    <Select.Option value="high">High</Select.Option>
                    <Select.Option value="medium">Medium</Select.Option>
                    <Select.Option value="low">Low</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Row>
            <Row span={16}>
            <Form.Item style={{ marginBottom: "6px" }} label="Points">
                {getFieldDecorator("points", {
                  rules: [{ required: true, message: "Please enter the points.", min: 1, max: 20 }],
                })(<Input type="number" min={1} max={20}/>)}
              </Form.Item>
            </Row>
            {this.state.subTasks.map((subTask, index) => {
              return (
                <Row span={16} key={index}>
                  <Form.Item style={{ marginBottom: "6px" }} label={`Subtask-${index + 1}`}>
                    {getFieldDecorator(`${subTask.title}`, {
                      rules: [{ required: true, message: "Please enter the subtask" }],
                    })(<Input />)}
                  </Form.Item>
                </Row>
              );
            })}
            {subTasks.length <= 2 && (
              <Row>
                <Form.Item>
                  <Button
                    onClick={() => {
                      this.onAddSubtask();
                    }}
                  >
                    Add subtask
                  </Button>
                </Form.Item>
              </Row>
            )}
          </Col>
        </Form>
        <ReusableButtons buttonText="Create" clickEventHandler={this.addTask} onClose={onClose} />
      </Drawer>
    );
  }
}
AddTask = Form.create()(AddTask);

export default AddTask;
