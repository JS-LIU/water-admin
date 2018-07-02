/**
 * Created by LDQ on 2018/6/28
 */
class ManufactureCost {
    constructor(info){
        this.id = info.stockWaterPayId;
        this.address  = info.address;          // 区域
        this.count  = info.count;              // 数量
        this.createTime  = info.createTime;    // 生产时间
        this.payNumber  = info.payNumber;      // 交易单号
        this.payRmb  = info.payRmb;            // 金额
        this.productName  = info.productName;  // 商品+规格
        this.productType  = info.productType;  // 分类
        this.shopName  = info.shopName;        // 水厂
        this.ticketUrl  = info.ticketUrl;      // 收据
        this.unitPrice  = info.unitPrice;      // 成本
    }
}
module.exports = ManufactureCost;