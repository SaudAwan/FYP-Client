import React, { Component } from "react";
import { Spinner } from "../../../../common";
import BodyContainer from "../../common/BodyContainer";


export default class Rewards extends Component {
    state = {
        loading: false
    }
    render() {
        return (
            <BodyContainer title="Dashboard">
            {this.state.loading  && <Spinner/>}
          </BodyContainer>
        )
    }
}