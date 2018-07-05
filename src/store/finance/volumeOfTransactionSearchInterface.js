/**
 * Created by LDQ on 2018/7/3
 */

import volumeOfTransactionList from './VolumeOfTransactionList';
import {observable, computed, action, autorun} from "mobx";
let volumeOfTransactionSearchData = {
    @observable list:[],
    @observable pagination:{},
    @observable time:'',
    @observable volumeOfTransactionData:{},
};
function volumeOfTransactionSearchActions(){
    let _getList = function(){
        volumeOfTransactionList.getVolumeOfTransactionList().then((list)=>{
            volumeOfTransactionSearchData.pagination = volumeOfTransactionList.pagination;
            volumeOfTransactionSearchData.list = list;
        })
    };
    let _getVolumeOfTransactionData = function(){
        volumeOfTransactionList.getVolumeOfTransactionData().then((data)=>{
            volumeOfTransactionSearchData.volumeOfTransactionData = data;
        })
    };
    let load = function(){
        _getList();
        _getVolumeOfTransactionData();
    };
    let selectQueryInfo = function(queryMsg){
        volumeOfTransactionList.selectQueryMsg(queryMsg);
    };
    let queryListByQueryInfo = function(){
        _getList();
    };
    let queryDataByQueryInfo = function(){
        _getVolumeOfTransactionData();
    };
    let changePage = function(pageNum){
        volumeOfTransactionList.pagination.setPage(pageNum);
        _getList();
    };
    let setOrderSrc = function(orderSrc){
        volumeOfTransactionList.setOrderSrc(orderSrc);
    };
    return {
        onLoad:load.before(function(){
            setOrderSrc('merchant_src')
        }),
        selectQueryInfo:selectQueryInfo,
        queryListByQueryInfo:queryListByQueryInfo,
        queryDataByQueryInfo:queryDataByQueryInfo,
        changePage:changePage
    }
}
module.exports = {data:volumeOfTransactionSearchData,actions:volumeOfTransactionSearchActions()};