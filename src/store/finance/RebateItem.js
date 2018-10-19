/**
 * Created by LDQ on 2018/6/7
 */
// import _h from "../../Util/HB";
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
import ProductList from '../product/ProductList';

class CurrencyUtil{
    static fenToYuan(fen){
        return fen / 100;
    }

    static yuanToFen(realRebateInYuan) {
        return realRebateInYuan *　100;
    }

    static yuanToXtb(realRebateInYuan) {
        return realRebateInYuan * 10;
    }
}

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
        this.rebatePrice = rebateInfo.rebatePrice;
        //  返利金额

        // this.realRebateInFen = this.convertToShowUnit(rebateInfo.rebateResult);                  //  财务修改后的默认金额
        this.firstRebateResult = rebateInfo.realRebateResult;
        this.repairResult = rebateInfo.repairResult;                //  补充返利
        this.repairRebateCurrencyType = rebateInfo.rebateCurrencyType || "rmb"; //不可修改

        this.rebateAimCurrencyType = this.repairRebateCurrencyType;    //  返利币种，可修改
        this.realRebateInFen = rebateInfo.rebateResult;//单位为分
        this.realRebateResultInYuan = CurrencyUtil.fenToYuan(this.realRebateInFen);


        let rebateAjax = commonAjax.resource('/admin/financial/:action');
        this._getDetail = function(postInfo){
            return rebateAjax.save({action:"getRebateOrder/"+rebateInfo.rebateOrderId},postInfo);
        };
        this._toRebate = function(postInfo){
            return rebateAjax.save({action:"doRebate"},postInfo);
        };
        this._repairRebate = function(postInfo){
            return rebateAjax.save({action:"repairRebate"},postInfo);
        }
    }


    // getRepair
    getDetail(){
        return this._getDetail({});
    }
    toRebate(){
        this.changeRebateCurrencyType("xtb");
        let postInfo = {
            rebateOrderId:this.rebateId,
            realTotalMount:this.totalMount,
            rebatePrice:this.rebatePerPrice,
            remark:this.remark,
            realRebateResult:this.getRealResultForPost(),
            currencyType:this.rebateAimCurrencyType
        };
        return this._toRebate(postInfo)
    }

    static convertToShow(type, value){
        if (type === 'rmb'){
            return CurrencyUtil.fenToYuan(value);
        }else{
            return value;
        }
    }

    getFirstRebateResult(){
        return RebateItem.convertToShow(this.repairRebateCurrencyType,this.firstRebateResult);

    }
    getRealRebate(type){
        if (type === 'rmb'){
            return CurrencyUtil.fenToYuan(this.realRebateInFen);
        } else{
            throw new Error();

        }
    }

    getShowRepairResult(){
        return RebateItem.convertToShow(this.repairRebateCurrencyType,this.repairResult);
    }

    getPostRepairResult(){
        if (this.repairRebateCurrencyType === 'rmb'){
            return CurrencyUtil.yuanToFen(this.repairResult);
        }else{
            return this.repairResult;
        }
    }

    repairRebate(repairResult){
        this.repairResult = repairResult;
        let postInfo = {
            currencyType: this.repairRebateCurrencyType,
            rebateOrderId: this.rebateId,
            repairResult: this.getPostRepairResult()
        };
        return this._repairRebate(postInfo);
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

    getRealResultForPost(){
        if (this.rebateAimCurrencyType === 'rmb'){
            return  CurrencyUtil.yuanToFen(this.realRebateResultInYuan);
        }else{
            return CurrencyUtil.yuanToXtb(this.realRebateResultInYuan);
        }
    }

    setRealResult(realResult, type, unit){
        if (type === 'rmb' && unit === 'yuan'){
            this.realRebateResultInYuan = realResult;
        }else{
            throw new Error();
        }
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

    changeRebateCurrencyType(rebateCurrencyType){
        this.rebateAimCurrencyType = rebateCurrencyType;
    }
}
module.exports = RebateItem;