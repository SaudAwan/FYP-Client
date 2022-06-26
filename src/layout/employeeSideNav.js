import React from 'react'
import {Menu, Layout} from 'antd'
import {Link} from 'react-router-dom'
const {SubMenu} = Menu
const {Sider} = Layout

class EmployeeSideNav extends React.Component{
    render(){
        return(
            <Sider style={{background:'#000000'}} id='eSider'>
                <Menu mode="inline" >
                    <Menu.ItemGroup key='1' title='Main'>
                        <Menu.Item key='1' id='eMenuItem'>
                            <Link to='/' className='menuItemWrap'>
                                <img src='/Dashboard.png' className='logoStyles'/>
                                <span className='spacer'></span>
                                Dashboard
                            </Link>
                         </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title='Activity'>
                        <SubMenu title={
                            <span className='menuItemWrap'>
                                <img src='/Production.png' className='logoStyles'/>
                                <span>Production</span>
                            </span>
                        }>
                            <Menu.Item>
                                <Link to='/employee/production/speaker'>Speakers</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to='/employee/production/agenda'>Agenda Builder</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to='/employee/production/partner'>Partners</Link>
                            </Menu.Item>
                        </SubMenu>
                        {/* <SubMenu title={
                            <span className='menuItemWrap'>
                                <img src='/Sponsorship.png' className='logoStyles'/>
                                <span>Sponsorship</span>
                            </span>
                        }>
                        </SubMenu> */}
                        {/* <SubMenu title={
                            <span className='menuItemWrap'>
                                <img src='/DelegateSales.png' className='logoStyles'/>
                                <span>Delegate Sales</span>
                            </span>
                        }>
                        </SubMenu>
                        <SubMenu title={
                            <span className='menuItemWrap'>
                                <img src='/Operations.png' className='logoStyles'/>
                                <span>Operations</span>
                            </span>
                        }>
                        </SubMenu> */}
                        <SubMenu title={
                            <span className='menuItemWrap'>
                                <img src='/Marketing.png' className='logoStyles'/>
                                <span>Marketing</span>
                            </span>
                        }>
                            <Menu.Item>
                                <Link to='/employee/marketing/emails'>Emails</Link>
                            </Menu.Item>
                            {/* <Menu.Item>
                                <Link to='/employee/production/agenda'>Social Media</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to='/employee/production/partner'>Blog</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to='/employee/production/partner'>Website</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to='/employee/production/partner'>Media Partners</Link>
                            </Menu.Item> */}
                        </SubMenu>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title='Applications'>
                        <Menu.Item id='eMenuItem' key='1'>
                            <Link to='/employee/template-factory' className='menuItemWrap'>
                                <img src='/TemplateFactory.png' className='logoStyles'/>
                                <span className='spacer'></span>
                                Template Factory
                            </Link>
                        </Menu.Item>
                        <Menu.Item id='eMenuItem' key='2'>
                            <Link to='/employee/tasks' className='menuItemWrap'>
                                <img src='/TaskManagement.png' className='logoStyles'/>
                                <span className='spacer'></span>
                                Task Management
                            </Link>
                        </Menu.Item>
                        {/* <Menu.Item id='eMenuItem' key='3'>
                            <Link to='/employee/calendar' className='menuItemWrap'>
                                <img src='/Calendar.png' className='logoStyles'/>
                                <span className='spacer'></span>
                                Calendar
                            </Link>
                        </Menu.Item> */}
                    </Menu.ItemGroup>
                    {/* <Menu.ItemGroup title='Help'>
                        <Menu.Item id='eMenuItem'>
                            <Link to='/employee/support' className='menuItemWrap'>
                                <img src='/Support.png' className='logoStyles'/>
                                <span className='spacer'></span>
                                Support
                            </Link>
                        </Menu.Item>
                    </Menu.ItemGroup> */}
                </Menu>
            </Sider>
        )
    }
}
export default EmployeeSideNav