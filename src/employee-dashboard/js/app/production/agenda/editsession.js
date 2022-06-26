import React from 'react'
import {Drawer, message, Form, Col, Row, Input, Select} from 'antd'
import ReusableButtons from '../../../common/reusableButtons'
import {fetchEventSpeakers,editSession} from '../../api'
class EditSession extends React.Component{
    state={
        visible: false,
        eventSpeakers: null
    }

    componentDidMount=async()=>{
        await fetchEventSpeakers(this.props.agenda_id)
        .then(({speakers})=>{
            if(speakers){
                this.setState({eventSpeakers: speakers})
            } else{
                //error handeling
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.session && nextProps.session) {
            const {timing,session_name,speaker} = nextProps.session
            var obj = {
                timing,
                session_name,
                // speaker: JSON.stringify(speaker)
            }
            nextProps.form.setFieldsValue(obj)
        }
    }

    handleOk=(e)=>{
        const {session_day_id}=this.props
        const agenda_id=JSON.parse(this.props.agenda_id)
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {timing,session_name}=values
                const data={timing,session_name,agenda_id,session_day_id}
                editSession(data,this.props.session.id)
                .then((resp) => {
                    if(resp.message==='Session updated'){
                        message.success('Session updated successfully')
                        this.props.hideWindow(1)
                    } else{
                        //error handeling
                    }
                })
            }
        });
    }

    options=()=>{
        const {eventSpeakers}=this.state
        return eventSpeakers ? eventSpeakers.map((val,index)=>{
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
                title="Edit Session"
                width={520}
                className="sivakrishna"
                bodyStyle={{height: 'calc(100% - 108px)', overflowY: 'auto'}}
                onClose={onClose}
                visible={visible}
            >
                <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                    <Col gutter={16}>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Timing">
                                {getFieldDecorator('timing', {
                                    rules: [{ required: true, message: 'Please enter the timings' }],
                                })((<Input />))}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Session">
                                {getFieldDecorator('session_name', {
                                    rules: [{ required: true, message: 'Please select the status' }],
                                })(<Input/>)}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Speaker">
                                {getFieldDecorator('speaker', {
                                    rules: [{ required: true, message: 'Please select a speaker' }],
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

export default Form.create()(EditSession)