/**
 * Created by LDQ on 2018/8/1
 */
class Account{
    constructor(accountInfo){
        this.orderNo = accountInfo.orderNo;
        this.preTradeRmb = accountInfo.preTradeRmb;
        this.afterTradeRmb = accountInfo.afterTradeRmb;
        this.tradeRmb = accountInfo.tradeRmb;
        this.tradeTime = accountInfo.tradeTime;
        this.tradeType = accountInfo.tradeType;
    }
}
module.exports = Account;