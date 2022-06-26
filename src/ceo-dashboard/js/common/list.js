import React from 'react'
import {List} from 'antd'
import {Link} from 'react-router-dom'
class MainList extends React.Component{
    render(){
        /* 
            controlHandlers is an object, having different handlers
            1- onClickDel
            2- onClickLink
        */
        const {team,data,showViewTeamDrawer, controlHandlers}=this.props
        console.log(data)
        return (
          <List
            itemLayout="horizontal"
            dataSource={data}
            bordered={false}
            style={{ marginTop: "20px" }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    !team ? (
                      <Link
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                        to={`/events/view/${item.id}`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <p
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                        onClick={() => {
                          showViewTeamDrawer(item.id, item.name);
                        }}
                      >
                        {item.name}
                      </p>
                    )
                  }
                  description={
                    team && item.event
                      ? `The team is working on the ${item.event.name} event.`
                      : team && !item.event
                      ? "The has not been assigned any event"
                      : null
                  }
                />
                <div className="flex">
                  {controlHandlers && controlHandlers.onClickLink && (
                    <div onClick={() => controlHandlers.onClickLink(item)}>
                      <img
                        src="/Link.png"
                        style={{
                          height: "20px",
                          width: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  )}
                  <div>
                    {/* <img src='/Edit.png' style={{height:'20px',width:'20px',cursor:'pointer'}}/> */}
                    <img
                      src="/Delete.png"
                      style={{
                        height: "20px",
                        width: "20px",
                        cursor: "pointer",
                      }}
                      //onClick
                    />
                  </div>
                </div>
              </List.Item>
            )}
          />
        );
    }
}
export default MainList