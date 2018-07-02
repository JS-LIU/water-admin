/**
 * Created by LDQ on 2018/7/2
 */
import Product from './Product';
class SimpleProduct extends Product{
    constructor(info){
        super(Object.assign(info,{shopProductStatus:""},{commissionRatio:""}));
        this.productId = info.productId;
    }
}
module.exports = SimpleProduct;