/**
 * Created by LDQ on 2018/6/1
 */

import OrderList from './OrderList';
import MerchantOrder from "./MerchantOrder";
class MerchantOrderList extends OrderList{
    constructor(){
        super();
        this.orderType = "merchant_src";
        this.merchantOrderList = [];
        this.activeOrder = new MerchantOrder({});
        this.queryMsg = {};
    }
    _getQueryInfo(){
        return Object.assign(this.queryMsg,{orderSrc: this.orderType});
    }
    getOrderList(){
        let queryInfoMsg = this._getQueryInfo();

        this.merchantOrderList = [];
        return new Promise((resolve,reject)=>{
            this.getOrderListData(queryInfoMsg).then((orderContainer)=>{
                let orderList = orderContainer.content;
                this.merchantOrderList = MerchantOrderList.createMerchantList(this.merchantOrderList,orderList);
                resolve(this.merchantOrderList);
            }).catch((err)=>{
                reject(err);
            });
        })
    }

    static createMerchantList(targetList,listData){
        for(let i = 0 ;i < listData.length; i++){
            targetList.push(new MerchantOrder(listData[i]));
        }
        if(targetList.length === 0){
            targetList.push(new MerchantOrder({}));
        }
        return targetList;

    }
    selectActiveOrder(order){
        this.activeOrder = order;
    }
    removeOrder(list,order){
        let index = this.findIndexOrderByOrderId(list,order.orderId);
        list.splice(index,1);
        return list;
    }
    findIndexOrderByOrderId(list,orderId){
        return list.findIndex((order)=>{
            return order.orderId === orderId;
        })
    }

}
module.exports = new MerchantOrderList();