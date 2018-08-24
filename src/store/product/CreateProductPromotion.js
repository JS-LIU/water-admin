/**
 * Created by LDQ on 2018/6/27
 */
import ProductList from './ProductList';
// import _h from '../../Util/HB';
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
import PromotionActivityStrategyList from './PromotionActivityStrategyList';

class CreateProductPromotion{
    constructor(promotionSrc,promotionStatus,shopId){
        this.shopId = shopId;
        this.promotionSrc = promotionSrc;
        this.promotionStatus = promotionStatus;
        this.productListEntity = new ProductList(this.shopId);
        this.mark = "创建者很懒什么都没写";
        this._createProductPromotion = function(postInfo){
            return commonAjax.resource('/admin/promotion/addEntityProductPromotion').save({},postInfo);
        };
        this.promotionActivityStrategyList = new PromotionActivityStrategyList([]);
    }

    setPromotionStatus(status){
        this.promotionStatus = status;
    }
    setMark(str){
        this.mark = str;
    }
    setPromotionType(promotionType){
        this.promotionType = promotionType;
    }
    createProductPromotion(){
        let postInfo = {
            promotionDescribe:this.mark,
            promotionSrc:this.promotionSrc,
            shopId:this.shopId,
            shopProductId:this.productListEntity.activeItem.productId,
            promotionActivityInfos:this.promotionActivityStrategyList.getList()
        };
        return this._createProductPromotion(postInfo)
    }

}
module.exports = CreateProductPromotion;