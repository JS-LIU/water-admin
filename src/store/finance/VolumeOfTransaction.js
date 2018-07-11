/**
 * Created by LDQ on 2018/7/2
 */
class VolumeOfTransaction{
    constructor(info){
        this.city = info.city||"------";                 // 城市
        this.consigneeAddress = info.consigneeAddress;   // 收货人地址
        this.consigneeName = info.consigneeName;         // 收货人姓名
        this.createTime = info.createTime;               // 创建时间
        this.currentPrice = info.currentPrice;           // 当前金额
        this.orderId = info.orderId;                     // 订单id
        this.orderNo = info.orderNo;                     // 订单号
        this.payRelatedRmb = info.payRelatedRmb;         //
        this.payTime = info.payTime;                     // 支付时间
        this.payWay = info.payWay;                       // 支付方式
        this.productItemModels = info.productItemModels; //

        this.shopName = info.shopName;                   // 商家名称
        this.shopNumber = info.shopNumber||"------";     // 商家编号
        this.userMobile = info.userMobile;               // 用户账号
        this.shopPhone = info.shopPhone;                 // 联系电话
        this.remark = info.remark||"------";             // 备注
    }
}
module.exports = VolumeOfTransaction;