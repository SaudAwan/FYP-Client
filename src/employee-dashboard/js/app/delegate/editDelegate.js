import React from 'react';
import {
    Modal, message, Form, Col, Row, Input 
  } from 'antd';
import {updateEventDelegate} from '../api';

class EditDelegate extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.delegate && nextProps.delegate) {
            var fields = ["name", "delegate_company", "designation", "contact_number", "type"];
            var obj = {};
            fields.forEach(key => {
                obj[key] = nextProps.delegate[key];
            })
            nextProps.form.setFieldsValue(obj);
        }
    }

    handleOk(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                updateEventDelegate(values, this.props.delegate.delegate_id).then(() => {
                    message.success('delegate updated successfully');
                    this.props.hideEditDialog(1);
                })
            }
        });
    }

    render() {
        const {visible} = this.props;
        const { getFieldDecorator } = this.props.form;
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
            <Modal
                title="Edit Delegate"
                visible={visible}
                onOk={ev => this.handleOk(ev)}
                onCancel={this.props.hideEditDialog}
            >
                <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                    <Col gutter={16}>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Name">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please enter event name' }],
                                })(<Input size="small" />)}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Company">
                                {getFieldDecorator('delegate_company', {
                                    rules: [{ required: true, message: 'Please enter company' }],
                                })(
                                    <Input size="small" style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Designation">
                                {getFieldDecorator('designation', {
                                    rules: [{ required: true, message: 'Please enter designation' }],
                                })(
                                    <Input size="small" style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Contact">
                                {getFieldDecorator('contact_number', {
                                    rules: [{ required: true, message: 'Please enter contact' }],
                                })(
                                    <Input size="small" style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                    </Col>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(EditDelegate);