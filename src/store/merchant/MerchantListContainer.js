/**
 * Created by LDQ on 2018/5/22
 */
import _h from "../../Util/HB";
import Merchant from './Merchant';
import AdminList from '../AdminList';
import WaterStore from './WaterStore';
class MerchantListContainer extends AdminList{
    constructor(){
        super();
        let merchantListAjax = _h.ajax.resource('/admin/:entity/:action');
        this._getMerchantList = function (postInfo) {
            return merchantListAjax.save({entity:"merchant",action:'getShopList'}, postInfo)
        };
        this._getWaterStoreList = function(){
            return merchantListAjax.save({entity:"stock",action:"findSimpleShopList"});
        };


        this.shopType = "waittingPermission";

        this.merchantType = "personal";
        this._createShop = function(postInfo){
            return merchantListAjax.save({action:'createShop'}, postInfo)
        }

    }

    /**
     * 选择审核状态
     * @param type:String
     */
    selectShopType(type){
        this.shopType = type;
    }

    changeMerchantType(merchantType){
        this.merchantType = merchantType;
    }

    /**
     * 获取店铺审核列表
     * @returns {Promise<any>}
     */
    getMerchantList() {
        let reqMsg = this.getQueryMsg({queryType:this.shopType},{merchantType:this.merchantType});
        return this.getList(reqMsg,this._getMerchantList,Merchant)
    }

    /**
     * 获取水站列表
     */
    getWaterStoreList(){
        return new Promise((resolve, reject)=>{
            this._getWaterStoreList().then((list)=>{
                this.list = MerchantListContainer.createList(this.list,list,WaterStore);
                resolve(this.list);
            }).catch((err)=>{
                reject(err);
            });

        })
    }
    newMerchant(){
        this.setActiveItem(new Merchant({merchantStatus:"待审核"}));
    }
}

module.exports = new MerchantListContainer();