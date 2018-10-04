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
    let getOrderList = function(){
        clientOrderList.getOrderList().then((list)=>{
            orderSearchData.pagination = clientOrderList.pagination;
            orderSearchData.list = list;
        })
    };
    let getWaitingDispatchOrder = function(){
        clientOrderList.getWaitingDispatchOrderList().then((list)=>{
            orderSearchData.pagination = clientOrderList.pagination;
            orderSearchData.list = list;
        })
    };
    let searchOrderListStrategy = {
        "all":function(){
            clientOrderList.setOrderStatus(['create','delivery','waiting_dispatch','finish','finish_comment']);
            getOrderList();

        },
        "waitPay":function(){
            clientOrderList.setOrderStatus(['create']);
            getOrderList();
        },
        "waitDispatch":function(){
            clientOrderList.selectQueryType(1);
            getWaitingDispatchOrder();
        },
        "alreadyPay":function(){
            clientOrderList.setOrderStatus(["waiting_dispatch",'delivery','finish','finish_comment']);
            getOrderList();
        },
        "waitDelivery":function(){
            clientOrderList.selectQueryType(2);
            getWaitingDispatchOrder();
        },
        "waitReceive":function(){
            clientOrderList.setOrderStatus(['delivery']);
            getOrderList();
        },
        "finish":function(){
            clientOrderList.setOrderStatus(['finish','finish_comment']);
            getOrderList();
        }
    };
    //  fuck
    let searchOrderList = function(orderStatus){
        clientOrderList.pagination.setPage(1);
        return searchOrderListStrategy[orderStatus]();
    };
    let selectQueryMsg = function(queryMsg){
        clientOrderList.selectQueryMsg(queryMsg);
    };
    let load = function(){
        clientOrderList.pagination.setPage(1);
        searchOrderList("all")
    };
    let changePage = function(pageNum){
        clientOrderList.pagination.setPage(pageNum);
        getOrderList();
    };
    let getExcel = function(){
        // let data = merchantOrderList.getExcel();
        //
        // $.ajax({
        //     type: "POST",
        //     url: '/huibeiwater/admin/exportShopOrder',
        //     data: JSON.stringify(data),
        // })
        clientOrderList.getExcel()
    };
    let selectClientOrder = function(orderId){
        let order = clientOrderList.findItemByItemId(orderSearchData.list,orderId,"orderId");
        clientOrderList.setActiveItem(order);
    };
    let confirmReceipt = function(orderId){
        selectClientOrder(orderId);
        console.log(clientOrderList.activeItem);
        clientOrderList.activeItem.confirmReceipt().then(()=>{
            clientOrderList.pagination.setPage(1);
            getOrderList();
        })
    };
    return {
        //  加载load
        onLoad:load,
        searchOrderList:searchOrderList,
        selectQueryMsg:selectQueryMsg,
        changePage:changePage,
        getExcel:getExcel,
        selectClientOrder:selectClientOrder,
        confirmReceipt:confirmReceipt
    }
}
module.exports = {actions:clientOrderSearchActions(),data:orderSearchData};