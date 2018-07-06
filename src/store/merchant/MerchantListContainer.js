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
            return merchantListAjax.save({entity:"merchant",action:'createShop'}, postInfo)
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
    createMerchant(){
        console.log(this.activeItem);
        let merchant = this.activeItem;
        let postData = {
            shopName:merchant.shopName,
            shopIconImg:merchant.shopHeaderImg,
            shopDetailImage:merchant.shopImg,
            shopType:2,
            merchantAttribute:merchant.merchantType,
            mappingAddress:merchant.mappingAddress,
            longitude:merchant.longitude,
            latitude:merchant.latitude,
            appendingAddress:merchant.appendingAddress,
            deliverTime:merchant.deliveryTime,
            distanceScope:merchant.deliveryRange,
            freight:merchant.deliveryMoney,
            merchantDiscription:merchant.introduce,
            merchantUserTel:merchant.managerTel,
            phoneNum:merchant.serviceTel
        };
        console.log(postData);
        return this._createShop(postData);
    }
}

module.exports = new MerchantListContainer();