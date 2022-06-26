import React from 'react';
import { Card, Menu } from 'antd';
import './eventMenuComponent.css';

const {SubMenu} = Menu;
var routeMap = {};
export default class EventMenu extends React.Component {
    constructor(props) {
        super(props);
        const {params} = props.match;
        this.state = {
            current: 'Sponsors:1:2'
        }
        routeMap = {
            "Sponsor": {
                key: "1",
                subMenu: {
                    "Report": "1",
                    "Sponsor": "2"
                }
            },
            "Delegate": {
                key: "2",
                subMenu: {
                    "Report": "1",
                    "Delegate": "2"
                }
            },
            "Production": {
                key: "3",
                subMenu: {
                    "Speaker": "1",
                    "Assosciation": "2",
                    "Agenda": "3"
                }
            },
            "Marketing": {
                key: "4",
                subMenu: {
                    "Email": "1",
                    "Social Media": "2",
                    "Blog": "3",
                    "Website": "4",
                    "Media Partner": "5"
                }
            },
            "Operation": {
                key: "5",
                subMenu: {
                    "Venue": "1",
                    "Ticket": "2",
                    "Inventory": "3",
                    "Vendor": "4"
                }
            }
        };
    }
    componentDidMount() {
        const { pathname } = this.props.history.location;
        var current = 1;
        Object.keys(routeMap).forEach(tab => {
            var tabname = tab.toLowerCase();
            if (pathname.indexOf(tabname) != -1) {
                var key = routeMap[tab].key, subKey = 1;
                Object.keys(routeMap[tab].subMenu).forEach(el => {
                    var subTabname = el.toLowerCase();
                    if (pathname.indexOf(subTabname) != -1) {
                        subKey = routeMap[tab].subMenu[el];
                    }
                })
                current = tab + ':' + key + ':' + subKey;
            }
        })
        this.setState({
            current: current
        })
    }
    tabClick = (data) => {
        const {params} = this.props.match;
        var [tabname, key, subKey] = data.key.split(':');
        if (data && typeof data == 'object') {
            this.setState({
                current: data.key
            })
        }
        subKey = parseInt(subKey)
        key = parseInt(key);
        switch(key) {
            case 1: this.props.history.push("/event/view/"+params.id+"/sponsor")
                break;
            case 2: this.props.history.push("/event/view/"+params.id+"/delegate")
                break;
            case 3: 
                if (subKey === 1) {
                    this.props.history.push("/event/view/"+params.id+"/production/speaker");
                } else if (subKey === 2) {
                    this.props.history.push("/event/view/"+params.id+"/production/assosciation");
                }
                break;
            case 4: 
                if (subKey === 3) {
                    this.props.history.push("/event/view/"+params.id+"/marketing/blog");
                } else if (subKey === 4) {
                    this.props.history.push("/event/view/"+params.id+"/marketing/website");
                } else if (subKey === 5) {
                    this.props.history.push("/event/view/"+params.id+"/marketing/media-partner");
                }
                break;
            case 5: 
                if (subKey === 1) {
                    this.props.history.push("/event/view/"+params.id+"/operation/venue");
                } else if (subKey === 2) {
                    this.props.history.push("/event/view/"+params.id+"/operation/ticket");
                } else if (subKey === 3) {
                    this.props.history.push("/event/view/"+params.id+"/operation/inventory");
                } else if (subKey === 4) {
                    this.props.history.push("/event/view/"+params.id+"/operation/vendor");
                }
                break;
            case 6: this.props.history.push("/event/view/"+params.id+"/goalSetting")
                break;
            default: break;
        }
    }
    
    render() {
        return (
            <Card style={{border: 0}} bodyStyle={{padding: 0}}>
                <Menu
                    onClick={this.tabClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{height: "40px", width: "540px", position: "absolute", top: "-75px", left: "-25px"}}
                >
                    <SubMenu className="app-event-menu-item" style={{borderRight: '1px solid #dbd6d6', height: '40px'}} title={<span className="submenu-title-wrapper">Sponsors</span>}>
                        <Menu.Item key="Sponsor:1:1">Reports</Menu.Item>
                        <Menu.Item key="Sponsor:1:2">Sponsors</Menu.Item>
                    </SubMenu>
                    <SubMenu className="app-event-menu-item" style={{borderRight: '1px solid #dbd6d6', height: '40px'}} title={<span className="submenu-title-wrapper">Delegates</span>}>
                        <Menu.Item key="Delegate:2:1">Reports</Menu.Item>
                        <Menu.Item key="Delegate:2:2">Delegates</Menu.Item>
                    </SubMenu>
                    <SubMenu className="app-event-menu-item" style={{borderRight: '1px solid #dbd6d6', height: '40px'}} title={<span className="submenu-title-wrapper">Production</span>}>
                        <Menu.Item key="Production:3:1">Speakers</Menu.Item>
                        <Menu.Item key="Production:3:2">Assosciations</Menu.Item>
                        <Menu.Item key="Production:3:3">Agenda</Menu.Item>
                    </SubMenu>
                    <SubMenu className="app-event-menu-item" style={{borderRight: '1px solid #dbd6d6', height: '40px'}} title={<span className="submenu-title-wrapper">Marketing</span>}>
                        <Menu.Item key="Marketing:4:1">Emails</Menu.Item>
                        <Menu.Item key="Marketing:4:2">Social Media</Menu.Item>
                        <Menu.Item key="Marketing:4:3">Blog</Menu.Item>
                        <Menu.Item key="Marketing:4:4">Website</Menu.Item>
                        <Menu.Item key="Marketing:4:5">Media Partners</Menu.Item>
                    </SubMenu>
                    <SubMenu className="app-event-menu-item" style={{height: '40px'}} title={<span className="submenu-title-wrapper">Operations</span>}>
                        <Menu.Item key="Operation:5:1">Venues</Menu.Item>
                        <Menu.Item key="Operation:5:2">Tickets</Menu.Item>
                        <Menu.Item key="Operation:5:3">Inventory</Menu.Item>
                        <Menu.Item key="Operation:5:4">Vendors</Menu.Item>
                    </SubMenu>
                </Menu>
            </Card>
        )
    }
}