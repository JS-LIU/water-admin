/**
 * Created by LDQ on 2018/6/25
 */
import {observable, computed, action, autorun} from "mobx";
import categoryList from './CategoryList';
let categoryListData = {
    @observable list:[{productMiddleType:{productCategory:{}}}]
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
    let removeCategory = function(id){
        categoryList.removeCategory(id).then(()=>{
            load();
        })
    };
    let removeCategoryLv1 = function(id){
        categoryList.removeCategoryLv1(id).then(()=>{
            load();
        })
    };
    let removeCategoryLv2 = function(id){
        categoryList.removeCategoryLv2(id).then(()=>{
            load();
        })
    };
    let editCategory = function(id,name){
        categoryList.editCategory(id,name).then(()=>{
            load();
        })
    };
    let editCategoryLv1 = function(id,name){
        categoryList.editCategoryLv1(id,name).then(()=>{
            load();
        })
    };
    let editCategoryLv2 = function(id,name){
        categoryList.editCategoryLv2(id,name).then(()=>{
            load();
        })
    };
    return {
        onLoad:load,
        appendCategory:appendCategory,
        appendCategoryLv1:appendCategoryLv1,
        appendCategoryLv2:appendCategoryLv2,
        removeCategory:removeCategory,
        removeCategoryLv1:removeCategoryLv1,
        removeCategoryLv2:removeCategoryLv2,
        editCategory:editCategory,
        editCategoryLv1:editCategoryLv1,
        editCategoryLv2:editCategoryLv2
    }
}
module.exports = {actions:categoryActions(),data:categoryListData};