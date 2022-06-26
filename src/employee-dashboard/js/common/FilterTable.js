import React from "react";
import { Table, Row, Col, Spin, Pagination } from "antd";
export default class FilterTable extends React.Component {
  state = {
    searchText: "",
    pageSize: 10,
    data: [],
    count: 0,
    page: 1,
    totalPages: 50,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    const { uuid, uuid1 } = this.props;
    if (uuid !== nextProps.uuid || uuid1 !== nextProps.uuid1) {
      this.fetchData();
    }
  }

  fetchData = () => {
    this.props.filterData().then(({ data }) => {
      if (data) {
        console.log({data})
        this.setState({
          data,
        });
      } else {
        //error handeling
      }
    });
  };

  sortTable = ({ field, order }) => {
    const query = { field, order };
    query.order = order === "ascend" ? "asc" : "desc";
    this.fetchData(query);
  };

  handleSearchText = (ev) => {
    let searchText = ev.target.value;
    this.setState({
      searchText: searchText,
    });
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.fetchCount({ searchText: searchText });
      this.fetchData({ searchText: searchText });
    }, 500);
  };

  handlePageChange = (page) => {
    this.setState({ page });
    this.fetchData({ page });
  };

  handlePageSizeChange = (page, size) => {
    this.setState({ pageSize: size });
    this.fetchData({ limit: size });
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  returnClass = (data, index) => {
    return {
      className: "filter-header",
    };
  };

  render() {
    if (!this.state.data) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spin />
        </div>
      );
    } else if (this.state.error) {
      return <h1>There is a problem in loading.</h1>;
    }
    const { pageSize, loading, data, count, page, totalPages } = this.state;
    const { columns } = this.props;
    return (
      <div>
        <Row span={24}>
          <Col span={10}>
            {/* <Input 
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={this.state.searchText} onChange={this.handleSearchText}
                placeholder="Search Text" /> */}
          </Col>
        </Row>
        <Row style={{ margin: "10px 0" }}>
          <Table
            onHeaderRow={(record, index) => {
              this.returnClass(record, index);
            }}
            loading={loading}
            style={{ clear: "both", width: "100%" }}
            size="small"
            pagination={false}
            rowKey={(record) => record.id}
            columns={columns}
            onChange={(p, f, s) => this.sortTable(s)}
            dataSource={this.state.data}
          />
        </Row>
        <Row style={{ margin: "10px 0" }}>
          <div style={{ float: "right" }}>
            <Pagination defaultCurrent={page} defaultPageSize={3} />
          </div>
        </Row>
      </div>
    );
  }
}
