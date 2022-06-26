import React from 'react'
class AddButton extends React.Component{
    render(){
        return(
            <div style={{border:'none',display:'flex', justifyContent:'flex-end'}}>
                <img src='/Add.png' style={{width:'30px',height:'30px',cursor:'pointer'}} onClick={this.props.onAddClick}/>
            </div>
        )
    }
}
export default AddButton