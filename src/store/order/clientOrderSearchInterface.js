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
    let getOrderList = function(cb=function(){}){
        clientOrderList.pagination.setPage(1);
        if(clientOrderList.queryType === "waitDispatch"||clientOrderList.queryType === "waitDelivery"){
            return clientOrderList.getWaitingDispatchOrderList().then((list)=>{
                updateOrderSearchData(list);
                cb();
            })
        }
        return clientOrderList.getOrderList().then((list)=>{
            updateOrderSearchData(list);
            cb();
        })
    };
    let updateOrderSearchData = function(list){
        orderSearchData.pagination = clientOrderList.pagination;
        orderSearchData.list = list;
    };
    let orderType = "all";
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
        orderType = orderStatus;
        return orderTypeStrategy[orderStatus]();
    };
    let selectQueryMsg = function(queryMsg){
        clientOrderList.selectQueryMsg(queryMsg);
    };
    let load = function(){
        getOrderList();
    };
    let changePage = function(pageNum){
        clientOrderList.pagination.setPage(pageNum);
        getOrderList();
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
            getOrderList();
        })
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
        getOrderList:getOrderList,
        selectClientOrder:selectClientOrder,
    }
}
module.exports = {actions:clientOrderSearchActions(),data:orderSearchData};