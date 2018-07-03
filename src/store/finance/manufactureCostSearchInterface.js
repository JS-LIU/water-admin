/**
 * Created by LDQ on 2018/7/3
 */
import manufactureCostList from './ManufactureCostList';
import {observable, computed, action, autorun} from "mobx";
let manufactureCostSearchData = {
    @observable list:[],
    @observable pagination:{},
    @observable time:{},
    @observable manufactureCostData:{},
    @observable waterStoreList:[],
};
function manufactureCostSearchActions(){
    let _getList = function(){
        manufactureCostList.getManufactureCostList().then((list)=>{
            manufactureCostSearchData.list = list;
            manufactureCostSearchData.pagination = manufactureCostList.pagination;
        })
    };
    let _getData = function(){
        manufactureCostList.getManufactureCostData().then((data)=>{
            manufactureCostSearchData.manufactureCostData = data;
        })
    };
    let selectQueryInfo = function(queryMsg){
        manufactureCostList.selectQueryMsg(queryMsg);
    };
    let queryListByQueryInfo = function(){
        _getList();
    };
    let queryDataByQueryInfo = function(){
        _getData();
    };

    let changePage = function(pageNum){
        manufactureCostSearchData.pagination.setPage(pageNum);
        _getList();
    };

    let load = function(){
        manufactureCostList.waterStoreList.getWaterStoreList().then((list)=>{
            manufactureCostSearchData.waterStoreList = list;
        });
        _getList();
        _getData();
    };
    let selectWaterStore = function(shopId){
        let waterStore = manufactureCostList.waterStoreList.findItemByItemId(manufactureCostSearchData.waterStoreList,shopId,"shopId");
        manufactureCostList.waterStoreList.setActiveItem(waterStore);
    };
    return {
        onLoad:load,
        selectQueryInfo:selectQueryInfo,
        queryListByQueryInfo:queryListByQueryInfo,
        queryDataByQueryInfo:queryDataByQueryInfo,
        changePage:changePage,
        selectWaterStore:selectWaterStore
    }
}
module.exports = {actions:manufactureCostSearchActions(),data:manufactureCostSearchData};