/**
 * Created by LDQ on 2018/6/25
 */
import PromotionActivityStrategyList from './PromotionActivityStrategyList';
class PromotionActivity{
    constructor(promotionInfo){
        this.promotionActivityId = promotionInfo.promotionActivityId;
        //  商品名称
        this.productName = promotionInfo.productName;
        //  促销活动
        this.promotionActivityStategyList = new PromotionActivityStrategyList(promotionInfo.promotionActivities);
        //  类型（商家端、用户端）
        this.promotionType = promotionInfo.promotionType;

    }
}
module.exports = PromotionActivity;