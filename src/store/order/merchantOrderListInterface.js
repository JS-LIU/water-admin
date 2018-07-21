/**
 * Created by LDQ on 2018/6/1
 */

import {observable, computed, action, autorun} from "mobx";
import merchantOrderList from './MerchantOrderList';
import nearStoreList from './NearStoreList';

let merchantOrderListData = {
    @observable list:[],
    @observable detail:{deliveryAddressModel:{address:{},position:{}},
        productItemModels:[]},
    @observable nearStore:[],
    @observable activeOrder:{},
    @observable pagination:{}
};

function merchantOrderListActions(){
    let _refresh = function(){
        merchantOrderList.getWaitingDispatchOrderList().then((list)=>{
            merchantOrderListData.list = list;
            merchantOrderListData.pagination = merchantOrderList.pagination;
            merchantOrderList.setActiveItem(list[0]);
            merchantOrderListData.activeOrder = merchantOrderList.activeItem;
            if (merchantOrderListData.activeItem){
                return merchantOrderList.activeItem.getDetail()
            }else{
                return {
                            deliveryAddressModel:{address:{},position:{}},
                             productItemModels:[],
                        }
                };
        }).then((detail)=>{
            merchantOrderListData.detail = detail;
            if (merchantOrderListData.activeOrder){
                return merchantOrderListData.activeOrder.getNearStore()
            }
        }).then((storeList)=>{
            merchantOrderListData.nearStore = storeList;
        });
    };

    let load = function(){
        merchantOrderList.pagination.setPage(1);
        _refresh();
    };
    let selectMerchantOrder = function(orderId){
        let order = merchantOrderList.findItemByItemId(merchantOrderListData.list,orderId,"orderId");
        merchantOrderList.setActiveItem(order);
        merchantOrderList.activeItem.getDetail().then((detail)=>{
            merchantOrderListData.detail = detail;
        });
        merchantOrderListData.activeOrder.getNearStore().then((storeList)=>{
            merchantOrderListData.nearStore = storeList;
        });
    };
    let redirectOrder = function(shopId){
        let merchant = nearStoreList.findItemByItemId(merchantOrderListData.nearStore,shopId,"shopId");
        merchantOrderList.activeItem.redirectOrder(merchant).then(()=>{
            return _dispatchOrder(merchantOrderList.activeItem.orderNo);
        })
    };
    let queryByQueryInfo = function(){
        load();
    };
    let setQueryInfo = function(queryInfo){
        merchantOrderList.selectQueryMsg(queryInfo);
    };

    let changePagination = function(page){
        merchantOrderList.pagination.setPage(page);
        _refresh();
    };
    let _dispatchOrder = function(orderNo){
        merchantOrderList.activeItem.dispatchOrder(orderNo).then(()=>{
            _refresh();
        })
    };

    return {
        onLoad:load,
        selectMerchantOrder:selectMerchantOrder,
        redirectOrder:redirectOrder,
        queryByQueryInfo:queryByQueryInfo,
        setQueryInfo:setQueryInfo,
        changePagination:changePagination
    }
}
module.exports = {data:merchantOrderListData,actions:merchantOrderListActions()};