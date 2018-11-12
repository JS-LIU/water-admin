/**
 * Created by LDQ on 2018/6/2
 */
import {observable, computed, action, autorun} from "mobx";
import clientOrderList from './ClientOrderList';
import nearShopListContainer from './NearShopListContainer';

let clientOrderListData = {
    @observable list:[],
    @observable detail:{
        deliveryAddressModel:{address:{},position:{}},
        productItemModels:[]
    },
    @observable nearStore:[],
    @observable activeOrder:{},
    @observable pagination:{},
    @observable queryType:0,
    @observable hasLoadingNearStore:true
};
function clientOrderListActions(){
    let _refresh = function(cb=function(){}){
        clientOrderList.getWaitingDispatchOrderList().then((list)=>{
            clientOrderListData.list = list;
            clientOrderList.setActiveItem(list[0]);
            clientOrderListData.pagination = clientOrderList.pagination;
            clientOrderListData.activeOrder = clientOrderList.activeItem;
            return clientOrderList.activeItem.getDetail()
        }).then((detail)=>{
            clientOrderListData.detail = detail;
            clientOrderListData.hasLoadingNearStore = true;
            return clientOrderListData.activeOrder.getNearMerchantList();
        }).then((storeList)=>{
            clientOrderListData.nearStore = storeList;
            clientOrderListData.hasLoadingNearStore = false;
            cb()
        }).catch(()=>{
            clientOrderListData.hasLoadingNearStore = false;
            cb();
        });
    };
    // let
    let load = function(cb){
        clientOrderList.pagination.setPage(1);
        _refresh(cb)
    };
    let selectQueryType = function(queryType){
        clientOrderList.selectQueryType(queryType);
        clientOrderListData.queryType = queryType;
        // load();
    };
    let selectOrder = function(orderId){
        let order = clientOrderList.findItemByItemId(clientOrderListData.list,orderId,"orderId");
        clientOrderList.setActiveItem(order);
        clientOrderListData.activeOrder = clientOrderList.activeItem;
        clientOrderList.activeItem.getDetail().then((detail)=>{
            clientOrderListData.detail = detail;
            clientOrderListData.hasLoadingNearStore = true;
            return clientOrderListData.activeOrder.getNearMerchantList();
        }).then((storeList)=>{
            clientOrderListData.nearStore = storeList;
            clientOrderListData.hasLoadingNearStore = false;
        }).catch(()=>{
            clientOrderListData.hasLoadingNearStore = false;
        });
    };
    let resetNearMerchant = function(){
        clientOrderListData.hasLoadingNearStore = true;
        setNearShopQueryInfo({shopArtificialNum:null});
        return clientOrderListData.activeOrder.getNearMerchantList().then((storeList)=>{
            clientOrderListData.nearStore = storeList;
            clientOrderListData.hasLoadingNearStore = false;
        });
    };
    let redirectOrder = function(merchantId){
        let merchant = nearShopListContainer.findMerchantById(clientOrderListData.nearStore,merchantId);
        clientOrderList.activeItem.redirectOrder(merchant).then(()=>{
            _refresh()
        });
    };
    let dispatchOrder = function(orderNo){
        clientOrderList.activeItem.dispatchOrder(orderNo).then(()=>{
            _refresh();
        })
    };
    let queryByQueryInfo = function(cb){
        load(cb);
    };
    let setQueryInfo = function(queryInfo){
        clientOrderList.selectQueryMsg(queryInfo);
    };
    let setNearShopQueryInfo = function(queryInfo){
        nearShopListContainer.selectQueryMsg(queryInfo);
    };
    let queryNearShop = function(cb=function(){}){
        nearShopListContainer.pagination.setPage(1);
        clientOrderListData.hasLoadingNearStore = true;
        nearShopListContainer.getMerchantListByQueryInfo().then((list)=>{
            clientOrderListData.nearStore = list;
            clientOrderListData.hasLoadingNearStore = false;
            cb();
        }).catch(()=>{
            clientOrderListData.hasLoadingNearStore = false;
            cb();
        })
    };
    let loadMoreNearShop = function(){
        nearShopListContainer.pagination.nextPage();
        nearShopListContainer.getMerchantListByQueryInfo().then((list)=>{
            clientOrderListData.nearStore.concat(list);
        })
    };
    let changePagination = function(page){
        clientOrderList.pagination.setPage(page);
        _refresh();
    };
    let _setInitQueryInfo = function(){
        clientOrderList.selectQueryType(0);
    };
    let setDeltaSettleDownValue = function(deltaSettleDownValue){
        clientOrderList.activeItem.setDeltaSettleDownValue(deltaSettleDownValue)
    };
    return {
        onLoad:load.before(_setInitQueryInfo),
        selectOrder:selectOrder,
        redirectOrder:redirectOrder,
        dispatchOrder:dispatchOrder,
        queryByQueryInfo:queryByQueryInfo,
        setQueryInfo:setQueryInfo,
        queryNearShop:queryNearShop,
        setNearShopQueryInfo:setNearShopQueryInfo,
        loadMoreNearShop:loadMoreNearShop,
        selectQueryType:selectQueryType,
        changePagination:changePagination,
        setDeltaSettleDownValue:setDeltaSettleDownValue,
        resetNearMerchant:resetNearMerchant
    }
}
module.exports = {data:clientOrderListData,actions:clientOrderListActions()};