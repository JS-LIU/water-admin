/**
 * Created by LDQ on 2018/6/16
 */
import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import { Table, Tooltip , Button , Radio , Input , Cascader ,Form , Row, Col , DatePicker } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import {actions,data} from "../../store/order/clientOrderSearchInterface";


import clientOrderSearchStyle from './css/clientOrderSearch.css'

@observer class ClientOrderSearchView extends Component{
    state = { queryStrategy: "all" };
    componentWillMount(){
        actions.selectQueryMsg({});
        actions.onLoad();
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
    searchByCreateTime(data,dataString){
        actions.selectQueryMsg({createTimePeriod:dataString});
        actions.searchOrderList(this.props.queryStrategy)
    }
    searchByPayTime(data,dataString){
        actions.selectQueryMsg({payTimePeriod:dataString});
        actions.searchOrderList(this.props.queryStrategy)
    }
    searchByDispatchTime(data,dataString){
        actions.selectQueryMsg({dispatchTimePeriod:dataString});
        actions.searchOrderList(this.props.queryStrategy)
    }
    render(){
        let queryStrategy = this.props.queryStrategy;
        return (
            <Form>
                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem label={"账户查询"}>
                            <Search
                                placeholder="请输入用户手机号"
                                onSearch={value => {
                                    actions.selectQueryMsg({phoneNum:value});
                                    actions.searchOrderList(queryStrategy);
                                }}
                                enterButton
                            />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={"订单号"}>
                            <Search
                                placeholder="请输入订单号"
                                onSearch={value => {
                                    actions.selectQueryMsg({orderNo:value});
                                    actions.searchOrderList(queryStrategy);
                                }}
                                enterButton
                            />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={"订单创建时间"}>
                            <RangePicker onChange={this.searchByCreateTime.bind(this)} />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={"付款时间"}>
                            <RangePicker onChange={this.searchByPayTime.bind(this)} />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={"处理时间"}>
                            <RangePicker onChange={this.searchByDispatchTime.bind(this)} />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" onClick={actions.getExcel}>导出报表</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

@observer class ClientOrderListView extends Component{
    changePage(pageNum){
        actions.changePage(pageNum)
    }
    getOperate(orderStatus,orderId){
        if(orderStatus === "待收货"){
            return () => actions.confirmReceipt(orderId);
        }

    }
    operateText(orderStatus){
        if(orderStatus === "待收货"){
            return "确认收货"
        }else{
            return orderStatus
        }
    }
    render(){
        const columns = [
            {
                title:"创建时间",
                dataIndex:"createTime",
                key:"createTime",
                width:200
            },
            {
                title:"付款时间",
                dataIndex:"payTime",
                key:"payTime",
                width:200
            },
            {
                title:"订单号",
                dataIndex:"orderNo",
                key:"orderNo",
                width:200
            },

            {
                title:"用户账号",
                dataIndex:"userInfo",
                key:"userInfo",
                width:150
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
                width:180
            },
            {
                title:"商家编号",
                dataIndex:"shopArtificialNum",
                key:"shopArtificialNum",
                width:130
            },
            {
                title:"商家电话",
                dataIndex:"shopTelephone",
                key:"shopTelephone",
                width:100
            },{
                title:"促销",
                dataIndex:"promotionActivity",
                key:"promotionActivity",
                width:100
            },
            {
                title:"水票",
                dataIndex:"ticketUseNum",
                key:"ticketUseNum",
                width:100
            },
            {
                title:"立减（每桶）",
                dataIndex:"minusMount",
                key:"minusMount",
                width:100
            },
            {
                title:"运费",
                dataIndex:"freight",
                key:"freight",
                width:100
            },
            {
                title:"实付金额",
                dataIndex:"totalPrice",
                key:"totalPrice",
                width:100
            },
            {
                title:"支付方式",
                dataIndex:"payChannel",
                key:"payChannel",
                width:150
            },
            {
                title:"订单状态",
                dataIndex:"orderStatus",
                key:"orderStatus",
                width:100,
                render:(text,record) =>{return (<a href="javascript:void(0)" onClick={this.getOperate(record.orderStatus,record.orderId)}>{this.operateText(record.orderStatus,record.orderId)}</a>)}
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
                orderStatus:item.orderStatus,
                orderId:item.orderId
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
                scroll={{x:2600,y:600}}
                pagination={{current:data.pagination.page+1,onChange:this.changePage.bind(this),total:data.pagination.total}}
            />
        )
    }
}

module.exports = ClientOrderSearchView;