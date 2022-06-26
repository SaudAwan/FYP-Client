import React from 'react'
import {Modal} from 'antd'
import * as eventApi from './api'
import BodyContainer from '../../common/BodyContainer'
import AddEvent from './addEvent'
import Spin from '../../common/spin'
import List from '../../common/list'
import { showNotification } from '../../../../utils/general'
const confirm = Modal.confirm

export default class EventListComponent extends React.Component {
    state = {
        events:null
    }

    componentDidMount() {
      this.fetchEvents()
    }

    fetchEvents = () => {
        return eventApi.getEvents(this.props.CEODetails.company_id)
        .then(({events}) => {
            if(events){
                this.setState({events})
            } else {
                //error handeling
            }
        })
    }

    viewEvent=(data)=>{
        this.props.history.push('/events/view/'+data.id)
    }

    removeEvent=(id)=>{
        eventApi.removeEvent(id).then(data => {
            this.fetchEvents()
        }).catch(err => {
            console.log(err)
        })
    }

    showRemoveConfirmDialog=(recordId)=>{
        confirm({
            title: 'Are you sure you want delete this event?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.removeEvent(recordId)
            },
            onCancel() {
            }
        });
    }

    copyToClipboard = (event) => {
        navigator.clipboard.writeText(`${window.location.origin}/events/${event.eventKey}/booking`);
        showNotification('Link copied to clipboard successfully!');
    }

    render() {
        const {events}=this.state
        if(!events){
            return <Spin/>
        }
        return (
            <BodyContainer title="Events Management">
                <div>
                    <AddEvent 
                     fetchEvents={this.fetchEvents}
                     company_id={this.props.CEODetails.company_id}
                    />
                    <List data={events} controlHandlers={{onClickLink: this.copyToClipboard}} />
                </div>
            </BodyContainer>
        )
    }
}