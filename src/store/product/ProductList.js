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
        let self = this;
        this._getProductList = function(){
            return productListAjax.save({action:"/shopProductList/"+shopId});
        };
    }
    getProductList(){
        return new Promise((resolve,reject)=>{
            this._getProductList().then((productList)=>{
                this.list = ProductList.createList(this.list,productList,Product);
                resolve(this.list);
            }).catch((err)=>{
                reject(err);
            })
        });
    }
}
module.exports = ProductList;