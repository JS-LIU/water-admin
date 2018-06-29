/**
 * Created by LDQ on 2018/6/25
 */
import AdminList from '../AdminList';
import _h from '../../Util/HB';
import ProductPromotionActivity from './ProductPromotionActivity';
import CreateProductPromotion from './CreateProductPromotion';

class PromotionList extends AdminList{
    constructor(promotionSrc){
        super();
        let promotionAjax = _h.ajax.resource('/admin/promotion/:action');
        //  获取商品详情
        this._getProductPromotionList = function(postInfo){
            return promotionAjax.save({action:"getShopEntityProductPromotionList"},postInfo);
        };
        //  获取水票详情
        this._getWaterTicketPromotionList = function(){
            return promotionAjax.save({action:"getWaterTicketPromotionList"},postInfo);
        };
        //  活动状态
        this.promotionStatus = "use";
        this._createProductPromotion = function(postInfo){
            return promotionAjax.save({action:"addEntityProductPromotion"},postInfo);
        };
        //  商家/客户(merchant/user) 促销
        this.promotionSrc = promotionSrc;
        this.shopId = PromotionList._getShopId(promotionSrc);

        this.createProductPromotion = new CreateProductPromotion(promotionSrc,this.promotionStatus,this.shopId);


    }
    static _getShopId(promotionSrc){
        let shopId = 1;
        if(promotionSrc === "merchant"){
            shopId = 1;
        }
        return shopId;
    }
    setPromotionStatus(status){
        this.promotionStatus = status;

        //  重置状态后重置查询条件
        this.selectQueryMsg({});
    }
    getProductPromotionList(){

        let postInfo = this.getQueryMsg({promotionStatus:this.promotionStatus},
            {promotionSrc:this.promotionSrc});
        return new Promise((resolve, reject)=>{
            this._getProductPromotionList(postInfo).then((list)=>{
                PromotionList.createList(this.list,list,ProductPromotionActivity);
                resolve(list);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    //  创建促销
    createProductPromotion(){

    }
    //
    setProduct(product){

    }
}
module.exports = PromotionList;