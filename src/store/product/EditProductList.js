/**
 * Created by LDQ on 2018/6/21
 */
import AdminList from '../AdminList';
import _h from '../../Util/HB';
import Product from './Product';
class EditProductList extends AdminList{
    constructor(){
        super();
        let productListAjax = _h.ajax.resource('/admin/:entity/:action');

        //  批发
        this._getStockList = function(postInfo){
            return productListAjax.save({entity:"product",action:"getStockList"},postInfo);
        };
        //  自营
        this._getSelfSaleProductList = function(postInfo){
            return productListAjax.save({entity:"merchant",action:"selfSaleShopProductList"},postInfo);
        };
        //  分销
        this._getDistributeProductList = function(postInfo){
            return productListAjax.save({entity:"product",action:"getDistributionProductListInfo"},postInfo);
        };
    }
    getStockList(){
        return new Promise((resolve, reject)=>{
            this._getStockList({}).then((list)=>{
                this.list = EditProductList.createList(this.list,list,Product);
                resolve(this.list);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    getSelfSaleProductList(){
        return this.getList({},this._getSelfSaleProductList,Product);
    }
    getDistributeProductList(){
        return new Promise((resolve, reject)=>{
            this._getDistributeProductList().then((list)=>{
                this.list = EditProductList.createList(this.list,list,Product);
                resolve(this.list);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
}
module.exports = new EditProductList();