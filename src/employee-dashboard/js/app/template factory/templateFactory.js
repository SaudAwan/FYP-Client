import React from "react";
import { Row, Menu, Layout, Card } from "antd";
import BodyContainer from "../../common/BodyContainer";
import { getTemplates, accessTokenVerifier } from "../api";
import MenuItem from "../../common/menuItem";

const { Meta } = Card;
const Sider = Layout;

class TemplateFactory extends React.Component {
  state = {
    files: [],
    ezyTemplates: null,
    allFiles: true,
  };
  componentDidMount = async () => {
    await window.gapi.load("client:auth2");
  };
  onTemplateClick = async (fileId) => {
    function start() {
      window.gapi.client.init({
        apiKey: "AIzaSyDHaNgLaK73QGLsU2ZRi25NcjADDoHZJfM",
        clientId:
          "973274155341-mvg125o22tlmntfhpio1as9luu1ni1sl.apps.googleusercontent.com",
        scope: 
          "https://www.googleapis.com/auth/drive",
        
        plugin_name: "Evenezy",
      });
    }

    window.gapi.load("client:auth2", start);

    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((response) => {
        const getAuthRes = response.getAuthResponse(true);
        console.log(getAuthRes);
        accessTokenVerifier(
          fileId,
          getAuthRes.access_token,
          getAuthRes.id_token
        );
      });
    // window.gapi.client.init({
    //   apiKey: "AIzaSyDHaNgLaK73QGLsU2ZRi25NcjADDoHZJfM",
    //   clientId:
    //     "973274155341-mvg125o22tlmntfhpio1as9luu1ni1sl.apps.googleusercontent.com",
    //   scope: "https://www.googleapis.com/auth/drive",
    // });
    // .then(() => {

    // });
  };
  displayTemplates = () => {
    const { files } = this.state;
    return files
      ? files.map((file, index) => {
          console.log(file);
          return (
            <Card.Grid
              style={{ width: "30%", height: "auto", margin: "10px" }}
              key={index}
            >
              <Card
                onClick={() => {
                  this.onTemplateClick(file.id);
                }}
                hoverable
                style={{ height: "auto" }}
                cover={
                  <img
                    src={`https://drive.google.com/thumbnail?authuser=0&sz=w1280&id=${file.id}`}
                  />
                }
              >
                <Meta title={`${file.name}`} />
              </Card>
            </Card.Grid>
          );
        })
      : [];
  };
  showAllFiles = () => {
    this.setState({ allFiles: true, ezyTemplates: null });
  };
  showEzyTemplates = (folderId) => {
    this.setState({ files: [] });
    getTemplates(folderId).then(({ files }) => {
      console.log(files);
      this.setState({ files: files.data.files }, () => {
        this.setState({ allFiles: null, ezyTemplates: true });
      });
    });
  };
  render() {
    const { ezyTemplates, allFiles } = this.state;
    const menuArray = [
      { key: "1", source: "/menuAllFiles.png", title: "All Files" },
      { key: "2", source: "/menuDrafts.png", title: "Drafts" },
      { key: "3", source: "/menuTrash.png", title: "Trash" },
    ];
    const menuArray1 = [
      {
        key: "5",
        source: "/menuEzyTemplates.png",
        title: "Marketing",
        folderId: "1KEAH1qn1Z9d-rdK0oHs79xA1vxi1KG9a",
      },
      {
        key: "6",
        source: "/menuEzyTemplates.png",
        title: "Operations",
        folderId: "1hR2XVvJkMgSvFOF7mxHQN8PBT1onoXCA",
      },
      {
        key: "7",
        source: "/menuEzyTemplates.png",
        title: "Production",
        folderId: "1s5QyN07AT49hXC6Yq5hYsd-okOfqbizz",
      },
    ];
    const menuArray2 = [
      {
        key: "8",
        source: "/menuEzyTemplates.png",
        title: "AR/VR",
        folderId: "1fLA-dJsGVAyNFqzst49CUD0-giewXiHT",
      },
      {
        key: "9",
        source: "/menuEzyTemplates.png",
        title: "Block Chain",
        folderId: "13qXB5w03lTgY-_e5Tq7IawYLdnFCnoHJ",
      },
      {
        key: "11",
        source: "/menuEzyTemplates.png",
        title: "Business Presentation",
        folderId: "1Nkte-nRuojnTBueRDCnWWpbfaE6a2LDF",
      },
      {
        key: "12",
        source: "/menuEzyTemplates.png",
        title: "Cloud",
        folderId: "1GvBOzbHST_vMO6gzshjsoHYsOUX2Qycv",
      },
      {
        key: "13",
        source: "/menuEzyTemplates.png",
        title: "Cyber Security",
        folderId: "1VVXWLgA5q9_rJJBXAlsFnuM4S23Fe3q7",
      },
      {
        key: "14",
        source: "/menuEzyTemplates.png",
        title: "Designer Conference",
        folderId: "1-FTc-WkaGL-e3yCdXz3E-16O3njapuUW",
      },
      {
        key: "15",
        source: "/menuEzyTemplates.png",
        title: "Energy",
        folderId: "1xDeCbtSI_2dKlfPiv76-a4tAlNsu64B6",
      },
      {
        key: "16",
        source: "/menuEzyTemplates.png",
        title: "Finance",
        folderId: "1ffncI3vBARGZTP0Fio75HBUgqTEgLKrj",
      },
      {
        key: "17",
        source: "/menuEzyTemplates.png",
        title: "Fitness",
        folderId: "1qLJnIdbSo9l4KlGLO16EHm-Gj6csigbg",
      },
      {
        key: "18",
        source: "/menuEzyTemplates.png",
        title: "Food and Beverage",
        folderId: "1OYR1hU5u8T4kD0lmoZ5sgW8RbcpasGsD",
      },
      {
        key: "19",
        source: "/menuEzyTemplates.png",
        title: "Future Mobility",
        folderId: "1oWNbG4cjSdUDjxf8YIhkZCNLYRXLPddm",
      },
      {
        key: "20",
        source: "/menuEzyTemplates.png",
        title: "Health Care",
        folderId: "1b6Yd8EZPdXAiVXeUUvqUQoU3TPV5EnX2",
      },
      {
        key: "21",
        source: "/menuEzyTemplates.png",
        title: "HR Conference",
        folderId: "1RRtXSrtgT7tGzA-RUGKFbrJA4hwMC1Tu",
      },
      {
        key: "22",
        source: "/menuEzyTemplates.png",
        title: "Iconograpy",
        folderId: "1g77cAYBvBf9Aiv93J23IlOp6mRgcSDb4",
      },
      {
        key: "23",
        source: "/menuEzyTemplates.png",
        title: "Leadership in Technology",
        folderId: "1Euw-tgkBcmKWGPtnnVySkzh7iwtJbj28",
      },
      {
        key: "24",
        source: "/menuEzyTemplates.png",
        title: "Leadership",
        folderId: "1AYBYKaqvl6WCQAsQiWgbJAeIN8xwVrs5",
      },
      {
        key: "25",
        source: "/menuEzyTemplates.png",
        title: "Machine Learning & AI",
        folderId: "1Feu1d_Cc2_hO80jN9bDnCusLoxqD1Ada",
      },
      {
        key: "26",
        source: "/menuEzyTemplates.png",
        title: "Music Concert",
        folderId: "1sfHneXI7IsiUFBj_hrm7vp2z0Fp4CPZ0",
      },
      {
        key: "27",
        source: "/menuEzyTemplates.png",
        title: "Oceana",
        folderId: "10nVbBbRFJO6VVFjB3joy3B5fgK4u8W-F",
      },
      {
        key: "28",
        source: "/menuEzyTemplates.png",
        title: "Product",
        folderId: "1q3P-EH7Dry5hHtYhm62hevgWoU4Cs8Ev",
      },
      {
        key: "39",
        source: "/menuEzyTemplates.png",
        title: "Sports",
        folderId: "1htZskNA5ruJ6mHRwfsAawwjBkEbaRrcu",
      },
      {
        key: "30",
        source: "/menuEzyTemplates.png",
        title: "Tech Conference",
        folderId: "1QL2oxmgpPotb2HT4haxTRJPEcXJYWMmB",
      },
    ];
    const columns = [
      {
        title: "Task Title",
        dataIndex: "title",
        key: "title",
        sorter: true,
      },
      {
        title: "Operator",
        dataIndex: "operator.name",
        key: "operator",
        sorter: true,
      },
      {
        title: "Due Date",
        dataIndex: "due_date",
        key: "due_date",
        sorter: true,
      },
      {
        title: "Event",
        dataIndex: "event.name",
        key: "event",
        sorter: true,
      },
      {
        title: "Action",
        key: "render",
        render: (text, record) => (
          <Row
            style={{
              width: "45px",
              display: "flex!important",
              justifyContent: "space-between!important",
            }}
            type="flex"
            justify="space-around"
            align="middle"
          >
            {record.createdBy.id === this.props.userDetails.id ? (
              <img
                src="/Delete.png"
                style={{ height: "20px", width: "20px", cursor: "pointer" }}
                onClick={() => {
                  this.onDeleteClick(record.id);
                }}
              />
            ) : null}
          </Row>
        ),
      },
    ];
    return (
      <BodyContainer title="Template Factory">
        <div
          style={{ width: "100%", display: "flex" }}
          id="templateFactoryWrapper"
        >
          <Sider
            style={{
              width: "20%",
              minHeight: "100vh",
              paddingRight: "10px",
              background: "#ffff",
            }}
          >
            <div>
              <Menu mode="inline" defaultSelectedKeys={["1"]}>
                {/* {menuArray.map((element) => {
                  return (
                    <Menu.Item
                      id="eMenuItem"
                      key={element.key}
                      onClick={this.showAllFiles}
                    >
                      <MenuItem source={element.source} title={element.title} />
                    </Menu.Item>
                  );
                })} */}
                <Menu.ItemGroup title="Templates">
                  <Menu.SubMenu key="4" title="Content Templates">
                    {menuArray1.map((element) => {
                      return (
                        <Menu.Item id="eMenuItem" key={element.key}>
                          <div
                            className="menuItemWrap"
                            onClick={() => {
                              this.showEzyTemplates(element.folderId);
                            }}
                          >
                            <img src={element.source} className="logoStyles" />
                            <span className="spacer">{element.title}</span>
                          </div>
                        </Menu.Item>
                      );
                    })}
                  </Menu.SubMenu>
                  <Menu.SubMenu key="8" title="Design Templates">
                    {menuArray2.map((element) => {
                      return (
                        <Menu.Item id="eMenuItem" key={element.key}>
                          <div
                            className="menuItemWrap"
                            onClick={() => {
                              this.showEzyTemplates(element.folderId);
                            }}
                          >
                            <img src={element.source} className="logoStyles" />
                            <span className="spacer">{element.title}</span>
                          </div>
                        </Menu.Item>
                      );
                    })}
                  </Menu.SubMenu>
                </Menu.ItemGroup>
              </Menu>
            </div>
          </Sider>
          <div style={{ width: "80%", paddingLeft: "10px" }}>
            {/* {allFiles ? <Table columns={columns} /> : null} */}
            {ezyTemplates ? this.displayTemplates() : null}
          </div>
        </div>
      </BodyContainer>
    );
  }
}
export default TemplateFactory;
