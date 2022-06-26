import React from 'react';
import {
    Drawer, message, Form, Button, Col, Row, Collapse, Input, Select, AutoComplete, Table, Icon
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

class NewDelegate extends React.Component {
    addDelegate(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addDelegate(values);
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
                    {/* <Row span={16}>
                        <Form.Item style={{marginBottom: '6px'}} label="Category">
                            {getFieldDecorator('category', {
                                rules: [{ required: true, message: 'Please enter category' }],
                            })(
                                <Select onChange={val => this.onCategoryChange(val)} value="cat1" style={{ width: 120 }}>
                                    <Option index="1" value="cat1">cat1</Option>
                                    <Option index="2" value="cat2">cat2</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Row> */}
                    <Row span={24}>
                        <Form.Item style={{float: 'right', marginBottom: '0'}}>
                            <Button size="small" onClick={(ev) => this.addDelegate(ev)} type="primary">
                                Create and Add
                            </Button>
                        </Form.Item>
                    </Row>
                </Col>
            </Form>
        )
    }
}

NewDelegate = Form.create()(NewDelegate)

export default class AddDelegate extends React.Component {
    constructor() {
        super();
        this.state = { 
            eventDelegates: [],
            serachText: ''
        }
        this.handleSearch = debounce(this.handleSearch.bind(this), 500);
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.addDelegate = this.addDelegate.bind(this)
        this.removeDelegate = this.removeDelegate.bind(this)
        this.onCategoryChange = this.onCategoryChange.bind(this)
    }

    componentDidMount() {
        fetch('/api/delegate/category').then(resp => {
            return resp.json();
        }).then(resp => {
            this.setState({
                delegateCategories: resp
            })
        })
    }

    handleSearch(value) {
        return eventApi.getDelegates('?searchText=' + value).then(resp => {
            return resp.json();
        }).then(delegates => {
            var filteredData = Array.isArray(delegates) ? 
                delegates.map((el, index) => {
                    return (
                        <Option key={index} value={JSON.stringify(el)} text={el.delegate_company}>
                            <span className="certain-search-item-count">{el.delegate_company +"  -  "+ el.name}</span>
                        </Option>
                    )
                }) : [];
            console.log(filteredData)
            this.setState({
                delegates: filteredData
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
        obj.category = 1;
        this.setState({
            eventDelegates: this.state.eventDelegates.concat(obj),
            serachText: '',
            delegates: []
        })
    }

    onCategoryChange(value) {
        // var eventDelegates = this.state.eventDelegates.map((el, elIndex) => {
        //     var obj = {...el};
        //     if (index == elIndex) {
        //         obj.type = value;
        //     }
        //     return obj;
        // })
        // this.setState({
        //     eventDelegates: eventDelegates
        // })
    }

    addDelegate(values) {
        var status;
        eventApi.addDelegate(values).then(resp => {
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
                message.success('delegate added successfully');
                this.props.fetchDelegates();
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

    removeDelegate(removeElemIndex) {
        var eventDelegates = this.state.eventDelegates.filter((el, index) => {
            return index !== removeElemIndex
        })
        this.setState({
            eventDelegates: eventDelegates
        })
    }

    tagDelegates() {
        var eventDelegates = this.state.eventDelegates.map(el => ({id: el.id, category: el.category}))
        this.setState({ loading: true })
        eventApi.tagDelegates({
            event_id: this.props.eventId,
            delegates: eventDelegates
        }).then(data => {
            this.setState({ loading: true, eventDelegates: [] })
            this.props.onClose(1);
        }).catch(err => {
            this.setState({ loading: true })
        })
    }

    render() {
        const { delegates } = this.state;
        const columns = [{
            title: 'Company Name',
            dataIndex: 'delegate_company',
            key: 'delegate_company',
            sorter: true,
            width: '50%'
        }, {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: true,
            width: '30%',
            render: (text, record, index) => {
                // console.log()
                return (
                    <Select onChange={val => this.onCategoryChange(index, val)} value={record.category} style={{ width: 120 }}>
                        {this.state.delegateCategories.map((el, index) => <Option key={index} index={index} value={el.id}>{el.name}</Option>)}
                    </Select>
                )
            }
        }, {
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button onClick={() => this.removeDelegate(record.id)} type="danger" style={{ padding: '0 4px', height: '30px' }}>
                            <Icon type="delete" />
                        </Button>
                </div>
            )
        }];
        return (
            <Drawer 
                title="Tag Delegate"
                width={520}
                className="sivakrishna"
                bodyStyle={{height: 'calc(100% - 106px)', overflowY: 'auto'}}
                // bodyStyle={{height: 'calc(100% - 114px)'}}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <Collapse defaultActiveKey={['2']} accordion>
                    <Panel header="Tag delegates here" key="1">
                        <Col gutter={16}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={4}>
                                    <p style={{fontWeight: 'bold', margin: 0}}>Delegate</p>
                                </Col>
                                <Col span={18}>
                                    <AutoComplete
                                        style={{width: '100%'}}
                                        dataSource={delegates}
                                        value={this.state.serachText}
                                        onSelect={this.onSelect}
                                        optionLabelProp="text"
                                        onSearch={this.onSearchTextChange}
                                        placeholder="Search Delegates"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Panel>
                    <Panel header="New Delegate" key="2">
                        <NewDelegate addDelegate={this.addDelegate}/>
                    </Panel>
                </Collapse>
                <Table 
                    // onHeaderRow={(record, index) => this.returnClass(record, index)} 
                    style={{ clear: 'both', paddingTop: '24px' }} 
                    size="small" 
                    columns={columns}
                    pagination={false}
                    dataSource={this.state.eventDelegates} />
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
                    <Button onClick={(ev) => this.tagDelegates(ev)} type="primary">
                        Submit
                    </Button>
                </div>
            </Drawer>
        )
    }
}