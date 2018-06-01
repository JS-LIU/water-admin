/**
 * Created by LDQ on 2018/6/1
 */

import {observable, computed, action, autorun} from "mobx";
import merchantOrderList from './merchantOrderList';

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
            merchantOrderList.getNearStore().then((storeList)=>{
                merchantOrderListData.nearStore = storeList;
            })

        })
    };


    return {
        onLoad:load,

    }
}
module.exports = {data:merchantOrderListData,actions:merchantOrderListActions};