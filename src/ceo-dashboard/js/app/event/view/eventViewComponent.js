import React from 'react'
import { Layout, Row, Col, Button } from 'antd'
import { Route, Redirect, Switch } from 'react-router-dom'
import Sponsor from './sponsor/sponsors'
import Operation from './operation'
import Marketing from './marketing'
import Production from './production'
import Delegate from './delegate/delegate/delegates'
import GoalSetting from './goalSetting/goalSetting'
import BodyContainer from '../../../common/BodyContainer'
import './eventViewComponent.css'
import EventMenu from './eventMenu/eventMenuComponent'

const { Content } = Layout

export default class EventViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    showModal = () => {
        this.setState({
            visible: true,
        })
    }
    
    render() {
        const {pathname} = this.props.history.location;
        return (
            <BodyContainer title="All Events" containerStyle={{marginTop: '60px'}}>
                <div>
                    <EventMenu match={this.props.match} history={this.props.history}/>
                    <Row type="flex" style={{position: 'absolute', top: '-44px', right: '28px'}}>
                        <Col>
                            <Button className="event-sub-action-btn" onClick={() => this.tabClick(6)} type="primary">Goal Setting</Button>
                        </Col>
                        <Col>
                            <Button className="event-sub-action-btn" style={{backgroundColor: 'forestgreen'}} type="primary">Download</Button>
                        </Col>
                    </Row>
                    {pathname.indexOf('goalSetting') === -1 ? <Content style={{
                        background: '#fff', height: 'calc(100% - 50px)', overflowY: 'auto' 
                    }}>
                        <Switch>
                            <Route path="/events/view/:id/sponsor" component={Sponsor}/>
                            <Route path="/events/view/:id/delegate" component={Delegate}/>
                            <Route path="/events/view/:id/production" component={Production}/>
                            <Route path="/events/view/:id/marketing" component={Marketing}/>
                            <Route path="/events/view/:id/operation" component={Operation}/>
                            <Redirect to="/events/view/:id/sponsor"/>
                        </Switch>
                    </Content>:<GoalSetting/>}
                </div>   
            </BodyContainer>
        )
    }
}