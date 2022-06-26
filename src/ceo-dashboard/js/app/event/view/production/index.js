import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Speaker from './speaker/speaker';
import Assosciation from './assosciation/assosciation';

export default class Production extends React.Component {
    render() {
        console.log(this.props.match)
        return (
            <div>
                <Route path="/event/view/:id/production/speaker" component={Speaker}/>
                <Route path="/event/view/:id/production/assosciation" component={Assosciation}/>
            </div>
        );
    }
}