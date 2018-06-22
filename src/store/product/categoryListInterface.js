/**
 * Created by LDQ on 2018/6/22
 */
import {observable, computed, action, autorun} from "mobx";
import categoryList from './CategoryList';
let categoryListData = {
    list:[{productMiddleType:{productCategory:{}}}]
};
function categoryActions(){
    let load = function(){
        categoryList.getCategoryList().then((list)=>{
            categoryListData.list = list;
        })
    };
    let appendCategory = function (name) {
        categoryList.createCategory(name).then(()=>{
            load();
        })
    };
    let appendCategoryLv1 = function(categoryId,name){

        categoryList.createCategoryLv1(categoryId,name).then(()=>{
            load();
        })
    };
    let appendCategoryLv2 = function (productMiddleTypeId,name){
        categoryList.createCategoryLv2(productMiddleTypeId,name).then(()=>{
            load();
        })
    };
    return {
        onLoad:load,
        appendCategory:appendCategory,
        appendCategoryLv1:appendCategoryLv1,
        appendCategoryLv2:appendCategoryLv2
    }
}
module.exports = {actions:categoryActions(),data:categoryListData};