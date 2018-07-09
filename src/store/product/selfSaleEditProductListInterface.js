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
    @observable productImg:"",
    @observable productTag:"",
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
        editProductData.activeProduct = editProductList.activeItem;
    };
    let editProduct = function(productId){
        let product = editProductList.findItemByItemId(editProductData.list,productId,"productId");
        editProductList.setActiveItem(product);
        editProductData.shopId = editProductList.activeItem.shopId;
        editProductData.shopName = editProductList.activeItem.shopName;
        editProductData.productName = editProductList.activeItem.productName;
        editProductData.volume = editProductList.activeItem.volume;
        editProductData.productImg = editProductList.activeItem.imageUrl;
        editProductData.productTag = editProductList.activeItem.productTag;
        editProductData.price = editProductList.activeItem.price;
        editProductData.originalPrice = editProductList.activeItem.originalPrice;
        editProductData.costPrice = editProductList.activeItem.costPrice;
        editProductData.saleMount = editProductList.activeItem.saleMount;
        editProductData.stockStatus = editProductList.activeItem.stockStatus;
        editProductData.productActivity = editProductList.activeItem.promotionActivity;
        editProductData.serve = editProductList.activeItem.serve;
    };
    let addProduct = function(){
        editProductList.newProduct();
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
        _updateActiveProduct()
    };
    let setHeaderImg = function(url){
        editProductList.activeItem.setHeaderImg(url);
        _updateActiveProduct()
    };
    let setProductImg = function(url){
        editProductList.activeItem.setProductImg(url);
        _updateActiveProduct()
    };
    let setPrice = function(price){
        editProductList.activeItem.setPrice(price);
        editProductData.price = price;
        console.log(price)
        // _updateActiveProduct()
    };
    let setOriginalPrice = function(price){
        editProductList.activeItem.setOriginalPrice(price);
        _updateActiveProduct()
    };
    let setCostPrice = function(price){
        editProductList.activeItem.setCostPrice(price);
        _updateActiveProduct()
    };
    let setStockStatus = function(status){
        editProductList.activeItem.setStockStatus(status);
        _updateActiveProduct()
    };
    let setDetailImg = function(url){
        editProductList.activeItem.setDetailImg(url);
        _updateActiveProduct()
    };
    let setProductActivity = function(activity){
        editProductList.activeItem.setProductActivity(activity);
        _updateActiveProduct()
    };
    let setServe = function(serve){
        editProductList.activeItem.setServe(serve);
        _updateActiveProduct()
    };
    let setShopList = function(id){
        editProductList.activeItem.setShopIdList(id);
        _updateActiveProduct()
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