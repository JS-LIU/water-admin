/**
 * Created by LDQ on 2018/6/7
 */
import _h from "../../Util/HB";
import Pagination from "../Pagination";
import RebateItem from './RebateItem';
class RebateList{
    constructor(){
        // /admin/financial/getMonthRebateList
        let rebateListAjax = _h.ajax.resource('/admin/financial/:action');

        this._getRebateList = function(postInfo){
            return rebateListAjax.save({action:"/getMonthRebateList"},postInfo);
        };
        this.pagination = new Pagination(10);
        this.queryMsg = {};
        this.rebateStatus = "create";
        this.rebateList = [];
        this.activeRebateItem = new RebateItem({});
    }

    selectQueryInfo(queryMsg){
        this.queryMsg = queryMsg;
    }
    setActiveRebateItem(rebateItem){
        this.activeRebateItem = rebateItem;
    }

    getQueryInfo(){
        return Object.assign(this.queryMsg,{rebateStatus:this.rebateStatus});
    }
    changeStatus(status){
        this.rebateStatus = status;
    }
    getRebateList(){
        let queryInfoMsg = this.getQueryInfo();
        return new Promise((resolve, reject)=>{
            this._getRebateList(queryInfoMsg).then((rebateListContainer)=>{
                let rebateListData = rebateListContainer.content;
                this.pagination.setTotal(rebateListContainer.totalElements);
                this.rebateList = RebateList.createRebateList(this.rebateList,rebateListData);
                resolve(this.rebateList);
            }).catch((err)=>{
                reject(err);
            });

        })
    }
    static createRebateList(rebateList,rebateListData){
        rebateList = [];
        for(let i = 0;i < rebateListData.length;i++){
            rebateList.push(new RebateItem(rebateListData[i]));
        }
        return rebateList;
    }
    findRebateItemByRebateId(list,rebateId){
        return list.find((rebateItem)=>{
            return rebateItem.rebateId === rebateId;
        })
    }
    removeRebateItem(list,rebateItem){
        let index = this.findRebateItemIndexById(list,rebateItem.rebateOrderId);
        list.splice(index,1);
        return list;
    }
    findRebateItemIndexById(list,rebateOrderId){
        return list.findIndex((item)=>{
            return item.rebateId === rebateOrderId;
        })
    }
}
module.exports = RebateList;