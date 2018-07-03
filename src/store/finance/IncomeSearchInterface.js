/**
 * Created by LDQ on 2018/7/3
 */
import incomeList from './IncomeList';
import {observable, computed, action, autorun} from "mobx";
let incomeSearchData = {
    @observable list:[],
    @observable pagination:{},
    @observable time:{},
    @observable incomeData:{}
};
function incomeSearchActions(){

    let _getList = function(){
        incomeList.getIncomeList().then((list)=>{
            incomeSearchData.pagination = incomeList.pagination;
            incomeSearchData.list = list;
        })
    };
    let _getIncomeData = function(){
        incomeList.getIncomeData().then((data)=>{
            incomeSearchData.incomeData = data;
        })
    };
    let load = function(){
        _getList();
        _getIncomeData();
    };
    let selectQueryInfo = function(queryMsg){
        incomeList.selectQueryMsg(queryMsg);
    };
    let queryListByQueryInfo = function(){
        _getList();
    };
    let queryDataByQueryInfo = function(){
        _getIncomeData();
    };
    let changePage = function(pageNum){
        incomeList.pagination.setPage(pageNum);
        _getList();
    };

    return {
        onLoad:load,
        changePage:changePage,
        queryDataByQueryInfo:queryDataByQueryInfo,
        queryListByQueryInfo:queryListByQueryInfo,
        selectQueryInfo:selectQueryInfo
    }
}
module.exports = {actions:incomeSearchActions(),data:incomeSearchData};