/**
 * Created by LDQ on 2018/5/22
 */
import {observable, computed, action, autorun} from "mobx";
import _h from "../../Util/HB";
import Pagination from '../Pagination';
import MerchantManageShop from "./MerchantManageShop";
class MerchantManageShopList{
    constructor(){
        let merchantManageAjax = _h.ajax.resource('/admin/merchant/:action');
        this._getMerchantManageList = function(postInfo){
            return merchantManageAjax.save({action:'shopList'}, postInfo)
        };
        this.merchantManageList = [];
        this.queryMsg = {};
        this.pagination = new Pagination(10);
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
                this.merchantManageList = MerchantManageShopList.createMerchantManageList(this.merchantManageList,merchantDataList);
                resolve(this.merchantManageList);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    static createMerchantManageList(merchantList,merchantDataList){
        for(let i = 0;i < merchantDataList.length;i++){
            merchantList.push(new MerchantManageShop(merchantDataList[i]));
        }
        return merchantList;
    }

    findMerchantById(merchantId){
        for(let i = 0;i < this.this.merchantManageList.length;i++){

        }
    }
}
module.exports = new MerchantManageShopList();