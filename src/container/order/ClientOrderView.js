/**
 * Created by LDQ on 2018/4/28
 */

import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
// import OrderView from './OrderView';
import ClientOrderHeaderStyle from './css/ClientOrderHeaderStyle.css';
import clientOrderStyle from './css/orderStyle.css';
import huipayTableStyle from '../../Util/huipayAdminStyle/huipayTableStyle.css';
import clientOrderList from '../../store/ClientOrderList';
import merchantListContainer from '../../store/MerchantListContainer';
// @inject(['order'])
@observer class ClientOrderView extends Component{
    render(){

        return(
            <div>
                <ClientOrderListContainerView />
                <div className='client_order_bottom'>
                    <ClientOrderDetailView />
                    <DeliveryMerchantListView />
                </div>
            </div>
        )
    }
}

@observer class ClientOrderQueryInfoView extends Component{

    queryByOrderNo(){
        return ()=>{
            let orderNo = this.props.refs.orderNo;
            // this.clientOrderList.selectQueryMsg({orderNo:orderNo})
        }
    }
    render(){
        return(
            <ul>
                <li>
                    <span>订单号：</span>
                    <input type="text" ref="orderNo"/>
                    <span onClick={this.queryByOrderNo}>查询</span>
                </li>

            </ul>
        )
    }
}

class ClientOrderListContainerView extends Component{
    componentWillMount(){
        clientOrderList.getOrderList().then(()=>{
            clientOrderList.selectedOrder(clientOrderList.orderList[0]);
            merchantListContainer.getNearMerchantList()
        });

    }
    render(){
        return(
            <div>
                <ClientOrderListQueryView />
                <ClientOrderListView />
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
                <ClientOrderListBodyView />
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
            clientOrderList.selectedOrder(order);
        }
    }
    render(){
        let orderList = clientOrderList.orderList;
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
                    <span>{order.deliveryShop.shopName}</span>
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
        let orderDetail = clientOrderList.activeOrder.orderDetail;

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


@observer class DeliveryMerchantListView extends Component{
    constructor(){
        super();
    }
    dispatchOrder(merchantShop){
        return ()=>{
            clientOrderList.activeOrder.dispatchOrder(merchantShop);
        }
    }
    render(){

        let merchantShopNodes = merchantListContainer.merchantList.map((merchantShop,i)=>{
            return (
                <li key={i}>
                    <span>{merchantShop.shopName}</span>
                    <span onClick={this.dispatchOrder(merchantShop)}>确认派单</span>
                </li>
            )
        });
        return (
            <ul>
                {merchantShopNodes}
            </ul>
        )
    }
}
//
// @observer class MerchantListView extends Component{
//
//     render(){
//
//         return(
//             <ul>
//                 {merchantShopNodes}
//             </ul>
//         )
//     }
//
// }

module.exports = ClientOrderView;