import _h from "../Util/HB";

/**
 * Created by LDQ on 2018/5/14
 */
class MerchantShop{
    constructor(info){
        this.longitude = info.longitude;
        this.latitude = info.latitude;
        this.shopName = info.shopName;
        this.shopAddress = info.shopAddress;
        this.shopTelephone = info.shopTelephone;
        this.shopAlias = info.shopAlias;
        this.shopArtificialNum = info.shopArtificialNum;
        this.shopId = info.shopId;
        this.cityName = info.cityName;
        let merchantListAjax = _h.ajax.resource('/admin/order/:action');
        this._getNearMerchantList = function (postInfo) {
            return merchantListAjax.save({action:'assignShopList'}, postInfo)
        };
    }

    @action getNearMerchantList() {
        let self = this;
        this._getNearMerchantList({
            latitude:this.latitude,
            longtitude:this.longitude,
            cityName:this.cityName
        }).then((merchantList)=>{
            console.log(merchantList);
        })
    }
}
module.exports = MerchantShop;