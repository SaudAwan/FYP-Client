import React from 'react'
import {Form, Input, message , Select, Drawer} from 'antd'
import * as userApi from './api'
import ReusableButtons from '../../common/reusableButtons'
const { Option } = Select
const info = (msg) => {
  message.success(msg)
}
class UserRegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };

    componentWillReceiveProps(nextProps) {
      if (!this.props.userRecord && nextProps.userRecord) {
        var fields = ["name", "phone_number", "email", "user_role"]
        var obj = {}
        fields.forEach(key => {
          obj[key] = nextProps.userRecord[key]
        })
        nextProps.form.setFieldsValue(obj);
      } else if (!this.props.visible && nextProps.visible) {
        this.props.form.resetFields()
      }
    }
  
    addUser = () => {
      const {form,company_id,handleOk}=this.props
      form.validateFields((err, values) => {
        values['company_id']=company_id
        if (!err) {
          console.log(values)
          userApi.addUser(values).then(resp =>  {
            console.log(resp)
            if(resp.message==='Employee created'){
              info("User added successfully")
              handleOk()
            } else {
              // error handeling
            }
          })
        }
      })
    }

    updateUser = () => {
      const {userRecord,form,handleOk}=this.props
      form.validateFields(async(err, values) => {
        if (!err) {
          await userApi.updateUser(userRecord.id, values)
          .then(resp => {
            if(resp.message==='Employee updated'){
              info("User update successfully")
              handleOk()
            } else {

            }
          })
        }
      })
    }

    handleSubmit=(e)=>{
      if(this.props.button==='Save changes'){
        this.updateUser()
      }
      else{
        this.addUser()
      }
    }
    render() {
        const { userRecord,visible,onClose,button } = this.props
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
        }
        return (
            <Drawer visible={this.props.visible}
              title="Add Employee"
              width={520}
              maskStyle={{marginTop: '106px', boxShadow: '1px 5px 5px grey'}}
              style={{height: '100%'}}
              bodyStyle={{height: '100%', overflowY: 'auto'}}
              onClose={onClose}
              visible={visible}>
                <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: "Employee's name is required!"}],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item
                        label="E-mail"
                    >
                      {getFieldDecorator('email', {
                          rules: [{
                          type: 'email', message: 'Invalid email',
                          }, {
                          required: true, message: "Employee's email is required!",
                          }],
                      })(
                          <Input />
                      )}
                    </Form.Item>
                    <Form.Item
                        label="Contact Number"
                    >
                        {getFieldDecorator('phone_number', {
                            rules: [{ required: true, message: "Employee's contact number is required!" }],
                        })(
                            <Input style={{ width: '100%' }} />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="User Role"
                    >
                        {getFieldDecorator('user_role', {
                            rules: [{ required: true, message: "Employee's role is required!" }],
                        })(
                            <Select initialValue="Production" style={{ width: '100%' }}>
                                <Option value="Production">Production</Option>
                                <Option value="Operations">Operations</Option>
                                <Option value="Sponsorship sales">Sponsorship sales</Option>
                                <Option value="Delegate sales">Delegate sales</Option>
                                <Option value="Marketing">Marketing</Option>
                            </Select>
                        )}
                        </Form.Item>
                    {userRecord ? null : <Form.Item
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: "Employee's password is required" }],
                        })(
                            <Input style={{ width: '100%' }} />
                        )}
                    </Form.Item>}
                </Form>
                <ReusableButtons clickEventHandler={this.handleSubmit} buttonText={button}/>
            </Drawer>
        )
    }
}
  
export default Form.create({ name: 'register' })(UserRegistrationForm)
  