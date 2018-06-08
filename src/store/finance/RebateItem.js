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
    }
    setRealTotalMount(mount){
        this.realTotalMount = mount;
    }
    setRebatePerPrice(){

    }

}
module.exports = RebateItem;