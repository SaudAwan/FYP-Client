import React from 'react'
import {
    Form, Collapse, Col, Row, Tooltip, Input, Select, DatePicker, Icon
  } from 'antd';

const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const genExtra = () => (
  <Icon
    type="more"
    style={{fontSize: '24px'}}
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

const customPanelStyle = {
    marginBottom: '18px',
    boxShadow: 'grey 0px 0px 2px',
    border: 0,
    background: 'white',
    borderRadius: '4px'
}

const header = (key) => {
    switch(key) {
        case 1: 
            return (
                <div>
                    <h1>PRODUCTION</h1>
                    <p>Not mentioned</p>
                </div>
            )
        case 2: 
            return (
                <div>
                    <h1>SPONSORSHIP</h1>
                    <p>Revenue target $250,000</p>
                </div>
            )
        case 3: 
            return (
                <div>
                    <h1>OPERATIONS</h1>
                    <p>Not mentioned</p>
                </div>
            )
        case 4: 
            return (
                <div>
                    <h1>DELEGATE SALES</h1>
                    <p>Not mentioned</p>
                </div>
            )
        case 5: 
            return (
                <div>
                    <h1>MARKETING</h1>
                    <p>Not mentioned</p>
                </div>
            )
    }
}

class GoalSetting extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 2 },
              sm: { span: 3 },
            },
            wrapperCol: {
              xs: { span: 4 },
              sm: { span: 6 },
            },
        };
        return (
            <Collapse bordered={false} defaultActiveKey={['1']} onChange={callback} style={{overflowY: 'auto', padding: '0 5px', height: 'calc(100% - 51px)', background: 'none', marginTop: '18px'}}>
                <Panel showArrow={false} style={customPanelStyle} header={header(1)} key="1" extra={genExtra()}>
                    <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                        <Col gutter={16}>
                            <Row span={16}>
                                <Form.Item label="Total Speakers" style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('totalSpeakers', {
                                        rules: [{ required: true, message: 'Please enter total speakers' }],
                                    })(<Input />)}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="1st Deadline" style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('totalSpeakers', {
                                            rules: [{ required: true, message: 'Please enter speakers' }],
                                        })(<Input placeholder="Number of speakers"/>)}
                                    </Form.Item>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('date-picker', {
                                            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                        })(
                                            <DatePicker placeholder="1st Deadline" />
                                        )}
                                    </Form.Item>
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="2nd Deadline" style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('totalSpeakers', {
                                            rules: [{ required: true, message: 'Please enter speakers' }],
                                        })(<Input placeholder="Number of speakers"/>)}
                                    </Form.Item>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('date-picker', {
                                            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                        })(
                                            <DatePicker placeholder="2nd Deadline" />
                                        )}
                                    </Form.Item>
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item
                                    label="Agenda Deadline"
                                    style={{ marginBottom: 0 }}
                                >
                                    {getFieldDecorator('date-picker', {
                                        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                    })(
                                        <DatePicker />
                                    )}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="Assosciations" style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('assosciations', {
                                        rules: [{ required: true, message: 'Please enter location' }],
                                    })(
                                        <Input style={{ width: '100%' }}/>
                                    )}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="Final deadline" style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('finalDeadline', {
                                        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                    })(
                                        <DatePicker />
                                    )}
                                </Form.Item>
                            </Row>
                        </Col>
                    </Form>
                </Panel>
                <Panel showArrow={false} style={customPanelStyle} header={header(2)} key="2" extra={genExtra()}>
                    <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                        <Col gutter={16}>
                            <Row span={16}>
                                <Form.Item label="Total Revenue Set" style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('totalSpeakers', {
                                        rules: [{ required: true, message: 'Please enter total speakers' }],
                                    })(<Input />)}
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="1st Deadline" style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('totalSpeakers', {
                                            rules: [{ required: true, message: 'Please enter speakers' }],
                                        })(<Input placeholder="Number of speakers"/>)}
                                    </Form.Item>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('date-picker', {
                                            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                        })(
                                            <DatePicker placeholder="1st Deadline" />
                                        )}
                                    </Form.Item>
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="2nd Deadline" style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('totalSpeakers', {
                                            rules: [{ required: true, message: 'Please enter speakers' }],
                                        })(<Input placeholder="Number of speakers"/>)}
                                    </Form.Item>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('date-picker', {
                                            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                        })(
                                            <DatePicker placeholder="2nd Deadline" />
                                        )}
                                    </Form.Item>
                                </Form.Item>
                            </Row>
                        </Col>
                    </Form>
                </Panel>
                <Panel showArrow={false} style={customPanelStyle} header={header(3)} key="3" extra={genExtra()}>
                <Form {...formItemLayout} layout="vertical" hideRequiredMark>
                        <Col gutter={16}>
                            <Row span={16}>
                                <Form.Item label="1st Deadline" style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('totalSpeakers', {
                                            rules: [{ required: true, message: 'Please enter speakers' }],
                                        })(<Input placeholder="Venue"/>)}
                                    </Form.Item>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('date-picker', {
                                            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                        })(<Input placeholder="Budget"/>)}
                                    </Form.Item>
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="1st Deadline" style={{ marginBottom: 0 }}>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('totalSpeakers', {
                                            rules: [{ required: true, message: 'Please enter speakers' }],
                                        })(<Input placeholder="Venue"/>)}
                                    </Form.Item>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        {getFieldDecorator('date-picker', {
                                            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                        })(<Input placeholder="Budget"/>)}
                                    </Form.Item>
                                </Form.Item>
                            </Row>
                            <Row span={16}>
                                <Form.Item label="Final Deadline" style={{ marginBottom: 0 }}>
                                    {getFieldDecorator('totalSpeakers', {
                                        rules: [{ required: true, message: 'Please enter total speakers' }],
                                    })(<Input />)}
                                </Form.Item>
                            </Row>
                        </Col>
                    </Form>
                </Panel>
                <Panel showArrow={false} style={customPanelStyle} header={header(4)} key="4" extra={genExtra()}>
                    <div>{text}</div>
                </Panel>
                <Panel showArrow={false} style={customPanelStyle} header={header(5)} key="5" extra={genExtra()}>
                    <div>{text}</div>
                </Panel>
            </Collapse>
        )
    }
}

export default Form.create()(GoalSetting);