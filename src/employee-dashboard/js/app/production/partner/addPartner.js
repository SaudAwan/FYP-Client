import React from 'react'
import {Drawer, message, Form, Col, Row, Input, Select} from 'antd'
import {addPartner,getEmployeeEvents} from '../../api'
import ReusableButtons from '../../../common/reusableButtons'
class AddPartner extends React.Component{
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
    addPartner=(e)=>{
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {name,email,contact_number,partner_company,event}=values
                const data={
                    name,email,contact_number,partner_company,event_id:event,company_id:this.props.employeeDetails.company_id
                }
                addPartner(data)
                .then((resp) => {
                   if(resp.message==='Partner created'){
                        message.success('Partner added successfully')
                        this.props.hideWindow(1)
                   } else {
                       //error handeling
                   }
                })
                // setTimeout(() => {
                //     this.props.form.resetFields()
                // }, 0)
            }
        })
    }

    options=(e)=>{
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
        return (
            <Drawer 
                title="Add Partner"
                width={600}
                className="sivakrishna"
                bodyStyle={{height: 'calc(100% - 108px)', overflowY: 'auto'}}
                onClose={onClose}
                visible={visible}
            >
                <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                    <Col gutter={16}>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Name">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please enter the name' }],
                                })((<Input />))}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Email">
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please enter the email' }],
                                })(<Input />)}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Contact">
                                {getFieldDecorator('contact_number', {
                                    rules: [{ required: true, message: 'Please enter the designation' }],
                                })(
                                    <Input style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Company">
                                {getFieldDecorator('partner_company', {
                                    rules: [{ required: true, message: 'Please enter the company name' }],
                                })(
                                    <Input style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Event">
                                {getFieldDecorator('event', {
                                    rules: [{ required: true, message: 'Please enter the event name' }],
                                })(
                                    <Select>
                                        {this.options()}
                                    </Select>
                                )}
                            </Form.Item>
                        </Row>
                    </Col>
                </Form>
                <ReusableButtons buttonText='Create' clickEventHandler={this.addPartner} onClose={onClose}/>
            </Drawer>
        )
    }
}

AddPartner = Form.create()(AddPartner)

export default AddPartner