import React from 'react';
import {
    Drawer, message, Form, Button, Col, Row, Collapse, Input, Select, AutoComplete, Table, Popconfirm, Icon 
  } from 'antd';

import {getPartners, addPartner, tagMediaPartners} from '../../api';
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

class NewMediaPartner extends React.Component {
    addMediaPartner(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addPartner(values);
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
                                rules: [{ required: true, message: 'Please enter mediaPartner name' }],
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
                        <Form.Item style={{marginBottom: '6px'}} label="Company">
                            {getFieldDecorator('media_partner_company', {
                                rules: [{ required: true, message: 'Please enter company name' }],
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
                            <Button size="small" onClick={(ev) => this.addMediaPartner(ev)} type="primary">
                                Create and Add
                            </Button>
                        </Form.Item>
                    </Row>
                </Col>
            </Form>
        )
    }
}

NewMediaPartner = Form.create()(NewMediaPartner)

export default class AddMediaPartner extends React.Component {
    constructor() {
        super();
        this.state = { 
            eventMediaPartners: [],
            serachText: ''
        }
        this.handleSearch = debounce(this.handleSearch.bind(this), 500);
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.addMediaPartner = this.addMediaPartner.bind(this)
        this.removeMediaPartner = this.removeMediaPartner.bind(this)
    }

    handleSearch(value) {
        return getPartners('?searchText=' + value).then(resp => {
            return resp.json();
        }).then(mediaPartners => {
            var filteredData = Array.isArray(mediaPartners) ? 
                mediaPartners.map((el, index) => {
                    return (
                        <Option key={index} value={JSON.stringify(el)} text={el.media_partner_company}>
                            <span className="certain-search-item-count">{el.media_partner_company +"  -  "+ el.name}</span>
                        </Option>
                    )
                }) : [];
            console.log(filteredData)
            this.setState({
                mediaPartners: filteredData
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
            eventMediaPartners: this.state.eventMediaPartners.concat(obj),
            serachText: '',
            mediaPartners: []
        })
    }

    addMediaPartner(values) {
        var status;
        addPartner(values).then(resp => {
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
                message.success('mediaPartner added successfully');
                this.props.fetchMediaPartners();
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

    removeMediaPartner(removeElemIndex) {
        var eventMediaPartners = this.state.eventMediaPartners.filter((el, index) => {
            return index !== removeElemIndex
        })
        this.setState({
            eventMediaPartners: eventMediaPartners
        })
    }

    tagMediaPartners() {
        var eventMediaPartners = this.state.eventMediaPartners.map(el => ({id: el.id, type: el.type}))
        this.setState({ loading: true })
        tagMediaPartners({
            event_id: this.props.eventId,
            media_partners: eventMediaPartners
        }).then(data => {
            this.setState({ loading: true, eventMediaPartners: [] })
            this.props.fetchMediaPartners();
            this.props.onClose(1);
        }).catch(err => {
            this.setState({ loading: true })
        })
    }

    render() {
        const { mediaPartners } = this.state;
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
                    <Button onClick={() => this.removeMediaPartner(index)} type="danger" style={{ padding: '0 4px', height: '30px' }}>
                        <Icon type="delete" />
                    </Button>
                </div>
            )
        }];
        return (
            <Drawer 
                title="Tag MediaPartner"
                width={520}
                className="sivakrishna"
                bodyStyle={{height: '100%', overflowY: 'auto'}}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <Collapse defaultActiveKey={['2']} accordion>
                    <Panel header="Tag mediaPartners here" key="1">
                        <Col gutter={16}>
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={4}>
                                    <p style={{fontWeight: 'bold', margin: 0}}>MediaPartner</p>
                                </Col>
                                <Col span={18}>
                                    <AutoComplete
                                        style={{width: '100%'}}
                                        dataSource={mediaPartners}
                                        value={this.state.serachText}
                                        onSelect={this.onSelect}
                                        optionLabelProp="text"
                                        onSearch={this.onSearchTextChange}
                                        placeholder="Search MediaPartners"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Panel>
                    <Panel header="New MediaPartner" key="2">
                        <NewMediaPartner addMediaPartner={this.addMediaPartner}/>
                    </Panel>
                </Collapse>
                <Table 
                    // onHeaderRow={(record, index) => this.returnClass(record, index)} 
                    style={{ clear: 'both', paddingTop: '24px' }} 
                    size="small" 
                    columns={columns}
                    pagination={false}
                    dataSource={this.state.eventMediaPartners} />
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
                    <Button onClick={(ev) => this.tagMediaPartners(ev)} type="primary">
                        Submit
                    </Button>
                </div>
            </Drawer>
        )
    }
}