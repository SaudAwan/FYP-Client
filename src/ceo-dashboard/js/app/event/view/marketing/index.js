import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Blog from './blog/blog';
import Website from './website/website';
import MediaPartner from './media-partner/mediaPartner';

export default class Marketing extends React.Component {
    render() {
        console.log(this.props.match)
        return (
            <div>
                <Route path="/event/view/:id/marketing/blog" component={Blog}/>
                <Route path="/event/view/:id/marketing/website" component={Website}/>
                <Route path="/event/view/:id/marketing/media-partner" component={MediaPartner}/>
            </div>
        );
    }
}