/**
 * Created by LDQ on 2018/6/19
 */
import {observable, computed, action, autorun} from "mobx";
import clientOrderList from './ClientOrderList';
import merchantOrderList from "./MerchantOrderList";

let orderSearchData = {
    @observable list:[],
    @observable pagination:{}
};

function clientOrderSearchActions(){
    let _getOrderList = function(cb){
        if(clientOrderList.queryType === "waitDispatch"||clientOrderList.queryType === "waitDelivery"){
            return clientOrderList.getWaitingDispatchOrderList().then((list)=>{
                updateOrderSearchData(list,cb);
            })
        }
        return clientOrderList.getOrderList().then((list,cb)=>{
            updateOrderSearchData(list,cb);
        })
    };
    let updateOrderSearchData = function(list,cb=function(){}){
        orderSearchData.pagination = clientOrderList.pagination;
        orderSearchData.list = list;
        cb();
    };
    let orderTypeStrategy = {
        "all":function(){
            clientOrderList.setOrderStatus(['create','delivery','waiting_dispatch','finish','finish_comment']);
        },
        "waitPay":function(){
            clientOrderList.setOrderStatus(['create']);
        },
        "waitDispatch":function(){
            clientOrderList.selectQueryType(1);
        },
        "alreadyPay":function(){
            clientOrderList.setOrderStatus(["waiting_dispatch",'delivery','finish','finish_comment']);
        },
        "waitDelivery":function(){
            clientOrderList.selectQueryType(2);
        },
        "waitReceive":function(){
            clientOrderList.setOrderStatus(['delivery']);
        },
        "finish":function(){
            clientOrderList.setOrderStatus(['finish','finish_comment']);
        }
    };
    let setOrderType = function(orderStatus){
        return orderTypeStrategy[orderStatus]();
    };
    let selectQueryMsg = function(queryMsg){
        clientOrderList.selectQueryMsg(queryMsg);
    };
    let load = function(){
        clientOrderList.pagination.setPage(1);
        return _getOrderList();
    };
    let changePage = function(pageNum,cb){
        clientOrderList.pagination.setPage(pageNum);
        return _getOrderList(cb);
    };
    let getExcel = function(){
        clientOrderList.getExcel()
    };
    let selectClientOrder = function(orderId){
        let order = clientOrderList.findItemByItemId(orderSearchData.list,orderId,"orderId");
        clientOrderList.setActiveItem(order);
    };
    let confirmReceipt = function(orderId){
        selectClientOrder(orderId);
        clientOrderList.activeItem.confirmReceipt().then(()=>{
            clientOrderList.pagination.setPage(1);
            return _getOrderList();
        })
    };
    let queryByQueryInfo = function(cb){
        return changePage(1,cb);
    };
    return {
        //  加载load
        onLoad:load.before(()=>{
            setOrderType("all")
        }),
        setOrderType:setOrderType,
        selectQueryMsg:selectQueryMsg,
        changePage:changePage,
        getExcel:getExcel,
        confirmReceipt:confirmReceipt,
        queryByQueryInfo:queryByQueryInfo,
        selectClientOrder:selectClientOrder,
    }
}
module.exports = {actions:clientOrderSearchActions(),data:orderSearchData};