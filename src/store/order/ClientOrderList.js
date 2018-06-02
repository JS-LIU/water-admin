/**
 * Created by LDQ on 2018/4/28
 */

import OrderList from './OrderList';
import ClientOrder from './ClientOrder';
class ClientOrderList extends OrderList{
    constructor(){
        super();
        this.orderType = "client_src";
        this.orderList = [];
        this.activeOrder = new ClientOrder({});
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
     * @returns {Promise<any>}
     */

    getOrderList(){
        let queryInfoMsg = this._getQueryInfo();
        this.orderList = [];
        return new Promise((resolve,reject)=>{
            this.getOrderListData(queryInfoMsg).then((orderContainer)=>{
                let orderListData = orderContainer.content;
                this.orderList = ClientOrderList.createOrderList(this.orderList,orderListData);
                resolve(this.orderList);
            }).catch((err)=>{
                reject(err);
            });
        })
    }

    static createOrderList(orderList,orderListData){
        for(let i = 0;i < orderListData.length;i++){
            orderList.push(new ClientOrder(orderListData[i]));
        }
        return orderList;
    }

    selectedOrder(order){
        this.activeOrder = order;
    }

    findClientOrderIndexById(list,orderId){
        return list.findIndex((order)=>{
            return order.orderId === orderId;
        })
    };
    removeClientOrder(list,order){
        let index = this.findClientOrderIndexById(list,order.orderId);
        list.splice(index,1);
        return list;
    }
}

module.exports = new ClientOrderList();