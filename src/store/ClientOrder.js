/**
 * Created by LDQ on 2018/4/28
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';
import Order from './Order';


class ClientOrder extends Order{
    constructor(){
        super();
        this.orderType = "client";
    }

    _getQueryInfo(){
        return Object.assign(this.queryMsg,{orderSrc: this.orderType});
    }
    getOrder(){
        let queryInfoMsg = this._getQueryInfo();
        this.getOrderData(queryInfoMsg).then((orderInfo)=>{
            console.log(orderInfo);
        });

    }
}

module.exports = ClientOrder;