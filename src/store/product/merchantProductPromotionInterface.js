/**
 * Created by LDQ on 2018/6/26
 */
import {observable, computed, action, autorun} from "mobx";
import PromotionList from './promotionList';
//  promotionList entity
let promotionList = new PromotionList("merchant");

let merchantProductPromotionData = {
    @observable list:[],
    @observable pagination:{},
    @observable activeItem:{},
    @observable productList:[],
};
function merchantProductPromotionActions(){
    let load = function(){
        promotionList.getProductPromotionList().then((list)=>{
            merchantProductPromotionData.pagination = promotionList.pagination;
            merchantProductPromotionData.list = list;
        });
    };
    let setPromotionStatus = function(status){
        promotionList.setPromotionStatus(status);
    };
    let operate = function(promotionActivityId,action){
        merchantProductPromotionData.activeItem = promotionList.findItemByItemId(
            merchantProductPromotionData.list,
            promotionActivityId,
            "promotionActivityId"
        );
        merchantProductPromotionData.activeItem.operate(action);
    };
    let createProductPromotionActivity = function(){

    };
    let getProductList = function(){
        promotionList.createProductPromotion.productListEntity.getProductList().then((list)=>{
            merchantProductPromotionData.list = list;
            promotionList.createProductPromotion.productListEntity.setActiveItem(list[0]);
        });
    };

    return {
        onLoad:load.before(()=>{
            setPromotionStatus('use');
        }),
        operate:operate,
        createProductPromotionActivity:createProductPromotionActivity,
        getProductList:getProductList
    }
}
module.exports = {data:merchantProductPromotionData,actions:merchantProductPromotionActions()};
