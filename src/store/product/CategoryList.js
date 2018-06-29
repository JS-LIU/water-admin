/**
 * Created by LDQ on 2018/6/22
 */
import _h from "../../Util/HB";
class CategoryList{
    constructor(){
        let brandListAjax = _h.ajax.resource('/admin/product/:action');
        this._getCategoryList = function(){
            return brandListAjax.save({action:'brandList'});
        };
        this._createCategory = function(categoryName){
            return brandListAjax.save({action:'createCategory/'+categoryName});
        };
        this._createCategoryLv1 = function(postInfo){
            return brandListAjax.save({action:'createProductMiddleType'},postInfo);
        };
        this._createCategoryLv2 = function(postInfo){
            return brandListAjax.save({action:'createBrand'},postInfo);
        };
        this._removeCategory = function(categoryId){
            return brandListAjax.save({action:'createCategory/'+categoryId});
        };
        this._removeCategoryLv1 = function(categoryIdLv1){
            return brandListAjax.save({action:'createCategory/'+categoryIdLv1});
        };
        this._removeCategoryLv2 = function(categoryIdLv2){
            return brandListAjax.save({action:'createCategory/'+categoryIdLv2});
        };
        this._editCategory = function(postInfo){
            return brandListAjax.save({action:'createCategory'},postInfo);
        };
        this._editCategoryLv1 = function(postInfo){
            return brandListAjax.save({action:'updateProductMiddleType'},postInfo);
        };
        this._editCategoryLv2 = function(postInfo){
            return brandListAjax.save({action:'updateBrand'},postInfo);
        };
    }

    getCategoryList(){
        return this._getCategoryList()
    }
    createCategory(categoryName){
        return this._createCategory(categoryName)
    }
    createCategoryLv1(categoryId,name){
        let postInfo = {
            categoryId: categoryId,
            name: name
        };
        return this._createCategoryLv1(postInfo);
    }
    createCategoryLv2(productMiddleTypeId,name){
        let postInfo = {
            categoryId: productMiddleTypeId,
            name: name,
            imageUrl:""
        };
        return this._createCategoryLv2(postInfo);
    }
    removeCategory(categoryId){
        return this._removeCategory(categoryId);
    }
    removeCategoryLv1(categoryIdLv1){
        return this._removeCategoryLv1(categoryIdLv1);
    }
    removeCategoryLv2(categoryIdLv2){
        return this._removeCategoryLv2(categoryIdLv2);
    }
    editCategory(id,name){
        let postInfo = {
            id:id,
            name:name
        };
        return this._editCategory(postInfo);
    }
    editCategoryLv1(id,name){
        let postInfo = {
            id:id,
            name:name
        };
        return this._editCategoryLv1(postInfo);
    }
    editCategoryLv2(id,name){
        let postInfo = {
            id:id,
            name:name
        };
        return this._editCategoryLv2(postInfo);
    }


}
module.exports = new CategoryList();