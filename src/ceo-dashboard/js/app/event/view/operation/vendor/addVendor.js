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

class NewVendor extends React.Component {
    addVendor(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addVendor(values);
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
                                rules: [{ required: true, message: 'Please enter name' }],
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
                    <Row span={24}>
                        <Form.Item style={{float: 'right', marginBottom: '0'}}>
                            <Button size="small" onClick={(ev) => this.addVendor(ev)} type="primary">
                                Create and Add
                            </Button>
                        </Form.Item>
                    </Row>
                </Col>
            </Form>
        )
    }
}

NewVendor = Form.create()(NewVendor)

export default class AddVendor extends React.Component {
    constructor() {
        super();
        this.state = { 
            eventVendors: [],
            serachText: ''
        }
        this.handleSearch = debounce(this.handleSearch.bind(this), 500);
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.addVendor = this.addVendor.bind(this)
        this.removeVendor = this.removeVendor.bind(this)
    }

    handleSearch(value) {
        return eventApi.getVendors('?searchText=' + value).then(resp => {
            return resp.json();
        }).then(vendors => {
            var filteredData = Array.isArray(vendors) ? 
                vendors.map((el, index) => {
                    return (
                        <Option key={index} value={JSON.stringify(el)} text={el.vendor_company}>
                            <span className="certain-search-item-count">{el.name}</span>
                        </Option>
                    )
                }) : [];
            console.log(filteredData)
            this.setState({
                vendors: filteredData
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
        obj.status = "contacted";
        this.setState({
            eventVendors: this.state.eventVendors.concat(obj),
            serachText: '',
            vendors: []
        })
    }

    addVendor(values) {
        var status;
        eventApi.addVendor(values).then(resp => {
            status = resp.status;
            return resp.json();
        }).then(resp => {
            this.onSelect(resp)
            this.setState({
                loading: false
            })
            if (status === 500 || status === 403) {
                throw resp;
            } else {
                message.success('vendor added successfully');
                this.props.fetchVendors();
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

    removeVendor(removeElemIndex) {
        var eventVendors = this.state.eventVendors.filter((el, index) => {
            return index != removeElemIndex
        })
        this.setState({
            eventVendors: eventVendors
        })
    }

    tagVendors() {
        var eventVendors = this.state.eventVendors.map(el => ({id: el.id, type: el.type}))
        this.setState({ loading: true })
        eventApi.tagVendors({
            event_id: this.props.eventId,
            vendors: eventVendors
        }).then(data => {
            this.setState({ loading: true, eventVendors: [] })
            this.props.fetchVendors();  
        }).catch(err => {
            this.setState({ loading: true })
        })
    }

    render() {
        const { vendors } = this.state;
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            width: '50%'
        }, {
            title: 'Status',
            key: 'status',
            width: '30%',
            render: () => (
                <Row span={16}>
                    <Form.Item style={{marginBottom: '6px'}}>
                        <Select defaultValue='contacted'  onChange={() => console.log('asdf')}>
                            <Option value="negotiation">Negotiation</Option>
                            <Option value="confirmed">Confirmed</Option>
                            <Option value="contacted">Contacted</Option>
                        </Select>
                    </Form.Item>
                </Row>
            )
        }, {
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button onClick={() => this.removeVendor(index)} type="danger" style={{ padding: '0 4px', height: '30px' }}>
                        <Icon type="delete" />
                    </Button>
                </div>
            )
        }];
        return (
            <Drawer 
                title="Tag Vendor"
                width={520}
                className="sivakrishna"
                bodyStyle={{height: '100%', overflowY: 'auto'}}
                // bodyStyle={{height: 'calc(100% - 114px)'}}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <Collapse defaultActiveKey={['2']} accordion>
                    <Panel header="Tag vendors here" key="1">
                        <Col gutter={16}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={4}>
                                    <p style={{fontWeight: 'bold', margin: 0}}>Vendor</p>
                                </Col>
                                <Col span={18}>
                                    <AutoComplete
                                        style={{width: '100%'}}
                                        dataSource={vendors}
                                        value={this.state.serachText}
                                        onSelect={this.onSelect}
                                        optionLabelProp="text"
                                        onSearch={this.onSearchTextChange}
                                        placeholder="Search Vendors"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Panel>
                    <Panel header="New Vendor" key="2">
                        <NewVendor addVendor={this.addVendor}/>
                    </Panel>
                </Collapse>
                <Table 
                    // onHeaderRow={(record, index) => this.returnClass(record, index)} 
                    style={{ clear: 'both', paddingTop: '24px' }} 
                    size="small" 
                    columns={columns}
                    pagination={false}
                    dataSource={this.state.eventVendors} />
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        zIndex: 10 
                    }}
                >
                    <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={(ev) => this.tagVendors(ev)} type="primary">
                        Submit
                    </Button>
                </div>
            </Drawer>
        )
    }
}