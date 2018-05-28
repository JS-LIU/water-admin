/**
 * Created by LDQ on 2018/5/23
 */
import {observable, computed, action, autorun} from "mobx";
import _h from "../../Util/HB";
import Account from '../Account';
class MerchantManageShop{
    constructor(merchantManageInfo){
        this.address = merchantManageInfo.address;
        this.deliveryTime = merchantManageInfo.deliveryTime;
        this.shopId = merchantManageInfo.shopId;
        this.account = new Account();

        let merchantManageAjax = _h.ajax.resource('/admin/merchant/:action');

        this._getProductList = function(postInfo){
            return _h.ajax.resource('/admin/shoppingCart/:action').save({action:'productList'}, postInfo)
        };
        this._getSaleProductDetail = function(){

        }

    }
    getProductList(){
        let postInfo = {};
        this._getProductList(postInfo).then((productList)=>{

        })
    }
    getSaleProductDetail(){

    }
    getWaterTicketSalePromotionList(){

    }
    updateMerchantShopArtificialNum(){

    }
}
module.exports = MerchantManageShop;
