/**
 * Created by LDQ on 2018/7/2
 */
class VolumeOfTransaction{
    constructor(info){
        this.city = info.city;
        this.consigneeAddress = info.consigneeAddress;
        this.consigneeName = info.consigneeName;
        this.createTime = info.createTime;
        this.currentPrice = info.currentPrice;
        this.orderId = info.orderId;
        this.orderNo = info.orderNo;
        this.payRelatedRmb = info.payRelatedRmb;
        this.payTime = info.payTime;
        this.payWay = info.payWay;
        this.productItemModels = info.productItemModels;
    }
}
module.exports = VolumeOfTransaction;