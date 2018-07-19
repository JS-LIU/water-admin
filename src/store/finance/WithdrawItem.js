/**
 * Created by LDQ on 2018/6/14
 */
import _h from "../../Util/HB";
class WithdrawItem{
    constructor(withdrawInfo){
        this.withdrawId = withdrawInfo.id;
        this.accountId = withdrawInfo.withdrawInfo;
        let withdrawAjax = _h.ajax.resource("/admin/withdraw/:action");
        this._allowWithdraw = function(postInfo){
            return withdrawAjax.save({action:"allow"},postInfo);
        }

    }
    allow(remarks){
        return this._allowWithdraw({orderId:this.withdrawId,remarks:remarks});
    }


}
module.exports = WithdrawItem;