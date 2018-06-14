/**
 * Created by LDQ on 2018/6/14
 */
import ShopWithdrawList from './ShopWithdrawList';
import WaterTicketOrderList from '../order/WaterTicketOrderList';
class ShopAccount{
    constructor(accountInfo){
        this.shopId = accountInfo.shopId;
        this.balance = accountInfo.balance;
        this.withdrawList = new ShopWithdrawList(this.shopId);
        this.waterTicketOrderList = new WaterTicketOrderList(this.shopId);
    }
}
module.exports = ShopAccount;