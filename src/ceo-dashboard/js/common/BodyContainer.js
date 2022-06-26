import React, { Component } from 'react';
import { Card } from 'antd';

export default class BodyContainer extends Component {
    render() {
        var containerStyle = {}
        if (this.props.containerStyle) {
            containerStyle = {...this.props.containerStyle}
        }
        return (
            <div style={{height:'100%'}}>
                <Card style={{fontWeight: 'bold', fontSize: '20px'}} bodyStyle={{padding: "8px", fontSize: "16px", paddingLeft: "20px"}}>
                    {this.props.title}
                </Card>
                <Card style={{margin: '24px', ...containerStyle}}>
                    <div>
                        {this.props.children}
                    </div>
                </Card>
            </div>
        )
    }
}