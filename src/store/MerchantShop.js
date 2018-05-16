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

    }

    /**
     * 获取店铺的定位信息
     * @returns {{latitude: *, longtitude: *, cityName: *}}
     */
    getMerchantAddressInfo(){
        return {
            latitude:this.latitude,
            longtitude:this.longitude,
            cityName:this.cityName
        }
    }

}
module.exports = MerchantShop;