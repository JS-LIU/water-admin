/**
 * Created by LDQ on 2018/7/20
 */
import {observable, computed, action, autorun} from "mobx";
import withdrawList from './WithdrawList';

let withdrawSearchData = {
    @observable list:[],
    @observable pagination:{},
};
function withdrawSearchActions(){
    let load = function(){
        withdrawList.pagination.setPage(1);
        _getList();
    };
    let _getList = function(){
        withdrawList.getWithdrawList().then((list)=>{
            withdrawSearchData.list = list;
            withdrawSearchData.pagination = withdrawList.pagination;
        })
    };
    let _initStatus = function(){
        withdrawList.setStatus("all")
    };
    let changePage = function(pageNum){
        withdrawList.pagination.setPage(pageNum);
        _getList();
    };

    let selectQueryMsg = function(queryMsg){
        withdrawList.selectQueryMsg(queryMsg);
    };
    let queryByQueryInfo = function(){
        load();
    };

    let changeStatus = function(status){
        withdrawList.pagination.setPage(1);
        selectQueryMsg({});
        withdrawList.setStatus(status);
    };
    return {
        onLoad:load.before(_initStatus),
        changePage:changePage,
        selectQueryMsg:selectQueryMsg,
        queryByQueryInfo:queryByQueryInfo,
        changeStatus:changeStatus
    }
}
module.exports = {data:withdrawSearchData,actions:withdrawSearchActions()};