import { Mention } from 'antd'
import React from 'react'
import {Menu} from 'antd'
class MenuItem extends React.Component{
    render(){
        const {source,title}=this.props
        return(
                <div className='menuItemWrap'>
                    <img src={source} className='logoStyles'/>
                    <span className='spacer'></span>
                    {title}
                </div>
        )
    }
}
export default MenuItem