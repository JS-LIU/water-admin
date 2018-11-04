/**
 * Created by LDQ on 2018/6/20
 */
import {observable, computed, action, autorun} from "mobx";
import merchantOrderList from './MerchantOrderList';
import clientOrderList from "./ClientOrderList";
let orderSearchData = {
    @observable list:[],
    @observable payInfo:{},
    @observable pagination:{}
};

function merchantOrderSearchActions(){
    let _getOrderList = function(cb){

        if(merchantOrderList.orderStatus === "waitDispatch"){
            return merchantOrderList.getWaitingDispatchOrderList().then((list)=>{
                updateOrderSearchData(list,cb);
            })
        }
        return merchantOrderList.getOrderList().then((list)=>{
            updateOrderSearchData(list,cb);
        })
    };
    let updateOrderSearchData = function(list,cb=function(){}){
        orderSearchData.pagination = merchantOrderList.pagination;
        orderSearchData.list = list;
        cb();
    };
    let searchOrderListStrategy = {
        "all":function(){
            merchantOrderList.setOrderStatus(['create',"waiting_dispatch",'delivery','finish','finish_comment']);
        },
        "waitPay":function(){
            merchantOrderList.setOrderStatus(['create']);
        },
        "waitDispatch":function(){
            merchantOrderList.selectQueryType(1);
        },
        "waitReceive":function(){
            merchantOrderList.setOrderStatus(['delivery']);
        },
        "alreadyPay":function(){
            merchantOrderList.setOrderStatus(["waiting_dispatch",'delivery','finish','finish_comment']);
        },
        "finish":function(){
            merchantOrderList.setOrderStatus(['finish','finish_comment']);
        }
    };
    //  fuck
    let setOrderType = function(orderStatus){
        return searchOrderListStrategy[orderStatus]();
    };
    let selectQueryMsg = function(queryMsg){
        merchantOrderList.selectQueryMsg(queryMsg);
    };
    let load = function(){
        clientOrderList.pagination.setPage(1);
        return _getOrderList();
    };
    let changePage = function(pageNum,cb){
        merchantOrderList.pagination.setPage(pageNum);
        return _getOrderList(cb);
    };
    let getExcel = function(){
        merchantOrderList.getExcel()
    };
    let selectMerchantOrder = function(orderId){
        let order = merchantOrderList.findItemByItemId(orderSearchData.list,orderId,"orderId");
        merchantOrderList.setActiveItem(order);
    };
    let confirmReceipt = function(orderId){
        selectMerchantOrder(orderId);
        return merchantOrderList.activeItem.confirmReceipt().then(()=>{
            clientOrderList.pagination.setPage(1);
            return _getOrderList();
        })
    };
    let queryByQueryInfo = function(cb){
        return changePage(1,cb);
    };
    let _getPayInfo = function(){
        merchantOrderList.getOrderPayInfo().then((payInfo)=>{
            orderSearchData.payInfo = payInfo;
        })
    };

    return {
        onLoad:load.before(()=>{
            setOrderType("all")
        }),
        queryByQueryInfo:queryByQueryInfo,
        //  加载load 搜索
        setOrderType:setOrderType,
        selectQueryMsg:selectQueryMsg,
        changePage:changePage,
        selectMerchantOrder:selectMerchantOrder,
        confirmReceipt:confirmReceipt,
        getExcel:getExcel
    }
}
module.exports = {actions:merchantOrderSearchActions(),data:orderSearchData};