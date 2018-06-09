/**
 * Created by LDQ on 2018/6/7
 */
import _h from "../../Util/HB";
class RebateItem{
    constructor(rebateInfo){
        this.time = rebateInfo.month;
        this.shopAlians = rebateInfo.shopAlians;
        this.shopName = rebateInfo.shopName;
        this.phoneNum = rebateInfo.phoneNum;
        this.address = rebateInfo.appendingAddress;
        this.distance = rebateInfo.area;
        this.productItemList = rebateInfo.stockProductItemInfoList;
        this.totalMount = rebateInfo.totalMount;
        this.realTotalMount = rebateInfo.realTotalMount;
        this.rebatePerPrice = rebateInfo.rebatePrice;
        this.totalPrice = rebateInfo.rebateResult;
        this.status = rebateInfo.rebateStatus;
        this.rebateId = rebateInfo.rebateOrderId;
        this.remark = rebateInfo.remark||"----";
        let rebateAjax = _h.ajax.resource('/admin/financial/:action');
        this._getDetail = function(postInfo){
            return rebateAjax.save({action:"/getRebateOrder/"+postInfo.rebateId},postInfo);
        };
        this._toRebate = function(postInfo){
            return rebateAjax.save({action:"/doRebate"},postInfo);
        }
    }
    getDetail(){
        return this._getDetail();
    }
    toRebate(){
        let postInfo = {
            realRebateResult:this.totalPrice,
            realTotalMount:this.totalMount,
            rebateOrderId:this.rebateId,
            rebatePrice:this.rebatePerPrice,
            remark:this.remark
        };
        return this._toRebate(postInfo)
    }
    setRealTotalMount(mount){
        this.realTotalMount = mount;
    }
    setRebatePerPrice(){
        this.rebatePerPrice = RebateItem.rebateLv0(this.realTotalMount).after(
            RebateItem.rebateLv1(this.realTotalMount)
        ).after(
            RebateItem.rebateLv2(this.realTotalMount)
        ).after(
            RebateItem.rebateLv3(this.realTotalMount)
        );
    }
    setTotalPrice(){
        this.totalPrice = this.realTotalMount * this.rebatePerPrice;
    }
    setRemark(remark){
        this.remark = remark;
    }
    static rebateLv0(realTotalMount){
        if(realTotalMount <=200){
            return 0;
        }
        return "nextSuccessor"
    }
    static rebateLv1(realTotalMount){
        if(realTotalMount > 200 && realTotalMount <=500){
            return 0.5;
        }
        return "nextSuccessor"
    }
    static rebateLv2(realTotalMount){
        if(realTotalMount > 500 && realTotalMount <=1000){
            return 1;
        }
        return "nextSuccessor"
    }
    static rebateLv3(realTotalMount){
        if(realTotalMount > 1000){
            return 1.5;
        }
        return "nextSuccessor"
    }

}
module.exports = RebateItem;