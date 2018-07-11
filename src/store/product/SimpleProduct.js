/**
 * Created by LDQ on 2018/7/2
 */
import Product from './Product';
class SimpleProduct extends Product{
    constructor(info){
        let product = Object.assign(info,{shopProductStatus:""},{commissionRatio:""});
        super(product);
        this.productId = info.productId;
    }
}
module.exports = SimpleProduct;