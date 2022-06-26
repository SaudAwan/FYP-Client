import React from 'react'
import {Drawer, message, Form, Col, Row, Input, Select} from 'antd'
import * as teamApi from './api'
import * as userApi from '../user/api'
import ReusableButtons from '../../common/reusableButtons'
import AddButton from '../../common/addButton'
const { Option } = Select

class AddTeamComponent extends React.Component {
    state={
        dataSource: [],
        employeesInProductionDep:[],
        employeesInOperationsDep:[],
        employeesInSponsorshipSalesDep:[],
        employeesInDelegateSalesDep:[],
        employeesInMarketingDep:[],
        team: {}
    }

    componentDidMount=async()=>{
      await this.getUsers()
    }

    getUsers=async()=>{
      await userApi.getUsers(this.props.CEODetails.company_id)
      .then(({users})=>{
        users.map((user)=>{
          if(user.user_role==='Production'){
            this.setState({ employeesInProductionDep: this.state.employeesInProductionDep.concat(user) })
          }
          else if(user.user_role==='Operations'){
            this.setState({ employeesInOperationsDep: this.state.employeesInOperationsDep.concat(user) })
          }
          else if(user.user_role==='Sponsorship sales'){
            this.setState({ employeesInSponsorshipSalesDep: this.state.employeesInSponsorshipSalesDep.concat(user) })
          }
          else if(user.user_role==='Delegate sales'){
            this.setState({ employeesInDelegateSalesDep: this.state.employeesInDelegateSalesDep.concat(user) })
          }
          else if(user.user_role==='Marketing'){
            this.setState({ employeesInMarketingDep: this.state.employeesInMarketingDep.concat(user) })
          }
          this.setState({users})
        })
      })
      .catch((err)=>{
        throw err
      })
    }

    addTeam=()=>{
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const {company_id,id}=this.props.CEODetails
          teamApi.addTeam(id,company_id,values)
          .then(resp => {
            if(resp.message==='Team created'){
              this.props.fetchTeams()
              this.onClose()
              message.success('Team added successfully')
            } else{
              // error handeling
            }
          })
        } else {
          // error handeling
        }
      })
    }

    showDrawer = () => {
        this.props.form.resetFields()
        this.setState({
            visible: true,
        })
    }
  
    onClose=()=>{
      this.setState({visible: null})
    }

    editUser = record => 
      this.setState({
        userRecord: record,
        visible: true
      })
    
    render() {
        const { getFieldDecorator } = this.props.form
        const {
          employeesInDelegateSalesDep,
          employeesInMarketingDep,
          employeesInOperationsDep,
          employeesInProductionDep,
          employeesInSponsorshipSalesDep,
          visible
        } = this.state
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
        if(!employeesInDelegateSalesDep||!employeesInMarketingDep||!employeesInOperationsDep||!employeesInProductionDep||!employeesInSponsorshipSalesDep){
          return(
            <div>
              Loading
            </div>
          )
        }
        return (
            <div>
                <div style={{border:'none',display:'flex', justifyContent:'flex-end'}}>
                    <AddButton onAddClick={this.showDrawer}/>
                </div>
                <Drawer 
                 title="Create Team"
                 width={520}
                 style={{height: '100%'}}
                 onClose={this.onClose}
                 visible={this.state.visible}
                >
                  <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                      <Col gutter={16}>
                          <Row span={16}>
                              <Form.Item label="Team Name">
                                  {getFieldDecorator('name', {
                                      rules: [{ required: true, message: 'Please enter team name' }],
                                  })(<Input />)}
                              </Form.Item>
                          </Row>
                          <Row span={16}>
                            <Form.Item label="Production">
                              {getFieldDecorator('production', {
                                rules: [{ required: true, message: 'Please select production team' }],
                              })(
                              <Select
                               mode='multiple'
                               className='ant-select-multiple'
                               style={{ width: '100%' }}
                              >
                                {employeesInProductionDep.map((el,i)=>{
                                  return <Option value={JSON.stringify(el.id)} key={i}>{el.name}</Option>
                                })}
                              </Select>)}
                            </Form.Item>
                          </Row>
                          <Row span={16}>
                            <Form.Item label="Operations">
                              {getFieldDecorator('operations', {
                                rules: [{ required: true, message: 'Please select operations team' }],
                              })(<Select
                                mode='multiple'
                                style={{ width: '100%' }}
                              >
                                {employeesInOperationsDep.map((el,i)=>{
                                  return <Option value={JSON.stringify(el.id)} key={i}>{el.name}</Option>
                                })}
                              </Select>)}
                            </Form.Item>
                          </Row>
                          <Row span={16}>
                            <Form.Item label="Sponsorship sales">
                              {getFieldDecorator('sponsorship_sales', {
                                rules: [{ required: true, message: 'Please select sponsorship sales team' }],
                              })(<Select
                                mode='multiple'
                                style={{ width: '100%' }}
                              >
                                {employeesInSponsorshipSalesDep.map((el,i)=>{
                                  return <Option value={JSON.stringify(el.id)} key={i}>{el.name}</Option>
                                })}
                              </Select>)}
                            </Form.Item>
                          </Row>
                          <Row span={16}>
                            <Form.Item label="Delegate sales">
                              {getFieldDecorator('delegate_sales', {
                                rules: [{ required: true, message: 'Please select delegate sales team' }],
                              })(<Select
                                mode='multiple'
                                style={{ width: '100%' }}
                              >
                                {employeesInDelegateSalesDep.map((el,i)=>{
                                  return <Option value={JSON.stringify(el.id)} key={i}>{el.name}</Option>
                                })}
                              </Select>)}
                            </Form.Item>
                          </Row>
                          <Row span={16}>
                            <Form.Item label="Marketing">
                              {getFieldDecorator('marketing', {
                                rules: [{ required: true, message: 'Please select marketing team' }],
                              })(<Select
                                mode='multiple'
                                style={{ width: '100%' }}
                              >
                                {employeesInMarketingDep.map((el,i)=>{
                                  return <Option value={JSON.stringify(el.id)} key={i}>{el.name}</Option>
                                })}
                              </Select>)}
                            </Form.Item>
                          </Row>
                      </Col>
                  </Form>
                  <ReusableButtons buttonText='Create' clickEventHandler={this.addTeam} onClose={this.onClose}/>
              </Drawer>
            </div>
        )
    }
}

export default Form.create({name:'addTeam'})(AddTeamComponent)