/**
 * Created by LDQ on 2018/6/22
 */
import AdminList from '../AdminList';
import _h from '../../Util/HB';
import Product from "./Product";
class ProductSearchList extends AdminList{
    constructor(){
        super();
        let productSearchListAjax = _h.ajax.resource('/admin/:entity/:action');
        //  批发
        this._getProductSearchList = function(){
            return productSearchListAjax.save({entity:"product",action:"getStockList"});
        };
        //  自营
        this._getSelfSaleProductList = function(postInfo){
            return productSearchListAjax.save({entity:"merchant",action:"selfSaleShopProductList"},postInfo);
        };
        //  分销
        this._getDistributeProductList = function(){
            return productSearchListAjax.save({entity:"product",actions:'getDistributionProductListInfo'});
        }
    }
    getProductSearchList(){
        return new Promise((resolve, reject)=>{
            this._getProductSearchList().then((list)=>{
                this.list = ProductSearchList.createList(this.list,list,Product);
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
            this._getDistributeProductList({}).then((list)=>{
                this.list = ProductSearchList.createList(this.list,list,Product);
                resolve(this.list);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
}
module.exports = new ProductSearchList();