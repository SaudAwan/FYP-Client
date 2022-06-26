import React from 'react'
import {Drawer,message, Form, Col, Row, Input, Select,DatePicker,Switch} from 'antd'
import ReusableButtons from '../../../common/reusableButtons'
import {updateSpeaker,getEmployeeEvents} from '../../api'
import moment from 'moment'
const {Option} = Select
const { RangePicker } = DatePicker

// function beforeUpload(file) {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!')
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2
//     if (!isLt2M) {
//       message.error('Image must smaller than 2MB!')
//     }
//     return isJpgOrPng && isLt2M
// }

// function getBase64(img, callback) {
//     const reader = new FileReader()
//     reader.addEventListener('load', () => callback(reader.result))
//     reader.readAsDataURL(img)
// }

class EditSpeaker extends React.Component {
    state={
        visible: false,
        employeeEvents: null,
        enabledTravelStay:null
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

    options=()=>{
        const {employeeEvents}=this.state
        return employeeEvents ? employeeEvents.map((val,index)=>{
            return <Select.Option value={JSON.stringify(val)} key={index}>{val.name}</Select.Option>
        }) : []
    }

    componentWillReceiveProps=async(nextProps)=>{
        if (!this.props.speaker && nextProps.speaker) {
            if(nextProps.speaker.enable_travel_and_stay===true){
                await this.props.enabledTravelStayFunction(true)
                const {
                    name,speaker_company,designation,contact_number,status,email,
                    boarding_point,destination,travel_start_date,travel_end_date,
                    stay_start_date,stay_end_date
                } = nextProps.speaker
                var obj = {
                    name,
                    speaker_company,
                    designation,
                    email,
                    event: JSON.stringify(nextProps.speaker.event),
                    contact_number,
                    status,
                    boarding_point,
                    destination,
                    travel_start_date,
                    travel_end_date,
                    stay_start_date,
                    stay_end_date
                }
                nextProps.form.setFieldsValue(obj)
                
            } else{
                const {
                    name,speaker_company,designation,contact_number,status,email
                } = nextProps.speaker
                var obj = {
                    name,
                    speaker_company,
                    designation,
                    email,
                    event: JSON.stringify(nextProps.speaker.event),
                    contact_number,
                    status
                }
                nextProps.form.setFieldsValue(obj)
                this.props.enabledTravelStayFunction(false)
            }
        }
    }

    handleOk=(e)=>{
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data
                if(this.props.enabledTravelStay){
                    const {
                        name,event,email,speaker_company,designation,
                        contact_number,status,boarding_point,destination
                    }=values
                    const d1=values.stay_dates[0]._d
                    const d2=values.stay_dates[1]._d
                    const d3=values.travel_dates[0]._d
                    const d4=values.travel_dates[1]._d
    
                    const stay_start_date=moment(d1).format('YYYY-MM-DD')
                    const stay_end_date=moment(d2).format('YYYY-MM-DD')
                    const travel_start_date=moment(d3).format('YYYY-MM-DD')
                    const travel_end_date=moment(d4).format('YYYY-MM-DD')
                    data={
                        name,event,email,speaker_company,designation,contact_number,
                        status,boarding_point,destination,stay_start_date,stay_end_date,travel_start_date,
                        travel_end_date,company_id:this.props.employeeDetails.company_id,
                        enable_travel_and_stay:this.props.enabledTravelStay
                    }
                } else{
                    const {name,event,email,speaker_company,designation,contact_number,status}=values
                    data={
                        name,event,email,speaker_company,designation,
                        contact_number,status,company_id:this.props.employeeDetails.company_id,
                        boarding_point:null,destination:null,stay_start_date:null,stay_end_date:null,travel_start_date:null,
                        travel_end_date:null,enable_travel_and_stay:this.props.enabledTravelStay
                    }
                }
                updateSpeaker(data, this.props.speaker.id)
                .then((resp) => {
                    if(resp.message==='Speaker updated'){
                        message.success('Speaker updated successfully')
                        this.props.hideWindow(1)
                        setTimeout(() => {
                            this.props.form.resetFields()
                        }, 0)
                    } else{
                        //error handeling
                    }
                })
            }
        })
    }

    render() {
        const {visible,onClose,enabledTravelStay,enabledTravelStayFunction}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        }
        return (
            <Drawer 
                title="Edit Speaker"
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
                                    rules: [{ required: true, message: 'Please enter event name' }],
                                })(
                                    <Input size="small" style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Company">
                                {getFieldDecorator('speaker_company', {
                                    rules: [{ required: true, message: 'Please enter company' }],
                                })(
                                    <Input size="small" style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Designation">
                                {getFieldDecorator('designation', {
                                    rules: [{ required: true, message: 'Please enter designation' }],
                                })(
                                    <Input size="small" style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Email">
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please enter email' }],
                                })(
                                    <Input style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Contact">
                                {getFieldDecorator('contact_number', {
                                    rules: [{ required: true, message: 'Please enter contact' }],
                                })(
                                    <Input size="small" style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Event">
                                {getFieldDecorator('event', {
                                    rules: [{ required: true, message: 'Please enter event' }],
                                })(
                                    <Select>
                                        {this.options()}
                                    </Select>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Status">
                                {getFieldDecorator('status', {
                                    rules: [{ required: true, message: 'Please select status' }],
                                })(
                                    <Select>
                                        <Option value="confirmed">Confirmed</Option>
                                        <Option value="negotiation">Negotiation</Option>
                                        <Option value="onhold">Onhold</Option>
                                        <Option value="approached">Approached</Option>
                                        <Option value="cancelled">Cancelled</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Travel & Stay">
                                <Switch
                                 checked={enabledTravelStay===true?true:false}
                                 onChange={
                                     (checked) => checked ? enabledTravelStayFunction(true) : enabledTravelStayFunction(false)
                                }/>
                            </Form.Item>
                        </Row>
                        {enabledTravelStay===true ?
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Point of boarding">
                                {getFieldDecorator('boarding_point', {
                                    rules: [{ required: true, message: 'Please enter boarding point' }],
                                })(
                                    <Input style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>:null}
                        {enabledTravelStay===true ?
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Destination">
                                {getFieldDecorator('destination', {
                                    rules: [{ required: true, message: 'Please enter destination' }],
                                })(
                                    <Input style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>:null}
                        {enabledTravelStay===true ?
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Travel Dates">
                                {getFieldDecorator('travel_dates', {
                                    rules: [{ required: true, message: 'Please select travel dates' }],
                                })(
                                    <RangePicker format='DD-MM-YYYY'/>
                                )}
                            </Form.Item>
                        </Row>:null}
                        {enabledTravelStay===true ?
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Stay Dates">
                                {getFieldDecorator('stay_dates', {
                                    rules: [{ required: true, message: 'Please select stay dates' }],
                                })(
                                    <RangePicker format='DD-MM-YYYY'/>
                                )}
                            </Form.Item>
                        </Row>:null}
                        {/* {enabledTravelStay ?
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Passport Details">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    customRequest={({ file, onSuccess }) => {
                                        setTimeout(() => {
                                          onSuccess("ok")
                                        }, 0)
                                    }}
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange("passport")}
                                >
                                    {images['passport'] ? <img src={images['passport']} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>
                        </Row>:null} */}
                    </Col>
                </Form>
                <ReusableButtons buttonText='Save changes' clickEventHandler={this.handleOk} onClose={onClose}/>
            </Drawer>
        )
    }
}

export default Form.create()(EditSpeaker)