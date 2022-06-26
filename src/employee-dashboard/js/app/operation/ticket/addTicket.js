import React from 'react';
import {
    Drawer, Form, Button, Col, Row, Input, Select, AutoComplete, Table, Icon 
  } from 'antd';

import { getSpeakers, getEventTickets, tagTickets} from '../../api';
const { Option } = Select;

const debounce = (func, delay) => { 
    let debounceTimer 
    return function() { 
        const context = this
        const args = arguments 
        clearTimeout(debounceTimer) 
        debounceTimer = setTimeout(() => func.apply(context, args), delay) 
    } 
}

class NewTicket extends React.Component {
    constructor() {
        super()
        this.state = {
            speakers: []
        }
    }
    addTicket(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const speaker = JSON.parse(values['speaker']);
                this.props.addTicket({
                    ...values,
                    speaker: speaker,
                    name: speaker.name
                })
                setTimeout(() => {
                    this.props.form.resetFields();
                }, 0)
            }
        });
    }
    
    handleSearch(value) {
        return getSpeakers('?searchText=' + value).then(resp => {
            return resp.json();
        }).then(speakers => {
            var filteredData = Array.isArray(speakers) ? 
                speakers.map((el, index) => {
                    return (
                        <Option key={index} value={JSON.stringify(el)} text={el.name}>
                            <span className="certain-search-item-count">{el.name}</span>
                        </Option>
                    )
                }) : [];
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
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { speakers } = this.state;
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
                        <Form.Item style={{marginBottom: '6px'}} label="speaker">
                            {getFieldDecorator('speaker', {
                                rules: [{ required: true, message: 'Please enter speaker' }],
                            })(
                                <AutoComplete
                                    style={{width: '100%'}}
                                    dataSource={speakers}
                                    value={this.state.searchText}
                                    onSelect={this.onSelect}
                                    optionLabelProp="text"
                                    onSearch={val => this.onSearchTextChange(val)}
                                    placeholder="Search Tickets"
                                />
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
                        <Form.Item style={{marginBottom: '6px'}} label="Flight status">
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
                    <Row span={16}>
                        <Form.Item style={{marginBottom: '6px'}} label="Accomodation">
                            {getFieldDecorator('accomodation', {
                                rules: [{ required: true, message: 'Please select status' }],
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
                    <Row span={24}>
                        <Form.Item style={{float: 'right', marginBottom: '0'}}>
                            <Button size="small" onClick={(ev) => this.addTicket(ev)} type="primary">
                                Add
                            </Button>
                        </Form.Item>
                    </Row>
                </Col>
            </Form>
        )
    }
}

NewTicket = Form.create()(NewTicket)

export default class AddTicket extends React.Component {
    constructor() {
        super();
        this.state = { 
            eventTickets: [],
            serachText: ''
        }
        this.handleSearch = debounce(this.handleSearch.bind(this), 500);
        this.onSearchTextChange = this.onSearchTextChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.addTicket = this.addTicket.bind(this)
        this.removeTicket = this.removeTicket.bind(this)
    }

    componentDidMount() {
        getSpeakers()
        .then(data => {
            this.setState({
                speakers: data
            })
        })
    }

    handleSearch(value) {
        return getEventTickets('?searchText=' + value).then(resp => {
            return resp.json();
        }).then(tickets => {
            var filteredData = Array.isArray(tickets) ? 
                tickets.map((el, index) => {
                    return (
                        <Option key={index} value={JSON.stringify(el)} text={el.ticket_company}>
                            <span className="certain-search-item-count">{el.name}</span>
                        </Option>
                    )
                }) : [];
            console.log(filteredData)
            this.setState({
                tickets: filteredData
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
            eventTickets: this.state.eventTickets.concat(obj),
            serachText: '',
            tickets: []
        })
    }

    addTicket(values) {
        const tickets = this.state.eventTickets.map(el => ({...el}))
        tickets.push(values);
        this.setState({eventTickets: tickets})
    }

    returnClass = (data, index) => {
        console.log(index)
        return {
            className: "filter-header"
        };
    }

    removeTicket(removeElemIndex) {
        var eventTickets = this.state.eventTickets.filter((el, index) => {
            return index !== removeElemIndex
        })
        this.setState({
            eventTickets: eventTickets
        })
    }

    tagTickets() {
        var eventTickets = this.state.eventTickets.map(el => ({
            speaker_id: el.speaker.id,
            contact_number: el.contact_number,
            flight_status: el.flight_status,
            accomodation: el.accomodation
        }))
        this.setState({ loading: true })
        tagTickets({
            event_id: this.props.eventId,
            tickets: eventTickets
        }).then(data => {
            this.setState({ loading: true, eventTickets: [] })
            this.props.onClose(1);
        }).catch(err => {
            this.setState({ loading: true })
        })
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            width: '30%'
        }, {
            title: 'Flight Status',
            dataIndex: 'flight_status',
            key: 'flight_status',
            sorter: true,
            width: '30%'
        }, {
            title: 'Accomodation',
            dataIndex: 'accomodation',
            key: 'accomodation',
            sorter: true,
            width: '30%'
        }, {
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button onClick={() => this.removeTicket(index)} type="danger" style={{ padding: '0 4px', height: '30px' }}>
                        <Icon type="delete" />
                    </Button>
                </div>
            )
        }];
        return (
            <Drawer 
                title="Create Ticket"
                width={520}
                className="sivakrishna"
                bodyStyle={{height: '100%', overflowY: 'auto'}}
                // bodyStyle={{height: 'calc(100% - 114px)'}}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                
                <NewTicket 
                    speakers={this.speakers}
                    addTicket={this.addTicket}/>
                <Table 
                    // onHeaderRow={(record, index) => this.returnClass(record, index)} 
                    style={{ clear: 'both', paddingTop: '24px' }} 
                    size="small" 
                    columns={columns}
                    pagination={false}
                    dataSource={this.state.eventTickets} />
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
                    <Button onClick={(ev) => this.tagTickets(ev)} type="primary">
                        Submit
                    </Button>
                </div>
            </Drawer>
        )
    }
}