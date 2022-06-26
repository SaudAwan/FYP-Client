import React from 'react'
import { Route } from 'react-router-dom'
import Team from './team'

class TeamRouter extends React.Component{
    render(){
        return(
            <div style={{height: '100%'}}>
                <Route path="/teams" render= { (props) => <Team {...props} CEODetails={this.props.CEODetails}/>}/>
            </div>
        )
    }
}
export default TeamRouter;