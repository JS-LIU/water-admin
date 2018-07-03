/**
 * Created by LDQ on 2018/7/3
 */
class Income{
    constructor(info){
        this.area = info.area;
        this.merchantNumber = info.merchantNumber;
        this.orderSuccessNumber = info.orderSuccessNumber;
        this.productInfoList = info.productInfoList;
        this.realPayPrice = info.realPayPrice;
        this.shopAlias = info.shopAlias;
        this.shopName = info.shopName;

    }
}
module.exports = Income;