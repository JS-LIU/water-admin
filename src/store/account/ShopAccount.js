/**
 * Created by LDQ on 2018/6/14
 */
import _h from '../../Util/HB';
import ShopWithdrawList from './ShopWithdrawList';
import WaterTicketOrderList from '../order/WaterTicketOrderList';
import AdminList from '../AdminList';
import RmbAccount from './RmbAccount';
import WaterTicketAccount from './WaterTicketAccount';

class ShopAccount extends AdminList{
    constructor(shopId){
        super();
        this.shopId = shopId;
        let shopAccountAjax = _h.ajax.resource('/admin/merchant/:action');
        // this.balance = accountInfo.balance;
        //  提现列表
        this.withdrawList = new ShopWithdrawList(this.shopId);
        //  水票订单
        this.waterTicketOrderList = new WaterTicketOrderList(this.shopId);
        //  账户记录
        this._getAccountRecordInfo = function(postInfo){
            return shopAccountAjax.save({action:'getAccountRecordInfo'},postInfo);
        };
        //  money ticket
        this.recordType = "money";

        this.recordStrategy = {
            "money":RmbAccount,
            "ticket":WaterTicketAccount,
        }
    }
    changeRecordType(type){
        this.recordType = type;
    }
    _getAccountEntity(){
        return this.recordStrategy[this.recordType];
    }
    getAccountRecordInfo(){
        let reqMsg = this.getQueryMsg({shopId:this.shopId},{recordType:this.recordType});
        let Entity = this._getAccountEntity();
        return this.getList(reqMsg,this._getAccountRecordInfo,Entity);
    }
}
module.exports = ShopAccount;