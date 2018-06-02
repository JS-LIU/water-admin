/**
 * Created by LDQ on 2018/6/2
 */
import {observable, computed, action, autorun} from "mobx";
import clientOrderList from './ClientOrderList';
import nearShopListContainer from './NearShopListContainer';

let clientOrderListData = {
    @observable list:[],
    @observable detail:{},
    @observable nearStore:{},
    @observable activeOrder:{},
};
function clientOrderListActions(){
    let load = function(){
        clientOrderList.pagination.setPage(1);
        clientOrderList.getOrderList().then((list)=>{
            clientOrderListData.list = list;

            clientOrderList.selectActiveOrder(list[0]);
            clientOrderListData.activeOrder = clientOrderList.activeOrder;
            clientOrderList.activeOrder.getDetail().then((detail)=>{
                clientOrderListData.detail = detail;
            });

            clientOrderListData.activeOrder.getNearStore().then((storeList)=>{
                clientOrderListData.nearStore = storeList;
            })

        })
    };
    let selectOrder = function(order){
        clientOrderList.selectActiveOrder(order);
        clientOrderListData.activeOrder = clientOrderList.activeOrder;
        clientOrderList.activeOrder.getDetail().then((detail)=>{
            clientOrderListData.detail = detail;
        });
        clientOrderListData.activeOrder.getNearStore().then((storeList)=>{
            clientOrderListData.nearStore = storeList;
        })
    };
    let dispatchOrder = function(merchant){
        clientOrderList.dispatchOrder(merchant).then(()=>{
            clientOrderList.removeOrder(clientOrderListData.list,merchant);
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
    return {
        onLoad:load,
        selectOrder:selectOrder,
        dispatchOrder:dispatchOrder,
        queryByQueryInfo:queryByQueryInfo,
        setQueryInfo:setQueryInfo,
        loadMore:loadMore,
        queryNearShop:queryNearShop,
        setNearShopQueryInfo:setNearShopQueryInfo,
        loadMoreNearShop:loadMoreNearShop,

    }
}
module.exports = {data:clientOrderListData,actions:clientOrderListActions()};