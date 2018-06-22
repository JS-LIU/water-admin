/**
 * Created by LDQ on 2018/6/22
 */
import AdminList from '../AdminList';
import _h from '../../Util/HB';
import Product from "./Product";
class ProductSearchList extends AdminList{
    constructor(){
        super();
        let productSearchListAjax = _h.ajax.resource('/admin/product/:action');
        this._getProductSearchList = function(){
            return productSearchListAjax.save({action:"getStockList"});
        };
    }
    getProductSearchList(){
        return new Promise((resolve, reject)=>{
            this._getStockList().then((list)=>{
                this.list = ProductSearchList.createList(this.list,list,Product);
                resolve(this.list);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
}
module.exports = new ProductSearchList();