import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Button, DatePicker, Form, Select ,Table} from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
import {Col, Row} from "antd";

import waterVoteUpStyle from './css/waterVoteUpStyle.css'
import {data} from "../../store/order/clientOrderSearchInterface";

@observer class WaterVoteUpView extends Component{
    render(){
        return(
            <div>
                <WaterVoteUpSearchView />
                <WaterVoteUpListView />
            </div>
        )
    }
}
// 水票回笼搜索
@observer class WaterVoteUpSearchView extends Component{
    render(){
        function onChange(date, dateString) {}
        function handleChange(value) {}
        return(
            <div className="search_area">
                <ul className="search_area_list">
                    <li>
                        <span>订单时间：</span>
                        <RangePicker onChange={onChange} />
                    </li>
                    <li>
                        <span>促销水票：</span>
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="jack">喜腾山泉</Option>
                            <Option value="lucy">恒大山泉</Option>
                            <Option value="disabled">娃哈哈</Option>
                        </Select>
                    </li>
                    <Button type="primary"  style={{ width: 80 }}>查询</Button>
                </ul>
                <Button type="primary">导出报表</Button>
            </div>
        )
    }
}

// 水票回笼列表
@observer class WaterVoteUpListView extends Component{
    render(){
        const columns = [
            {
                title:"订单时间",
                dataIndex:"createTime",
                key:"createTime",
                width:200
            },{
                title:"订单号",
                dataIndex:"payTime",
                key:"payTime",
                width:200
            },{
                title:"用户订单",
                dataIndex:"orderNo",
                key:"orderNo",
                width:200
            },{
                title:"水票名称",
                dataIndex:"userInfo",
                key:"userInfo",
                width:150
            },{
                title:"数量",
                dataIndex:"receiver",
                key:"receiver",
                width:100
            },{
                title:"水票来源",
                dataIndex:"deliveryAddress",
                key:"deliveryAddress",
                width:300
            }
        ];
        const dataSource = [];
        for(let i=0;i<data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                createTime:item.createTime,
                payTime:item.payTime,
                orderNo:item.orderNo,
                promotionActivityInfo:item.promotionActivityInfo,
                userWaterTicket:item.userWaterTicket,
                productItems:item.productItems,
            })
        }
        const expandedRowRender = record => {
            const columns = [
                {
                    title:"商品名称",
                    dataIndex:"name",
                    key:"name",
                    width:200
                },
                {
                    title:"规格",
                    dataIndex:"volume",
                    key:"volume",
                    width:200
                },
                {
                    title:"单价（元）",
                    dataIndex:"price",
                    key:"price",
                    width:200
                },
                {
                    title:"数量",
                    dataIndex:"count",
                    key:"count",
                }
            ];
            const dataSource = [];
            for(let i = 0;i < record.productItems.length;i++){
                let item = record.productItems[i];
                dataSource.push({
                    key:i,
                    name:item.name,
                    volume:item.volume,
                    price:item.price / 100,
                    count:item.count
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
                expandedRowRender={expandedRowRender}
                scroll={{x:1150,y:600}}
                // pagination={{current:data.pagination.page+1,onChange:this.changePage.bind(this),total:data.pagination.total}}
            />
        )
    }
}

module.exports = WaterVoteUpView;