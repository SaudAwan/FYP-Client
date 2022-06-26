import React from 'react'
import {message, Form, Col, Row, Input, Select,Drawer} from 'antd'
import {updateAgenda,getAgendas,getEmployeeEvents} from '../../api'
import ReusableButtons from '../../../common/reusableButtons'
class EditAgenda extends React.Component{
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

    handleOk=(e)=>{
        const {agenda,employeeDetails}=this.props
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {title,status,event}=values
                const parsedEvent=JSON.parse(event)
                const data={title,status,event_id:parsedEvent.id,created_by:employeeDetails.id,company_id:employeeDetails.company_id}
                updateAgenda(data,agenda.id)
                .then(() => {
                    message.success('Agenda updated successfully')
                    this.props.hideWindow(1)
                })
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.agenda && nextProps.agenda) {
            const {title,status,event} = nextProps.agenda
            var obj = {
                title,
                status,
                event: JSON.stringify(event)
            };
            nextProps.form.setFieldsValue(obj)
        }
    }

    options=()=>{
        const {employeeEvents}=this.state
        return employeeEvents ? employeeEvents.map((val,index)=>{
            return <Select.Option value={JSON.stringify(val)} key={index}>{val.name}</Select.Option>
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
                title="Edit Agenda"
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
                <ReusableButtons buttonText='Save changes' clickEventHandler={this.handleOk} onClose={onClose}/>
            </Drawer>
        )
    }
}

export default Form.create()(EditAgenda);