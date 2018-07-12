/**
 * Created by LDQ on 2018/6/30
 */
import {observable, computed, action, autorun} from "mobx";
import manufactureCostList from './ManufactureCostList';
let manufactureCostListData = {
    @observable list:[],
    @observable pagination:{},
    @observable productList:[],
    @observable waterStoreList:[],
    @observable totalRmb:0,
    @observable productId:null,
    @observable unitPrice:"",
    @observable remark:"",
    @observable payRmb:"",
    @observable ticketUrl:"",
    @observable count:""

};
function manufactureCostListActions(){
    let _getList = function(){
        manufactureCostList.getManufactureCostList().then((list)=>{
            manufactureCostListData.pagination = manufactureCostList.pagination;
            manufactureCostListData.list = list;
        });
    };
    let load = function(){
        _getList();
        manufactureCostList.waterStoreList.getWaterStoreList().then((list)=>{
            manufactureCostListData.waterStoreList = list;
        });
        manufactureCostList.stockProductList.getSimpleProductList().then((list)=>{
            manufactureCostListData.productList = list;
        });
    };
    let _updateManufactureCost = function(){
        manufactureCostListData.payRmb  = manufactureCostList.activeItem.payRmb;
        manufactureCostListData.productId  = null;
        manufactureCostListData.productType = manufactureCostList.activeItem.productType;
        manufactureCostListData.ticketUrl  = manufactureCostList.activeItem.ticketUrl;
        manufactureCostListData.unitPrice  = manufactureCostList.activeItem.unitPrice;
        manufactureCostListData.remark = manufactureCostList.activeItem.remark;
        manufactureCostListData.count = manufactureCostList.activeItem.count;
        manufactureCostListData.totalRmb = 0;
    };

    let addManufacture = function(){
        manufactureCostList.newManufactureCost();
        _updateManufactureCost();
    };
    let selectWaterStore = function(shopId){
        let waterStore = manufactureCostList.waterStoreList.findItemByItemId(manufactureCostListData.waterStoreList,shopId,"shopId");
        manufactureCostList.waterStoreList.setActiveItem(waterStore);
        manufactureCostList.activeItem.setWaterStore(waterStore)
    };
    let selectProduct = function(productId){
        let product = manufactureCostList.stockProductList.findItemByItemId(manufactureCostListData.productList,productId,"productId");
        manufactureCostList.stockProductList.setActiveItem(product);
        manufactureCostList.activeItem.setProduct(product);
        manufactureCostListData.productId = product.productId;
    };
    let setPerProductPrice = function(price){
        manufactureCostList.activeItem.setPerProductPrice(price);
        manufactureCostListData.unitPrice = price;
    };
    let setTotalCount = function(count){
        manufactureCostList.activeItem.setTotalCount(count);
        manufactureCostListData.count = count;
    };
    let setMark = function(mark){
        manufactureCostList.activeItem.setMark(mark);
        manufactureCostListData.mark = mark;
    };
    let setPayRmb = function(payRmb){
        manufactureCostList.activeItem.setPayRmb(payRmb);
        manufactureCostListData.payRmb = payRmb;
    };
    let calcPayRmb = function(){
        manufactureCostListData.totalRmb = manufactureCostList.activeItem.getTotalPayRmb();
    };
    let createManufactureCost = function(){
        manufactureCostList.createManufactureCost().then(()=>{
            _getList();
        });
    };
    let selectManufactureCost = function(manufactureCostId){
        let manufactureCost = manufactureCostList.findItemByItemId(manufactureCostListData.list,manufactureCostId,"id");
        manufactureCostList.setActiveItem(manufactureCost);
    };
    let setTicketUrl = function(url){
        manufactureCostList.activeItem.setTicketUrl(url);
    };
    let updateRemark = function(remark){
        manufactureCostList.activeItem.updateRemark(remark).then(()=>{
            _getList();
        });
    };
    let changePage = function(pageNum){
        manufactureCostList.pagination.setPage(pageNum);
        _getList();
    };
    return {
        onLoad:load,
        addManufacture:addManufacture,          //  点击添加进水按钮
        selectWaterStore:selectWaterStore,      //  选择水厂
        selectProduct:selectProduct,            //  选择商品
        setPerProductPrice:setPerProductPrice,
        setTotalCount:setTotalCount,
        setMark:setMark,
        setPayRmb:setPayRmb,
        calcPayRmb:calcPayRmb,                  //  自动计算金额
        createManufactureCost:createManufactureCost,    //  点击确定创建
        selectManufactureCost:selectManufactureCost,
        updateRemark:updateRemark,
        changePage:changePage,
        setTicketUrl:setTicketUrl               //  设置存根
    }
}
module.exports = {data:manufactureCostListData,actions:manufactureCostListActions()};