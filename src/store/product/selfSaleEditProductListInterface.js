/**
 * Created by LDQ on 2018/6/25
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
    let _updateActiveProduct = function(){
        editProductData.shopId = editProductList.activeItem.shopId;
        editProductData.productName = editProductList.activeItem.productName;
        editProductData.volume = editProductList.activeItem.volume;
        editProductData.productImg = editProductList.activeItem.productImg;
        editProductData.price = editProductList.activeItem.price;
        editProductData.originalPrice = editProductList.activeItem.originalPrice;
        editProductData.costPrice = editProductList.activeItem.costPrice;
        editProductData.saleMount = editProductList.activeItem.saleMount;
        editProductData.stockStatus = editProductList.activeItem.stockStatus;
        editProductData.productActivity = editProductList.activeItem.promotionActivity;
        editProductData.serve = editProductList.activeItem.serve;
    };

    let editProduct = function(productId){
        let product = editProductList.findItemByItemId(editProductData.list,productId,"productId");
        editProductList.setActiveItem(product);
        _updateActiveProduct();
    };
    let addProduct = function(){
        editProductList.newProduct();
        _updateActiveProduct();
    };
    let setProductName = function(name){
        editProductList.activeItem.setProductName(name);
        editProductData.productName = name;
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
        editProductData.volume = volume;
    };

    let setPrice = function(price){
        editProductList.activeItem.setPrice(price);
        editProductData.price = price;
    };
    let setOriginalPrice = function(price){
        editProductList.activeItem.setOriginalPrice(price);
        editProductData.originalPrice = price;
    };
    let setCostPrice = function(price){
        editProductList.activeItem.setCostPrice(price);
        editProductData.costPrice = price;
    };
    let setStockStatus = function(status){
        editProductList.activeItem.setStockStatus(status);
        editProductData.stockStatus = status;
    };
    let setProductActivity = function(activity){
        editProductList.activeItem.setProductActivity(activity);
        editProductData.productActivity = activity
    };
    let setServe = function(serve){
        editProductList.activeItem.setServe(serve);
        editProductData.serve = serve;
    };
    let setShopList = function(id){
        editProductList.activeItem.setShopIdList(id);
        editProductData.shopId = id;
    };
    let setHeaderImg = function(url){
        editProductList.activeItem.setHeaderImg(url);
    };
    let setProductImg = function(url){
        editProductList.activeItem.setProductImg(url);
    };
    let setDetailImg = function(url){
        editProductList.activeItem.setDetailImg(url);
    };
    let createProduct = function(){
        editProductList.createProduct().then(()=>{
            _getList();
        });
    };
    let updateProduct = function(){
        editProductList.activeItem.updateShopProductInfo().then(()=>{
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
        operate:operate,
        addProduct:addProduct,
        createProduct:createProduct,
        editProduct:editProduct,
        updateProduct:updateProduct
    }
}
module.exports = {actions:editProductActions(),data:editProductData};