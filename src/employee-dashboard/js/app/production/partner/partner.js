import React from 'react';
import {Row} from 'antd';
import BodyContainer from '../../../common/BodyContainer';
import FilterTable from '../../../common/FilterTable';
import AddPartner from './addPartner'
import {getPartners} from '../../api'
import EditPartner from './editPartner'
import AddButton from '../../../common/addButton'

class Partner extends React.Component{
    state = {
        showAddWindow : false,
        showEditWindow: false,
        uuid: Math.random(),
        activeRecord: null
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
    onDeleteClick=()=>{
        this.showDeleteConfirm()
    }

    fetchPartners = () => {
        return getPartners(this.props.employeeDetails.company_id)
        .then(async(resp) => {
            console.log(resp)
            return resp
        })
    }
    render(){
        const {showAddWindow,showEditWindow,activeRecord,uuid}=this.state
        const {employeeDetails}=this.props
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: true
        },{
            title: 'Contact',
            dataIndex: 'contact_number',
            key: 'contact_number',
            sorter: true
        },{
            title: 'Company',
            dataIndex: 'partner_company',
            key: 'partner_company',
            sorter: true
        },{
            title: 'Event',
            dataIndex: 'event.name',
            key: 'event',
            sorter: true
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
        }];
        return(
            <BodyContainer title='Partner Management'>
                <div>
                    <AddButton onAddClick={this.onAddClick}/>
                    <AddPartner
                     visible={showAddWindow}
                     onClose={this.onAddWindowClose}
                     employeeDetails={employeeDetails}
                     hideWindow={this.hideAddWindow}/>
                    <FilterTable
                     uuid={uuid}
                     columns={columns}
                     filterData={this.fetchPartners}
                     fetchCount={this.fetchPartnersCount}/>
                    <EditPartner
                     hideWindow={this.hideEditWindow}
                     partner={activeRecord}
                     visible={this.state.showEditWindow}
                     onClose={this.onEditWindowClose}
                     employeeDetails={employeeDetails}
                    />
                </div>
            </BodyContainer>
        )
    }
}
export default Partner