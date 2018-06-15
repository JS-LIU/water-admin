/**
 * Created by LDQ on 2018/6/13
 */
class Product{
    constructor(productInfo){
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
        this.operateStrategy = {
            'soldOut':function(){
                console.log('下架了')
            },
            'toTop':function () {
                console.log('hello')
            },
            'added':function () {
                console.log('hello')
            },
            'removeItem':function () {
                console.log('hello')
            }
        }

    }
    static convertProductStatus(status){
        if(status === "在售"){
            return {status:"up",actions:[{operate:"soldOut",title:"下架"},{operate:"toTop",title:"置顶"}]}
        }else{
            return {status:"down",actions:[{operate:"added",title:"上架"},{operate:"removeItem",title:"删除"}]}
        }
    }
    operate(action){
        return this.operateStrategy[action]();
    }

}
module.exports = Product;