import React from 'react';
import {
    Modal, message, Form, Col, Row, Input, Select
  } from 'antd';
import * as eventApi from '../../../api';

const {Option} = Select;

class EditTicket extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.ticket && nextProps.ticket) {
            var fields = ["speaker_name", "contact_number", "flight_status", "accomodation"];
            var obj = {};
            fields.forEach(key => {
                obj[key] = nextProps.ticket[key];
            })
            nextProps.form.setFieldsValue(obj);
        }
    }

    handleOk(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                eventApi.updateEventTicket(values, this.props.ticket.id).then(() => {
                    message.success('ticket updated successfully');
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
                title="Edit Ticket"
                visible={visible}
                onOk={ev => this.handleOk(ev)}
                onCancel={this.props.hideEditDialog}
            >
                <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                    <Col gutter={16}>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Name">
                                {getFieldDecorator('speaker_name', {
                                    rules: [{ required: true, message: 'Please enter event name' }],
                                })(<Input size="small" disabled/>)}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Contact Number">
                                {getFieldDecorator('contact_number', {
                                    rules: [{ required: true, message: 'Please enter email' }],
                                })(
                                    <Input size="small" style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Flight Status">
                                {getFieldDecorator('flight_status', {
                                    rules: [{ required: true, message: 'Please select flight status' }],
                                })(
                                    <Select onChange={() => console.log('asdf')}>
                                        <Option value="completed">Completed</Option>
                                        <Option value="negotiation">Negotiation</Option>
                                        <Option value="onhold">Onhold</Option>
                                        <Option value="cancelled">Cancelled</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Row>
                        <Form.Item style={{marginBottom: '6px'}} label="Accomodation">
                            {getFieldDecorator('accomodation', {
                                rules: [{ required: true, message: 'Please select accomodation' }],
                            })(
                                <Select onChange={() => console.log('asdf')}>
                                    <Option value="completed">Completed</Option>
                                    <Option value="negotiation">Negotiation</Option>
                                    <Option value="onhold">Onhold</Option>
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

export default Form.create()(EditTicket);