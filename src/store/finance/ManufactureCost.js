/**
 * Created by LDQ on 2018/6/28
 */
import _h from '../../Util/HB';
class ManufactureCost {
    constructor(info){
        this.id = info.stockWaterPayId;
        this.address  = info.address;          // 区域
        this.count  = info.count;              // 数量
        this.createTime  = info.createTime;    // 生产时间
        this.payNumber  = info.payNumber;      // 交易单号
        this.payRmb  = info.payRmb;            // 金额
        this.productName  = info.productName;  // 商品+规格
        this.productType  = info.productType;  // 分类
        this.shopName  = info.shopName;        // 水厂
        this.ticketUrl  = info.ticketUrl;      // 收据
        this.unitPrice  = info.unitPrice;      // 成本
        this.remark = info.remark;
        let manufactureCostAjax = _h.ajax.resource('/admin/order/:action');

        this._updateRemark = function(postInfo){
            return manufactureCostAjax.save({actions:"updateStockWaterPayRemake"},postInfo);
        };
        this._updatePic = function(postInfo){
            return manufactureCostAjax.save({actions:"updateStockWaterPayTicketUrl"},postInfo);
        }
    }
    //  设置水厂
    setWaterStore(waterStore){
        this.waterStore = waterStore;
    }
    //  设置商品
    setProduct(product){
        this.product = product;
    }
    //  设置商品原价
    setPerProductPrice(price){
        this.unitPrice = price;
    }
    //  设置数量
    setTotalCount(count){
        this.count = count;
    }
    //  设置备注
    setMark(remark){
        this.remark = remark;
    }
    //  支付金额
    setPayRmb(price){
        this.payRmb = price;
    }
    //  计算金额
    getTotalPayRmb(){
        return this.unitPrice * this.count;
    }
    updateRemark(remark){
        let self = this;
        let postInfo = {
            id:self.id,
            remark:remark
        };
        return this._updateRemark(postInfo);
    }
    updatePic(picUrl){
        
    }
    setTicketUrl(url){
        this.ticketUrl = url
    }
}
module.exports = ManufactureCost;