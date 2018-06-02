/**
 * Created by LDQ on 2018/4/28
 */

import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
// import OrderView from './OrderView';
import clientOrderHeaderStyle from './css/ClientOrderHeaderStyle.css';
import clientOrderStyle from './css/orderStyle.css';
import huipayTableStyle from '../../Util/huipayAdminStyle/huipayTableStyle.css';
import {data,actions} from '../../store/order/clientOrderListInterface';

@observer class ClientOrderView extends Component{
    componentWillMount(){
        actions.onLoad();
    }
    render(){
        return(
            <div>
                <ClientOrderListContainerView/>
                <div className='client_order_bottom'>
                    <ClientOrderDetailView />
                    <DeliveryMerchantListView />
                </div>
            </div>
        )
    }
}

class ClientOrderListContainerView extends Component{
    componentWillMount(){
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


//  搜索
class ClientOrderListQueryView extends Component{
    render(){
        return (
            <OrderView />
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


//  所有订单
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
                        <span className='mr30'>{product.name}{product.volume}</span>
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
                    <span className='mr30'>{order.deliveryAddress}</span>
                    <span>{order.totalPrice}</span>
                    <span>{order.orderInfo.status}</span>
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


//  订单详情
@observer class ClientOrderDetailView extends Component{
    render() {
        let orderDetail = this.props.clientOrderList.activeOrder.orderDetail;
        return (
            <div className='order_detail'>
                <div className='order_detail_header'>订单详情</div>
                <ul className='order_detail_left'>
                    <li>
                        <span>订单号：{orderDetail.orderNo}</span>
                        <span className="send_orders">订单时间：{orderDetail.createTime}</span>
                    </li>
                    <li>
                        <div> 收货人：{orderDetail.receiver} </div>
                        <div> 收货地址：{orderDetail.shopAddress}  </div>
                    </li>
                    <li>
                        <div className='order_detail_shop'>
                            <span>商品名称</span>
                            <span>规格</span>
                            <span>单价</span>
                            <span>数量</span>
                        </div>
                        <div className='order_detail_shop'>
                            {/*<span>{orderDetail.productItems.name}</span>*/}
                            {/*<span>{orderDetail.productItems.colume}</span>*/}
                            {/*<span>{orderDetail.productItems.price}</span>*/}
                            {/*<span>{orderDetail.productItems.count}</span>*/}
                        </div>
                    </li>
                    <li className='shop_price_container'>
                        <div className='shop_price'>
                            <span>商品金额：</span>
                            <span>￥{orderDetail.orderInfo.buyAmount}</span>
                        </div>
                        <div className='shop_price'>
                            <span>水票（使用0张）：</span>
                            <span>-0.0</span>
                        </div>
                        <div className='shop_price'>
                            <span>优惠券（未使用）：</span>
                            <span>-0.0</span>
                        </div>
                        <div className='shop_price'>
                            <span>立减：</span>
                            <span>-0.0</span>
                        </div>
                        <div className='shop_price'>
                            <span>运费：</span>
                            <span>-0.0</span>
                        </div>
                        <div className='shop_price'>
                            <span>实付金额：</span>
                            <span>-0.0</span>
                        </div>
                        <div className='shop_price'>
                            <span>付款方式：</span>
                            <span>{orderDetail.orderInfo.payChannel}</span>
                        </div>
                        <div>
                            <span>备注：</span>
                            <textarea name="" id="" cols="40" rows="3"></textarea>
                            <div className='print_order'>
                                <button>打印订单</button>
                            </div>
                            ·                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

@observer class DeliveryMerchantListView extends Component{
    render(){
        let merchantShop = this.props.clientOrderList.activeOrder.merchantShop;
        this.props.merchantListContainer.getNearMerchantList(merchantShop);
        return (
            <div className='order_detail_r ml30'>
                <div className='order_detail_header'>派单</div>
                <MerchantListView  merchantListContainer={this.props.merchantListContainer} />
            </div>
        )
    }
}

@observer class MerchantListView extends Component{
    render(){
        let merchantShopNodes = this.props.merchantListContainer.merchantList.map((merchantShop,i)=>{
            return (
                <li className='water_site mt20' key={i}>
                    {/*<span>选择我吧</span>*/}
                    <span>{merchantShop.shopName}</span>
                    <span>{merchantShop.shopAddress}</span>
                    <span>{merchantShop.shopName}</span>
                    <span>{merchantShop.shopTelephone}</span>
                    <span><Button type="primary" >确认订单</Button></span>
                </li>
            )
        });
        return(
            <ul className='delivery_order_fee'>
                <li className='water_site mt20'>
                    <span>选择</span>
                    <span>配送仓库</span>
                    <span>仓库地址</span>
                    <span>配送员</span>
                    <span>配送电话</span>
                    <span>操作</span>
                </li>
                {merchantShopNodes}
            </ul>
        )
    }
}

module.exports = ClientOrderView;

module.exports = ClientOrderView;