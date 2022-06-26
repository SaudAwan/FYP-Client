import React from 'react'
import {Drawer, Form, Col, Row, Input, Select, DatePicker,message} from 'antd'
import * as eventApi from './api'
import * as teamApi from '../team/api'
import AddButton from '../../common/addButton'
import ReusableButtons from '../../common/reusableButtons'
import moment from 'moment'
class AddEvent extends React.Component {
    state={ 
        dataSource: [],
        visible: false,
        teams:null,
        categories:null 
    }
    componentDidMount=async()=>{
        this.fetchCategories()
        this.fetchTeams()
    }

    fetchCategories=async()=>{
        return await eventApi.getEventCategories()
        .then(({categories})=>{
            if(categories){
                this.setState({categories})
            } else{
                //error handeling
            }
        })
    }

    fetchTeams=()=>{
        return teamApi.getTeams(this.props.company_id)
        .then(({teams})=>{
            if(teams){
                this.setState({teams})
            } else{
                // error handeling
            }
        })
    }

    addEvent=(e)=>{
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async(err, values) => {
            if (!err) {
                const {
                    name,team_id,category_id,start_date,end_date,
                    location,target_revenue,sponsorship,delegate_sales,marketing
                }=values
                const startDate=moment(start_date).format('YYYY-MM-DD')
                const endDate=moment(end_date).format('YYYY-MM-DD')
                const data={
                    name,team_id,category_id,
                    start_date: startDate,
                    end_date:endDate,
                    location,
                    target_revenue,sponsorship,delegate_sales,marketing,company_id:this.props.company_id
                }
                eventApi.addEvent(data)
                .then((resp)=>{
                    console.log(resp)
                    if(resp.message==='Event created'){
                        message.success('Event added successfully')
                        this.props.fetchEvents()
                        this.setState({
                            visible: false
                        })
                    } else{
                        //error handeling
                    }
                })
            }
        })
    }

    showDrawer = () => {
        this.props.form.resetFields()
        this.setState({
            visible: true,
        })
    }
  
    onClose = () => {
        this.setState({
            visible: false,
        })
    }

    editUser = (record) => {
        this.setState({
            userRecord: record,
            visible: true
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const {teams,categories} = this.state
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
            <div>
                <div style={{border:'none',display:'flex', justifyContent:'flex-end'}}>
                    <AddButton onAddClick={this.showDrawer}/>
                </div>
                <Drawer 
                    title="Create Event"
                    width={520}
                    maskStyle={{marginTop: '106px', boxShadow: '1px 5px 5px grey'}}
                    style={{height: '100%'}}
                    bodyStyle={{height: '100%', overflowY: 'auto'}}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                        <Col gutter={16}>
                            <Row span={16}>
                                <Form.Item label="Event Name">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please enter event name' }],
                                    })(<Input />)}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="Team">
                                    {getFieldDecorator('team_id', {
                                        rules: [{ required: true, message: 'Please select event team' }],
                                    })(
                                        <Select>
                                            {teams?teams.map((team,i)=>{
                                                return(
                                                    <Select.Option key={i} value={JSON.stringify(team.id)}>
                                                        {team.name}
                                                    </Select.Option>
                                                )
                                            }):null}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="Category">
                                    {getFieldDecorator('category_id', {
                                        rules: [{ required: true, message: 'Please select an category' }],
                                    })(
                                        <Select>
                                            {categories ? 
                                             categories.map((el, index) =>
                                              <Select.Option key={index} value={JSON.stringify(el.id)}>{el.name}</Select.Option>)
                                             :null}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item
                                    label="Start date"
                                >
                                    {getFieldDecorator('start_date', {
                                        rules: [{ type: 'object', required: true, message: 'Please select start date.' }],
                                    })(
                                        <DatePicker format='DD-MM-YYYY' style={{width: '100%'}} placeholder=""/>
                                    )}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item
                                    label="End Date"
                                >
                                    {getFieldDecorator('end_date', {
                                        rules: [{ type: 'object', required: true, message: 'Please select end date' }],
                                    })(
                                        <DatePicker format='DD-MM-YYYY' style={{width: '100%'}} placeholder=""/>
                                    )}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="Location">
                                    {getFieldDecorator('location', {
                                        rules: [{ required: true, message: 'Please enter location' }],
                                    })(
                                        <Input style={{ width: '100%' }}/>
                                    )}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="Target Revenue">
                                    {getFieldDecorator('target_revenue', {
                                        rules: [{ required: true, message: 'Please enter targetRevenure' }],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="Sponsorship">
                                    {getFieldDecorator('sponsorship', {
                                        rules: [{ required: true, message: 'Please enter spohsorship' }],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="Delegate Sales">
                                    {getFieldDecorator('delegate_sales', {
                                        rules: [{ required: true, message: 'Please enter delegateSales' }],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="Marketing">
                                    {getFieldDecorator('marketing', {
                                        rules: [{ required: true, message: 'Please enter marketing' }],
                                    })(
                                        <Input/>
                                    )}
                                </Form.Item>
                            </Row>
                        </Col>
                    </Form>
                    <ReusableButtons clickEventHandler={this.addEvent} buttonText='Create' onClose={this.onClose}/>
                </Drawer>
            </div>
        )
    }
}

export default Form.create()(AddEvent)