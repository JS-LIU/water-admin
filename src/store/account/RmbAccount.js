/**
 * Created by LDQ on 2018/8/1
 */
import Account from './Account';
class RmbAccount extends Account{
    constructor(accountInfo){
        super(accountInfo);

        this.currencyType = accountInfo.currencyType;
        if(this.currencyType !== "xtb"){
            this.preTradeRmb = accountInfo.preTradeRmb / 100;
            this.afterTradeRmb = accountInfo.afterTradeRmb / 100;
            this.tradeRmb = accountInfo.tradeRmb / 100;
        }else{
            this.preTradeRmb = accountInfo.preTradeRmb;
            this.afterTradeRmb = accountInfo.afterTradeRmb;
            this.tradeRmb = accountInfo.tradeRmb;
        }
    }
}
module.exports = RmbAccount;