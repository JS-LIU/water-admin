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
        this.getOrderListData(queryInfoMsg).then((orderInfo)=>{
            this._clientOrderList = [];
            this._clientOrderList.push(new ClientOrder(orderInfo));
        });
    }
    @observable _clientOrderList = [];
    @computed get clientOrderList(){
        return this._clientOrderList;
    }
}

module.exports = ClientOrderList;