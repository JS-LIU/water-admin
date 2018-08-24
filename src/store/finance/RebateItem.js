/**
 * Created by LDQ on 2018/6/7
 */
// import _h from "../../Util/HB";
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
import ProductList from '../product/ProductList';
class RebateItem{
    constructor(rebateInfo){
        this.month = rebateInfo.month;                              //  时间
        this.shopAlians = rebateInfo.shopAlians||"------";          //  店铺编号
        this.shopName = rebateInfo.shopName;                        //  店铺名称
        this.phoneNum = rebateInfo.phoneNum;                        //  联系电话
        this.address = rebateInfo.appendingAddress;                 //  地址
        this.distance = rebateInfo.area;                            //  距离

        this.productItemList = ProductList.convertProductsKVToList(rebateInfo.stockProcutMap); //  产品项目表

        this.totalMount = rebateInfo.totalMount;                    //  总数
        this.realTotalMount = rebateInfo.realTotalMount;            //  实际总数
        this.rebatePerPrice = rebateInfo.rebatePrice;               //  每一个的返利价格
        this.status = rebateInfo.rebateStatus;                      //  状态
        this.rebateId = rebateInfo.rebateOrderId;                   //  折扣id
        this.remark = rebateInfo.remark||"----";                    //  评论
        this.city = rebateInfo.city;                                //  区域
        this.productName = rebateInfo.productName;                  //  商品名称
        this.productMount = rebateInfo.productMount;                //  数量
        this.rebatePriceExcel = rebateInfo.rebatePriceExcel ;       //  返利标准
        this.rebatePrice = rebateInfo.rebatePrice;                  //  返利金额
        this.rebateResult = rebateInfo.rebateResult;                //  实际返利金额
        this.realRebate = rebateInfo.rebateResult/10;
        this.realRebateResult = rebateInfo.realRebateResult;

        let rebateAjax = commonAjax.resource('/admin/financial/:action');
        this._getDetail = function(postInfo){
            return rebateAjax.save({action:"getRebateOrder/"+rebateInfo.rebateOrderId},postInfo);
        };
        this._toRebate = function(postInfo){
            return rebateAjax.save({action:"doRebate"},postInfo);
        }
    }
    getDetail(){
        return this._getDetail();
    }
    toRebate(){
        let self = this;
        let postInfo = {
            rebateOrderId:self.rebateId,
            realTotalMount:self.totalMount,
            calcRebateResult:self.rebateResult,
            rebatePrice:self.rebatePerPrice,
            remark:self.remark,
            realRebateResult:self.realRebate
        };
        return this._toRebate(postInfo)
    }
    setRealTotalMount(mount){
        this.realTotalMount = mount;
    }
    setRebatePerPrice(){
        this.rebatePerPrice = RebateItem.rebateLv0(this.realTotalMount).after(
            RebateItem.rebateLv1(this.realTotalMount)
        ).after(
            RebateItem.rebateLv2(this.realTotalMount)
        ).after(
            RebateItem.rebateLv3(this.realTotalMount)
        );
    }
    setRealResult(realRebate){
        this.realRebate = realRebate;
    }
    setRemark(remark){
        this.remark = remark;
    }
    static rebateLv0(realTotalMount){
        if(realTotalMount <=200){
            return 0;
        }
        return "nextSuccessor"
    }
    static rebateLv1(realTotalMount){
        if(realTotalMount > 200 && realTotalMount <=500){
            return 0.5;
        }
        return "nextSuccessor"
    }
    static rebateLv2(realTotalMount){
        if(realTotalMount > 500 && realTotalMount <=1000){
            return 1;
        }
        return "nextSuccessor"
    }
    static rebateLv3(realTotalMount){
        if(realTotalMount > 1000){
            return 1.5;
        }
        return "nextSuccessor"
    }
    // convertProductsKVToList(products){
    //     let productList = [];
    //     for(let prop in products){
    //         productList.push(new Product({productName:prop,saleMount:products[prop]}))
    //     }
    //     return productList;
    // }
}
module.exports = RebateItem;