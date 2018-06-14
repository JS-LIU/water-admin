/**
 * Created by LDQ on 2018/6/13
 */
class Product{
    constructor(productInfo){
        this.productId = productInfo.productId;
        this.productStatus = Product.convertProductStatus(productInfo.productStatus);
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
        if(status === "up"){
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