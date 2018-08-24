/**
 * Created by LDQ on 2018/6/25
 */
import PromotionActivityStrategyList from './PromotionActivityStrategyList';
// import _h from '../../Util/HB';
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
class PromotionActivity{
    constructor(promotionInfo){
        this.promotionActivityId = promotionInfo.promotionActivityId;
        //  商品名称
        this.productName = promotionInfo.productName;
        //  促销活动
        this.promotionActivityStategyList = new PromotionActivityStrategyList(promotionInfo.promotionActivities);
        //  类型（商家端、用户端）
        this.promotionType = promotionInfo.promotionType;
        this.promotionDescription = promotionInfo.promotionDescription;
        this.promotionStatus = promotionInfo.promotionStatus;
        this.saleMount = promotionInfo.saleMount;
        this.waterTicketMount = promotionInfo.waterTicketMount;
        this.operate = PromotionActivity.convertProductStatus(promotionInfo.promotionStatus);
        let self = this;
        let promotionAjax = commonAjax.resource('/admin/promotion/:action');
        this._changeStatus = function(){
            let postInfo = {
                promotionId: promotionInfo.promotionActivityId,
                updatePromotionType: promotionInfo.promotionStatus
            };
            return promotionAjax.save({action:"updatePromotionStatus"},postInfo);
        };
        this._removeItem = function(){
            return new Promise((resolve, reject)=>{
                resolve(alert('删除 没有接口'))
            })
        };

        this._edit = function(){
        };
        this.operateStrategy = {
            'soldOut': function () {
                return self._changeStatus()
            },
            'edit': function () {
                return self._edit();
            },
            'added': function () {
                return self._changeStatus()
            },
            'removeItem': function () {
                return this._removeItem();
            }
        };

    }
    static convertProductStatus(status) {
        if (status === "use") {
            return {
                status: "use",
                title: '活动中',
                actions: [{operate: "edit", title: "编辑"},{operate: "soldOut", title: "下架"}]
            }
        } else {
            return {
                status: "unUse",
                title: '已结束',
                actions: [{operate: "added", title: "上架"}, {operate: "removeItem", title: "删除"}]
            }
        }
    }

}
module.exports = PromotionActivity;