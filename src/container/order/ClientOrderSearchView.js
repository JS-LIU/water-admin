/**
 * Created by LDQ on 2018/6/16
 */
import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import { Table, Tooltip , Button , Radio , Input , Cascader  } from 'antd';
const Search = Input.Search;

import {actions,data} from "../../store/order/clientOrderSearchInterface";
import clientOrderSearchStyle from './css/clientOrderSearch.css'

@observer class ClientOrderSearchView extends Component{
    state = { queryStrategy: "all" };
    componentWillMount(){
        actions.selectQueryMsg({});
        actions.searchOrderList(this.state.queryStrategy)
    }
    onChange(e){
        this.setState({ queryStrategy: e.target.value });
        actions.selectQueryMsg({});
        actions.searchOrderList(e.target.value);
    }
    render(){
        const { queryStrategy } = this.state;
        return (
            <div>
                <OrderListSearchView queryStrategy={queryStrategy}/>
                <Radio.Group value={queryStrategy} onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }} >
                    <Radio.Button value={"all"}>全部</Radio.Button>
                    <Radio.Button value={"waitPay"}>待付款</Radio.Button>
                    <Radio.Button value={"waitDispatch"}>待派单</Radio.Button>
                    <Radio.Button value={"waitDelivery"}>待配送</Radio.Button>
                    <Radio.Button value={"waitReceive"}>待收货</Radio.Button>
                    <Radio.Button value={"finish"}>已完成</Radio.Button>
                </Radio.Group>
                <ClientOrderListView />
            </div>

        )
    }
}
@observer class OrderListSearchView extends Component{
    render(){
        let queryStrategy = this.props.queryStrategy;
        return (
            <div className='all_search_box mb15'>
                 <div>
                     <span>订单号:</span>
                     <Search
                         placeholder="输入订单号"
                         onSearch={value => {
                             actions.selectQueryMsg({orderNo:value});
                             actions.searchOrderList(queryStrategy);
                         }}
                         enterButton
                         style={{ marginBottom: 16 }}
                     />
                </div>
                <div>
                    <span>收货人:</span>
                    <Search
                        placeholder="输入收货人"
                        onSearch={value => {
                            actions.selectQueryMsg({receiver:value});
                            actions.searchOrderList(queryStrategy);
                        }}
                        enterButton
                        style={{ marginBottom: 16 }}
                    />
                </div>
                <div>
                    <span>收货人电话:</span>
                    <Search
                        placeholder="输入收货人电话"
                        onSearch={value => {
                            actions.selectQueryMsg({receiver:value});
                            actions.searchOrderList(queryStrategy);
                        }}
                        enterButton
                        style={{ marginBottom: 16 }}
                    />
                </div>
                <div>
                    <span>配送商家:</span>
                    <Search
                        placeholder="输入配送商家名称或编号"
                        onSearch={value => {
                            actions.selectQueryMsg({shopArtificialNum:value});
                            actions.searchOrderList(queryStrategy);
                        }}
                        enterButton
                        style={{ marginBottom: 16 }}
                    />
                </div>
            </div>
        )
    }
}

@observer class ClientOrderListView extends Component{
    changePage(){

    }
    render(){
        const columns = [
            {
                title:"订单时间",
                dataIndex:"createTime",
                key:"createTime",
                width:200
            },
            {
                title:"订单号",
                dataIndex:"orderNo",
                key:"orderNo",
                width:300
            },
            {
                title:"促销",
                dataIndex:"promotionActivity",
                key:"promotionActivity",
                width:200
            },
            {
                title:"水票",
                dataIndex:"ticketUseNum",
                key:"ticketUseNum",
                width:200
            },
            {
                title:"立减（每桶）",
                dataIndex:"minusMount",
                key:"minusMount",
                width:200
            },
            {
                title:"运费",
                dataIndex:"freight",
                key:"freight",
                width:200
            },
            {
                title:"实付金额",
                dataIndex:"totalPrice",
                key:"totalPrice",
                width:200
            },
            {
                title:"支付方式",
                dataIndex:"payChannel",
                key:"payChannel",
                width:200
            },
            {
                title:"用户账号",
                dataIndex:"userInfo",
                key:"userInfo",
                width:200
            },
            {
                title:"收货人",
                dataIndex:"receiver",
                key:"receiver",
                width:200
            },
            {
                title:"收获地址",
                dataIndex:"deliveryAddress",
                key:"deliveryAddress",
                width:400
            },
            {
                title:"配送商家",
                dataIndex:"shopName",
                key:"shopName",
                width:200
            },
            {
                title:"商家编号",
                dataIndex:"shopArtificialNum",
                key:"shopArtificialNum",
                width:200
            },
            {
                title:"商家电话",
                dataIndex:"shopTelephone",
                key:"shopTelephone",
                width:200
            },
            {
                title:"订单状态",
                dataIndex:"orderStatus",
                key:"orderStatus",
                width:200
            }

        ];
        const dataSource = [];
        for(let i=0;i<data.list.length;i++){
            let item = data.list[i];
            dataSource.push({
                key:i,
                createTime:item.createTime,
                orderNo:item.orderNo,
                productItems:item.productItems,
                promotionActivity:item.promotionActivity,
                ticketUseNum:item.ticketUseNum,
                minusMount:item.minusMount,
                freight:item.freight,
                totalPrice:item.totalPrice,
                payChannel:item.payChannel,
                userInfo:item.userInfo,
                receiver:item.receiver,
                deliveryAddress:item.deliveryAddress,
                shopName:item.shopName,
                shopArtificialNum:item.deliveryShop.shopArtificialNum,
                shopTelephone:item.deliveryShop.shopTelephone,
                orderStatus:item.orderStatus
            })
        }
        const expandedRowRender = record => {
            const columns = [
                {
                    title:"商品名称",
                    dataIndex:"name",
                    key:"name",
                    width:100
                },
                {
                    title:"规格",
                    dataIndex:"volume",
                    key:"volume",
                    width:100,
                },
                {
                    title:"单价（元）",
                    dataIndex:"price",
                    key:"price",
                    width:100,
                },
                {
                    title:"数量",
                    dataIndex:"count",
                    key:"count",
                    width:100,
                }
            ];
            const dataSource = [];
            for(let i = 0;i < record.productItems.length;i++){
                let item = record.productItems[i];
                dataSource.push({
                    key:i,
                    name:item.name,
                    volume:item.volume,
                    price:item.price,
                    count:item.count / 100
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
                scroll={{x:3300,y:600}}
                pagination={{defaultCurrent:data.pagination.page+1,onChange:this.changePage.bind(this),total:data.pagination.total}}
            />
        )
    }
}

module.exports = ClientOrderSearchView;