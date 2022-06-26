import React from 'react';
import { Button, Icon, Row, Modal, message, Menu, Dropdown } from 'antd';

import {getEventTicketsCount, getEventTickets, removeTicket} from '../../api'
import FilterTable from '../../../common/FilterTable';
import AddTicket from './addTicket';
import EditTicket from './editTicket';

const confirm = Modal.confirm;

const statusColors = {
    "completed": "#ef4651",
    "negotiation": "#ef8a46",
    "inprogress": "#12bb2e",
    "onhold": "#0266ff"
}

export default class Ticket extends React.Component {
    constructor() {
        super();
        this.state = { 
            visible : false,
            showEditModal: false    
        };
        this.fetchTickets = this.fetchTickets.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.removeTicket = this.removeTicket.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
    }
    
    fetchTicketsCount = (payload) => {
        const {params} = this.props.match;
        var query = '?event_id=' + params.id;
        if (payload && typeof payload === 'object') {
            query += '&searchText=' + payload.searchText;
        }
        return getEventTicketsCount(query)
        .then(resp => {
            return resp.json();
        })
    }

    fetchTickets = (payload) => {
        const {params} = this.props.match;
        var query = '?event_id=' + params.id;
        if (payload && typeof payload === 'object') {
            const {field, order, limit, page, searchText} = payload;
            if (searchText) {
                query += "&searchText=" + searchText;
            }
            if (field && order) {
                query += "&field=" + field + '&order=' + order;
            }
            if (limit && page) {
                query += "&limit=" + limit + '&page=' + page;

            }
        }
        return getEventTickets(query)
        .then(resp => {
            return resp.json();
        })
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    }
  
    onClose = setuuid => {
        const obj = {
            visible: false,
        }
        if (setuuid) {
            obj.uuid = Math.random();
        }
        this.setState(obj);
    }

    removeTicket = (id) => {
        this.setState({ removeId: id })
        removeTicket(id).then(data => {
            this.fetchTickets();
            message.success('ticket removed successfully');
            this.setState({ removeId: null })
        }).catch(err => {
            message.error('error! please try again.');
            this.setState({ removeId: null })
        })
    }

    showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this ticket?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeTicket(this.state.activeRecord.id)
            },
            onCancel() {
            }
        });
    }

    handleMenuClick(e, record) {
        if (e.key === "1") {
            this.setState({
                showEditModal: true,
                activeRecord: record
            })
        } else if (e.key === "2") {
            this.showDeleteConfirm();
        }
    }

    handleButtonClick(record) {
        this.setState({
            activeRecord: record
        })
    }
    
    hideEditDialog = setuuid => {
        const obj = {
            showEditModal: false,
            activeRecord: null
        };
        if (setuuid) {
            obj.uuid = Math.random();
        }
        this.setState(obj)
    }

    render() {
        const {params} = this.props.match;
        const menu = record => (
            <Menu onClick={ev => this.handleMenuClick(ev, record)}>
                <Menu.Item key="1"><Icon type="edit" />Edit</Menu.Item>
                <Menu.Item key="2"><Icon type="delete" />Remove</Menu.Item>
            </Menu>
        );
        const columns = [{
            title: 'Speaker',
            dataIndex: 'speaker_name',
            key: 'speaker_name',
            sorter: true,
            width: '30%'
        }, {
            title: 'Contact',
            dataIndex: 'contact_number',
            key: 'contact_number',
            sorter: true,
            width: '20%'
        }, {
            title: 'Flight Status',
            dataIndex: 'flight_status',
            key: 'flight_status',
            sorter: true,
            width: '20%',
            render: (text, record, index) => {
                const flight_status = record.flight_status ? record.flight_status.toLowerCase() : "";
                return <div style={{display:'flex'}}><p style={{color: "white", margin: 0, padding: "0 5px", textTransform: "capitalize", paddingBottom: "2px", borderRadius: "12px", fontSize: '13px', background: statusColors[flight_status]}}>{flight_status}</p></div>;
            }
        },{
            title: 'Accomodation',
            dataIndex: 'accomodation',
            key: 'accomodation',
            sorter: true,
            width: '20%',
            render: (text, record, index) => {
                const accomodation = record.accomodation ? record.accomodation.toLowerCase() : "";
                return <div style={{display:'flex'}}><p style={{color: "white", margin: 0, padding: "0 5px", textTransform: "capitalize", paddingBottom: "2px", borderRadius: "12px", fontSize: '13px', background: statusColors[accomodation]}}>{accomodation}</p></div>;
            }
        }, {
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <Row style={{width: '80px'}} type="flex" justify="space-around" align="middle">
                    <Dropdown onClick={() => this.handleButtonClick(record)} overlay={() => menu(record)} placement="bottomLeft">
                        <Button style={{padding: 0}}><Icon type="more" style={{fontSize: '18px'}} /></Button>
                    </Dropdown>
                    {/*  */}
                    {/* <Col span={12}>
                        <Button onClick={() => this.edit(record)} style={{ padding: '0 4px', height: '30px' }}><Icon type="edit" /></Button>
                    </Col>
                    <Col span={12}>
                        <Popconfirm title="Are you sure delete the user?" onConfirm={() => this.removeTicket(record.id)} okText="Yes" cancelText="No">
                            <div style={{position: 'relative'}}>
                                <Button type="danger" style={{ padding: '0 4px', height: '30px' }}>
                                    <Icon type="delete" />
                                </Button>
                                {this.state.removeId == record.id ? 
                                    <Spin indicator={antIcon} style={{position: 'absolute', left: '35px', top: '5px'}}/>:
                                    null}
                            </div>
                        </Popconfirm>
                    </Col> */}
                </Row>
            )
        }];
        return (
            <div style={{height: '100%'}}>
                <div style={{position: 'absolute', right: '24px', display: 'inline-block', zIndex: 10}}>
                    <Button style={{marginRight: '15px'}}>upload</Button>
                    <Button style={{background: 'rgb(70, 93, 239)'}} type="primary" onClick={this.showDrawer} shape="circle" icon="plus" />
                    {/* <Button type="primary" size="mediumn" icon="plus" shape="circle" onClick={this.showModal}></Button> */}
                </div>
                <AddTicket 
                    fetchTickets={this.fetchTickets}
                    visible={this.state.visible}
                    onClose={this.onClose}
                    eventId={params.id}/>
                <EditTicket
                    ticket={this.state.activeRecord}
                    hideEditDialog={this.hideEditDialog}
                    visible={this.state.showEditModal}/>
                <FilterTable 
                    uuid={this.state.uuid}
                    columns={columns}
                    fetchCount={this.fetchTicketsCount}
                    filterData={this.fetchTickets}/>
            </div>
        )
    }
}