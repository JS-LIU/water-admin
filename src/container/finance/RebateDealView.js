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
            dataIndex: 'stockProcutMap ',
            key: 'stockProcutMap ',
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
                stockProcutMap:item.stockProcutMap,
                productMount:item.productMount,
                totalMount :item.totalMount ,
                realTotalMount:item.realTotalMount,
                rebatePriceExcel:item.rebatePriceExcel/10+"元",
                rebatePrice:item.rebatePrice,
                remark:item.remark,
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
        return(
            <div className="operation">
                <div className='order_detail_header'>
                    <span>返利操作</span>
                </div>
                <ul>
                    <li className="rebate_list">
                        <span>实际总进货数量（桶）: {data.detail.realTotalMount}</span>
                        <span>实际返利标准（/元）: {data.detail.rebatePriceExcel}</span>
                        <span>实际返利金额（/元）: {data.detail.rebateResult / 100}</span>
                        <span>
                            备注：
                            <Input type="textarea" placeholder="填写备注" rows={4} style={{ width: 363, height:130}}/>
                        </span>
                        <Button type="primary" onClick={actions.confirmRebate} className="rebate_btn">确认返利</Button>
                    </li>
                </ul>
            </div>
        )
    }
}

module.exports = RebateDealView;