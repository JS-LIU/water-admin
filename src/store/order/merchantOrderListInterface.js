/**
 * Created by LDQ on 2018/6/1
 */

import {observable, computed, action, autorun} from "mobx";
import merchantOrderList from './MerchantOrderList';
import nearStoreList from './NearStoreList';
let merchantOrderListData = {
    @observable list:[],
    @observable detail:{},
    @observable nearStore:{},
    @observable activeOrder:{},
};

function merchantOrderListActions(){
    let load = function(){
        merchantOrderList.pagination.setPage(1);
        merchantOrderList.getOrderList().then((list)=>{
            merchantOrderListData.list = list;

            merchantOrderList.selectActiveOrder(list[0]);
            merchantOrderListData.activeOrder = merchantOrderList.activeOrder;
            merchantOrderList.activeOrder.getDetail().then((detail)=>{
                merchantOrderListData.detail = detail;
            });

            merchantOrderListData.activeOrder.getNearStore().then((storeList)=>{
                merchantOrderListData.nearStore = storeList;
            })
        })
    };
    let selectMerchantOrder = function(orderId){
        let order = merchantOrderList.findOrderByOrderId(merchantOrderListData.list,orderId);
        merchantOrderList.selectActiveOrder(order);
        merchantOrderList.activeOrder.getDetail().then((detail)=>{
            merchantOrderListData.detail = detail;
        });
        merchantOrderListData.activeOrder.getNearStore().then((storeList)=>{
            merchantOrderListData.nearStore = storeList;
        });
    };
    let dispatchOrder = function(merchantId){
        let merchant = nearStoreList.findMerchantById(merchantId);
        merchantOrderList.dispatchOrder(merchant).then(()=>{
            merchantOrderList.removeOrder(merchantOrderListData.list,merchant);
        });
    };
    let queryByQueryInfo = function(){
        load();
    };
    let setQueryInfo = function(queryInfo){
        merchantOrderList.selectQueryMsg(queryInfo);
    };

    let changePagination = function(page){
        merchantOrderList.pagination.setPage(page);
        merchantOrderList.getOrderList().then((list)=>{
            merchantOrderListData.list = list;
            merchantOrderList.selectActiveOrder(list[0]);
            merchantOrderListData.activeOrder = merchantOrderList.activeOrder;
            merchantOrderList.activeOrder.getDetail().then((detail)=>{
                merchantOrderListData.detail = detail;
            });

            merchantOrderListData.activeOrder.getNearStore().then((storeList)=>{
                merchantOrderListData.nearStore = storeList;
            })
        })
    };
    let loadMore = function(){
        merchantOrderList.pagination.nextPage();
        merchantOrderList.getOrderList().then((list)=>{
            merchantOrderListData.list.concat(list);
        })
    };

    return {
        onLoad:load,
        selectMerchantOrder:selectMerchantOrder,
        dispatchOrder:dispatchOrder,
        queryByQueryInfo:queryByQueryInfo,
        setQueryInfo:setQueryInfo,
        loadMore:loadMore,
        changePagination:changePagination
    }
}
module.exports = {data:merchantOrderListData,actions:merchantOrderListActions()};