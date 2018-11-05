/**
 * Created by LDQ on 2018/7/20
 */
import {observable, computed, action, autorun} from "mobx";
import withdrawList from './WithdrawList';

let withdrawData = {
    @observable list:[],
    @observable pagination:{},
    @observable activeItem:{}
};

function withdrawActions(){
    let load = function(cb){
        withdrawList.pagination.setPage(1);
        _getList(cb);
    };
    let _getList = function(cb=function(){}){
        withdrawList.getWithdrawList().then((list)=>{
            withdrawData.list = list;
            withdrawData.pagination = withdrawList.pagination;
            withdrawList.setActiveItem(list[0]);
            withdrawData.activeItem = withdrawList.activeItem;
            cb();
        })
    };
    let _initStatus = function(){
        withdrawList.setStatus("waitWithdraw")
    };
    let changePage = function(pageNum){
        withdrawList.pagination.setPage(pageNum);
        _getList();
    };

    let selectQueryMsg = function(queryMsg){
        withdrawList.selectQueryMsg(queryMsg);
    };
    let queryByQueryInfo = function(cb){
        load(cb);
    };
    let selectWithdrawItem = function(orderId){
        let withdrawItem = withdrawList.findItemByItemId(withdrawData.list,orderId,"orderId");
        withdrawList.setActiveItem(withdrawItem);
        withdrawData.activeItem = withdrawList.activeItem;
    };

    let allow = function(){
        withdrawList.activeItem.allow().then(()=>{
            _getList();
        })
    };
    let reject = function(){
        withdrawList.activeItem.reject().then(()=>{
            _getList();
        })
    };
    let setRemark = function(remark){
        withdrawList.activeItem.setRemark(remark);
    };
    let getExcel = function(){
        withdrawList.getExcel();
    };
    return {
        onLoad:load.before(_initStatus),
        changePage:changePage,
        selectQueryMsg:selectQueryMsg,
        queryByQueryInfo:queryByQueryInfo,
        selectWithdrawItem:selectWithdrawItem,
        allow:allow,
        reject:reject,
        setRemark:setRemark,
        getExcel:getExcel
    }
}
module.exports = {data:withdrawData,actions:withdrawActions()};