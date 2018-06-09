/**
 * Created by LDQ on 2018/6/6
 */


import {observable, computed, action, autorun} from "mobx";
import RebateList from './RebateList';

const rebateList = new RebateList();

let rebateDealListData = {
    @observable list:[],
    @observable detail:{}
};

let actions = {
    onLoad:{},
    selectRebateItem:{},
    setRealTotalMount:{},
    confirmRebate:{},
    setQueryInfo:{},
    queryByQueryInfo:{}
};



function rebateDealListActions(){
    rebateList.changeStatus('create');
    actions.onLoad = function(){
        rebateList.pagination.setPage(1);
        rebateList.getRebateList().then((rebateList)=>{
            rebateDealListData.list = rebateList;
            rebateList.setActiveRebateItem(rebateList[0]);
            rebateList.activeRebateItem.getDetail().then((detail)=>{
                rebateDealListData.detail = detail;
            })
        })
    };

    actions.selectRebateItem = function(rebateId){
        let rebateItem = rebateList.findRebateItemByRebateId(rebateDealListData.list,rebateId);
        rebateList.setActiveRebateItem(rebateItem);
        rebateList.activeRebateItem.getDetail().then((detail)=>{
            rebateDealListData.detail = detail;
        })
    };
    actions.setRealTotalMount = function(realTotalMount){
        rebateList.activeRebateItem.setRealTotalMount(realTotalMount);
        rebateList.activeRebateItem.setRebatePerPrice();
        rebateList.activeRebateItem.setTotalPrice();
    };
    actions.confirmRebate = function(remark){
        rebateList.activeRebateItem.setRemark(remark);
        rebateList.activeRebateItem.toRebate().then(()=>{
            rebateList.removeRebateItem(rebateDealListData.list,rebateList.activeRebateItem);
        })
    };
    actions.setQueryInfo = function(queryMsg){
        rebateList.selectQueryInfo(queryMsg);
    };
    actions.queryByQueryInfo = function(){
        actions.onLoad();
    };
    actions.changePage = function(pageNum){
        rebateList.pagination.setPage(pageNum);
        rebateList.getRebateList().then((rebateList)=>{
            rebateDealListData.list = rebateList;
            rebateList.setActiveRebateItem(rebateList[0]);
            rebateList.activeRebateItem.getDetail().then((detail)=>{
                rebateDealListData.detail = detail;
            })
        })
    };
    return actions;
}