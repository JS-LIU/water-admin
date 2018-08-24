import React, {Component} from 'react';
import { Input ,Button ,Table, Icon ,Col, Select, InputNumber, DatePicker } from 'antd';
const Search = Input.Search;
import rebateDealStyle from './css/rebateDealStyle.css';
const InputGroup = Input.Group;
const Option = Select.Option;
import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/finance/rebateDealInterface';

@observer class RebateDealView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return(
            <div>
                <RebateDisposeInquireView />
                <RebateDisposeDetails />
                <RebateOperation />
            </div>
        )
    }
}
//搜索区域
@observer class RebateDisposeInquireView extends Component{
    render(){
        return(
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
        )
    }
}

//各店铺返利详情
@observer class RebateDisposeDetails extends Component{
    changePage(pageNumber){
        actions.changePage(pageNumber);
    }
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
            width:150
        }, {
            title: '联系电话',
            dataIndex: 'phoneNum',
            key: 'phoneNum',
            width:150
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
            width:100
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
                rebateResult:item.rebateResult / 10
            })
        }
        const expandedRowRender = record => {
            const columns = [
                { title: "商品名称", dataIndex: "productName" , key: 'productName',width:300},
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
                scroll={{y:300,x:1130}}
                expandedRowRender={expandedRowRender}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            actions.selectRebateItem(record.rebateId);
                        },
                    };
                }}
                pagination={{defaultCurrent:data.pagination.page+1,onChange:this.changePage.bind(this),total:data.pagination.total}}
            />
        )
    }
}

//返利操作
@observer class RebateOperation extends Component{
    confirmRebate(){
        actions.confirmRebate();
    }
    render(){
        const columns = [
            { title: "商品名称", dataIndex: "productName" , key: 'productName',width:300},
            { title: '数量', dataIndex: "saleMount", key: 'saleMount' },
        ];
        const dataSource = [];
        for(let i = 0;i < data.activeItem.productItemList.length;i++){
            let item = data.activeItem.productItemList[i];
            dataSource.push({
                key:i,
                productName:item.productName,
                saleMount:item.saleMount,
            })
        }

        return(
            <div className="operation">
                <div className='order_detail_header'>
                    <span>返利操作</span>
                </div>

                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />

                <ul>
                    <li className="rebate_list">
                        <span>实际总进货数量（桶）: {data.detail.totalMount}</span>
                        <span>实际返利标准（/元）: {parseFloat(data.detail.rebatePrice)/100}</span>
                        <span>应该返利金额（/元）: {data.detail.rebateResult / 100}</span>
                        <span>实际返利金额（/元）:</span><InputNumber defaultValue={0} onChange={value => actions.setRealResult(value)}/>
                        <span>
                            备注：
                            <Input type="textarea" placeholder="填写备注" rows={4} style={{ width: 363, height:130}}/>
                        </span>
                        <Button type="primary" onClick={() => actions.confirmRebate()} className="rebate_btn">确认返利</Button>
                    </li>
                </ul>
            </div>
        )
    }
}

module.exports = RebateDealView;