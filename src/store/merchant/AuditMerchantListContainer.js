/**
 * Created by LDQ on 2018/5/22
 */
import {observable, computed, action, autorun} from "mobx";
import _h from "../../Util/HB";
import Pagination from "../Pagination";
import AuditMerchant from './AuditMerchant';
class AuditMerchantListContainer{
    constructor(){
        let auditMerchantListAjax = _h.ajax.resource('/admin/merchant/:action');
        this._getAuditMerchantList = function (postInfo) {
            return auditMerchantListAjax.save({action:'getShopList'}, postInfo)
        };
        this.queryMsg = {};
        this.pagination = new Pagination(10);
        this.shopType = "waittingPermission";
        this._init = function(postInfo){
            return auditMerchantListAjax.save({action:'initShop'}, postInfo)
        };
        this.auditMerchantList = [];
        this.activeAuditMerchant = new AuditMerchant({});
    }

    /**
     * 选择审核状态
     * @param type:String
     */
    selectShopType(type){
        this._setShopType(type);
    }
    _setShopType(type){
        this.shopType = type;
    }
    _getQueryInfo(){
        return Object.assign(this.queryMsg,{
            queryType:this.shopType
        });
    }
    selectQueryMsg(queryMsg){
        this._setQueryMsg(queryMsg);
    }
    _setQueryMsg(queryMsg){
        this.queryMsg = queryMsg;
    }


    /**
     * 获取店铺审核列表
     * @param queryMsg
     * @returns {Promise<any>}
     */
    getAuditMerchantList(queryMsg) {
        let queryInfo = this._getQueryInfo();
        let postInfo = Object.assign(queryInfo,queryMsg,this.pagination.info);

        return new Promise((resolve,reject)=>{
            this._getAuditMerchantList(postInfo).then((auditMerchantList)=>{
                let auditMerchantContent = auditMerchantList.content;
                this.auditMerchantList = AuditMerchantListContainer.createAuditMerchantList(this.auditMerchantList,auditMerchantContent);
                resolve(this.auditMerchantList);
            }).catch((err)=>{
                reject(err);
            })
        });
    }

    static createAuditMerchantList(auditMerchantList,auditMerchantListData){
        for(let i = 0;i < auditMerchantListData.length;i++){
            auditMerchantList.push(new AuditMerchant(auditMerchantListData[i]));
        }
        if(auditMerchantList.length === 0){
            auditMerchantList.push(new AuditMerchant({}));
        }
        return auditMerchantList;
    }
    selectMerchant(merchant){
        this._setActiveAuditMerchant(merchant)
    }
    _setActiveAuditMerchant(merchant){
        this.activeAuditMerchant = merchant;
    }

    removeActiveMerchant(){
        for(let i = 0;i < this.auditMerchantList.length; i++){
            if(this.auditMerchantList[i].shopId === this.activeAuditMerchant.shopId){
                this.auditMerchantList.splice(i);
                return this.auditMerchantList;
            }
        }
    }
}

module.exports = new AuditMerchantListContainer();