import React from 'react';
import { Button, Icon, Row, Modal, message, Menu, Dropdown } from 'antd';

import {getEventVendorsCount, getEventVendors, removeVendor} from '../../api'
import FilterTable from '../../../common/FilterTable';
import AddVendor from './addVendor';
// import EditVendor from './editInventory';

const confirm = Modal.confirm;

export default class Vendor extends React.Component {
    constructor() {
        super();
        this.state = { 
            visible : false,
            showEditModal: false    
        };
        this.fetchVendors = this.fetchVendors.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.removeVendor = this.removeVendor.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
    }

    fetchVendorsCount = (payload) => {
        const {params} = this.props.match;
        var query = '?event_id=' + params.id;
        if (payload && typeof payload === 'object') {
            query += '&searchText=' + payload.searchText;
        }
        return getEventVendorsCount(query)
        .then(resp => {
            return resp.json();
        })
    }

    fetchVendors = (payload) => {
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
        return getEventVendors(query)
        .then(resp => {
            return resp.json();
        })
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    }
  
    onClose = () => {
        this.setState({
            visible: false,
        });
    }

    removeVendor = (id) => {
        this.setState({ removeId: id })
        removeVendor(id).then(data => {
            this.fetchVendors();
            message.success('vendor removed successfully');
            this.setState({ removeId: null })
        }).catch(err => {
            message.error('error! please try again.');
            this.setState({ removeId: null })
        })
    }

    showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this vendor?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeVendor(this.state.activeRecord.id)
            },
            onCancel() {
            }
        });
    }

    handleMenuClick(e) {
        if (e.key == "1") {
            this.setState({
                showEditModal: true
            })
        } else if (e.key == "2") {
            this.showDeleteConfirm();
        }
    }

    handleButtonClick(record) {
        this.setState({
            activeRecord: record
        })
    }
    
    hideEditDialog() {
        this.setState({
            showEditModal: false
        })
    }

    render() {
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
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Icon type="edit" />Edit</Menu.Item>
                <Menu.Item key="2"><Icon type="delete" />Remove</Menu.Item>
            </Menu>
        );
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            width: '30%'
        }, {
            title: 'Contact',
            dataIndex: 'contact_number',
            key: 'contact_number',
            sorter: true,
            width: '30%'
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            width: '30%'
        }, {
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <Row style={{width: '80px'}} type="flex" justify="space-around" align="middle">
                    <Dropdown onClick={() => this.handleButtonClick(record)} overlay={menu} placement="bottomLeft">
                        <Button style={{padding: 0}}><Icon type="more" style={{fontSize: '18px'}} /></Button>
                    </Dropdown>
                    {/*  */}
                    {/* <Col span={12}>
                        <Button onClick={() => this.edit(record)} style={{ padding: '0 4px', height: '30px' }}><Icon type="edit" /></Button>
                    </Col>
                    <Col span={12}>
                        <Popconfirm title="Are you sure delete the user?" onConfirm={() => this.removeVendor(record.id)} okText="Yes" cancelText="No">
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
                <div style={{position: 'fixed', top: '184px', right: '60px', display: 'inline-block'}}>
                    <Button style={{marginRight: '15px'}}>upload</Button>
                    <Button style={{background: 'rgb(70, 93, 239)', position: 'fixed', top: '184px', right: '32px'}} type="primary" onClick={this.showDrawer} shape="circle" icon="plus" />
                    {/* <Button type="primary" size="mediumn" icon="plus" shape="circle" onClick={this.showModal}></Button> */}
                </div>
                <AddVendor 
                    fetchVendors={this.fetchVendors}
                    visible={this.state.visible}
                    onClose={this.onClose}
                    eventId={params.id}/>
                {/* <EditVendor
                    vendor={this.state.activeRecord}
                    hideEditDialog={this.hideEditDialog}
                    visible={this.state.showEditModal}/> */}
                <FilterTable 
                    columns={columns}
                    fetchCount={this.fetchVendorsCount}
                    filterData={this.fetchVendors}/>
            </div>
        )
    }
}