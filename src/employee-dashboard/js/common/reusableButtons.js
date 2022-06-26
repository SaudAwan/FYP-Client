import React from 'react'
import {Button} from 'antd'
class ReusableButtons extends React.Component{
    render(){
        const {buttonText,clickEventHandler,onClose}=this.props
        return(
            <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right'
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8, background:'#d1251f',border:'none',color:'white'}}>
                        Cancel
                    </Button>
                    <Button onClick={(ev) => clickEventHandler(ev)} style={{background:'#39C379',border:'none',color:'white'}}>
                        {buttonText}
                    </Button>
                </div>
        )
    }
}
export default ReusableButtons