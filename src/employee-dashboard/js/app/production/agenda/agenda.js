import React from 'react'
import {Row} from 'antd'
import BodyContainer from '../../../common/BodyContainer'
import FilterTable from '../../../common/FilterTable'
import {getAgendas} from '../../api'
import AddAgenda from './addagenda'
import EditAgenda from './editagenda'
import {Link} from 'react-router-dom'
import AddButton from '../../../common/addButton'
class Agenda extends React.Component{
    state = { 
        showAddWindow : false,
        showEditWindow: false,
        uuid: Math.random(),
        activeRecord: null,
        count:null
    }
    onAddWindowClose = () => {
        this.setState({showAddWindow:false})
    }
    onEditWindowClose = () => {
        this.setState({showEditWindow:false})
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
    onDeleteClick=()=>{
        this.showDeleteConfirm()
    }
    hideEditWindow = setuuid => {
        const obj = {
            showEditWindow: false,
            activeRecord: null
        };
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
    fetchAgendas = () => {
        return getAgendas(this.props.employeeDetails.company_id)
        .then(async(resp) => {
            return resp
        })
    }

    render(){
        const {uuid,showAddWindow,showEditWindow,activeRecord}=this.state
        const {employeeDetails}=this.props
        const statusColors = {
            "active": "#39c379",
            "cancelled": "#FF0000"
        }
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: true,
            render: (text,record)=>{
            return <Link to={`/employee/production/agenda/view/${record.id}/event/${record.event.id}`}>{text}</Link>
            }
        }, {
            title: 'Created By',
            dataIndex: 'user.name',
            key: 'user',
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
                const status = record.status ? record.status.toLowerCase() : ""
                return <div style={{display:'flex'}}><p style={{color: "white", margin: 0, padding: "0 5px", textTransform: "capitalize", paddingBottom: "2px", borderRadius: "12px", fontSize: '13px',fontWeight:'bold', color: statusColors[status]}}>{status}</p></div>
            }
        },{
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <Row style={{width: '45px',display:'flex!important',justifyContent:'space-between!important'}} type="flex" justify="space-around" align="middle">
                    <img src='/Edit.png' style={{height:'20px',width:'20px',cursor:'pointer'}} onClick={()=>{
                        this.onEditClick(record)
                    }}/>
                    <img src='/Delete.png' style={{height:'20px',width:'20px',cursor:'pointer'}} onClick={this.onDeleteClick}/>
                </Row>
            )
        }]
        return(
            <BodyContainer title='Agenda Builder'>
                <div>
                    <AddButton onAddClick={this.onAddClick}/>
                    <AddAgenda
                     visible={showAddWindow}
                     onClose={this.onAddWindowClose}
                     employeeDetails={employeeDetails}
                     hideWindow={this.hideAddWindow}
                     />
                    <FilterTable
                     uuid={uuid}
                     columns={columns}
                     filterData={this.fetchAgendas}
                     fetchCount={this.fetchPartnersCount}/>
                    <EditAgenda
                     visible={showEditWindow}
                     onClose={this.onEditWindowClose}
                     agenda={activeRecord}
                     hideWindow={this.hideEditWindow}
                     employeeDetails={employeeDetails}
                    />
                </div>
            </BodyContainer>
        )
    }
}
export default Agenda