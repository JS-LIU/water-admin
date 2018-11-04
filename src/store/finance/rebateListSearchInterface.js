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
        setQueryInfo({rebateStatus:"create"});
    };

    let load = function(){
        rebateList.pagination.setPage(1);
        queryByQueryInfo();
    };
    let changePage = function(pageNum){
        rebateList.pagination.setPage(pageNum);
        queryByQueryInfo();
    };
    let setQueryInfo = function(queryInfo){
        rebateList.selectQueryMsg(queryInfo);
    };
    let queryByQueryInfo = function(cb=function(){}){
        rebateList.getRebateList().then((list)=>{
            rebateListSearchData.list = list;
            rebateListSearchData.pagination = rebateList.pagination;
            cb();
        });
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
        rebateList.getExcel();
    };
    return {
        onLoad:load.before(_setInitType),
        changePage:changePage,
        setQueryInfo:setQueryInfo,
        queryByQueryInfo:queryByQueryInfo,
        repairRebate:repairRebate,
        getExcel:getExcel
    }
}
module.exports = {data:rebateListSearchData,actions:rebateListSearchActions()};