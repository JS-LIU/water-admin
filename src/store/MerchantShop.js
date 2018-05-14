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
    }
}
module.exports = MerchantShop;