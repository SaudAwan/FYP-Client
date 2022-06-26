import React from 'react';
import {Route} from 'react-router-dom';
import Inventory from './inventory/inventory';
import Ticket from './ticket/ticket';
import Vendor from './vendor/vendor';
import Venue from './venue/venue';

export default class Operation extends React.Component {
    render() {
        return (
            <div>
                <Route path="/event/view/:id/operation/venue" component={Venue}/>
                <Route path="/event/view/:id/operation/ticket" component={Ticket}/>
                <Route path="/event/view/:id/operation/inventory" component={Inventory}/>
                <Route path="/event/view/:id/operation/vendor" component={Vendor}/>
            </div>
        );
    }
}