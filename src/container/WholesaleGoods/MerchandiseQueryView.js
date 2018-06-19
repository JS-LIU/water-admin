
import React, {Component} from 'react'
import { Table, Pagination , Button , Radio , Input , Select } from 'antd';
const Search = Input.Search;
import {observer,inject} from 'mobx-react';
const Option = Select.Option;

// import {data, actions} from '../../store/merchant/merchantSearchInterface'

@observer class MerchandiseQueryView extends Component{
    componentWillMount(){
        // actions.onLoad();
    }
    render(){
        return (
            <div>
                商品查询
                {/*<MerchandiseListQueryView/>*/}
                {/*<MerchandiseListView/>*/}
            </div>
        )
    }
}

//  搜索
@observer class MerchandiseListQueryView extends Component{
    state = {
        queryType:0
    }

    onChange(e) {
        this.setState({queryType: e.target.value});
        if (e.target.value === 0) {
            actions.getPersonalList();
        } else {
            actions.getCorporateList();
        }
    }

    handleChange() {

    }

    render(){
        const {queryType} = this.state;
        return(
            <div>
                <div className='all_search_box mb15'>
                    <div>
                        <span>商品名称:</span>
                        <Search
                            placeholder="输入店铺名称"
                            onSearch={value => {
                                actions.setQueryInfo({shopName: value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{marginBottom: 16}}
                        />
                    </div>
                    <div>
                        <span>商品品牌:</span>
                        <Search
                            placeholder="选择商品品牌"
                            onSearch={value => {
                                actions.setQueryInfo({shopManagerName: value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{marginBottom: 16}}
                        />
                    </div>
                    <div>
                        <span>商品分类:</span>
                        <Search
                            placeholder="选择商品分类"
                            onSearch={value => {
                                actions.setQueryInfo({shopManagerTel: value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{marginBottom: 16}}
                        />
                    </div>
                </div>
                <Radio.Group value={queryType} onChange={this.onChange.bind(this)} style={{marginBottom: 16}}>
                    <Radio.Button value={0}>在售中</Radio.Button>
                    <Radio.Button value={1}>待上架</Radio.Button>
                </Radio.Group>
            </div>
        )
    }
}

@observer class MerchandiseListView extends Component{
    changePage(){

    }
    render(){
        const columns = [
            {
                title:'商品名称',
                dataIndex:'shopName',
                key:'shopName',
                width:200
            },
            {
                title:'规格',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'商品头像',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'商品品牌',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'分类',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'所属区域',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'销售价',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'原价',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'成本价',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'已售',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'库存',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'促销',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'商品图片',
                dataIndex:'',
                key:'',
                width:200,
                render:(text,record)=>(<img src='' alt=""/>)
            },
            {
                title:'图片详情',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'服务',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'标签',
                dataIndex:'',
                key:'',
                width:200
            },
            {
                title:'状态',
                dataIndex:'',
                key:'',
                width:200
            }
        ]
        const dataSource = [];
        for(let i=0;i<data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                shopName:item.shopName
            })
        }
        return(
            <Table
                className = "components-table-demo-nested"
                columns = {columns}
                dataSource = {dataSource}
                scroll = {{x:2000}}
                pagination={{total:data.totalPage,defaultCurrent:1,onChange:this.changePage.bind(this)}}
            >
            </Table>
        )
    }
}

module.exports = MerchandiseQueryView;