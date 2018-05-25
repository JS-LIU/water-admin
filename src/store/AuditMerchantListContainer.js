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
        this.shopType = "waittingPermission";
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
    removeActiveMerchant(){
        for(let i = 0;i < this._auditMerchantList.length;i++){
            if(this._auditMerchantList[i].shopId === this._activeAuditMerchant.shopId){
                this._auditMerchantList.splice(i);
                return this._auditMerchantList;
            }
        }
    }
}
module.exports = new AuditMerchantListContainer();