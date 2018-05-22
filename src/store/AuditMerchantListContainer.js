/**
 * Created by LDQ on 2018/5/22
 */
import {observable, computed, action, autorun} from "mobx";
import _h from "../Util/HB";
import Pagination from "./Pagination";
import AuditMerchant from './AuditMerchant';
class AuditMerchantListContainer{
    constructor(){
        let auditMerchantListAjax = _h.ajax.resource('/admin/merchant/:action');
        this._getAuditMerchantList = function (postInfo) {
            return auditMerchantListAjax.save({action:'getShopList'}, postInfo)
        };
        this.queryMsg = {};
        this.pagination = new Pagination(10);

    }
    selectQueryMsg(queryMsg){
        this._setQueryMsg(queryMsg);
    }
    _setQueryMsg(queryMsg){
        this.queryMsg = queryMsg;
    }

    getAuditMerchantList(queryMsg) {
        let postInfo = Object.assign(queryMsg,this.pagination.info);
        return new Promise((resolve,reject)=>{
            this._getAuditMerchantList(postInfo).then((auditMerchantList)=>{

                let auditMerchantContent = auditMerchantList.content;
                AuditMerchantListContainer.createAuditMerchantList(this._auditMerchantList,auditMerchantContent);
            })
        });
    }
    @observable _auditMerchantList = [];
    @computed get auditMerchantList(){
        return this._auditMerchantList;
    }
    static createAuditMerchantList(auditMerchantList,auditMerchantListData){
        for(let i = 0;i < auditMerchantListData.length;i++){
            auditMerchantList.push(new AuditMerchant(auditMerchantListData[i]));
        }
    }
    selectMerchant(merchant){
        this._setActiveAuditMerchant(merchant)
    }
    _setActiveAuditMerchant(merchant){
        this._activeAuditMerchant = merchant;
    }

    @observable _activeAuditMerchant = new AuditMerchant({});
    @computed get activeAuditMerchant(){
        return this._activeAuditMerchant;
    }

}
module.exports = new AuditMerchantListContainer();