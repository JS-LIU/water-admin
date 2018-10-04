/**
 * Created by LDQ on 2018/6/7
 */

import {observable, computed, action, autorun} from "mobx";
import RebateList from './RebateList';
let rebateList = new RebateList();

let rebateListSearchData = {
    @observable list:[],
    @observable pagination:{}
};


function rebateListSearchActions(){
    let _setInitType = function(){
        rebateList.changeStatus("create");
    };

    let load = function(){
        rebateList.pagination.setPage(1);
        rebateList.getRebateList().then((list)=>{
            rebateListSearchData.list = list;
            rebateListSearchData.pagination = rebateList.pagination;
        });
    };
    let changePage = function(pageNum){
        rebateList.pagination.setPage(pageNum);
        rebateList.getRebateList().then((rebateList)=>{
            rebateListSearchData.list = rebateList;
        });
    };
    let changeType = function(type){
        rebateList.changeStatus(type);
        load();
    };

    let setQueryInfo = function(queryInfo){
        rebateList.selectQueryMsg(queryInfo);
    };
    let queryByQueryInfo = function(){
        load();
    };
    let repairRebate = function(rebateId,money){
        let rebateItem = rebateList.findItemByItemId(rebateListSearchData.list,rebateId,"rebateId");
        rebateItem.repairRebate(money).then(()=>{
            return rebateList.getRebateList()
        }).then((list)=>{
            rebateListSearchData.list = list;
            rebateListSearchData.pagination = rebateList.pagination;
        });
    };
    let getExcel = function(){

    };
    return {
        onLoad:load.before(_setInitType),
        changePage:changePage,
        changeType:changeType,
        setQueryInfo:setQueryInfo,
        queryByQueryInfo:queryByQueryInfo,
        repairRebate:repairRebate,
        // getExcel:getExcel
    }
}
module.exports = {data:rebateListSearchData,actions:rebateListSearchActions()};