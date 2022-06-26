import React from 'react'
import * as teamApi from './api'
import {Drawer,Table} from 'antd'
import Spin from '../../common/spin'
class ViewTeam extends React.Component{
    state={
        teamUsers:null
    }
    componentDidUpdate=(prevProps)=>{
        if(prevProps.team_id!==this.props.team_id){
        const {team_id}=this.props
        this.fetchTeamUsers(team_id)
        }
        
    }

    fetchTeamUsers=async(team_id)=>{
        await teamApi.getTeamUsers(team_id)
        .then(({teamUsers})=>{
            if(teamUsers){
                console.log(teamUsers)
                this.setState({teamUsers})
            } else {
                //error handeling
            }
        })
        
    }

    // displayTeamUsers=()=>{
    //     return this.state.teamUsers.map((el,index) => {
    //         return (
    //             <Col style={{margin: '0 4px'}} key={index}>
    //                 <p className="ev-team-user-tag" style={{background:'white',color: '#272727'}}>{el.name}</p>
    //             </Col>
    //         )
    //     })
    // }
    render(){
        const columns=[
            {title: 'Role', dataIndex:'team_role.name',key:'team_role.id'},
            {title: 'Member', dataIndex:'user.name',key:'user.id'}
        ]
        const {onClose,visible,team_name}=this.props
        return(
            <Drawer
                title={`${team_name}`}
                width={520}
                bodyStyle={{height: '100%', overflowY: 'auto'}}
                onClose={onClose}
                visible={visible}
                className='viewTeamDrawer'
            >
                <Table
                 columns={columns}
                 dataSource={this.state.teamUsers}
                 pagination={false}
                />
            </Drawer>
        )
    }
}
export default ViewTeam