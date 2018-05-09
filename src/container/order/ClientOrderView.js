/**
 * Created by LDQ on 2018/4/28
 */

import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
// import OrderView from './OrderView';
import ClientOrderHeaderStyle from './css/ClientOrderHeaderStyle.css';
import huipayTableStyle from '../../Util/huipayAdminStyle/huipayTableStyle.css';
import ClientOrder from '../../store/ClientOrder';

// @inject(['order'])
class ClientOrderView extends Component{
    componentWillMount(){
        // this.props.clientOrder.getOrderData()
        this.clientOrder = new ClientOrder();
        this.clientOrder.getOrder()
    }
    render(){

        return(
            <div className="huipay_table order_table">
                <ClientOrderHeaderView />
            </div>

        )
    }
}

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
                <li>配送商家</li>
            </ul>
        )
    }
}


module.exports = ClientOrderView;