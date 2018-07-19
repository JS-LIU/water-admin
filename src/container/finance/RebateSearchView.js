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
    state = { rebateStatus: "create" };
    onChange(e){
        this.setState({ rebateStatus: e.target.value });
        actions.changeType(e.target.value);
    }
    render(){
        const { rebateStatus } = this.state;
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

                <Radio.Group value={rebateStatus} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={"create"}>待返利</Radio.Button>
                    <Radio.Button value={"over"}>已返利</Radio.Button>
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
            width:150
        }, {
            title: '店铺名称',
            dataIndex: 'shopName',
            key: 'shopName',
            width:250
        }, {
            title: '联系电话',
            dataIndex: 'phoneNum',
            key: 'phoneNum',
            width:200
        },{
            title: '总进货数量（桶）',
            dataIndex: 'totalMount',
            key: 'totalMount',
            width:150
        }, {
            title: '返利标准（元）',
            dataIndex: 'rebatePrice',
            key: 'rebatePrice',
            width:150
        }, {
            title: '返利金额',
            dataIndex: 'rebateResult',
            key: 'rebateResult',
            width:150
        },{
            title:"评论",
            dataIndex:'remark',
            key:"remark",
            width:180
        },{
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
                totalMount :item.totalMount ,
                rebatePrice:parseFloat(item.rebatePrice) / 100,
                remark:item.remark,
                status:item.status,
                rebateId:item.rebateId,
                productItemList:item.productItemList,
                rebateResult:item.rebateResult / 100
            })
        }
        const expandedRowRender = record => {
            const columns = [
                { title: "商品名称", dataIndex: "productName" , key: 'productName'},
                { title: '数量', dataIndex: "saleMount", key: 'saleMount' },
            ];
            const dataSource = [];
            for(let i = 0;i < record.productItemList.length;i++){
                let item = record.productItemList[i];
                dataSource.push({
                    key:i,
                    productName:item.productName,
                    saleMount:item.saleMount,
                })
            }

            return (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            );
        };
        return(
            <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{y:300,x:1680}}
                expandedRowRender={expandedRowRender}
                pagination={{total:data.pagination.total,current:data.pagination.page+1,onChange:value => actions.changePage(value)}}
            />
        )
    }
}

module.exports = RebateSearchView;