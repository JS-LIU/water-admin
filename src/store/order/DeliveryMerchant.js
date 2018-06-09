/**
 * Created by LDQ on 2018/5/14
 */
class DeliveryMerchant{
    constructor(info){
        this.longitude = info.longitude;
        this.latitude = info.latitude;
        this.shopName = info.shopName;
        this.shopAddress = info.shopAddress;
        this.shopTelephone = info.shopTelephone;
        this.distance = info.distance;
        this.shopAlias = info.shopAlias;
        this.shopArtificialNum = info.shopArtificialNum;
        this.shopId = info.shopId;
        this.deliveryor = "刘梦珍";
        this.cityName = info.cityName;
        this.type = DeliveryMerchant.convertToType(info.certification);
        if(info.shopId === 1){
            this.shopName = "立即派单";
        }
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
    static convertToType(certification){
        if(certification){
            return "加v店铺";
        }else{
            return "专卖店";
        }
    }
}
module.exports = DeliveryMerchant;