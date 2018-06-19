/**
 * Created by LDQ on 2018/4/28
 */

import OrderList from './OrderList';
import ClientOrder from './ClientOrder';
import AdminList from '../AdminList';
import _h from "../../Util/HB";
class ClientOrderList extends AdminList{
    constructor(){
        super();
        this.orderType = "client_src";
        let orderListAjax = _h.ajax.resource('/admin/order/:action');

        this._getWaitingDispatchOrderList = function(postInfo){
            return orderListAjax.save({action:'waitingdispathlist'}, postInfo)
        };
        this.queryType = 0;
        this.orderStatus = ['create','delivery','finish','finish_comment'];//    create,delivery,finish,finish_comment
        this._getOrderList = function(postInfo){
            return orderListAjax.save({action:"list"},postInfo);
        }
    }
    selectQueryType(typeNum){
        this.queryType = typeNum;
    }
    setOrderStatus(statusList){
        this.orderStatus = statusList;
    }
    getWaitingDispatchOrderList(){
        this.queryMsg = Object.assign(this.queryMsg,{queryType:this.queryType});
        this.queryMsg = {queryInfoMsg:this.queryMsg};
        let reqMsg = this.getQueryMsg({orderSrc: this.orderType});
        return this.getList(reqMsg,this._getWaitingDispatchOrderList,ClientOrder);
    }
    getOrderList(){
        this.queryMsg = Object.assign(this.queryMsg,{orderStatus:this.orderStatus});
        this.queryMsg = {queryInfoMsg:this.queryMsg};
        let reqMsg = this.getQueryMsg({orderSrc:this.orderType});
        return this.getList(reqMsg,this._getOrderList,ClientOrder);
    }



    // /**
    //  * 获取查询条件
    //  * @returns {({} & {orderSrc: string}) | *}
    //  * @private
    //  */
    // _getQueryInfo(){
    //     return Object.assign(this.queryMsg,{orderSrc: this.orderType});
    // }
    //
    // /**
    //  * 获取订单列表
    //  * @returns {Promise<any>}
    //  */
    //
    // getOrderList(){
    //     let queryInfoMsg = this._getQueryInfo();
    //     this.orderList = [];
    //     return new Promise((resolve,reject)=>{
    //         this.getOrderListData(queryInfoMsg).then((orderContainer)=>{
    //             let orderListData = orderContainer.content;
    //             this.pagination.setTotal(orderContainer.totalElements);
    //             this.orderList = ClientOrderList.createOrderList(this.orderList,orderListData);
    //             resolve(this.orderList);
    //         }).catch((err)=>{
    //             reject(err);
    //         });
    //     })
    // }
    //
    // static createOrderList(orderList,orderListData){
    //     for(let i = 0;i < orderListData.length;i++){
    //         orderList.push(new ClientOrder(orderListData[i]));
    //     }
    //     return orderList;
    // }
    //
    // selectActiveOrder(order){
    //     this.activeOrder = order;
    // }
    //
    // findClientOrderIndexById(list,orderId){
    //     return list.findIndex((order)=>{
    //         return order.orderId === orderId;
    //     })
    // };
    // removeClientOrder(list,order){
    //     let index = this.findClientOrderIndexById(list,order.orderId);
    //     list.splice(index,1);
    //     return list;
    // }
    // findClientOrderById(list,orderId){
    //     return list.find((order)=>{
    //         return order.orderId === orderId;
    //     })
    // }
}

module.exports = new ClientOrderList();