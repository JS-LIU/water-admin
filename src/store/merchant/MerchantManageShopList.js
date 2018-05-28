/**
 * Created by LDQ on 2018/5/22
 */
import {observable, computed, action, autorun} from "mobx";
import _h from "../../Util/HB";
import MerchantManageShop from "./MerchantManageShop";
class MerchantManageShopList{
    constructor(){
        let merchantManageAjax = _h.ajax.resource('/admin/merchant/:action');
        this._getMerchantManageList = function(){

        };
        this.queryMsg = {}
    }
    selectQueryMsg(){
        this._setQueryMsg();
    }
    _setQueryMsg(queryMsg){
        this.queryMsg = queryMsg;
    }

    getMerchantManageList(){
        let postInfo = Object.assign(this.queryMsg,this.pagination.info);
        return new Promise((resolve,reject)=>{
            this._getMerchantManageList(postInfo).then((merchantManageContent)=>{
                let merchantDataList = merchantManageContent.content;
                MerchantManageShopList.createMerchantManageList(this._merchantManageList,merchantDataList);
            })
        })
    }
    static createMerchantManageList(merchantList,merchantDataList){
        for(let i = 0;i < merchantDataList.length;i++){
            merchantList.push(new MerchantManageShop(merchantDataList[i]));
        }
    }
    @observable _merchantManageList = [];
    @computed get merchantManageList(){
        return this._merchantManageList;
    }




}
module.exports = new MerchantManageShopList();