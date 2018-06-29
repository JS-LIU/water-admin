/**
 * Created by LDQ on 2018/6/13
 */
import _h from '../../Util/HB';

class Product {
    constructor(productInfo) {
        this.productId = productInfo.id;
        this.productStatus = Product.convertProductStatus(productInfo.shopProductStatus);
        this.shopId = productInfo.shopId;
        this.shopName = productInfo.shopName;
        this.shopAlians = productInfo.shopAlians;
        this.productName = productInfo.productName;
        this.volume = productInfo.volume;
        this.productImg = productInfo.imageUrl;
        this.productTag = productInfo.productTag;
        this.price = productInfo.price;
        this.originalPrice = productInfo.originalPrice;
        this.salePrice = productInfo.costPrice;
        this.distributionMoney = parseInt(productInfo.commissionRatio);
        this.saleMount = productInfo.saleMount;
        this.stockStatus = productInfo.stock;
        this.productActivity = productInfo.promotionActivity;
        this.storeProductId = productInfo.storeProductId;
        this.serve = productInfo.serve;

        //  商品品类
        this.productCategory = "----";

        //  商品品牌
        this.productBrand = "----";
        //  所属区域
        this.areaBelong = "----";
        let self = this;
        this.operateStrategy = {
            'soldOut': function () {
                return self._soldOut()
            },
            'toTop': function () {
                return self._toTop();
            },
            'added': function () {
                return self._added()
            },
            'removeItem': function () {
                return this._removeItem();
            }
        };
        let productAjax = _h.ajax.resource('/admin/product/:action');

        this._editProduct = function () {
            console.log("--bianji-");
            // return productAjax.save({action:"updateProductStatus/"+self.productId})
        };
        this._soldOut = function () {
            return productAjax.save({action: "updateProductStatus/" + self.productId})
        };
        this._added = function () {
            return productAjax.save({action: "updateProductStatus/" + self.productId})
        };
        this._toTop = function(){
            return productAjax.save({action: "updateProductTop/" + self.productId})
        };
        this._removeItem = function(){
            return new Promise((resolve, reject)=>{
                resolve(console.log("=delete=="))
            });

            // return productAjax.save({action:""})
        };

    }

    static convertProductStatus(status) {
        if (status === "在售") {
            return {
                status: "up",
                title: '在售中',
                actions: [{operate: "soldOut", title: "下架"}, {operate: "toTop", title: "置顶"}]
            }
        } else {
            return {
                status: "down",
                title: '待上架',
                actions: [{operate: "added", title: "上架"}, {operate: "removeItem", title: "删除"}]
            }
        }
    }

    operate(action) {
        return this.operateStrategy[action]();
    }
    edit() {

    }


}

module.exports = Product;