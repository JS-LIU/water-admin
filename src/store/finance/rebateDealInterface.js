/**
 * Created by LDQ on 2018/6/6
 */


import {observable, computed, action, autorun} from "mobx";
import RebateList from './RebateList';

const rebateList = new RebateList();

let rebateDealListData = {
    @observable list:[],
    @observable detail:{},
    @observable pagination:{},
    @observable activeItem:{productItemList:[]},
    @observable isCanRebate:false,
};



function rebateDealListActions(){

    // let _getList = function(){
    //     rebateList.getRebateList().then((list)=>{
    //         rebateDealListData.list = list;
    //         rebateDealListData.pagination = rebateList.pagination;
    //         rebateList.setActiveItem(list[0]);
    //         rebateDealListData.activeItem = rebateList.activeItem;
    //     })
    // };
    let _getRebateDetail = function(){
        rebateList.activeItem.getDetail().then((detail)=>{
            rebateDealListData.detail = detail;
        });
    };
    let _getListAndGetActiveItemDetail = function(cb=function(){}){
        rebateList.getRebateList().then((list)=>{
            rebateDealListData.list = list;
            rebateDealListData.pagination = rebateList.pagination;
            rebateList.setActiveItem(list[0]);
            rebateDealListData.activeItem = rebateList.activeItem;
            return rebateList.activeItem.getDetail();
        }).then((detail)=>{
            rebateDealListData.detail = detail;
            cb();
        });
    };
    let load = function(){
        rebateList.pagination.setPage(1);
        _getListAndGetActiveItemDetail();
    };
    let selectRebateItem = function(rebateId){
        let rebateItem = rebateList.findItemByItemId(rebateDealListData.list,rebateId,"rebateId");
        rebateList.setActiveItem(rebateItem);
        rebateDealListData.activeItem = rebateList.activeItem;
        _getRebateDetail();
    };
    let changePage = function(pageNum){
        rebateDealListData.pagination.setPage(pageNum);
        _getListAndGetActiveItemDetail()
    };

    let setQueryInfo = function(queryMsg){
        rebateList.selectQueryMsg(queryMsg);
    };
    let queryByQueryInfo = function(cb){
        rebateList.pagination.setPage(1);
        _getListAndGetActiveItemDetail(cb);
    };
    let confirmRebate = function(remark){
        rebateDealListData.isCanRebate = true;
        rebateList.activeItem.setRemark(remark);
        rebateList.activeItem.toRebate().then(()=>{
            _getListAndGetActiveItemDetail();
            rebateDealListData.isCanRebate = false;
        })
    };
    let setRealResult = function(realResult,type, unit){
        rebateList.activeItem.setRealResult(realResult,type, unit);
    };

    let getRealRebate = function (type) {
        rebateList.activeItem.getRealRebate(type);
    };
    return {
        onLoad:load.before(function(){
            setQueryInfo({rebateStatus:'create'});
        }),
        selectRebateItem:selectRebateItem,
        confirmRebate:confirmRebate,
        setQueryInfo:setQueryInfo,
        queryByQueryInfo:queryByQueryInfo,
        setRealResult:setRealResult,
        changePage:changePage,
        getRealRebate:getRealRebate,
    };
}
module.exports = {data:rebateDealListData,actions:rebateDealListActions()};