import React from 'react'
import {Table, Row} from 'antd'
import Spin from '../common/spin'
export default class FilterTable extends React.Component {
    state={error:null}
    componentDidMount() {
        this.fetchData()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.uuid !== nextProps.uuid) {
            this.fetchData()
        }
    }

    fetchData=()=> {
        this.props.filterData()
        .then(({users}) => {
            if(users){
                this.setState({
                    data: users
                })
            } else{
                //error handeling
            }
        })
    }
    sortTable = ({field, order}) => {
        const query = {field, order};
        query.order = order === 'ascend' ? 'asc' : 'desc'
        this.fetchData(query)
    }

    handleSearchText = ev => {
        let searchText = ev.target.value;
        this.setState({
            searchText: searchText
        })
        clearTimeout(this.debounceTimer) 
        this.debounceTimer = setTimeout(() => {
            this.fetchCount({searchText: searchText})
            this.fetchData({searchText: searchText})
        }, 500)
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    returnClass = (data, index) => {
        return {
            className: "filter-header"
        }
    }

    render() {
        const {loading, data} = this.state
        const {columns} = this.props
        if (!data) {
            return <Spin/>
        }
        return (
            <div>
                <Row style={{margin: '10px 0'}}>
                    <Table 
                        onHeaderRow={(record, index) => this.returnClass(record, index)} 
                        loading={loading} 
                        style={{ clear: 'both', width: '100%' }} 
                        size="small"
                        pagination={false}
                        rowKey={record => record.id}
                        columns={columns} 
                        onChange={(p, f, s) => this.sortTable(s)}
                        dataSource={data} />
                </Row>
            </div>
        )
    }
}
