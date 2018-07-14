import React, {Component} from 'react';
import { Input ,Button ,Table, Icon ,Col, Select, InputNumber, DatePicker} from 'antd';
const Search = Input.Search;
import rebateDealStyle from './css/rebateDealStyle.css';
const InputGroup = Input.Group;
const Option = Select.Option;
import {observer,inject} from 'mobx-react';
import {data,actions} from '../../store/finance/rebateDealInterface';

@observer class RebateDealView extends Component{
    componentWillMount(){
        console.log(123123123);
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
        actions.changePagination(pageNumber);
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
        }, {
            title: '进货商品',
            dataIndex: 'productName',
            key: 'productName',
            width:350
        },{
            title: '数量',
            dataIndex: 'productMount',
            key: 'productMount',
            width:100
        },{
            title: '总进货数量（桶）',
            dataIndex: 'totalMount',
            key: 'totalMount',
            width:150
        }, {
            title: '实际进货数量',
            dataIndex: 'realTotalMount',
            key: 'realTotalMount',
            width:150
        },{
            title: '返利标准（/桶）',
            dataIndex: 'rebatePriceExcel',
            key: 'rebatePriceExcel',
            width:150
        }, {
            title: '返利金额（元）',
            dataIndex: 'rebatePrice',
            key: 'rebatePrice',
            width:150
        }, {
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
                productItemList:item.productItemList,
                totalMount:item.totalMount,
                realTotalMount:item.realTotalMount,
                rebateId:item.rebateId,
                rebatePriceExcel:item.rebatePriceExcel/10+"元",
                rebatePrice:item.rebatePrice,
                remark:item.remark,
                productName:item.productName,
                productMount:item.productMount/10,
                status:item.status,
            })
        }
        return(
            <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{y:300,x:1680}}
                pagination={{total:data.total,defaultCurrent:1,onChange:this.changePage.bind(this)}}
            />
        )
    }
}

//返利操作
@observer class RebateOperation extends Component{
    render(){
        const columns = [{
            title: '商店名称',
            dataIndex: 'shopName',
            key: 'shopName',
            width:100
        }, {
            title: '规格',
            dataIndex: '11',
            key: '11',
            width:50
        },  {
            title: '返利标准（/桶）',
            dataIndex: 'rebatePerPrice',
            key: 'rebatePerPrice',
            width:50
        }, {
            title: '返利金额（元）',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width:50
        }];

        const dataSource = [];
        for(let i = 0;i < data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                shopName:item.shopName,
                rebatePerPrice:item.rebatePerPrice,
                totalPrice:item.totalPrice
            })
        }
        return(
            <div className="operation">
                <div className='order_detail_header'>
                    <span>返利操作</span>
                </div>
                <ul className="left">
                    <li className="order_detail_list">
                        <span>店铺名称：{data.detail.shopName}</span>
                        <span>店铺编号：{data.detail.shopAlians}</span>
                    </li>
                    <li className="order_detail_list">
                        <span>联系电话：{data.detail.phoneNum}</span>
                        <span>详细地址：{data.detail.address}</span>
                    </li>

                    <div className="rebate_operation">
                        <Table columns={columns} dataSource={dataSource} />
                    </div>
                </ul>
                <ul className="right">
                    <span>
                        实际总进货数量（桶）：
                        <Input placeholder="输入实际总进货数" style={{ width: 250 }}/>
                    </span>
                    <span>
                        实际返利标准（/桶）：
                        {/*<Input placeholder="输入实际返利标准" style={{ width: 260 }} onFocus={actions.selectRebateItem} />*/}

                        <Select defaultValue="选择实际返利" style={{ width: 265 }}>
                            <Option value="Option1">0.5元</Option>
                            <Option value="Option2">1.00元</Option>
                            <Option value="Option3">1.5元</Option>
                            <Option value="Option4">2.00元</Option>
                        </Select>
                    </span>

                    <span>
                        实际返利金额（元）：
                        <Input placeholder="输入实际返利金额" style={{ width: 265 }}/>
                    </span>
                    <span>
                        备注：
                        <Input type="textarea" placeholder="填写备注" rows={4} style={{ width: 363, height:130}}/>
                    </span>
                    <Button type="primary" onClick={() => actions.confirmRebate()}>确认返利</Button>
                </ul>
            </div>
        )
    }
}

module.exports = RebateDealView;