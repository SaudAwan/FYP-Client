import React from 'react';
import {Route} from 'react-router-dom';
import Blog from './blog/blog';
import Website from './website/website';
import MediaPartner from './media-partner/mediaPartner';
import Emails from './emails';
export default class Marketing extends React.Component {
    render() {
        return (
            <div>
                <Route path="/employee/marketing/emails" component={Emails}/>
                <Route path="/event/view/:id/marketing/blog" component={Blog}/>
                <Route path="/event/view/:id/marketing/website" component={Website}/>
                <Route path="/event/view/:id/marketing/media-partner" component={MediaPartner}/>
            </div>
        );
    }
}