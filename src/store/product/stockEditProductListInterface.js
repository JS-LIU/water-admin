/**
 * Created by LDQ on 2018/6/22
 */
import {observable, computed, action, autorun} from "mobx";
import editProductList from './EditProductList';
let editProductData = {
    @observable list:[],
    @observable brandList:[],
    @observable categoryList:[],
    @observable selfMerchantList:[],
    @observable shopId:"",
    @observable shopName:"",
    @observable productName:"",
    @observable volume:"",
    @observable productImg:null,
    @observable price:"",
    @observable originalPrice:"",
    @observable costPrice:"",
    @observable saleMount:"",
    @observable stockStatus:"",
    @observable productActivity:"",
    @observable serve:"",
};
function editProductActions(){
    let _getList = function(){
        editProductList.getStockList().then((list)=>{
            editProductData.list = list;
            editProductList.setActiveItem(list[0]);
        })
    };
    let operate = function(productId,operate){
        let product = editProductList.findItemByItemId(editProductData.list,productId,"productId");
        editProductList.setActiveItem(product);
        product.operate(operate)
    };
    let load = function(){
        _getList();
        _getCategoryList();
        _getBrandList();
    };
    let _getCategoryList = function(){
        editProductList.categoryList.getCategoryList().then((list)=>{
            editProductData.categoryList = list;
        })
    };
    let _getBrandList = function(){
        editProductList.categoryList.getBrandList().then((list)=>{
            editProductData.brandList = list;
        })
    };
    return {
        operate:operate
    }
}
module.exports = {actions:editProductActions(),data:editProductData};