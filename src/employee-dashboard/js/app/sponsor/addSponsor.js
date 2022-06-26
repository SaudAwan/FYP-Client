import React from 'react';
import {
    Drawer, message, Form, Button, Col, Row, Collapse, Input, Select, AutoComplete, Table, Popconfirm, Icon 
  } from 'antd';

import {getSponsors, addSponsor, tagSponsors} from '../api';
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

class NewSponsor extends React.Component {
    addSponsor(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addSponsor(values);
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
                            {getFieldDecorator('sponsor_company', {
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
                    <Row span={24}>
                        <Form.Item style={{float: 'right', marginBottom: '0'}}>
                            <Button size="small" onClick={(ev) => this.addSponsor(ev)} type="primary">
                                Create and Add
                            </Button>
                        </Form.Item>
                    </Row>
                </Col>
            </Form>
        )
    }
}

NewSponsor = Form.create()(NewSponsor)

export default class AddSponsor extends React.Component {
    constructor() {
        super();
        this.state = { 
            eventSponsors: [],
            serachText: ''
        }
        this.handleSearch = debounce(this.handleSearch.bind(this), 500);
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.addSponsor = this.addSponsor.bind(this)
        this.removeSponsor = this.removeSponsor.bind(this)
        this.onTypeChange = this.onTypeChange.bind(this)
    }

    componentDidMount() {
        fetch('/api/sponsor/types').then(resp => {
            return resp.json();
        }).then(resp => {
            this.setState({
                sponsorTypes: resp
            })
        })
    }

    handleSearch(value) {
        return getSponsors('?searchText=' + value).then(resp => {
            return resp.json();
        }).then(sponsors => {
            var filteredData = Array.isArray(sponsors) ? 
                sponsors.map((el, index) => {
                    return (
                        <Option key={index} value={JSON.stringify(el)} text={el.sponsor_company}>
                            <span className="certain-search-item-count">{el.sponsor_company +"  -  "+ el.name}</span>
                        </Option>
                    )
                }) : [];
            console.log(filteredData)
            this.setState({
                sponsors: filteredData
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
            eventSponsors: this.state.eventSponsors.concat(obj),
            serachText: '',
            sponsors: []
        })
    }

    onTypeChange(index, value) {
        var eventSponsors = this.state.eventSponsors.map((el, elIndex) => {
            var obj = {...el};
            if (index == elIndex) {
                obj.type = value;
            }
            return obj;
        })
        this.setState({
            eventSponsors: eventSponsors
        })
    }

    addSponsor(values) {
        var status;
        addSponsor(values).then(resp => {
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
                message.success('sponsor added successfully');
                this.props.fetchSponsors();
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

    removeSponsor(removeElemIndex) {
        var eventSponsors = this.state.eventSponsors.filter((el, index) => {
            return index != removeElemIndex
        })
        this.setState({
            eventSponsors: eventSponsors
        })
    }

    tagSponsors() {
        var eventSponsors = this.state.eventSponsors.map(el => ({id: el.id, type: el.type}))
        this.setState({ loading: true })
        tagSponsors({
            event_id: this.props.eventId,
            sponsors: eventSponsors
        }).then(data => {
            this.setState({ loading: true, eventSponsors: [] })
            this.props.fetchSponsors();
            this.props.onClose(1);
        }).catch(err => {
            this.setState({ loading: true })
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render() {
        if (this.state.error) {
            return <p>Please reload the page again!</p>
        }
        const { sponsors } = this.state;
        const columns = [{
            title: 'Company Name',
            dataIndex: 'sponsor_company',
            key: 'sponsor_company',
            sorter: true,
            width: '50%'
        }, {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            sorter: true,
            width: '30%',
            render: (text, record, index) => (
                <Select onChange={val => this.onTypeChange(index, val)} value={record.type} style={{ width: 120 }}>
                    {this.state.sponsorTypes.map((el, index) => <Option key={index} index={index} value={el.id}>{el.name}</Option>)}
                </Select>
            )
        }, {
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Popconfirm title="Are you sure delete the user?" onConfirm={() => this.removeSponsor(index)} okText="Yes" cancelText="No">
                        <Button type="danger" style={{ padding: '0 4px', height: '30px' }}>
                            <Icon type="delete" />
                        </Button>
                    </Popconfirm>
                </div>
            )
        }];
        return (
            <Drawer 
                title="Tag Sponsor"
                width={520}
                className="sivakrishna"
                bodyStyle={{height: '100%', overflowY: 'auto'}}
                // bodyStyle={{height: 'calc(100% - 114px)'}}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <Collapse defaultActiveKey={['2']} accordion>
                    <Panel header="Tag sponsors here" key="1">
                        <Col gutter={16}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={4}>
                                    <p style={{fontWeight: 'bold', margin: 0}}>Sponsor</p>
                                </Col>
                                <Col span={18}>
                                    <AutoComplete
                                        style={{width: '100%'}}
                                        dataSource={sponsors}
                                        value={this.state.serachText}
                                        onSelect={this.onSelect}
                                        optionLabelProp="text"
                                        onSearch={this.onSearchTextChange}
                                        placeholder="Search Sponsors"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Panel>
                    <Panel header="New Sponsor" key="2">
                        <NewSponsor addSponsor={this.addSponsor}/>
                    </Panel>
                </Collapse>
                <Table 
                    // onHeaderRow={(record, index) => this.returnClass(record, index)} 
                    style={{ clear: 'both', paddingTop: '24px' }} 
                    size="small" 
                    columns={columns}
                    pagination={false}
                    dataSource={this.state.eventSponsors} />
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
                    <Button onClick={(ev) => this.tagSponsors(ev)} type="primary">
                        Submit
                    </Button>
                </div>
            </Drawer>
        )
    }
}