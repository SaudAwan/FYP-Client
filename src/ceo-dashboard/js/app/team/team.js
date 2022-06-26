import React from 'react'
import AddTeamComponent from './addTeam'
import * as teamApi from './api'
import BodyContainer from '../../common/BodyContainer'
import Spin from '../../common/spin'
import List from '../../common/list'
import ViewTeam from './viewTeam'
export default class TeamListComponent extends React.PureComponent {
    state={
        viewTeamDrawer:null,
        teams:null,
        team_id:null,
        team_name:null
    }

    componentDidMount(){
        this.fetchTeams()
    }

    fetchTeams=()=>{
        return teamApi.getTeams(this.props.CEODetails.company_id)
        .then((res)=>{
            this.setState({teams:res.teams})
        })
    }

    showModal=()=>{
        this.setState({
          visible: true,
        })
    }

    showViewTeamDrawer=(team_id,team_name)=>{
        this.setState({viewTeamDrawer:true,team_id,team_name,})
    }

    closeViewTeamDrawer=()=>{
        this.setState({viewTeamDrawer:null,team_id:null})
    }
    
    render() {
        const {userRecord,teams,viewTeamDrawer,team_id,team_name}=this.state
        if (!teams) {
            return <Spin/>
        }
        return (
            <BodyContainer title="Team Management">
                <div>
                    <AddTeamComponent
                     userRecord={userRecord} 
                     CEODetails={this.props.CEODetails}
                     fetchTeams={this.fetchTeams}
                    />
                    <List
                     data={teams} 
                     team='team' 
                     showViewTeamDrawer={this.showViewTeamDrawer}
                    />
                    <ViewTeam
                     visible={viewTeamDrawer} 
                     onClose={this.closeViewTeamDrawer} 
                     team_id={team_id}
                     team_name={team_name}
                    />
                </div>
            </BodyContainer>
        )
    }
}