/**
 * Created by LDQ on 2018/6/25
 */
import {observable, computed, action, autorun} from "mobx";
import editProductList from './EditProductList';
let editProductData = {
    @observable list:[],
    @observable brandList:[],
    @observable categoryList:[],
    @observable selfMerchantList:[]
};
function editProductActions(){
    let _getList = function(){
        editProductList.getSelfSaleProductList().then((list)=>{
            editProductData.list = list;
            editProductList.setActiveItem(list[0]);
        })
    };

    let operate = function(productId,operate){
        let product = editProductList.findItemByItemId(editProductData.list,productId,"productId");
        editProductList.setActiveItem(product);
        product.operate(operate)
    };

    let editProduct = function(productId){
        let product = editProductList.findItemByItemId(editProductData.list,productId,"productId");
        editProductList.setActiveItem(product);
    };

    let load = function(){
        _getList();
        _getCategoryList();
        _getBrandList();
        _getSelfMerchantList();
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
    let _getSelfMerchantList = function(){
        editProductList.merchantListContainer.getSelfMerchantList().then((list)=>{
            editProductData.selfMerchantList = list;
        })
    };
    let addProduct = function(){
        editProductList.newProduct();
    };
    let setProductName = function(name){
        editProductList.activeItem.setProductName(name);
    };
    let setProductDescribe = function(name){
        editProductList.activeItem.setProductDescribe(name);
    };
    let setBrand = function(id){
        editProductList.activeItem.setBrand(id);
    };
    let setCategory = function(id){
        editProductList.activeItem.setCategory(id);
    };
    let setVolume = function(volume){
        editProductList.activeItem.setVolume(volume);
    };
    let setHeaderImg = function(url){
        editProductList.activeItem.setHeaderImg(url);
    };
    let setProductImg = function(url){
        editProductList.activeItem.setProductImg(url);
    };
    let setPrice = function(price){
        editProductList.activeItem.setPrice(price)
    };
    let setOriginalPrice = function(price){
        editProductList.activeItem.setOriginalPrice(price)
    };
    let setCostPrice = function(price){
        editProductList.activeItem.setCostPrice(price);
    };
    let setStockStatus = function(status){
        editProductList.activeItem.setStockStatus(status);
    };
    let setDetailImg = function(url){
        editProductList.activeItem.setDetailImg(url);
    };
    let setProductActivity = function(activity){
        editProductList.activeItem.setProductActivity(activity);
    };
    let setServe = function(serve){
        editProductList.activeItem.setServe(serve);
    };
    let setShopList = function(id){
        editProductList.activeItem.setShopIdList(id);
    };
    let createProduct = function(){
        editProductList.createProduct().then(()=>{
            _getList();
        });
    };
    return {
        onLoad:load,
        setProductName:setProductName,
        setProductDescribe:setProductDescribe,
        setBrand:setBrand,
        setCategory:setCategory,
        setVolume:setVolume,
        setHeaderImg:setHeaderImg,
        setProductImg:setProductImg,
        setPrice:setPrice,
        setOriginalPrice:setOriginalPrice,
        setCostPrice:setCostPrice,
        setStockStatus:setStockStatus,
        setDetailImg:setDetailImg,
        setProductActivity:setProductActivity,
        setServe:setServe,
        setShopList:setShopList,
        createProduct:createProduct,
        operate:operate,
        addProduct:addProduct,
        editProduct:editProduct,
    }
}
module.exports = {actions:editProductActions(),data:editProductData};