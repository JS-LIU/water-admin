/**
 * Created by LDQ on 2018/9/18
 */
import {observable, computed, action, autorun} from "mobx";
import waterTicketActiveList from './WaterTicketActiveList';
let waterTicketActiveListData = {
    @observable pagination:{},
    @observable acceptList:[],
    @observable activeList:[],
};
function waterTicketActiveListAction(){
    let _getList = function(){
        waterTicketActiveList.getWaterTicketList().then((list)=>{
            waterTicketActiveListData.pagination = waterTicketActiveList.pagination;
            waterTicketActiveListData.acceptList = list;
        })
    };
    let _getActivityList = function(){
        waterTicketActiveList.getActiveTicketList().then((list)=>{
            waterTicketActiveListData.activeList = list;
        })
    };
    let load = function(){
        waterTicketActiveList.pagination.setPage(1);
        _getActivityList();
        _getList();
    };
    let selectQueryInfo = function(queryMsg){
        waterTicketActiveList.selectQueryMsg(queryMsg);
    };
    let changePage = function(pageNum){
        waterTicketActiveList.pagination.setPage(pageNum);
        _getList();
    };
    let setActivityMode = function(mode){
        waterTicketActiveList.pagination.setPage(1);
        waterTicketActiveList.setActivityMode(mode);
        _getActivityList();
    };
    let searchWaterTicketActivityList = function(){
        _getList()
    };
    return {
        onLoad:load.before(function(){
            setActivityMode('online')
        }),
        changePage:changePage,
        selectQueryInfo:selectQueryInfo,
        setActivityMode:setActivityMode,
        searchWaterTicketActivityList:searchWaterTicketActivityList
    }
}
module.exports = {data:waterTicketActiveListData,actions:waterTicketActiveListAction()};