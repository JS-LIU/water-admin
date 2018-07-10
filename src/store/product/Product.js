/**
 * Created by LDQ on 2018/6/13
 */
import _h from '../../Util/HB';

class Product {
    constructor(productInfo) {
        this.productId = productInfo.id;
        this.productStatus = Product.convertProductStatus(productInfo.shopProductStatus);// 状态
        this.shopId = productInfo.shopId;
        this.shopName = productInfo.shopName;
        this.shopAlians = productInfo.shopAlians;
        this.productName = productInfo.productName;             //  商品名称
        this.volume = productInfo.volume;                       //  规格
        this.productImg = productInfo.imageUrl;                 //  商品图片
        this.productTag = productInfo.productTag;               //  标签
        this.price = productInfo.price;                         //  销售价
        this.originalPrice = productInfo.originalPrice;         //  原价
        this.costPrice = productInfo.costPrice;                 //  成本价
        this.distributionMoney = parseInt(productInfo.commissionRatio);
        this.saleMount = productInfo.saleMount;
        this.stockStatus = productInfo.stock;                   //  库存
        this.productActivity = productInfo.promotionActivity;   //  促销
        this.storeProductId = productInfo.storeProductId;
        this.serve = productInfo.serve;                         //  服务
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
        this._toTop = function () {
            return productAjax.save({action: "updateProductTop/" + self.productId})
        };
        this._removeItem = function () {
            return new Promise((resolve, reject) => {
                resolve(console.log("=delete=="))
            });

        };
        this._updateShopProductInfo = function(postInfo){
            return _h.ajax.resource('/admin/updateShopProductInfo').save({},postInfo);
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

    setProductName(name){
        this.productName = name;
    };
    setProductDescribe(name){
        this.productDescribe = name;
    }
    setCategory(id){
        this.categoryId = id;
    }
    setBrand(id){
        this.brandId = id;
    }
    setVolume(volume){
        this.volume = volume;
    }
    setHeaderImg(url){
        this.headerImg = url;
    }
    setProductImg(url){
        this.productImg = [url];
    }
    setPrice(price){
        this.price = price; //  销售价
    }
    setOriginalPrice(originalPrice){
        this.originalPrice = originalPrice;     //  原价
    }
    setCostPrice(costPrice){
        this.costPrice = costPrice;
    }
    setStockStatus(status){
        this.stockStatus = status;
    }
    setDetailImg(url){
        this.detailImg = [url];
    }
    setProductActivity(activity){
        this.productActivity = activity;
    }
    setServe(serve){
        this.serve = serve;
    }
    setShopIdList(id){
        this.shopId = id;
    }

    updateShopProductInfo(){
        let product = this;
        let postInfo = {
            shopProductId:product.storeProductId,
            brandId: product.brandId,
            brandImageUrl: product.headerImg,
            costPrice: product.costPrice,
            originalPrice: product.originalPrice,
            productCategoryId: product.categoryId,
            productDescribe: product.productDescribe,
            productDetailImageUrl: product.detailImg,
            productImageUrl: product.productImg,
            productName: product.productName,
            productVolume: product.volume,
            promotion: product.productActivity,
            sellingPrice: product.price,
            service: product.service,
            stock: product.stockStatus,
        };
        return this._updateShopProductInfo(postInfo);
    }
    clone(){
        return Object.assign(new Product({}),this);
    }
}

module.exports = Product;