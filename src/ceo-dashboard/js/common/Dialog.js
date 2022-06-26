import React from 'react';
import { Modal, Button } from 'antd';

export default class Dialog extends React.Component {
  render() {
    return (
      <Modal
        title={this.props.dialogTitle}
        visible={this.props.visible}
        footer={null}
      >
          {this.props.children}
      </Modal>
    );
  }
}