import React from 'react'
import {Drawer, message, Form, Col, Row, Input, Select, Icon, Upload, Switch, DatePicker} from 'antd'
import ReusableButtons from '../../../common/reusableButtons'
import {addSpeaker,getEmployeeEvents} from '../../api'
import moment from 'moment'
const { Option } = Select
const { RangePicker } = DatePicker

const debounce = (func, delay) => { 
    let debounceTimer 
    return function() { 
        const context = this
        const args = arguments 
        clearTimeout(debounceTimer) 
        debounceTimer = setTimeout(() => func.apply(context, args), delay) 
    } 
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
}

function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

class AddSpeaker extends React.Component {
    state = { 
        eventSpeakers: [],
        images: {},
        employeeEvents: null,
        requiredTravelStay:null
    }

    componentDidMount(){
        this.getEmployeeEvents()
    }

    addASpeaker=(e)=>{
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data
                if(this.state.requiredTravelStay){
                    const {
                        name,event_id,email,speaker_company,designation,
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
                        name,event_id,email,speaker_company,designation,contact_number,
                        status,boarding_point,destination,stay_start_date,stay_end_date,travel_start_date,
                        travel_end_date,company_id:this.props.employeeDetails.company_id,enableTravelAndStay:true
                    }
                } else{
                    const {name,event_id,email,speaker_company,designation,contact_number,status}=values
                    data={
                        name,event_id,email,speaker_company,designation,
                        contact_number,status,company_id:this.props.employeeDetails.company_id,enableTravelAndStay:false
                    }
                }

                addSpeaker(data)
                .then((resp) => {
                    if(resp.message==='Speaker created'){
                        message.success('Speaker added successfully')
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
                return <Select.Option value={JSON.stringify(val.id)} key={index}>{val.name}</Select.Option>
            }) : []
        
    }
    handleChange = pictureKey => info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true })
            return
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                const {images} = this.state;
                images[pictureKey] = imageUrl;
                this.setState({
                    images,
                    loading: false,
                })
            });
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form
        const { events, images, requiredTravelStay } = this.state
        const {visible,onClose}=this.props
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

        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Drawer 
                title="Add Speaker"
                width={600}
                className="sivakrishna"
                bodyStyle={{height: 'calc(100% - 108px)', overflowY: 'auto'}}
                onClose={onClose}
                visible={visible}
            >
                <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                    <Col gutter={16}>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Choose Event">
                                {getFieldDecorator('event_id', {
                                    rules: [{ required: true, message: 'Please select an event' }],
                                })(
                                    <Select
                                     style={{ width: '100%' }}>
                                        {this.options()}
                                    </Select>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Speaker Name">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please enter event name' }],
                                })(<Input />)}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Company Name">
                                {getFieldDecorator('speaker_company', {
                                    rules: [{ required: true, message: 'Please enter company' }],
                                })(
                                    <Input style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Designation">
                                {getFieldDecorator('designation', {
                                    rules: [{ required: true, message: 'Please enter designation' }],
                                })(
                                    <Input style={{ width: '100%' }}/>
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
                            <Form.Item style={{marginBottom: '6px'}} label="Phone Number">
                                {getFieldDecorator('contact_number', {
                                    rules: [{ required: true, message: 'Please enter contact' }],
                                })(
                                    <Input style={{ width: '100%' }}/>
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
                            <Form.Item style={{marginBottom: '6px'}} label="Picture">
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
                                    onChange={this.handleChange("profile")}
                                >
                                    {images['profile'] ? <img src={images['profile']} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>
                        </Row>
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Travel & Stay">
                                <Switch onChange={checked => this.setState({requiredTravelStay: checked ? true : false})} />
                            </Form.Item>
                        </Row>
                        {requiredTravelStay ?
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Point of boarding">
                                {getFieldDecorator('boarding_point', {
                                    rules: [{ required: true, message: 'Please enter boarding point' }],
                                })(
                                    <Input style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>:null}
                        {requiredTravelStay ?
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Destination">
                                {getFieldDecorator('destination', {
                                    rules: [{ required: true, message: 'Please enter destination' }],
                                })(
                                    <Input style={{ width: '100%' }}/>
                                )}
                            </Form.Item>
                        </Row>:null}
                        {requiredTravelStay ?
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Travel Dates">
                                {getFieldDecorator('travel_dates', {
                                    rules: [{ required: true, message: 'Please select travel dates' }],
                                })(
                                    <RangePicker format='DD-MM-YYYY'/>
                                )}
                            </Form.Item>
                        </Row>:null}
                        {requiredTravelStay ?
                        <Row span={16}>
                            <Form.Item style={{marginBottom: '6px'}} label="Stay Dates">
                                {getFieldDecorator('stay_dates', {
                                    rules: [{ required: true, message: 'Please select stay dates' }],
                                })(
                                    <RangePicker format='DD-MM-YYYY'/>
                                )}
                            </Form.Item>
                        </Row>:null}
                        {requiredTravelStay ?
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
                        </Row>:null}
                    </Col>
                </Form>
                <ReusableButtons buttonText='Create' clickEventHandler={this.addASpeaker} onClose={onClose}/>
            </Drawer>
        )
    }
}

AddSpeaker = Form.create()(AddSpeaker)

export default AddSpeaker