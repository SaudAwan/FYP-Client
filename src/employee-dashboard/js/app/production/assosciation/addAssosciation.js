import React from 'react';
import {
    Drawer, message, Form, Button, Col, Row, Collapse, Input, Select, AutoComplete, Table, Popconfirm, Icon 
  } from 'antd';

import {getAssosciations, addAssosciation, tagAssosciations} from '../../api';
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

class NewAssosciation extends React.Component {
    addAssosciation(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addAssosciation(values);
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
                                rules: [{ required: true, message: 'Please enter assosciation name' }],
                            })(<Input size="small" />)}
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
                    <Row span={24}>
                        <Form.Item style={{float: 'right', marginBottom: '0'}}>
                            <Button size="small" onClick={(ev) => this.addAssosciation(ev)} type="primary">
                                Create and Add
                            </Button>
                        </Form.Item>
                    </Row>
                </Col>
            </Form>
        )
    }
}

NewAssosciation = Form.create()(NewAssosciation)

export default class AddAssosciation extends React.Component {
    constructor() {
        super();
        this.state = { 
            eventAssosciations: [],
            serachText: ''
        }
        this.handleSearch = debounce(this.handleSearch.bind(this), 500);
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.addAssosciation = this.addAssosciation.bind(this)
        this.removeAssosciation = this.removeAssosciation.bind(this)
    }

    handleSearch(value) {
        return getAssosciations('?searchText=' + value).then(resp => {
            return resp.json();
        }).then(assosciations => {
            var filteredData = Array.isArray(assosciations) ? 
                assosciations.map((el, index) => {
                    return (
                        <Option key={index} value={JSON.stringify(el)} text={el.assosciation_company}>
                            <span className="certain-search-item-count">{el.assosciation_company +"  -  "+ el.name}</span>
                        </Option>
                    )
                }) : [];
            console.log(filteredData)
            this.setState({
                assosciations: filteredData
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
            eventAssosciations: this.state.eventAssosciations.concat(obj),
            serachText: '',
            assosciations: []
        })
    }

    addAssosciation(values) {
        var status;
        addAssosciation(values).then(resp => {
            status = resp.status;
            return resp.json();
        }).then(resp => {
            this.onSelect(resp)
            this.setState({
                loading: false
            })
            if (status == 500 || status == 403) {
                throw status
            } else {
                message.success('assosciation added successfully');
                this.props.fetchAssosciations();
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

    removeAssosciation(removeElemIndex) {
        var eventAssosciations = this.state.eventAssosciations.filter((el, index) => {
            return index !== removeElemIndex
        })
        this.setState({
            eventAssosciations: eventAssosciations
        })
    }

    tagAssosciations() {
        var eventAssosciations = this.state.eventAssosciations.map(el => ({id: el.id, type: el.type}))
        this.setState({ loading: true })
        tagAssosciations({
            event_id: this.props.eventId,
            assosciations: eventAssosciations
        }).then(data => {
            this.setState({ loading: true, eventAssosciations: [] })
            this.props.onClose(1);
        }).catch(err => {
            this.setState({ loading: true })
        })
    }

    render() {
        const { assosciations } = this.state;
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
                    <Button onClick={() => this.removeAssosciation(index)} type="danger" style={{ padding: '0 4px', height: '30px' }}>
                        <Icon type="delete" />
                    </Button>
                </div>
            )
        }];
        return (
            <Drawer 
                title="Tag Assosciation"
                width={520}
                className="sivakrishna"
                bodyStyle={{height: '100%', overflowY: 'auto'}}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <Collapse defaultActiveKey={['2']} accordion>
                    <Panel header="Tag assosciations here" key="1">
                        <Col gutter={16}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={4}>
                                    <p style={{fontWeight: 'bold', margin: 0}}>Assosciation</p>
                                </Col>
                                <Col span={18}>
                                    <AutoComplete
                                        style={{width: '100%'}}
                                        dataSource={assosciations}
                                        value={this.state.serachText}
                                        onSelect={this.onSelect}
                                        optionLabelProp="text"
                                        onSearch={this.onSearchTextChange}
                                        placeholder="Search Assosciations"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Panel>
                    <Panel header="New Assosciation" key="2">
                        <NewAssosciation addAssosciation={this.addAssosciation}/>
                    </Panel>
                </Collapse>
                <Table 
                    // onHeaderRow={(record, index) => this.returnClass(record, index)} 
                    style={{ clear: 'both', paddingTop: '24px' }} 
                    size="small" 
                    columns={columns}
                    pagination={false}
                    dataSource={this.state.eventAssosciations} />
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
                    <Button onClick={(ev) => this.tagAssosciations(ev)} type="primary">
                        Submit
                    </Button>
                </div>
            </Drawer>
        )
    }
}