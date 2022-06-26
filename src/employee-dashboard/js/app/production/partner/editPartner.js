import React from 'react'
import {message, Form, Col, Row, Input, Select, Drawer} from 'antd'
  import ReusableButtons from '../../../common/reusableButtons'
import {updatePartner,getEmployeeEvents} from '../../api'
class EditPartner extends React.Component{
    state={
        visible: false,
        employeeEvents: null
    }

    componentDidMount(){
        this.getEmployeeEvents()
    }

    getEmployeeEvents=async(e)=>{
        await getEmployeeEvents(this.props.employeeDetails.id)
        .then(({events})=>{
            if(events){
                this.setState({employeeEvents: events})
            } else{
                //error handeling
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.partner && nextProps.partner) {
            const {name,email,contact_number,partner_company,event} = nextProps.partner
            var obj = {
                name,
                email,
                contact_number,
                event: JSON.stringify(event),
                partner_company,
            };
            nextProps.form.setFieldsValue(obj)
        }
    }

    handleOk=(e)=>{
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                updatePartner(values,this.props.partner.id)
                .then((resp) => {
                   if(resp.message==='Partner updated'){
                    message.success('Partner updated successfully')
                    this.props.hideWindow(1)
                   } else{
                       //error handeling
                   }
                })
            }
        })
    }

    options=()=>{
        const {employeeEvents}=this.state
        return employeeEvents ? employeeEvents.map((val,index)=>{
            return <Select.Option value={JSON.stringify(val)} key={index}>{val.name}</Select.Option>
        }) : []
    }

    render(){
        const {visible,onClose} = this.props
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
                title="Edit Partner"
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
                <ReusableButtons buttonText='Save changes' clickEventHandler={this.handleOk} onClose={onClose}/>
            </Drawer>
        )
    }
}

export default Form.create()(EditPartner)