import React from 'react';
import { Button, Icon, Row, Modal, Menu, Dropdown } from 'antd';

import {removeWebsite} from '../../api'
import FilterTable from '../../../common/FilterTable';

const confirm = Modal.confirm;

export default class Website extends React.Component {
    constructor() {
        super();
        this.state = { 
            visible : false,
            showEditModal: false    
        };
        this.fetchWebsites = this.fetchWebsites.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.removeWebsite = this.removeWebsite.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
    }

    fetchWebsitesCount = async (payload) => {
        const {params} = this.props.match;
        var query = '?event_id=' + params.id;
        if (payload && typeof payload === 'object') {
            query += '&searchText=' + payload.searchText;
        }
        return {}
    }

    fetchWebsites = async (payload) => {
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
        return []
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

    removeWebsite = (id) => {
        // this.setState({ removeId: id })
        // removeWebsite(id).then(data => {
        //     this.fetchWebsites();
        //     message.success('website removed successfully');
        //     this.setState({ removeId: null })
        // }).catch(err => {
        //     message.error('error! please try again.');
        //     this.setState({ removeId: null })
        // })
    }

    showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this website?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeWebsite(this.state.activeRecord.id)
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
    
    hideEditDialog() {
        this.setState({
            showEditModal: false
        })
    }

    render() {
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
        const menu = el =>  (
            <Menu onClick={ev => this.handleMenuClick(ev, el)}>
                <Menu.Item key="1"><Icon type="edit" />Edit</Menu.Item>
                <Menu.Item key="2"><Icon type="delete" />Remove</Menu.Item>
            </Menu>
        );
        const columns = [{
            title: 'Page',
            dataIndex: 'page',
            key: 'page',
            sorter: true,
            width: '15%'
        }, {
            title: 'Users',
            dataIndex: 'users',
            key: 'users',
            sorter: true,
            width: '20%'
        }, {
            title: 'Page views',
            dataIndex: 'page_views',
            key: 'page_views',
            sorter: true,
            width: '20%'
        }, {
            title: 'Bounce Rate',
            dataIndex: 'bounce_rate',
            key: 'bounce_rate',
            sorter: true,
            width: '20%'
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
                        <Popconfirm title="Are you sure delete the user?" onConfirm={() => this.removeWebsite(record.id)} okText="Yes" cancelText="No">
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
                {/* <div style={{position: 'fixed', top: '184px', right: '60px', display: 'inline-block'}}>
                    <Button style={{marginRight: '15px'}}>upload</Button>
                    <Button style={{background: 'rgb(70, 93, 239)', position: 'fixed', top: '184px', right: '32px'}} type="primary" onClick={this.showDrawer} shape="circle" icon="plus" /> */}
                    {/* <Button type="primary" size="mediumn" icon="plus" shape="circle" onClick={this.showModal}></Button> */}
                {/* </div> */}
                {/* <AddWebsite 
                    fetchWebsites={this.fetchWebsites}
                    visible={this.state.visible}
                    onClose={this.onClose}
                    eventId={params.id}/>
                <EditWebsite
                    website={this.state.activeRecord}
                    hideEditDialog={this.hideEditDialog}
                    visible={this.state.showEditModal}/> */}
                <FilterTable 
                    columns={columns}
                    fetchCount={this.fetchWebsitesCount}
                    filterData={this.fetchWebsites}/>
            </div>
        )
    }
}