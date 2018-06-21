import React, {Component} from 'react';
import rebateSearchStyle from './css/rebateSearchStyle.css';
import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/finance/rebateListSearchInterface';

import { Input , Button , Radio ,Table, Icon} from 'antd';
const Search = Input.Search;

@observer class RebateSearchView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return(
            <div>
                <RebateInquireView />
                <CommodityDetailsTable />
            </div>
        )
    }
}
//搜索区域
@observer class RebateInquireView extends Component{
    state = { queryInfo: 0 };
    onChange(e){
        this.setState({ queryInfo: e.target.value });
        actions.setQueryInfo(e.target.value);
    }
    render(){
        const { queryInfo } = this.state;
        return(
            <div>
                <div className="inquire_view">
                    <span>
                        <Search
                            placeholder="输入店铺编号"
                            onSearch={value => {
                                actions.setQueryInfo({shopAlians:value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </span>
                        <span>
                        <Search
                            placeholder="输入店铺名称"
                            onSearch={value => {
                                actions.setQueryInfo({shopName:value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </span>
                        <span>
                        <Search
                            placeholder="输入电话号码"
                            onSearch={value => {
                                actions.setQueryInfo({phoneNum:value});
                                actions.queryByQueryInfo();
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </span>
                </div>

                <Radio.Group value={queryInfo} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={0}>待返利</Radio.Button>
                    <Radio.Button value={1}>已返利</Radio.Button>
                </Radio.Group>
            </div>

        )
    }
}

//商品详情表格
@observer class CommodityDetailsTable extends Component{
    render(){
        const columns = [{
            title: '月份',
            dataIndex: 'month',
            key: 'month',
            width:80
        }, {
            title: '店铺编号',
            dataIndex: 'shopAlians',
            key: 'shopAlians',
            width:100
        }, {
            title: '店铺名称',
            dataIndex: 'shopName',
            key: 'shopName',
            width:100
        }, {
            title: '联系电话',
            dataIndex: 'phoneNum',
            key: 'phoneNum',
            width:130
        },
            {
            title: '区域',
            dataIndex: 'city',
            key: 'city',
            width:80
        },
            {
            title: '详细地址',
            dataIndex: 'address',
            key: 'address',
            width:200
        },
            {
            title: '进货商品',
            dataIndex: 'productName',
            key: 'productName',
            width:330
        },
            {
            title: '数量（桶）',
            dataIndex: 'productMount',
            key: 'productMount',
            width:100
        },
            {
            title: '总进货数量（桶）',
            dataIndex: 'totalMount',
            key: 'totalMount',
            width:150
        }, {
            title: '返利标准',
            dataIndex: 'rebateOrderId',
            key: 'rebateOrderId',
            width:100
        }, {
            title: '返利金额（元）',
            dataIndex: 'rebatePrice',
            key: 'rebatePrice',
            width:130
        }, {
            title: '实际总进货数量（桶）',
            dataIndex: 'realTotalMount',
            key: 'realTotalMount',
            width:150
        },
            {
            title: '实际返利金额（元）',
            dataIndex: 'rebateResult',
            key: 'rebateResult',
            width:150
        },
            {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width:100
        },
            {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width:100
        }];

        const dataSource = [];
        for(let i = 0;i < data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                month:item.month+"月",
                shopAlians:item.shopAlians,
                shopName:item.shopName,
                phoneNum:item.phoneNum,
                city:item.city,
                address:item.address,
                productName:item.productName,
                productMount:item.productMount/10,
                totalMount:item.totalMount,
                rebateOrderId:item.rebateOrderId/10+"元",
                rebatePrice:item.rebatePrice/100,
                totalPrice:item.totalPrice,
                realTotalMount:item.realTotalMount,
                rebateResult:item.rebateResult/100,
                remark:item.remark,
                status:item.status
            })
        }
        return(
            <div className="table">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{y:300,x:2400}}
                />
            </div>
        )
    }
}

module.exports = RebateSearchView;