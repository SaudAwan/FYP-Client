import React from 'react';
import {
    Drawer, message, Form, Button, Col, Row, Collapse, Input, Select, AutoComplete, Table, Popconfirm, Icon 
  } from 'antd';

import * as eventApi from '../../../api';
const { Option } = Select;
const Panel = Collapse.Panel;

const debounce = (func, delay) => { 
    let debounceTimer 
    return function() { 
        const context = this
        const args = arguments 
        clearTimeout(debounceTimer) 
        debounceTimer = setTimeout(() => func.apply(context, args), delay) 
    } 
}

class NewSpeaker extends React.Component {
    addSpeaker(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addSpeaker(values);
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
                    <Row span={16}>
                        <Form.Item style={{marginBottom: '6px'}} label="Status">
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: 'Please select status' }],
                            })(
                                <Select onChange={() => console.log('asdf')}>
                                    <Option value="confirmed">Confirmed</Option>
                                    <Option value="negotiation">Negotiation</Option>
                                    <Option value="onhold">Onhold</Option>
                                    <Option value="approached">Approached</Option>
                                    <Option value="cancelled">Cancelled</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Row>
                    <Row span={24}>
                        <Form.Item style={{float: 'right', marginBottom: '0'}}>
                            <Button size="small" onClick={(ev) => this.addSpeaker(ev)} type="primary">
                                Create and Add
                            </Button>
                        </Form.Item>
                    </Row>
                </Col>
            </Form>
        )
    }
}

NewSpeaker = Form.create()(NewSpeaker)

export default class AddSpeaker extends React.Component {
    constructor() {
        super();
        this.state = { 
            eventSpeakers: [],
            serachText: ''
        }
        this.handleSearch = debounce(this.handleSearch.bind(this), 500);
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.addSpeaker = this.addSpeaker.bind(this)
        this.removeSpeaker = this.removeSpeaker.bind(this)
    }

    handleSearch(value) {
        return eventApi.getSpeakers('?searchText=' + value).then(resp => {
            return resp.json();
        }).then(speakers => {
            var filteredData = Array.isArray(speakers) ? 
                speakers.map((el, index) => {
                    return (
                        <Option key={index} value={JSON.stringify(el)} text={el.speaker_company}>
                            <span className="certain-search-item-count">{el.speaker_company +"  -  "+ el.name}</span>
                        </Option>
                    )
                }) : [];
            console.log(filteredData)
            this.setState({
                speakers: filteredData
            })
            return
        })
    }

    onSearchTextChange(value) {
        this.setState({
            serachText: value
        })
        this.handleSearch(value);
    }

    onSelect(value) {
        var obj = typeof value == 'string' ? JSON.parse(value) : value;
        obj.type = 1;
        this.setState({
            eventSpeakers: this.state.eventSpeakers.concat(obj),
            serachText: '',
            speakers: []
        })
    }

    addSpeaker(values) {
        var status;
        eventApi.addSpeaker(values).then(resp => {
            status = resp.status;
            return resp.json();
        }).then(resp => {
            const {id} = resp;
            this.onSelect({...values, id: id})
            this.setState({
                loading: false
            })
            if (status === 500 || status === 403) {
                throw resp;
            } else {
                message.success('speaker added successfully');
                this.props.fetchSpeakers();
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
    }

    returnClass = (data, index) => {
        console.log(index)
        return {
            className: "filter-header"
        };
    }

    removeSpeaker(removeElemIndex) {
        var eventSpeakers = this.state.eventSpeakers.filter((el, index) => {
            return index !== removeElemIndex
        })
        this.setState({
            eventSpeakers: eventSpeakers
        })
    }

    tagSpeakers() {
        var eventSpeakers = this.state.eventSpeakers.map(el => ({id: el.id, type: el.type, status: el.status}))
        this.setState({ loading: true })
        eventApi.tagSpeakers({
            event_id: this.props.eventId,
            speakers: eventSpeakers
        }).then(data => {
            this.setState({ 
                loading: true,
                eventSpeakers: []
            })
            this.props.onClose(1);
        }).catch(err => {
            this.setState({ loading: true })
        })
    }

    render() {
        const { speakers } = this.state;
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            width: '80%'
        }, {
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button onClick={() => this.removeSpeaker(index)} type="danger" style={{ padding: '0 4px', height: '30px' }}>
                        <Icon type="delete" />
                    </Button>
                </div>
            )
        }];
        return (
            <Drawer 
                title="Tag Speaker"
                width={520}
                className="sivakrishna"
                bodyStyle={{height: '100%', overflowY: 'auto'}}
                // bodyStyle={{height: 'calc(100% - 114px)'}}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <Collapse defaultActiveKey={['2']} accordion>
                    <Panel header="Tag speakers here" key="1">
                        <Col gutter={16}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={4}>
                                    <p style={{fontWeight: 'bold', margin: 0}}>Speaker</p>
                                </Col>
                                <Col span={18}>
                                    <AutoComplete
                                        style={{width: '100%'}}
                                        dataSource={speakers}
                                        value={this.state.serachText}
                                        onSelect={this.onSelect}
                                        optionLabelProp="text"
                                        onSearch={this.onSearchTextChange}
                                        placeholder="Search Speakers"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Panel>
                    <Panel header="New Speaker" key="2">
                        <NewSpeaker addSpeaker={this.addSpeaker}/>
                    </Panel>
                </Collapse>
                <Table 
                    // onHeaderRow={(record, index) => this.returnClass(record, index)} 
                    style={{ clear: 'both', paddingTop: '24px' }} 
                    size="small" 
                    columns={columns}
                    pagination={false}
                    dataSource={this.state.eventSpeakers} />
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right'
                    }}
                >
                    <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={(ev) => this.tagSpeakers(ev)} type="primary">
                        Submit
                    </Button>
                </div>
            </Drawer>
        )
    }
}