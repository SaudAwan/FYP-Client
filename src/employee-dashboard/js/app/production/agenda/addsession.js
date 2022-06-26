import React from 'react'
import {Drawer, message, Form, Col, Row, Input, Select} from 'antd'
import ReusableButtons from '../../../common/reusableButtons'
import {fetchEventSpeakers,addSession} from '../../api'
class AddSession extends React.Component{
    state={
        status: null,
        eventSpeakers: null
    }

    componentDidMount=async()=>{
        await fetchEventSpeakers(this.props.event_id)
        .then(({speakers})=>{
            if(speakers){
                this.setState({eventSpeakers: speakers})
            } else{
                //error handeling
            }
        })
    }

    addSession=(e)=>{
        const {session_day_id}=this.props
        const agenda_id=JSON.parse(this.props.agenda_id)
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {timing,session_name,speaker}=values
                const parsedSpeaker=JSON.parse(speaker)
                const data={timing,session_name,speaker_id:parsedSpeaker.id,session_day_id,agenda_id}
                addSession(data)
                .then((resp)=>{
                    if(resp.message==='Session created'){
                        message.success('Session added successfully')
                        this.props.hideWindow(1)
                    } else{
                        //error handeling
                    }
                })
                setTimeout(() => {
                    this.props.form.resetFields()
                }, 0)
            }
        })
    }

    options=()=>{
        const {eventSpeakers}=this.state
        return eventSpeakers ? eventSpeakers.map((val,index)=>{
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
                title="Add Session"
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
                <ReusableButtons buttonText='Create' clickEventHandler={this.addSession} onClose={onClose}/>
            </Drawer>
        )
    }
}

AddSession = Form.create()(AddSession)

export default AddSession