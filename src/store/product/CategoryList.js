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
        this._createBrand = function(postInfo){
            return brandListAjax.save({action:'brandList'},postInfo);
        };
        this._createCategory = function(categoryName){
            return brandListAjax.save({action:'createCategory/'+categoryName});
        };
        this._createCategoryLv1 = function(postInfo){
            return brandListAjax.save({action:'createProductMiddleType'},postInfo);
        };
        this._createCategoryLv2 = function(postInfo){
            return brandListAjax.save({action:'createBrand'},postInfo);
        }
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

}
module.exports = new CategoryList();