/**
 * Created by LDQ on 2018/6/16
 */
import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import { Table, Tooltip , Button , Radio , Input , Cascader ,Form , Row, Col , DatePicker } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

import {actions,data} from "../../store/order/merchantOrderSearchInterface";
import clientOrderSearchStyle from './css/clientOrderSearch.css'
import ClearSuffixInput from "../../components/ClearSuffixInput";
import RadioQueryTabList from "../../components/RadioQueryTabList";

@observer class MerchantOrderSearchView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return (
            <div>
                <OrderListSearchView />
                <PaymentMethodTotalAmountView />
                <MerchantOrderListView />
            </div>
        )
    }
}

//各种支付方式总金额
@observer class  PaymentMethodTotalAmountView extends Component{
    render(){
        return(
            <ul className="pay_ment_money">
                <li>
                    支付宝：
                    <span>{data.payInfo.aliPayMount}</span>
                </li>
                <li>
                    微信：
                    <span>{data.payInfo.wechatPayMount}</span>
                </li>
                <li>
                    钱包支付：
                    <span>{data.payInfo.rmbPayMount}</span>
                </li>
            </ul>
        )
    }
}

@observer class OrderListSearchView extends Component{
    state = {
        loading: false,
        // orderType:'all'
    };

    enterLoading = () => {
        this.setState({ loading: true });
        actions.queryByQueryInfo(()=>{this.setState({
            loading: false
        })});
    };
    render(){
        return (
            <Form layout="inline">
                <FormItem label={"账户查询"}>
                    <ClearSuffixInput
                        changeHandle={(phoneNum)=>actions.selectQueryMsg({phoneNum:phoneNum})}
                        clearHandle={()=>actions.selectQueryMsg({phoneNum:null})}
                        placeholder="请输入用户手机号"
                    />
                </FormItem>
                <FormItem label={"订单号"}>
                    <ClearSuffixInput
                        changeHandle={(orderNo)=>actions.selectQueryMsg({orderNo:orderNo})}
                        clearHandle={()=>actions.selectQueryMsg({orderNo:null})}
                        placeholder="请输入订单号"
                    />
                </FormItem>
                <FormItem label={"创建时间"}>
                    <RangePicker onChange={(data,dataString) => actions.selectQueryMsg({createTimePeriod:dataString})} />
                </FormItem>
                <FormItem label={"付款时间"}>
                    <RangePicker onChange={(data,dataString) => actions.selectQueryMsg({payTimePeriod:dataString})} />
                </FormItem>
                <FormItem label={"处理时间"}>
                    <RangePicker onChange={(data,dataString) => actions.selectQueryMsg({dispatchTimePeriod:dataString})} />
                </FormItem>
                <FormItem label={"订单状态"}>
                    <RadioQueryTabList
                        defaultValue={'all'}
                        changeHandle={targetValue => actions.setOrderType(targetValue)}
                        radioList={[
                            {key:"all",name:"全部"},
                            {key:"alreadyPay",name:"已付款"},
                            {key:"waitPay",name:"待付款"},
                            {key:"waitDispatch",name:"待派单"},
                            {key:"waitDelivery",name:"待配送"},
                            {key:"finish",name:"已完成"}]}
                    />
                </FormItem>
                <FormItem>
                    <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                        查询
                    </Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" >重置</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={actions.getExcel}>导出报表</Button>
                </FormItem>
            </Form>
        )
    }
}

@observer class MerchantOrderListView extends Component{
    state={
        activeLineIndex:-1,
        otherRowClass:"",
    };
    setClassName(record, index){
        return index === this.state.activeLineIndex?"activeRowStyle":this.state.otherRowClass;
    }
    setActiveLineIndex(index){
        this.setState({
            activeLineIndex:index,
            tableHeight:100
        });
    }
    changePage(pageNum){
        actions.changePage(pageNum);
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
                title:"配送商家",
                dataIndex:"shopName",
                key:"shopName",
                width:150
            },
            {
                title:"商家编号",
                dataIndex:"shopArtificialNum",
                key:"shopArtificialNum",
                width:100
            },
            {
                title:"实付金额",
                dataIndex:"totalPrice",
                key:"totalPrice",
                width:150
            },
            {
                title:"支付方式",
                dataIndex:"payChannel",
                key:"payChannel",
                width:150
            },
            {
                title:"用户账号",
                dataIndex:"userInfo",
                key:"userInfo",
                width:150
            },
            {
                title:"收货人-电话",
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
                title:"商家电话",
                dataIndex:"shopTelephone",
                key:"shopTelephone",
                width:150
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
                width:120
            },
            {
                title:"运费",
                dataIndex:"freight",
                key:"freight",
                width:100
            },
            {
                title:"订单状态",
                dataIndex:"orderStatus",
                key:"ordearStatus",
                width:100,
                render:(text,record) =>{return (<a href="javascript:void(0)" onClick={this.getOperate(record.orderStatus,record.orderId)}>{this.operateText(record.orderStatus)}</a>)}
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
                shopName:item.deliveryMerchant.shopName,
                shopArtificialNum:item.deliveryMerchant.shopArtificialNum,
                shopTelephone:item.deliveryMerchant.shopTelephone,
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
                    width:200,
                },
                {
                    title:"单价（元）",
                    dataIndex:"price",
                    key:"price",
                    width:200,
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
                onRow={(record,index) => {
                    return {
                        onClick: () => {
                            this.setActiveLineIndex(index);
                        }
                    };
                }}
                rowClassName={this.setClassName.bind(this)}
                scroll={{x:2550,y:600}}
                pagination={{current:data.pagination.page+1,onChange:this.changePage.bind(this),total:data.pagination.total}}
            />
        )
    }
}

module.exports = MerchantOrderSearchView;