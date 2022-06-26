import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Speaker from './speaker/speaker';
import Assosciation from './assosciation/assosciation';
import Partner from './partner/partner'
import Agenda from './agenda/agenda'
import Session from './agenda/session'
export default class Production extends React.Component {
    render() {
        const {employeeDetails}=this.props
        return (
            <div className='secondary-routes-container'>
                <Route path="/employee/production/speaker" 
                 render= { (props) => <Speaker {...props} employeeDetails={employeeDetails}/>}/>

                <Route path="/employee/production/assosciation" component={Assosciation}/>

                <Route path="/employee/production/partner"
                 render= { (props) => <Partner {...props} employeeDetails={employeeDetails}/>}/>

                <Route path="/employee/production/agenda" exact
                 render= { (props) => <Agenda {...props} employeeDetails={employeeDetails}/>}/>

                <Route path="/employee/production/agenda/view/:agenda_id/event/:event_id"
                 render= { (props) => <Session {...props} employeeDetails={employeeDetails}/>}/>
            </div>
        );
    }
}