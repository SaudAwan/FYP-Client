import React from "react";
import { Select, Drawer } from "antd";
import { getTaskComments, updateTaskStatus } from "../api";
import CommentForm from "./comment";
const Option = Select.Option;
class ViewTask extends React.Component {
  state = {
    task: null,
    comments: null,
    uuid: null,
    taskStatus: null
  };

  uuidHandler = () => {
    this.setState({ uuid: Math.random() });
  };

  updateTaskStatus = (status) => {
    const prevStatus = this.state.taskStatus;
    this.setState({
      taskStatus: status
    });
    
    updateTaskStatus({taskId: this.props.activeRecord.id, status, userId: this.props.userDetails.id})
    .then((res) => {
      console.log(res)
      if (res.message == 'Task status updated') {
        this.props.onUpdateTask();
      } else {
        this.setState({
          taskStatus: prevStatus
        });
      }
    }).catch((error)=>{
      console.log(error)
      this.setState({
        taskStatus: prevStatus
      });
    })

  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { activeRecord } = this.props;
    if (this.props.activeRecord !== prevProps.activeRecord) {
      this.setState({
        taskStatus: activeRecord.status
      })
      await getTaskComments(activeRecord.id).then(({ comments }) => {
        console.log(comments);
        if (comments) {
          this.setState({ comments });
        } else {
          //error handeling
        }
      });
    } else if (this.state.uuid !== prevState.uuid) {
      await getTaskComments(this.props.activeRecord.id).then(({ comments }) => {
        console.log(comments);
        if (comments) {
          this.setState({ comments });
        } else {
          //error handeling
        }
      });
    }
  };

  componentDidMount() {
    this.props.activeRecord && this.setState({
      taskStatus: this.props.activeRecord.status
    })
  }

  render() {

    const { task, loading, comments } = this.state;
    const { onClose, visible, activeRecord, userDetails } = this.props;
    if (!activeRecord) {
      return <div></div>;
    }

    return (
      <div className="site-drawer-render-in-current-wrapper">
        <Drawer
          title="Viewing Task"
          width={520}
          className="sivakrishna"
          bodyStyle={{ height: "calc(100% - 108px)", overflowY: "auto" }}
          onClose={onClose}
          visible={visible}
        >
          {activeRecord && (
            <p
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "7px",
              }}
            >
              {activeRecord.title}
            </p>
          )}
          {activeRecord && (
            <div
              style={{
                borderRadius: "5px",
                border: "1px solid #d9d9d9",
                padding: "4px 11px",
              }}
            >
              <p style={{ fontSize: "13px" }}>
                {activeRecord.task_description}
              </p>
            </div>
          )}

          {activeRecord.sub_task1 && (
            <p
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "7px",
                marginTop: "16px",
              }}
            >
              Sub Tasks
            </p>
          )}

          {activeRecord.sub_task1 && (
            <div>
              <div
                style={{
                  borderBottom: "1px solid #d9d9d9",
                  padding: "4px 11px",
                }}
              >
                <p style={{ fontSize: "13px", margin: "0px" }}>
                  {activeRecord.sub_task1}
                </p>
              </div>
            </div>
          )}
          {activeRecord.sub_task2 && (
            <div>
              <div
                style={{
                  borderBottom: "1px solid #d9d9d9",
                  padding: "4px 11px",
                }}
              >
                <p style={{ fontSize: "13px", margin: "0px" }}>
                  {activeRecord.sub_task2}
                </p>
              </div>
            </div>
          )}
          <div style={{ marginTop: "10px" }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "7px",
                marginTop: "16px",
              }}
            >
              Status
              <span style={{ fontSize: "12px" }}>
                {" "}
                (Once marked done, cannot be undone again)
              </span>
            </p>
            <Select
              style={{ width: "100%" }}
              value={this.state.taskStatus || activeRecord.status}
              onChange={this.updateTaskStatus}
              disabled={
                activeRecord.status == "Done" ||
                userDetails.id != activeRecord.operator_id ||
                this.state.taskStatus == "Done"
              }
            >
              <Option key="Todo">Todo</Option>
              <Option key="In Progress">In Progress</Option>
              <Option key="Done">Done</Option>
            </Select>
          </div>
          {activeRecord.sub_task3 && (
            <div>
              <div
                style={{
                  borderBottom: "1px solid #d9d9d9",
                  padding: "4px 11px",
                }}
              >
                <p style={{ fontSize: "13px", margin: "0px" }}>
                  {activeRecord.sub_task3}
                </p>
              </div>
            </div>
          )}
          <div>
            {activeRecord ? (
              <CommentForm
                task_id={activeRecord.id}
                userDetails={userDetails}
                comments={comments}
                uuidHandler={this.uuidHandler}
              />
            ) : null}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default ViewTask;
