import React from 'react';
import { Button, Icon, Row, Modal, message, Menu, Dropdown } from 'antd';

import {removeBlog} from '../../api'
import FilterTable from '../../../common/FilterTable';
import AddBlog from './addBlog';
import EditBlog from './editBlog';

const confirm = Modal.confirm;

export default class Blog extends React.Component {
    constructor() {
        super();
        this.state = { 
            visible : false,
            showEditModal: false    
        };
        this.fetchBlogs = this.fetchBlogs.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.removeBlog = this.removeBlog.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.hideEditDialog = this.hideEditDialog.bind(this);
    }

    fetchBlogsCount = async (payload) => {
        const {params} = this.props.match;
        var query = '?event_id=' + params.id;
        if (payload && typeof payload === 'object') {
            query += '&searchText=' + payload.searchText;
        }
        return {}
    }

    fetchBlogs = async (payload) => {
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

    removeBlog = (id) => {
        this.setState({ removeId: id })
        // removeBlog(id).then(data => {
        //     this.fetchBlogs();
        //     message.success('blog removed successfully');
        //     this.setState({ removeId: null })
        // }).catch(err => {
        //     message.error('error! please try again.');
        //     this.setState({ removeId: null })
        // })
    }

    showDeleteConfirm() {
        confirm({
            title: 'Are you sure delete this blog?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeBlog(this.state.activeRecord.id)
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: true,
            width: '25%'
        }, {
            title: 'Users',
            dataIndex: 'user',
            key: 'user',
            sorter: true,
            width: '25%'
        }, {
            title: 'Page View',
            dataIndex: 'page_view',
            key: 'page_view',
            sorter: true,
            width: '25%'
        }, {
            title: 'Bounce Rate',
            dataIndex: 'page_view',
            key: 'page_view',
            sorter: true,
            width: '30%'
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
                        <Popconfirm title="Are you sure delete the user?" onConfirm={() => this.removeBlog(record.id)} okText="Yes" cancelText="No">
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
                {/* <AddBlog 
                    fetchBlogs={this.fetchBlogs}
                    visible={this.state.visible}
                    onClose={this.onClose}
                    eventId={params.id}/>
                <EditBlog
                    blog={this.state.activeRecord}
                    hideEditDialog={this.hideEditDialog}
                    visible={this.state.showEditModal}/> */}
                <FilterTable 
                    columns={columns}
                    fetchCount={this.fetchBlogsCount}
                    filterData={this.fetchBlogs}/>
            </div>
        )
    }
}