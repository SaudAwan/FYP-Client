import React from "react";
import { Button, Comment, Avatar, Input, Form } from "antd";
import { addTaskComment, deleteTaskComment } from "../api";
const { TextArea } = Input;
class CommentForm extends React.Component {
  state = {
    comments: null,
  };

  onComment = (e) => {
    const { userDetails, task_id } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = { comment: values.comment, task_id, commentor_id: userDetails.id };
        addTaskComment(data).then(async (resp) => {
          if (resp.message === "Comment created") {
            this.props.uuidHandler();
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

  onDeleteClick = async (comment_id) => {
    await deleteTaskComment(comment_id).then((resp) => {
      if (resp.message === "Comment deleted") {
        this.props.uuidHandler();
      } else {
        //error handeling
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { comments, userDetails } = this.props;
    return (
      <div>
        <p style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "7px", marginTop: "16px" }}>Comments</p>
        {comments
          ? comments.map((comment, index) => {
              return (
                <Comment
                  key={index}
                  author={<a>{comment.user.name}</a>}
                  avatar={<Avatar alt={`${comment.user.name}`} />}
                  content={
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p>{comment.comment}</p>
                      {userDetails.id === comment.user.id ? (
                        <img
                          style={{ height: "20px", width: "20px", cursor: "pointer" }}
                          src="/Delete.png"
                          onClick={() => {
                            this.onDeleteClick(comment.id);
                          }}
                        />
                      ) : null}
                    </div>
                  }
                ></Comment>
              );
            })
          : null}
        <Form>
          <Form.Item>
            {getFieldDecorator("comment", {
              rules: [{ required: false }],
            })(<TextArea />)}
          </Form.Item>
        </Form>
        <Button
          type="primary"
          onClick={(ev) => {
            this.onComment(ev);
          }}
        >
          Comment
        </Button>
      </div>
    );
  }
}

CommentForm = Form.create()(CommentForm);
export default CommentForm;
