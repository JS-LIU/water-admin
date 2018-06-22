/**
 * Created by LDQ on 2018/6/21
 */
import AdminList from '../AdminList';
import _h from '../../Util/HB';
import Product from './Product';
class EditProductList extends AdminList{
    constructor(){
        super();
        let productListAjax = _h.ajax.resource('/admin/product/:action');
        this._getStockList = function(){
            return productListAjax.save({action:"getStockList"});
        };
    }
    getStockList(){
        return new Promise((resolve, reject)=>{
            this._getStockList().then((list)=>{
                this.list = EditProductList.createList(this.list,list,Product);
                resolve(this.list);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
}
module.exports = new EditProductList();