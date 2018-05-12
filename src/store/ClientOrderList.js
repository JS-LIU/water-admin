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
                this._setActiveOrder();             //  默认第一条订单被选中
            }
        });
    }

    /**
     * 选择订单
     * @param order
     */
    @action selectedOrder(order){
        this._setActiveOrder(order)
    }

    /**
     * 选择订单
     * @param order
     * @returns {order}
     * @private
     */
    _setActiveOrder(order){
        if(!order){
            return this._activeOrder = this._orderList[0];
        }
        return this._activeOrder = order;
    }
    @observable _activeOrder = new ClientOrder({});
    @computed get activeOrder(){
        return this._activeOrder;
    }
    @observable _orderList = [];
    @computed get orderList(){
        return this._orderList;
    }
}

module.exports = ClientOrderList;