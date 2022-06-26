import React from 'react'
import {Button,Icon,Row,Menu,Layout} from 'antd'
import '../../../common/FilterTable'
import BodyContainer from '../../../common/BodyContainer'
import FilterTable from '../../../common/FilterTable'
import AddSession from './addsession'
import {fetchSessionDays,addSessionDay,deleteSessionDay,getSessions,openGoogleDrive, googleDriveUpload} from '../../api'
import EditSession from './editsession'
import Spin from '../../../common/spin'
// import io from 'socket.io-client'
// const socket = io('http://localhost:3000/custom')
const className='sessions-body-container'
const Sider=Layout
let ID
class Session extends React.Component{
    state = { 
        showAddWindow : false,
        showEditWindow: false,
        uuid: Math.random(),
        activeRecord: null,
        count:null,
        sessionDays:null,
        uuid1:null,
        tokens:null
    }
    componentDidMount=async()=>{
        await this.fetchSessionDays()
        // await this.fetchSessions()
    }
    fetchSessionDays=async()=>{
        await fetchSessionDays(this.props.match.params.agenda_id)
        .then(({sessionDays})=>{
            if(sessionDays){
                this.setState({sessionDays})
            } else{
                //error handeling
            }
        })
    }
    fetchSessions = () => {
        const {match}=this.props
        return getSessions(match.params.agenda_id,ID)
        .then(async(resp) => {
            console.log(resp)
            return resp
        })
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
    uuid1Handler=()=>{
        this.setState({uuid1: Math.random()})
    }
    addSessionDay=async()=>{
        const {agenda_id}=this.props.match.params
        const length=this.state.sessionDays.length
        const string= 'Day'+` ${length+1}`
        const body={session_day:string,agenda_id}
        await addSessionDay(body)
        .then(async(res)=>{
            if(res.message==='Session day created'){
                await this.fetchSessionDays() 
            } else{
                //error handeling
            }
        })
    }
    onSessionDayClick=(id)=>{
        ID=id
    }
    displaySheets=()=>{
        const {sessionDays}=this.state
        return sessionDays ? sessionDays.map((sheet,index)=>{
            return <Menu.Item key={index} onClick={()=>{
                this.uuid1Handler()
                this.onSessionDayClick(sheet.id)
            }}>{sheet.session_day}</Menu.Item>
        }) : []
    }
    deleteSheet=async(sheet_id)=>{
        await deleteSessionDay(sheet_id)
        .then((res)=>{
            if(res.message==='Session day deleted'){
                this.fetchSessionDays()
                this.setState({uuid1:null})
            } else{
                //error handeling
            }
        })
    }
    onDeleteSheet=()=>{
        const {sessionDays}=this.state
        const index=sessionDays.length-1
        const sheet_id=sessionDays[index].id
        this.deleteSheet(sheet_id)
    }
    onGoogleDriveClick=async()=>{
        const url = await openGoogleDrive()
        window.open(url)
        // window.location.href=url
        // socket.on('credentialsSet',async(res)=>{
        //     if(res==='true'){
        //         await googleDriveUpload(this.props.match.params.agenda_id,ID)
        //         .then((res)=>{
        //             if(res.message==='File uploaded'){
        //                 window.location.href='https://drive.google.com/drive/my-drive'
        //             }
        //         })
        //     }
        // }) 
    }
    render(){
        const {uuid1,sessionDays,showEditWindow,activeRecord,showAddWindow}=this.state
        const {agenda_id,event_id}=this.props.match.params
        const {employeeDetails}=this.props
        const columns = [{
            title: 'Timing',
            dataIndex: 'timing',
            key: 'timing',
            sorter: true
        }, {
            title: 'Session',
            dataIndex: 'session_name',
            key: 'session',
            sorter: true
        },{
            title: 'Speaker',
            dataIndex: 'speaker.name',
            key: 'speaker',
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
        }]
        if(!this.state.sessionDays){
            return <Spin/>
        }
        return(
            <BodyContainer title='Agenda Builder' className={className}>
                <Sider style={{paddingRight:'10px',background:'#ffff'}}>
                    <div style={{display:'flex',flexDirection:'row',background:'#ffff'}}>
                        <Button style={{backgroundColor:'#0266FF',border:'none',color:'white'}}
                            onClick={this.addSessionDay}>New Sheet</Button>
                            {!sessionDays[0] ? null
                        : <Button style={{backgroundColor:'rgb(209, 37, 31)',border:'none',marginLeft:'7px',color:'white'}}
                         onClick={this.onDeleteSheet}>Delete Sheet</Button>}
                    </div>
                    <Menu mode="inline">
                        {this.displaySheets()}
                    </Menu>
                </Sider>
                <div className='filtertable-container'>
                    {!uuid1 ? null 
                     :<Button style={{backgroundColor:'#ffff',border:'1px solid #0266FF',color:'#0266FF',borderRadius:'5px'}}
                       onClick={this.onAddClick}>Add session</Button>}
                    <img src='/Googledrive.png' onClick={this.onGoogleDriveClick} 
                     style={{height:'35px',width:'35px',cursor:'pointer',marginLeft:'5px'}}/>

                    {!uuid1 ? null
                    : <FilterTable
                     uuid={this.state.uuid}
                     columns={columns}
                     filterData={this.fetchSessions}
                     fetchCount={this.fetchPartnersCount}
                     uuid1={this.state.uuid1}
                    />}
                </div>
                <AddSession
                 visible={showAddWindow}
                 onClose={this.onAddWindowClose}
                 employeeDetails={employeeDetails}
                 hideWindow={this.hideAddWindow}
                 agenda_id={agenda_id}
                 event_id={event_id}
                 session_day_id={ID}/>
                 <EditSession
                 hideWindow={this.hideEditWindow}
                 onClose={this.onEditWindowClose}
                 session={activeRecord}
                 visible={showEditWindow}
                 employeeDetails={employeeDetails}
                 agenda_id={agenda_id}
                 session_day_id={ID}
                />
            </BodyContainer>
        )
    }
}
export default Session