/**
 * Created by LDQ on 2018/6/13
 */
import AdminList from '../AdminList';
import _h from '../../Util/HB';
import Product from './Product';
import SimpleProduct from './SimpleProduct';
class ProductList extends AdminList {
    constructor(shopId) {
        super();
        this.shopId = shopId;
        let productListAjax = _h.ajax.resource('/admin/:entity/:action');
        this._getProductList = function () {
            return productListAjax.save({entity:"merchant",action: "shopProductList/" + shopId});
        };
        this._getSimpleProductList = function(){
            return productListAjax.save({entity:"stock/",action: "findSimpleShopProductList"});
        }
    }

    getProductList() {
        return new Promise((resolve, reject) => {
            this._getProductList().then((productList) => {
                this.list = ProductList.createList(this.list, productList, Product);
                resolve(this.list);
            }).catch((err) => {
                reject(err);
            })
        });
    }
    getSimpleProductList(){
        return new Promise((resolve, reject)=>{
            this._getSimpleProductList().then((productList)=>{
                this.list = ProductList.createList(this.list,productList,SimpleProduct);
                resolve(this.list);
            })
        })
    }
    static convertProductsKVToList(products){
        let productList = [];
        for(let prop in products){
            productList.push(new Product({productName:prop,saleMount:products[prop]}))
        }
        return productList;
    }
}

module.exports = ProductList;