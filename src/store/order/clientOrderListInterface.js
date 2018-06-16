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
    @observable pagination:{}
};
function clientOrderListActions(){
    let load = function(){
        clientOrderList.pagination.setPage(1);
        clientOrderList.getOrderList().then((list)=>{
            clientOrderListData.list = list;
            clientOrderList.selectActiveOrder(list[0]);
            clientOrderListData.pagination = clientOrderList.pagination;
            clientOrderListData.activeOrder = clientOrderList.activeOrder;
            return clientOrderList.activeOrder.getDetail()
        }).then((detail)=>{
            clientOrderListData.detail = detail;
            return clientOrderListData.activeOrder.getNearMerchantList();
        }).then((storeList)=>{
            clientOrderListData.nearStore = storeList;
        });
    };
    let selectQueryType = function(queryType){
        clientOrderList.selectQueryType(queryType);
        load();
    };
    let selectOrder = function(orderId){
        let order = clientOrderList.findClientOrderById(clientOrderListData.list,orderId);
        clientOrderList.selectActiveOrder(order);
        clientOrderListData.activeOrder = clientOrderList.activeOrder;
        clientOrderList.activeOrder.getDetail().then((detail)=>{
            clientOrderListData.detail = detail;
            return clientOrderListData.activeOrder.getNearMerchantList();
        }).then((storeList)=>{
            clientOrderListData.nearStore = storeList;
        });
    };
    let dispatchOrder = function(merchantId){
        let merchant = nearShopListContainer.findMerchantById(clientOrderListData.nearStore,merchantId);
        clientOrderList.activeOrder.dispatchOrder(merchant).then(()=>{
            return clientOrderList.getOrderList()
        }).then((list)=>{
            clientOrderListData.list = list;
            clientOrderList.selectActiveOrder(list[0]);
            clientOrderListData.pagination = clientOrderList.pagination;
            clientOrderListData.activeOrder = clientOrderList.activeOrder;
            return clientOrderList.activeOrder.getDetail()
        }).then((detail)=>{
            clientOrderListData.detail = detail;
            return clientOrderListData.activeOrder.getNearMerchantList();
        }).then((storeList)=>{
            clientOrderListData.nearStore = storeList;
        });
    };
    let queryByQueryInfo = function(){
        load();
    };
    let setQueryInfo = function(queryInfo){
        clientOrderList.selectQueryMsg(queryInfo);
    };
    let loadMore = function(){
        clientOrderList.pagination.nextPage();
        clientOrderList.getOrderList().then((list)=>{
            clientOrderListData.list.concat(list);
        })
    };
    let setNearShopQueryInfo = function(queryInfo){
        nearShopListContainer.selectQueryMsg(queryInfo);
    };
    let queryNearShop = function(queryInfo){
        nearShopListContainer.selectQueryMsg(queryInfo);
        nearShopListContainer.pagination.setPage(1);
        nearShopListContainer.getMerchantListByQueryInfo().then((list)=>{
            clientOrderListData.nearStore = list;
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
        clientOrderList.getOrderList().then((list)=>{
            clientOrderListData.list = list;
            clientOrderList.selectActiveOrder(list[0]);
            clientOrderListData.activeOrder = clientOrderList.activeOrder;
            return clientOrderList.activeOrder.getDetail()
        }).then((detail)=>{
            clientOrderListData.detail = detail;
            return clientOrderListData.activeOrder.getNearMerchantList();
        }).then((storeList)=>{
            clientOrderListData.nearStore = storeList;
        });
    };
    let resetInitQueryInfo = function(){
        clientOrderList.selectQueryType(0);

    };
    return {
        onLoad:load,
        resetInitQueryInfo:resetInitQueryInfo,
        selectOrder:selectOrder,
        dispatchOrder:dispatchOrder,
        queryByQueryInfo:queryByQueryInfo,
        setQueryInfo:setQueryInfo,
        loadMore:loadMore,
        queryNearShop:queryNearShop,
        setNearShopQueryInfo:setNearShopQueryInfo,
        loadMoreNearShop:loadMoreNearShop,
        selectQueryType:selectQueryType,
        changePagination:changePagination
    }
}
module.exports = {data:clientOrderListData,actions:clientOrderListActions()};