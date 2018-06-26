/**
 * Created by LDQ on 2018/6/25
 */
import AdminList from '../AdminList';
import _h from '../../Util/HB';
import ProductPromotionActivity from './ProductPromotionActivity';

class PromotionList extends AdminList{
    constructor(promotionSrc){
        super();
        let promotionAjax = _h.ajax.resource('/admin/promotion/:action');
        this._getPromotionList = function(postInfo){
                return promotionAjax.save({action:"getShopEntityProductPromotionList"},postInfo);
        };
        //  活动状态
        this.promotionStatus = "use";
        //  商家/客户(merchant/user) 促销
        this.promotionSrc = promotionSrc;
    }

    setPromotionStatus(status){
        this.promotionStatus = status;

        //  重置状态后重置查询条件
        this.selectQueryMsg({});
    }
    getPromotionList(){
        let postInfo = this.getQueryMsg({promotionStatus:this.promotionStatus},
            {promotionSrc:this.promotionSrc});
        return new Promise((resolve, reject)=>{
            this._getPromotionList(postInfo).then((list)=>{
                PromotionList.createList(this.list,list,ProductPromotionActivity);
                resolve(list);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

}
module.exports = PromotionList;