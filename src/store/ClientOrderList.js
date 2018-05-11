/**
 * Created by LDQ on 2018/4/28
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';
import OrderList from './OrderList';
import ClientOrder from './ClientOrder';

class ClientOrderList extends OrderList{
    constructor(){
        super();
        this.orderType = "client";

    }

    /**
     * 获取查询条件
     * @returns {({} & {orderSrc: string}) | *}
     * @private
     */
    _getQueryInfo(){
        return Object.assign(this.queryMsg,{orderSrc: this.orderType});
    }

    /**
     * 获取订单列表
     */
    @action getOrderList(){
        let queryInfoMsg = this._getQueryInfo();
        this.getOrderListData(queryInfoMsg).then((orderContainer)=>{
            let orderList = orderContainer.content;
            for(let i = 0;i < orderList.length; i++){
                this._orderList.push(new ClientOrder(orderList[i]));
            }
        });
    }
    @action selectedOrder(order){
        this._setActiveOrder(order)
    }
    _setActiveOrder(order){
        this._activeOrder = order;
    }
    @observable _activeOrder;
    @computed get activeOrder(){
        return this._activeOrder;
    }
    @observable _orderList = [];
    @computed get orderList(){
        return this._orderList;
    }
}

module.exports = ClientOrderList;