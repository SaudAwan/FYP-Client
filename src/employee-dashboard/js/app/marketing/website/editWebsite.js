import React from 'react';
import {
    Modal, message, Form, Col, Row, Input, Select
  } from 'antd';
import {updateEventSpeaker} from '../../api';

const {Option} = Select;

class EditSpeaker extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.speaker && nextProps.speaker) {
            var fields = ["name", "speaker_company", "designation", "contact_number", "status"];
            var obj = {};
            fields.forEach(key => {
                obj[key] = nextProps.speaker[key];
            })
            nextProps.form.setFieldsValue(obj);
        }
    }

    handleOk(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                updateEventSpeaker(values, this.props.speaker.speaker_id).then(() => {
                    message.success('speaker updated successfully');
                    this.props.hideEditDialog();
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
                title="Edit Speaker"
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
                                {getFieldDecorator('speaker_company', {
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
                        <Form.Item style={{marginBottom: '6px'}} label="Status">
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: 'Please select status' }],
                            })(
                                <Select onChange={() => console.log('asdf')}>
                                    <Option value="confirmation">Confirmation</Option>
                                    <Option value="negotiation">Negotiation</Option>
                                    <Option value="onhold">Onhold</Option>
                                    <Option value="approached">Approached</Option>
                                    <Option value="cancelled">Cancelled</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(EditSpeaker);