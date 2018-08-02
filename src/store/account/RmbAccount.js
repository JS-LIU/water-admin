/**
 * Created by LDQ on 2018/8/1
 */
import Account from './Account';
class RmbAccount extends Account{
    constructor(accountInfo){
        super(accountInfo);
        this.preTradeRmb = accountInfo.preTradeRmb / 100;
        this.afterTradeRmb = accountInfo.afterTradeRmb / 100;
        this.tradeRmb = accountInfo.tradeRmb / 100;
    }
}
module.exports = RmbAccount;