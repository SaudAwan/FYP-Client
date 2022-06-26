import React from 'react';
import { Button, Popconfirm, Icon, Row, Modal, message, Menu, Dropdown } from 'antd';

import * as eventApi from '../../../api'
import FilterTable from '../../../../../common/FilterTable';
import EditDelegate from '../editDelegate/editDelegate';
import AddDelegate from '../addDelegate/addDelegate';

const confirm = Modal.confirm;

const antIcon = <Icon type="loading" style={{ fontSize: 18 }} spin />;

export default class Delegate extends React.Component {
    constructor() {
        super();
        this.state = { 
            visible : false,
            showEditModal: false,
            uuid: Math.random()  
        };
        this.fetchDelegates = this.fetchDelegates.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.removeDelegate = this.removeDelegate.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
    }

    fetchDelegatesCount = (payload) => {
        const {params} = this.props.match;
        var query = '?event_id=' + params.id;
        if (payload && typeof payload === 'object') {
            query += '&searchText=' + payload.searchText;
        }
        return eventApi.getEventDelegatesCount(query)
        .then(resp => {
            return resp.json();
        })
    }

    fetchDelegates = (payload) => {
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
        return eventApi.getEventDelegates(query)
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

    removeDelegate = (id) => {
        this.setState({ removeId: id })
        eventApi.removeDelegate(id).then(data => {
            this.fetchDelegates();
            message.success('delegate removed successfully');
            this.setState({ removeId: null })
        }).catch(err => {
            message.error('error! please try again.');
            this.setState({ removeId: null })
        })
    }

    showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this delegate?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeDelegate(this.state.activeRecord.id)
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

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <p>Error, please refresh the page.</p>
        }
        const {params} = this.props.match;
        const filters = [{
            column: 'name',
            value: 'name'
        }, {
            column: 'company',
            value: 'company'
        }, {
            column: 'designation',
            value: 'designation'
        }, {
            column: 'type',
            value: 'type'
        }];
        const menu = el => (
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
            dataIndex: 'delegate_company',
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
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: true,
            width: '20%'
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
        //                 <Popconfirm title="Are you sure delete the user?" onConfirm={() => this.removeDelegate(record.id)} okText="Yes" cancelText="No">
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
                {/* <div style={{position: 'absolute', right: '60px', display: 'inline-block', zIndex: 10}}>
                    <Button style={{marginRight: '15px'}}>upload</Button>
                    <Button style={{background: 'rgb(70, 93, 239)'}} type="primary" onClick={this.showDrawer} shape="circle" icon="plus" />
                </div>
                <AddDelegate 
                    fetchDelegates={this.fetchDelegates}
                    visible={this.state.visible}
                    onClose={this.onClose}
                    eventId={params.id}/>
                <EditDelegate
                    delegate={this.state.activeRecord}
                    hideEditDialog={this.hideEditDialog}
                    visible={this.state.showEditModal}/> */}
                <FilterTable 
                    uuid={this.state.uuid}
                    columns={columns}
                    fetchCount={this.fetchDelegatesCount}
                    filterData={this.fetchDelegates}/>
            </div>
        )
    }
}