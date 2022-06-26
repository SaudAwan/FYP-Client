import React from 'react';
import {
    Drawer, message, Form, Button, Col, Row, Input, Select
  } from 'antd';

import * as eventApi from '../../../api';
const {Option} = Select;
class AddInventory extends React.Component {
    addInventory(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var status;
                const {eventId} = this.props;
                values.event_id = eventId;
                eventApi.addInventory(values).then(resp => {
                    status = resp.status;
                    return resp.json();
                }).then(resp => {
                    this.setState({
                        loading: false
                    })
                    if (status === 500 || status === 403) {
                        throw err;
                    } else {
                        message.success('inventory added successfully');
                        this.props.onClose(1);
                        this.setState({
                            loading: false
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    message.error('error! please try again.');
                    this.setState({
                        loading: false
                    })
                })
                setTimeout(() => {
                    this.props.form.resetFields();
                }, 0)
            }
        });
    }
    render() {
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
            <Drawer 
                title="Add Inventory"
                width={520}
                className="sivakrishna"
                bodyStyle={{height: '100%', overflowY: 'auto'}}
                // bodyStyle={{height: 'calc(100% - 114px)'}}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                    <Col gutter={16}>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Item">
                                {getFieldDecorator('item', {
                                    rules: [{ required: true, message: 'Please enter name' }],
                                })(
                                    <Input size="small" style={{ width: '100%', padding: '14px 6px' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Quantity">
                                {getFieldDecorator('quantity', {
                                    rules: [{ required: true, message: 'Please enter quantity' }],
                                })(
                                    <Input size="small" style={{ width: '100%', padding: '14px 6px' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Status">
                                {getFieldDecorator('status', {
                                    rules: [{ required: true, message: 'Please enter status' }],
                                })(
                                    <Select onChange={() => console.log('asdf')}>
                                        <Option value="inprogress">Inprogress</Option>
                                        <Option value="design">Design</Option>
                                        <Option value="production">Production</Option>
                                        <Option value="completed">Completed</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Location">
                                {getFieldDecorator('location', {
                                    rules: [{ required: true, message: 'Please enter location' }],
                                })(
                                    <Select onChange={() => console.log('asdf')}>
                                        <Option value="Onsite">Onsite</Option>
                                        <Option value="Offsite">Offsite</Option>
                                    </Select>                                )}
                            </Form.Item>
                        </Row>
                        <Row span={24}>
                            <Form.Item style={{float: 'right', marginBottom: '0'}}>
                                <Button size="small" onClick={(ev) => this.addInventory(ev)} type="primary">
                                    Create and Add
                                </Button>
                            </Form.Item>
                        </Row>
                    </Col>
                </Form>
            </Drawer>
        )
    }
}

export default Form.create()(AddInventory)