import React from 'react'
import {Drawer, message, Form, Col, Row, Input, Select} from 'antd'
import ReusableButtons from '../../../common/reusableButtons'
import {addAgenda,getEmployeeEvents} from '../../api'
class AddAgenda extends React.Component{
    state={
        status: null,
        employeeEvents: null
    }

    componentDidMount=async()=>{
        await getEmployeeEvents(this.props.employeeDetails.id)
        .then(({events})=>{
            if(events){
                this.setState({employeeEvents: events})
            } else{
                //error handeling
            }
        })
    }

    addAgenda=(e)=>{
        const{company_id,id}=this.props.employeeDetails
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const event_id=JSON.parse(id)
                const {title,status}=values
                const data={title,status,event_id,created_by:id,company_id}
                addAgenda(data)
                .then((resp) => {
                    console.log(resp)
                    if(resp.message==='Agenda created'){
                        message.success('Agenda added successfully')
                        this.props.hideWindow(1)
                    } else{
                        //error handeling
                    }
                })
                setTimeout(() => {
                    this.props.form.resetFields()
                }, 0)
            }
        });
    }

    options=()=>{
        const {employeeEvents}=this.state
        return employeeEvents ? employeeEvents.map((val,index)=>{
            return <Select.Option value={JSON.stringify(val.id)} key={index}>{val.name}</Select.Option>
        }) : []
    }
    
    render(){
        const {visible,onClose}=this.props
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        return(
            <Drawer 
                title="Add Agenda"
                width={600}
                className="sivakrishna"
                bodyStyle={{height: 'calc(100% - 108px)', overflowY: 'auto'}}
                onClose={onClose}
                visible={visible}
            >
                <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                    <Col gutter={16}>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Title">
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: 'Please enter the title' }],
                                })((<Input />))}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Status">
                                {getFieldDecorator('status', {
                                    rules: [{ required: true, message: 'Please select the status' }],
                                })(
                                    <Select>
                                        <Select.Option value="Active">Active</Select.Option>
                                        <Select.Option value="Cancelled">Cancelled</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Event">
                                {getFieldDecorator('event', {
                                    rules: [{ required: true, message: 'Please select the event' }],
                                })(
                                    <Select>
                                        {this.options()}
                                    </Select>
                                )}
                            </Form.Item>
                        </Row>
                    </Col>
                </Form>
                <ReusableButtons buttonText='Create' clickEventHandler={this.addAgenda} onClose={onClose}/>
            </Drawer>
        )
    }
}
AddAgenda = Form.create()(AddAgenda)

export default AddAgenda