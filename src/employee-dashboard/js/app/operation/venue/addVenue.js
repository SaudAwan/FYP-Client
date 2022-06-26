import React from 'react';
import {
    Drawer, message, Form, Button, Col, Row, Collapse, Input, Select, AutoComplete, Table, Popconfirm, Icon 
  } from 'antd';

import {getVenues, addVenue, tagVenues} from '../../api';
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

class NewVenue extends React.Component {
    addVenue(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addVenue(values)
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
                        <Form.Item style={{marginBottom: '6px'}} label="name">
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
                    <Row span={16}>
                        <Form.Item style={{marginBottom: '6px'}} label="Email">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please enter email' }],
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
                                    <Option value="cancelled">Cancelled</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Row>
                    <Row span={24}>
                        <Form.Item style={{float: 'right', marginBottom: '0'}}>
                            <Button size="small" onClick={(ev) => this.addVenue(ev)} type="primary">
                                Create and Add
                            </Button>
                        </Form.Item>
                    </Row>
                </Col>
            </Form>
        )
    }
}

NewVenue = Form.create()(NewVenue)

export default class AddVenue extends React.Component {
    constructor() {
        super();
        this.state = { 
            eventVenues: [],
            serachText: ''
        }
        this.handleSearch = debounce(this.handleSearch.bind(this), 500);
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.addVenue = this.addVenue.bind(this)
        this.removeVenue = this.removeVenue.bind(this)
    }

    handleSearch(value) {
        return getVenues('?searchText=' + value).then(resp => {
            return resp.json();
        }).then(venues => {
            var filteredData = Array.isArray(venues) ? 
                venues.map((el, index) => {
                    return (
                        <Option key={index} value={JSON.stringify(el)} text={el.venue_company}>
                            <span className="certain-search-item-count">{el.name}</span>
                        </Option>
                    )
                }) : [];
            console.log(filteredData)
            this.setState({
                venues: filteredData
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
        var obj = typeof value === 'string' ? JSON.parse(value) : value;
        obj.type = 1;
        this.setState({
            eventVenues: this.state.eventVenues.concat(obj),
            serachText: '',
            venues: []
        })
    }

    addVenue(values) {
        var status;
        addVenue(values).then(resp => {
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
                message.success('venue added successfully');
                this.props.fetchVenues();
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

    removeVenue(removeElemIndex) {
        var eventVenues = this.state.eventVenues.filter((el, index) => {
            return index !== removeElemIndex
        })
        this.setState({
            eventVenues: eventVenues
        })
    }

    tagVenues() {
        var eventVenues = this.state.eventVenues.map(el => ({id: el.id, type: el.type}))
        this.setState({ loading: true })
        tagVenues({
            event_id: this.props.eventId,
            venues: eventVenues
        }).then(data => {
            this.setState({ loading: true, eventVenues: [] })
            this.props.onClose(1);
        }).catch(err => {
            this.setState({ loading: true })
        })
    }

    render() {
        const { venues } = this.state;
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
                    <Button onClick={() => this.removeVenue(index)} type="danger" style={{ padding: '0 4px', height: '30px' }}>
                        <Icon type="delete" />
                    </Button>
                </div>
            )
        }];
        return (
            <Drawer 
                title="Tag Venue"
                width={520}
                className="sivakrishna"
                bodyStyle={{height: '100%', overflowY: 'auto'}}
                // bodyStyle={{height: 'calc(100% - 114px)'}}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <Collapse defaultActiveKey={['2']} accordion>
                    <Panel header="Tag venues here" key="1">
                        <Col gutter={16}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={4}>
                                    <p style={{fontWeight: 'bold', margin: 0}}>Venue</p>
                                </Col>
                                <Col span={18}>
                                    <AutoComplete
                                        style={{width: '100%'}}
                                        dataSource={venues}
                                        value={this.state.serachText}
                                        onSelect={this.onSelect}
                                        optionLabelProp="text"
                                        onSearch={this.onSearchTextChange}
                                        placeholder="Search Venues"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Panel>
                    <Panel header="New Venue" key="2">
                        <NewVenue addVenue={this.addVenue}/>
                    </Panel>
                </Collapse>
                <Table 
                    // onHeaderRow={(record, index) => this.returnClass(record, index)} 
                    style={{ clear: 'both', paddingTop: '24px' }} 
                    size="small" 
                    columns={columns}
                    pagination={false}
                    dataSource={this.state.eventVenues} />
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
                    <Button onClick={(ev) => this.tagVenues(ev)} type="primary">
                        Submit
                    </Button>
                </div>
            </Drawer>
        )
    }
}