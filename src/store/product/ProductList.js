/**
 * Created by LDQ on 2018/6/13
 */
import AdminList from '../AdminList';
import _h from '../../Util/HB';
import Product from './Product';
class ProductList extends AdminList{
    constructor(shopId){
        super();
        this.shopId = shopId;
        let productListAjax = _h.ajax.resource('/admin/merchant/:action');
        this._getProductList = function(){
            return productListAjax.save({action:"/shopProductList/"+this.shopId});
        };
    }
    getProductList(){
        let queryInfo = this.getQueryMsg();
        return this.getList(queryInfo,this._getProductList,Product);
    }
}
module.exports = ProductList;