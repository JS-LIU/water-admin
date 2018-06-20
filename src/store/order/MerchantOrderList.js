
import OrderList from './OrderList';
import MerchantOrder from "./MerchantOrder";
import AdminList from '../AdminList';
import _h from "../../Util/HB";

class MerchantOrderList extends AdminList{

    constructor(){
        super();
        this.orderType = "merchant_src";
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
        return this.getList(reqMsg,this._getWaitingDispatchOrderList,MerchantOrder);
    }
    getOrderList(){
        this.queryMsg = Object.assign(this.queryMsg,{orderStatus:this.orderStatus});
        this.queryMsg = {queryInfoMsg:this.queryMsg};
        let reqMsg = this.getQueryMsg({orderSrc:this.orderType});
        return this.getList(reqMsg,this._getOrderList,MerchantOrder);
    }
    // constructor(){
    //     super();
    //     this.orderType = "merchant_src";
    //     this.merchantOrderList = [];
    //     this.activeOrder = new MerchantOrder({});
    //     this.queryMsg = {};
    // }
    // _getQueryInfo(){
    //     return Object.assign(this.queryMsg,{orderSrc: this.orderType});
    // }
    // getOrderList(){
    //     let queryInfoMsg = this._getQueryInfo();
    //
    //     this.merchantOrderList = [];
    //     return new Promise((resolve,reject)=>{
    //         this.getOrderListData(queryInfoMsg).then((orderContainer)=>{
    //             let orderList = orderContainer.content;
    //             this.pagination.setTotal(orderContainer.totalElements);
    //             this.merchantOrderList = MerchantOrderList.createMerchantList(this.merchantOrderList,orderList);
    //             resolve(this.merchantOrderList);
    //         }).catch((err)=>{
    //             reject(err);
    //         });
    //     })
    // }
    //
    // static createMerchantList(targetList,listData){
    //     for(let i = 0 ;i < listData.length; i++){
    //         targetList.push(new MerchantOrder(listData[i]));
    //     }
    //     if(targetList.length === 0){
    //         targetList.push(new MerchantOrder({}));
    //     }
    //     return targetList;
    //
    // }
    // selectActiveOrder(order){
    //     this.activeOrder = order;
    // }
    // removeOrder(list,order){
    //     let index = this.findIndexOrderByOrderId(list,order.orderId);
    //     list.splice(index,1);
    //     return list;
    // }
    // findIndexOrderByOrderId(list,orderId){
    //     return list.findIndex((order)=>{
    //         return order.orderId === orderId;
    //     })
    // }
    // findOrderByOrderId(list,orderId){
    //     return list.find((order)=>{
    //         return order.orderId === orderId;
    //     })
    // }

}
module.exports = new MerchantOrderList();