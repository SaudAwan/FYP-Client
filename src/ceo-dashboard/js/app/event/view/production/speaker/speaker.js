import React from 'react';
import { Button, Icon, Row, Modal, message, Menu, Dropdown } from 'antd';

import * as eventApi from '../../../api'
import FilterTable from '../../../../../common/FilterTable';
import AddSpeaker from './addSpeaker';
import EditSpeaker from './editSpeaker';

const confirm = Modal.confirm;

const statusColors = {
    "confirmed": "#39c379",
    "negotiation": "#ef8a46",
    "approached": "#ef4646",
    "onhold": "#465def",
    "cancelled": "#a8a8a8"
}

export default class Speaker extends React.Component {
    constructor() {
        super();
        this.state = { 
            visible : false,
            showEditModal: false,
            uuid: Math.random()
        };
        this.fetchSpeakers = this.fetchSpeakers.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.removeSpeaker = this.removeSpeaker.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
    }

    fetchSpeakersCount = (payload) => {
        const {params} = this.props.match;
        var query = '?event_id=' + params.id;
        if (payload && typeof payload === 'object') {
            query += '&searchText=' + payload.searchText;
        }
        return eventApi.getEventSpeakersCount(query)
        .then(resp => {
            return resp.json();
        })
    }

    fetchSpeakers = (payload) => {
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
        return eventApi.getEventSpeakers(query)
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

    removeSpeaker = (id) => {
        this.setState({ removeId: id })
        eventApi.removeSpeaker(id).then(data => {
            this.fetchSpeakers();
            message.success('speaker removed successfully');
            this.setState({ removeId: null })
        }).catch(err => {
            message.error('error! please try again.');
            this.setState({ removeId: null })
        })
    }

    showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this speaker?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeSpeaker(this.state.activeRecord.id)
            },
            onCancel() {
            }
        });
    }

    handleMenuClick(e, el) {
        if (e.key === "1") {
            this.setState({
                showEditModal: true,
                activeRecord: el
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
        const menu = el =>  (
            <Menu onClick={ev => this.handleMenuClick(ev, el)}>
                <Menu.Item key="1"><Icon type="edit" />Edit</Menu.Item>
                <Menu.Item key="2"><Icon type="delete" />Remove</Menu.Item>
            </Menu>
        );
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            width: '15%'
        }, {
            title: 'Company',
            dataIndex: 'speaker_company',
            key: 'company',
            sorter: true,
            width: '20%'
        }, {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            sorter: true,
            width: '20%'
        }, {
            title: 'Contact',
            dataIndex: 'contact_number',
            key: 'contact_number',
            sorter: true,
            width: '20%'
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            width: '20%',
            render: (text, record, index) => {
                const status = record.status ? record.status.toLowerCase() : "";
                return <div style={{display:'flex'}}><p style={{color: "white", margin: 0, padding: "0 5px", textTransform: "capitalize", paddingBottom: "2px", borderRadius: "12px", fontSize: '13px', background: statusColors[status]}}>{status}</p></div>;
            }
        }]
        // , {
        //     title: 'Action',
        //     key: 'render',
        //     render: (text, record, index) => (
        //         <Row style={{width: '80px'}} type="flex" justify="space-around" align="middle">
        //             <Dropdown onClick={() => this.handleButtonClick(record)} overlay={() => menu(record)} placement="bottomLeft">
        //                 <Button style={{padding: 0}}><Icon type="more" style={{fontSize: '18px'}} /></Button>
        //             </Dropdown>
        //             {/*  */}
        //             {/* <Col span={12}>
        //                 <Button onClick={() => this.edit(record)} style={{ padding: '0 4px', height: '30px' }}><Icon type="edit" /></Button>
        //             </Col>
        //             <Col span={12}>
        //                 <Popconfirm title="Are you sure delete the user?" onConfirm={() => this.removeSpeaker(record.id)} okText="Yes" cancelText="No">
        //                     <div style={{position: 'relative'}}>
        //                         <Button type="danger" style={{ padding: '0 4px', height: '30px' }}>
        //                             <Icon type="delete" />
        //                         </Button>
        //                         {this.state.removeId == record.id ? 
        //                             <Spin indicator={antIcon} style={{position: 'absolute', left: '35px', top: '5px'}}/>:
        //                             null}
        //                     </div>
        //                 </Popconfirm>
        //             </Col> */}
        //         </Row>
        //     )
        // }];
        return (
            <div style={{height: '100%'}}>
                {/* <div style={{position: 'fixed', top: '184px', right: '60px', display: 'inline-block'}}>
                    <Button style={{marginRight: '15px'}}>upload</Button>
                    <Button style={{background: 'rgb(70, 93, 239)', position: 'fixed', top: '184px', right: '32px'}} type="primary" onClick={this.showDrawer} shape="circle" icon="plus" />
                </div>
                <AddSpeaker 
                    fetchSpeakers={this.fetchSpeakers}
                    visible={this.state.visible}
                    onClose={this.onClose}
                    eventId={params.id}/>
                <EditSpeaker
                    speaker={this.state.activeRecord}
                    hideEditDialog={this.hideEditDialog}
                    visible={this.state.showEditModal}/> */}
                <FilterTable
                    uuid={this.state.uuid}
                    columns={columns}
                    fetchCount={this.fetchSpeakersCount}
                    filterData={this.fetchSpeakers}/>
            </div>
        )
    }
}