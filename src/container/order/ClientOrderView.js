/**
 * Created by LDQ on 2018/4/28
 */

import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
// import OrderView from './OrderView';
import ClientOrderHeaderStyle from './css/ClientOrderHeaderStyle.css';
import clientOrderStyle from './css/orderStyle.css';
import huipayTableStyle from '../../Util/huipayAdminStyle/huipayTableStyle.css';
import ClientOrderList from '../../store/ClientOrderList';

// @inject(['order'])
@observer class ClientOrderView extends Component{
    componentWillMount(){
        this.clientOrderList = new ClientOrderList();
    }
    render(){

        return(
            <div>
                <ClientOrderListContainerView clientOrderList={this.clientOrderList}/>
                <div>
                    <ClientOrderDetailView clientOrderList={this.clientOrderList}/>
                </div>
            </div>
        )
    }
}


class ClientOrderListContainerView extends Component{
    componentWillMount(){
        this.props.clientOrderList.getOrderList();
    }
    render(){
        return(
            <div>
                <ClientOrderListQueryView clientOrderList={this.props.clientOrderList}/>
                <ClientOrderListView clientOrderList={this.props.clientOrderList}/>
            </div>
        )
    }
}
class ClientOrderListQueryView extends Component{
    render(){
        return (
            <div>
                搜索内容
            </div>
        )
    }
}
class ClientOrderListView extends Component{
    render(){
        return (
            <div className="huipay_table order_table">
                <ClientOrderHeaderView />
                <ClientOrderListBodyView clientOrderList={this.props.clientOrderList}/>
            </div>
        )
    }
}

/**
 * 用户订单头部
 */
class ClientOrderHeaderView extends Component{
    render(){
        return (
            <ul className="huipay_table_header order_table_header">
                <li>订单时间</li>
                <li>订单号</li>
                <li>商品名称</li>
                <li>数量</li>
                <li>收货人</li>
                <li>电话</li>
                <li>收货地址</li>
                <li>商品金额</li>
                <li>订单状态</li>
                <li>配送仓库</li>
            </ul>
        )
    }
}

@observer class ClientOrderListBodyView extends Component{
    componentWillMount(){

    }
    selectedOrder(order){
        return()=>{
            this.props.clientOrderList.selectedOrder(order);
        }
    }
    render(){
        let orderList = this.props.clientOrderList.orderList;
        let clientOrderItemNodes = orderList.map((order,i)=>{
            let productItemNodes = order.productItems.map((product,j)=>{
                return (
                    <li key={j}>
                        <span>{product.name}</span>
                        <span>{product.volume}</span>
                        <span>{product.count}</span>
                    </li>
                )
            });
            return (
                <li key={i} className="order_item" onClick={this.selectedOrder(order)}>
                    <span>{order.createTime}</span>
                    <span>{order.orderNo}</span>
                    <ul className="order_product_list">
                        {productItemNodes}
                    </ul>
                    <span>{order.receiver}</span>
                    <span>{order.userInfo}</span>
                    <span>{order.deliveryAddress}</span>
                    <span>{order.totalPrice}</span>
                    <span>{order.status}</span>
                    <span>{order.shopName}</span>
                </li>
            )
        });
        return (
            <ul>
                {clientOrderItemNodes}
            </ul>
        )
    }
}


@observer class ClientOrderDetailView extends Component{
    render() {
        let orderDetail = this.props.clientOrderList.activeOrder.orderDetail;

        return (
            <div>
                <div>订单详情</div>
                <ul>
                    <li>
                        <span>订单号：{orderDetail.orderNo}</span>
                    </li>
                </ul>
            </div>
        )
    }
}


class DeliveryMerchant extends Component{
    render(){
        return (
            <div>
                haha
            </div>
        )
    }
}



module.exports = ClientOrderView;