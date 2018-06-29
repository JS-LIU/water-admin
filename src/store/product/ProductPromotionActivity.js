/**
 * Created by LDQ on 2018/6/26
 */
import PromotionActivity from 'PromotionActivity';
import _h from '../../Util/HB';
class ProductPromotionActivity extends PromotionActivity{
    constructor(){
        super();
        let promotionAjax = _h.ajax.resource('/admin/promotion/:action');
        this._edit = function(postInfo){
            return promotionAjax.save({action:"updateEntityProductPromotion"},postInfo);
        };
    }

}
module.exports = ProductPromotionActivity;