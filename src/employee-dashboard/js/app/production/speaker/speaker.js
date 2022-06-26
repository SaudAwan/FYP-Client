import React from 'react'
import { Row, Modal, message } from 'antd'
import {getSpeakers, removeSpeaker} from '../../api'
import FilterTable from '../../../common/FilterTable'
import AddSpeaker from './addSpeaker'
import EditSpeaker from './editSpeaker'
import BodyContainer from '../../../common/BodyContainer'
import AddButton from '../../../common/addButton'

const confirm = Modal.confirm

export default class Speaker extends React.Component {
    state = { 
        showAddWindow : false,
        showEditWindow: false,
        uuid: Math.random(),
        activeRecord: null,
        enabledTravelStay:false
    }
    fetchSpeakers = () => {
        return getSpeakers(this.props.employeeDetails.company_id)
        .then(async(resp) => {
            return resp
        })
    }
    removeSpeaker = (id) => {
        this.setState({ removeId: id })
        removeSpeaker(id).then(data => {
            this.fetchSpeakers();
            message.success('speaker removed successfully')
            this.setState({ removeId: null })
        }).catch(err => {
            message.error('error! please try again.')
            this.setState({ removeId: null })
        })
    }
    showDeleteConfirm=()=>{
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
        })
    }
    onDeleteClick=()=>{
        this.showDeleteConfirm()
    }
    onAddWindowClose = () => {
        this.setState({showAddWindow:false})
    }
    onEditWindowClose = () => {
        this.setState({showEditWindow:false,activeRecord:null})
        this.enabledTravelStayFunction(false)
    }
    enabledTravelStayFunction=(data)=>{
        this.setState({enabledTravelStay:data})
    }
    onAddClick = () => {
        this.setState({
            showAddWindow: true,
        })
    }
    onEditClick=(activeRecord)=>{
        this.setState({
            showEditWindow: true,
            activeRecord
        })
    }
    hideEditWindow = setuuid => {
        const obj = {
            showEditWindow: false,
            activeRecord: null
        }
        if (setuuid) {
            obj.uuid = Math.random()
        }
        this.setState(obj)
    }
    hideAddWindow = setuuid => {
        const obj = {
            showAddWindow: false,
        }
        if (setuuid) {
            obj.uuid = Math.random()
        }
        this.setState(obj)
    }
    render() {
        const {employeeDetails}=this.props
        const {showEditWindow,showAddWindow,activeRecord,uuid,enabledTravelStay}=this.state
        const statusColors = {
            "confirmed": "#39c379",
            "negotiation": "#ef8a46",
            "approached": "#FFD700",
            "onhold": "#465def",
            "cancelled": "#a8a8a8"
        }
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        }, {
            title: 'Company',
            dataIndex: 'speaker_company',
            key: 'company',
            sorter: true
        }, {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            sorter: true
        }, {
            title: 'Contact',
            dataIndex: 'contact_number',
            key: 'contact_number',
            sorter: true
        },{
            title: 'Event',
            dataIndex: 'event.name',
            key: 'event',
            sorter: true
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            render: (text, record, index) => {
                const status = record.status ? record.status.toLowerCase() : "";
                return <div style={{display:'flex'}}><p style={{color: "white", margin: 0, padding: "0 5px", textTransform: "capitalize", paddingBottom: "2px", borderRadius: "12px", fontSize: '13px',fontWeight:'bold', color: statusColors[status]}}>{status}</p></div>;
            }
        }, {
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <Row style={{width: '45px',display:'flex!important',justifyContent:'space-between!important'}} type="flex" justify="space-around" align="middle">
                    <img src='/Edit.png' style={{height:'20px',width:'20px',cursor:'pointer'}} onClick={()=>{
                        this.onEditClick(record)
                    }}/>
                    <img src='/Delete.png' style={{height:'20px',width:'20px',cursor:'pointer'}} onClick={this.onDeleteClick}/>
                    {/* <Col span={12}>
                        <Button onClick={() => this.edit(record)} style={{ padding: '0 4px', height: '30px' }}><Icon type="edit" /></Button>
                    </Col>
                    <Col span={12}>
                        <Popconfirm title="Are you sure delete the user?" onConfirm={() => this.removeSpeaker(record.id)} okText="Yes" cancelText="No">
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
        }]
        return (
            <BodyContainer title="Speaker Management">
                <div>
                    <AddButton onAddClick={this.onAddClick}/>
                    <AddSpeaker 
                        hideWindow={this.hideAddWindow}
                        visible={showAddWindow}
                        onClose={this.onAddWindowClose}
                        employeeDetails={employeeDetails}/>
                    <FilterTable
                        uuid={uuid}
                        columns={columns}
                        filterData={this.fetchSpeakers}/>
                     <EditSpeaker
                        speaker={activeRecord}
                        hideWindow={this.hideEditWindow}
                        visible={showEditWindow}
                        onClose={this.onEditWindowClose}
                        employeeDetails={employeeDetails}
                        enabledTravelStay={enabledTravelStay}
                        enabledTravelStayFunction={this.enabledTravelStayFunction}/>
                </div>
            </BodyContainer>
        )
    }
}