/**
 * Created by LDQ on 2018/6/20
 */
import {observable, computed, action, autorun} from "mobx";
import merchantOrderList from './MerchantOrderList';
import clientOrderList from "./ClientOrderList";

let orderSearchData = {
    @observable list:[],
    @observable pagination:{}
};

function merchantOrderSearchActions(){
    let getOrderList = function(){
        merchantOrderList.getOrderList().then((list)=>{
            orderSearchData.pagination = merchantOrderList.pagination;
            orderSearchData.list = list;
        })
    };
    let getWaitingDispatchOrder = function(){
        merchantOrderList.getWaitingDispatchOrderList().then((list)=>{
            orderSearchData.pagination = merchantOrderList.pagination;
            orderSearchData.list = list;
        })
    };
    let searchOrderListStrategy = {
        "all":function(){
            merchantOrderList.setOrderStatus(['create',"waiting_dispatch",'delivery','finish','finish_comment']);
            getOrderList();

        },
        "waitPay":function(){
            merchantOrderList.setOrderStatus(['create']);
            getOrderList();
        },
        "waitDispatch":function(){
            merchantOrderList.selectQueryType(1);
            getWaitingDispatchOrder();
        },
        "waitReceive":function(){
            merchantOrderList.setOrderStatus(['delivery']);
            getOrderList();
        },
        "alreadyPay":function(){
            merchantOrderList.setOrderStatus(["waiting_dispatch",'delivery','finish','finish_comment']);
            getOrderList();
        },
        "finish":function(){
            merchantOrderList.setOrderStatus(['finish','finish_comment']);
            getOrderList();
        }
    };
    //  fuck
    let searchOrderList = function(orderStatus){
        clientOrderList.pagination.setPage(1);
        return searchOrderListStrategy[orderStatus]();
    };
    let selectQueryMsg = function(queryMsg){
        merchantOrderList.selectQueryMsg(queryMsg);
    };
    let load = function(){
        merchantOrderList.pagination.setPage(1);
        searchOrderList("all")
    };
    let changePage = function(pageNum){
        merchantOrderList.pagination.setPage(pageNum);
        getOrderList();
    };
    return {
        onLoad:load,
        //  加载load 搜索
        searchOrderList:searchOrderList,
        selectQueryMsg:selectQueryMsg,
        changePage:changePage
    }
}
module.exports = {actions:merchantOrderSearchActions(),data:orderSearchData};