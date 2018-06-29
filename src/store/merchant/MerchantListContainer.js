/**
 * Created by LDQ on 2018/5/22
 */
import _h from "../../Util/HB";
import Pagination from "../Pagination";
import Merchant from './Merchant';
class MerchantListContainer{
    constructor(){
        let merchantListAjax = _h.ajax.resource('/admin/merchant/:action');
        this._getMerchantList = function (postInfo) {
            return merchantListAjax.save({action:'getShopList'}, postInfo)
        };
        this.queryMsg = {};
        this.pagination = new Pagination(10);
        this.shopType = "waittingPermission";
        this.merchantType = "personal";
        this.merchantList = [];
        this.activeMerchant = new Merchant({});
        let self = this;
        this.sortStategy = {
            'toTop':(list,merchant)=>{
                let i = self.findMerchantIndexById(list,merchant.shopId);
                list.splice(i,1);
                list.unshift(merchant);
                return list;
            }
        };
        this._createShop = function(postInfo){
            return merchantListAjax.save({action:'createShop'}, postInfo)
        }
    }

    /**
     * 选择审核状态
     * @param type:String
     */
    selectShopType(type){
        this._setShopType(type);
    }

    changeMerchantType(merchantType){
        this.merchantType = merchantType;
    }
    _setShopType(type){
        this.shopType = type;
    }
    _getQueryInfo(){
        return Object.assign(this.queryMsg,{
            queryType:this.shopType,
            merchantType:this.merchantType
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
     * @returns {Promise<any>}
     */
    getMerchantList() {
        let queryInfo = this._getQueryInfo();
        let postInfo = Object.assign(queryInfo,this.queryMsg,this.pagination.getInfo());
        this.merchantList = [];
        return new Promise((resolve,reject)=>{
            this._getMerchantList(postInfo).then((merchantList)=>{
                this.pagination.setTotal(merchantList.totalElements);
                let merchantListContent = merchantList.content;
                this.merchantList = MerchantListContainer.createMerchantList(this.merchantList,merchantListContent);
                resolve(this.merchantList);
            }).catch((err)=>{
                reject(err);
            })
        });
    }

    static createMerchantList(merchantList,merchantListData){
        for(let i = 0;i < merchantListData.length;i++){
            merchantList.push(new Merchant(merchantListData[i]));
        }
        return merchantList;
    }
    selectMerchant(merchant){
        this._setActiveMerchant(merchant)
    }
    _setActiveMerchant(merchant){
        this.activeMerchant = merchant;
    }

    removeMerchant(list,merchant){
        let index = this.findMerchantIndexById(list,merchant.shopId);
        list.splice(index,1);
        return list;
    }
    findMerchantById(list,merchantId){
        return list.find((merchant)=>{
            return merchant.shopId === merchantId;
        })
    }
    findMerchantIndexById(list,merchantId){
        return list.findIndex((merchant)=>{
            return merchant.shopId === merchantId;
        })
    }
    reSort(list,merchant,sortType){
        return this.sortStategy[sortType](list,merchant);
    }

    createMerchant(postInfo){
        return this._createShop(postInfo);
    }
}

module.exports = new MerchantListContainer();