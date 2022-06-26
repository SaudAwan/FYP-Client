import React from 'react'
import { Route } from 'react-router-dom'
import EventListComponent from './eventListComponent'
import EventViewComponent from './view/eventViewComponent'

class EventComponent extends React.Component{
    render(){
        return(
            <div style={{height: '100%'}}>
                <Route path="/events/list" render= { (props) => <EventListComponent {...props} CEODetails={this.props.CEODetails}/>}/>
                <Route path="/events/view/:id" component={EventViewComponent}/>
            </div>
        )
    }
}

export default EventComponent