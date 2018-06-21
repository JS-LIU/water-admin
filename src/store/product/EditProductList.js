/**
 * Created by LDQ on 2018/6/21
 */
import AdminList from '../AdminList';
import _h from '../../Util/HB';
class EditProductList extends AdminList{
    constructor(){
        super();
        let productListAjax = _h.ajax.resource('/admin/merchant/:action');
        this._getProductList = function(){
            return productListAjax.save({action:"/shopProductList/"+shopId});
        };
    }

}
module.exports = EditProductList;