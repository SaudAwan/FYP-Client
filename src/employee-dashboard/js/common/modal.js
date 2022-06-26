import React from 'react'
import {Modal} from 'antd'
class MainModal extends React.Component{
    render(){
        const {visible,handleOk,handleCancel,title,description}=this.props
        return(
            <Modal
             title={`${title}`}
             visible={visible}
             onOk={handleOk}
             onCancel={handleCancel}
             centered={true}
            >
                <p>{description}</p>
        </Modal>
        )
    }
}
export default MainModal