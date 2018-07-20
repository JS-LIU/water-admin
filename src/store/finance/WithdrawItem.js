/**
 * Created by LDQ on 2018/6/14
 */
import _h from "../../Util/HB";
class WithdrawItem{
    constructor(withdrawInfo){
        this.createTime = withdrawInfo.createTime;
        this.orderNo = withdrawInfo.orderNo;
        this.cashMount = withdrawInfo.cashMount;
        this.currentMount = withdrawInfo.currentMount;
        this.realRmbMount = withdrawInfo.realRmbMount;
        this.merchantName = withdrawInfo.merchantName;
        this.bankName = withdrawInfo.bankName;
        this.openAccountAddress = withdrawInfo.openAccountAddress;
        this.bankCardNo = withdrawInfo.bankCardNo;
        this.status = withdrawInfo.status;
        this.finishTime = withdrawInfo.finishTime;
        this.merchantId = withdrawInfo.merchantId;
        this.orderId = withdrawInfo.orderId;
        this.accountId = withdrawInfo.accountId;
        this.shopAlias = withdrawInfo.shopAlias;
        this.shopName = withdrawInfo.shopName;
        this.shopPhone = withdrawInfo.shopPhone;
        this.address = withdrawInfo.address;
        this.remark = withdrawInfo.remark;
        this.cardholderName = withdrawInfo.cardholderName;



        let withdrawAjax = _h.ajax.resource("/admin/withdraw/:action");
        this._allowWithdraw = function(postInfo){
            return withdrawAjax.save({action:"allow"},postInfo);
        };
        this._rejectWithdraw = function(postInfo){
            return withdrawAjax.save({action:"reject"},postInfo);
        }

    }
    setRemark(remark){
        this.remark = remark;
    }
    allow(){
        return this._allowWithdraw({orderId:this.orderId,remarks:this.remark});
    }
    reject(){
        return this._rejectWithdraw({orderId:this.orderId,remarks:this.remark});
    }


}
module.exports = WithdrawItem;