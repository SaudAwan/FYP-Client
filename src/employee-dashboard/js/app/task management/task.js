import React from "react";
import { Row, Button, message } from "antd";
import FilterTable from "../../common/FilterTable";
import BodyContainer from "../../common/BodyContainer";
import AddTask from "./addtask";
import { getAllTasks, getEmployeeTasks, deleteTask } from "../api";
import ViewTask from "./viewtask";
import AddButton from "../../common/addButton";
import Modal from "../../common/modal";
const confirm = Modal.confirm;
export default class Task extends React.Component {
  state = {
    showAddWindow: false,
    showViewWindow: false,
    showEditWindow: false,
    uuid: Math.random(),
    activeRecord: null,
    task_id: null,
    activeRecord1: null,
    status: "FetchAllTasks",
    modalVisible: null,
    task_id: null,
  };
  fetchAllTasks = () => {
    if (this.state.status === "FetchAllTasks") {
      return getAllTasks(this.props.userDetails.company_id).then(async (resp) => {
        return resp;
      });
    } else {
      return getEmployeeTasks(this.props.userDetails.id).then(async (resp) => {
          console.log(resp)
        return resp;
      });
    }
  };
  showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this speaker?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.removeSpeaker(this.state.activeRecord.id);
      },
      onCancel() {},
    });
  };
  onDeleteClick = (task_id) => {
    this.setState({ modalVisible: true, task_id });
  };
  onAddWindowClose = () => {
    this.setState({ showAddWindow: false });
  };
  onViewWindowClose = () => {
    this.setState({ showViewWindow: false });
  };
  onAddClick = () => {
    this.setState({
      showAddWindow: true,
    });
  };
  onViewClick = () => {
    this.setState({
      showViewWindow: true,
    });
  };
  hideViewWindow = (setuuid) => {
    const obj = {
      showViewWindow: false,
    };
    if (setuuid) {
      obj.uuid = Math.random();
    }
    this.setState(obj);
  };
  hideAddWindow = (setuuid) => {
    const obj = {
      showAddWindow: false,
    };
    if (setuuid) {
      obj.uuid = Math.random();
    }
    this.setState(obj);
  };
  handleModalOk = async () => {
    await deleteTask(this.state.task_id).then((resp) => {
      if (resp.message === "Task deleted") {
        this.setState({ uuid: Math.random(), modalVisible: null, task_id: null });
        message.success("Task deleted successfully");
      } else {
        //error handeling
      }
    });
  };
  onCloseModal = () => {
    this.setState({ modalVisible: null, task_id: null });
  };
  onUpdateTask = () => {
    this.setState({ status: "FetchAllTasks", uuid: Math.random() })
  }
  
  render() {
    const { userDetails } = this.props;
    console.log(userDetails)
    const { showAddWindow, showViewWindow, uuid, activeRecord1, task_id, modalVisible } = this.state;
    const statusColors = {
      low: "#39c379",
      medium: "#ef8a46",
      high: "#ef4646",
    };
    const columns = [
      {
        title: "Task Title",
        dataIndex: "title",
        key: "title",
        sorter: true,
        render: (text, record) => {
          return (
            <div>
              <p
                type="primary"
                style={{ background: "none", color: "#1890ff", border: "none", cursor: "pointer", marginTop: "1em" }}
                onClick={async () => {
                  await this.setState({ activeRecord1: record });
                  this.onViewClick();
                }}
              >
                {text}
              </p>
            </div>
          );
        },
      },
      {
        title: "Operator",
        dataIndex: "operator.name",
        key: "operator",
        sorter: true,
      },
      {
        title: "Due Date",
        dataIndex: "due_date",
        key: "due_date",
        sorter: true,
      },
      {
        title: "Event",
        dataIndex: "event.name",
        key: "event",
        sorter: true,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        sorter: true
      },
      {
        title: "Priority",
        dataIndex: "task_priority",
        key: "task_priority",
        sorter: true,
        render: (text, record) => {
          const priority = record.task_priority ? record.task_priority.toLowerCase() : "";
          return (
            <div style={{ display: "flex" }}>
              <p
                style={{
                  color: "white",
                  margin: 0,
                  padding: "0 5px",
                  textTransform: "capitalize",
                  paddingBottom: "2px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: statusColors[priority],
                }}
              >
                {priority}
              </p>
            </div>
          );
        },
      },
      {
        title: "Points",
        dataIndex: "points",
        key: "points",
        sorter: true,
        render: (text, record) => {
          const points = record?.points || 0;
          return (
            <div style={{ display: "flex" }}>
              <p>
                {points}
              </p>
            </div>
          );
        },
      },
      {
        title: "Action",
        key: "render",
        render: (text, record) => (
          <Row
            style={{ width: "45px", display: "flex!important", justifyContent: "space-between!important" }}
            type="flex"
            justify="space-around"
            align="middle"
          >
            {record.createdBy.id === this.props.userDetails.id ? (
              <img
                src="/Delete.png"
                style={{ height: "20px", width: "20px", cursor: "pointer" }}
                onClick={() => {
                  this.onDeleteClick(record.id);
                }}
              />
            ) : null}
          </Row>
        ),
      },
    ];
    return (
      <BodyContainer title="Task Management">
        <div>
          <AddButton onAddClick={this.onAddClick} />
          <div>
            <button
              className="customBtnDefault"
              onClick={() => {
                this.setState({ status: "FetchAllTasks", uuid: Math.random() });
              }}
            >
              All Tasks
            </button>
            <button
              className="customBtnSecondary"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                this.setState({ status: "FetchEmployeeTasks", uuid: Math.random() });
              }}
            >
              My Tasks
            </button>
          </div>
          <FilterTable uuid={uuid} columns={columns} filterData={this.fetchAllTasks} />
          <AddTask
            visible={showAddWindow}
            onClose={this.onAddWindowClose}
            userDetails={userDetails}
            hideWindow={this.hideAddWindow}
          />
          <ViewTask
            visible={showViewWindow}
            onClose={this.onViewWindowClose}
            showDrawer={this.onViewClick}
            userDetails={userDetails}
            activeRecord={activeRecord1}
            onUpdateTask={this.onUpdateTask}
          />
          <Modal
            visible={modalVisible}
            handleCancel={this.onCloseModal}
            handleOk={this.handleModalOk}
            title="Delete Task"
            description="Are you sure you want to delete this task"
          />
        </div>
      </BodyContainer>
    );
  }
}
