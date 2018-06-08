/**
 * Created by LDQ on 2018/6/7
 */

import {observable, computed, action, autorun} from "mobx";
import rebateList from './RebateList';


let rebateListSearchInterface = {
    @observable list:[]
};


function rebateListSearchActions(){
    let load = function(){
        rebateList.pagination.setPage(1);
        rebateList.getRebateList().then((rebateList)=>{
            rebateListSearchInterface.list = rebateList;
        });
    };
    let changePage = function(pageNum){
        rebateList.pagination.setPage(pageNum);
        rebateList.getRebateList().then((rebateList)=>{
            rebateListSearchInterface.list = rebateList;
        });
    };
    let changeType = function(type){
        rebateList.changeStatus(type);
        load();
    };

    let setQueryInfo = function(queryInfo){
        rebateList.selectQueryInfo(queryInfo);
    };
    let queryByQueryInfo = function(){
        load();
    };
    return {
        onLoad:load,
        changePage:changePage,
        changeType:changeType,
        setQueryInfo:setQueryInfo,
        queryByQueryInfo:queryByQueryInfo
    }
}