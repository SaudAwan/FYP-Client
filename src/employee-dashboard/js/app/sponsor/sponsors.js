import React from 'react';
import { Button, Icon, Row, Modal, message, Menu, Dropdown } from 'antd';

import {getEventSponsorsCount, getEventSponsors, removeSponsor} from '../api'
import FilterTable from '../../common/FilterTable';
import AddSponsor from './addSponsor';
import EditSponsor from './editSponsor';
import BodyContainer from '../../common/BodyContainer';

const confirm = Modal.confirm;

export default class Sponsor extends React.Component {
    state={ 
        visible : false,
        showEditModal: false,
        sponsorsCount: 0,
        uuid: Math.random()
    }

    fetchSponsorsCount = (payload) => {
        const {params} = this.props.match;
        var query = '?event_id=' + params.id;
        if (payload && typeof payload === 'object') {
            query += '&searchText=' + payload.searchText;
        }
        return getEventSponsorsCount(query)
        .then(resp => {
            return resp
        })
    }

    fetchSponsors = (payload) => {
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
        return getEventSponsors(query)
        .then(resp => {
            return resp.json();
        })
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    }
  
    onClose = (setuuid) => {
        const obj = {
            visible: false,
        }
        if (setuuid) {
            obj.uuid = Math.random();
        }
        this.setState(obj);
    }

    removeSponsor = (id) => {
        this.setState({ removeId: id })
        removeSponsor(id).then(data => {
            this.fetchSponsors();
            message.success('sponsor removed successfully');
            this.setState({ removeId: null })
        }).catch(err => {
            message.error('error! please try again.');
            this.setState({ removeId: null })
        })
    }

    showDeleteConfirm=()=>{
        confirm({
            title: 'Are you sure delete this sponsor?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeSponsor(this.state.activeRecord.id)
            },
            onCancel() {
            }
        });
    }

    handleMenuClick=(e, record)=>{
        if (e.key === "1") {
            this.setState({
                showEditModal: true,
                activeRecord: record
            })
        } else if (e.key === "2") {
            this.showDeleteConfirm();
        }
    }

    handleButtonClick=(record)=>{
        this.setState({
            activeRecord: record
        })
    }
    
    hideEditDialog = (setuuid) => {
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
        const {params} = this.props.match
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
            width: '30%'
        }, {
            title: 'Company',
            dataIndex: 'sponsor_company',
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
            width: '35%'
        }, {
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <Row style={{width: '80px'}} type="flex" justify="space-around" align="middle">
                    <Dropdown onClick={() => this.handleButtonClick(record)} overlay={menu(record)} placement="bottomLeft">
                        <Button style={{padding: 0}}><Icon type="more" style={{fontSize: '18px'}} /></Button>
                    </Dropdown>
                    {/*  */}
                    {/* <Col span={12}>
                        <Button onClick={() => this.edit(record)} style={{ padding: '0 4px', height: '30px' }}><Icon type="edit" /></Button>
                    </Col>
                    <Col span={12}>
                        <Popconfirm title="Are you sure delete the user?" onConfirm={() => this.removeSponsor(record.id)} okText="Yes" cancelText="No">
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
            <BodyContainer title="Sponsor Management">
                <div>
                    <div style={{position: 'absolute', top: 0, right: 0, display: 'inline-block', zIndex: '10'}}>
                        {/* <Button style={{marginRight: '15px'}}>upload</Button> */}
                        <Button style={{background: 'rgb(70, 93, 239)'}} type="primary" onClick={this.showDrawer} shape="circle" icon="plus" />
                    </div>
                    <AddSponsor 
                        fetchSponsors={this.fetchSponsors}
                        visible={this.state.visible}
                        onClose={this.onClose}
                        eventId={params.id}/>
                    <EditSponsor
                        sponsor={this.state.activeRecord}
                        hideEditDialog={this.hideEditDialog}
                        visible={this.state.showEditModal}/>
                    <FilterTable 
                        uuid={this.state.uuid}
                        columns={columns}
                        fetchCount={this.fetchSponsorsCount}
                        filterData={this.fetchSponsors}/>
                </div>
            </BodyContainer>
        )
    }
}