import React from 'react'
import { Layout, Col, Row,message} from 'antd'
import Registration from './registration'
import * as userApi from './api'
import FilterTable from '../../common/FilterTable'
import BodyContainer from '../../common/BodyContainer'
import AddButton from '../../common/addButton'
import Modal from '../../common/modal'
const {Content} = Layout
const info = (msg) => {
    message.success(msg)
}

export default class User extends React.Component {
    state={
        visible:false,
        userRecord:null,
        button:'',
        uuid:null,
        deleteItemId:null,
        modalVisible:null,
        users:null
    }

    fetchUsers=async()=>{
        return await userApi.getUsers(this.props.CEODetails.company_id)
        .then(resp => {
            return resp
        })
    }

    showDrawer = () => {
        this.setState({
          visible: true,
          button:'Create'
        })
    }

    handleDrawerOk=()=>{
        this.setState({
            visible: false,
            uuid:Math.random()
        })
    }

    handleModalOk=async()=>{
        await userApi.removeUser(this.state.deleteItemId)
        .then((res)=>{
            if(res.message==='Employee deleted'){
                this.onCloseModal()
                info('Employee deleted')
                this.setState({uuid:Math.random()})
            }
        })
    }

    onDeleteClick=(id)=>{
        this.setState({
            modalVisible:true,
            deleteItemId:id
        })
    }

    onCloseDrawer = () => {
        this.setState({
            visible: false,
            userRecord:null
        })
    }

    onCloseModal=()=>{
        this.setState({
            modalVisible: false
        })
    }

    editUser = (record) => {
        this.setState({
            userRecord: record,
            visible: true,
            button:'Save changes'
        })
    }

    removeUser = id => {
        this.setState({
            removeId: id
        })
        userApi.removeUser(id).then(() => {
            this.setState({
                removeId: null
            })
            this.fetchUsers()
        }).catch(err => {
            console.log(err)
            this.setState({
                removeId: null
            })
        })
    }

    render() {
        const{button,userRecord,visible,uuid,modalVisible}=this.state
        const {company_id}=this.props.CEODetails
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
        }, {
            title: 'Contact',
            dataIndex: 'phone_number',
            key: 'phone_number',
            sorter: true,
        },
         {
            title: 'Role',
            dataIndex: 'user_role',
            key: 'role',
            sorter: true,
        },
         {
            title: 'Points',
            dataIndex: 'points',
            key: 'points',
            sorter: true,
        }, {
            title: 'Action',
            key: 'render',
            render: (text, record, index) => (
                <Row  style={{width: '80px',display:'flex!important',justifyContent:'space-between!important'}}type="flex" justify="start" align="middle">
                    <Col span={12}>
                        <img src='/Edit.png' style={{height:'20px',width:'20px',cursor:'pointer'}} onClick={()=>{
                            this.editUser(record)
                        }}/>
                        <img src='/Delete.png' style={{height:'20px',width:'20px',cursor:'pointer'}} onClick={()=>{
                            this.onDeleteClick(record.id)
                        }}/>
                    </Col>
                </Row>
            )
        }]
        return (
            <BodyContainer title={"Employee Management"} showModal={this.showModal}>
                <Content style={{background: '#fff', minHeight: 300}}>
                    <div style={{border:'none',display:'flex', justifyContent:'flex-end'}}>
                        <AddButton onAddClick={this.showDrawer}/>
                    </div>
                    <FilterTable 
                     uuid={uuid}
                     columns={columns}
                     filterData={this.fetchUsers}
                     company_id={company_id}/>
                    <Registration
                     onClose={this.onCloseDrawer}
                     userRecord={userRecord}
                     handleOk={this.handleDrawerOk}
                     visible={visible}
                     button={button}
                     company_id={company_id}/>
                    <Modal
                     visible={modalVisible}
                     handleCancel={this.onCloseModal} 
                     handleOk={this.handleModalOk}  
                     title='Delete Employee'
                     description='Are you sure you want to delete this employee'
                    />
                </Content>
            </BodyContainer>
        )
    }
}