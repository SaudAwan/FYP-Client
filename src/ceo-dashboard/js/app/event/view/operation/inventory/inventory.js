import React from 'react';
import { Button, Popconfirm, Icon, Row, Modal, message, Menu, Dropdown } from 'antd';

import * as eventApi from '../../../api'
import FilterTable from '../../../../../common/FilterTable';
import AddInventory from './addInventory';
// import EditInventory from './editInventory';

const confirm = Modal.confirm;

const statusColors = {
    "production": "#dc539c",
    "design": "#bd53dc",
    "inprogress": "#15b153",
    "completed": "#ef4651"
}

export default class Inventory extends React.Component {
    constructor() {
        super();
        this.state = { 
            visible : false,
            showEditModal: false,
            uuid: Math.random()    
        };
        this.fetchInventory = this.fetchInventory.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.removeInventory = this.removeInventory.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
    }

    fetchInventoryCount = (payload) => {
        const {params} = this.props.match;
        var query = '?event_id=' + params.id;
        if (payload && typeof payload === 'object') {
            query += '&searchText=' + payload.searchText;
        }
        return eventApi.getEventInventoryCount(query)
        .then(resp => {
            return resp.json();
        })
    }

    fetchInventory = (payload) => {
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
        return eventApi.getEventInventory(query)
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

    removeInventory = (id) => {
        this.setState({ removeId: id })
        eventApi.removeInventory(id).then(data => {
            this.fetchInventory();
            message.success('inventory removed successfully');
            this.setState({ removeId: null })
        }).catch(err => {
            message.error('error! please try again.');
            this.setState({ removeId: null })
        })
    }

    showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this inventory?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeInventory(this.state.activeRecord.id)
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
        const menu = el => (
            <Menu onClick={ev => this.handleMenuClick(ev, el)}>
                <Menu.Item key="1"><Icon type="edit" />Edit</Menu.Item>
                <Menu.Item key="2"><Icon type="delete" />Remove</Menu.Item>
            </Menu>
        );
        const columns = [{
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            sorter: true,
            width: '30%'
        }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: true,
            width: '20%'
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            width: '20%',
            render: (text, record, index) => {
                const status = record.status ? record.status.toLowerCase() : "";
                return <div style={{display:'flex'}}><p style={{color: "white", margin: 0, padding: "0 5px", textTransform: "capitalize", paddingBottom: "2px", borderRadius: "12px", fontSize: '13px', background: statusColors[status]}}>{status}</p></div>;
            }
        },{
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
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
        //                 <Popconfirm title="Are you sure delete the user?" onConfirm={() => this.removeInventory(record.id)} okText="Yes" cancelText="No">
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
                {/* <div style={{position: 'absolute', right: '24px', display: 'inline-block', zIndex: 10}}>
                    <Button style={{marginRight: '15px'}}>upload</Button>
                    <Button style={{background: 'rgb(70, 93, 239)'}} type="primary" onClick={this.showDrawer} shape="circle" icon="plus" />
                </div>
                <AddInventory 
                    fetchInventory={this.fetchInventory}
                    visible={this.state.visible}
                    onClose={this.onClose}
                    eventId={params.id}/> */}
                {/* <EditInventory
                    inventory={this.state.activeRecord}
                    hideEditDialog={this.hideEditDialog}
                    visible={this.state.showEditModal}/> */}
                <FilterTable 
                    uuid={this.state.uuid}
                    columns={columns}
                    fetchCount={this.fetchInventoryCount}
                    filterData={this.fetchInventory}/>
            </div>
        )
    }
}