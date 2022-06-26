import React from 'react'
import {Spin} from 'antd'
class MainSpin extends React.Component{
    render(){
        return(
            <div style={{display:'flex',height:'100%',justifyContent:'center',alignItems:'center'}}>
                <Spin/>
            </div>
        )
    }
}
export default MainSpin