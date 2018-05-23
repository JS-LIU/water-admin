/**
 * Created by LDQ on 2018/5/22
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';

class AuditMerchant{
    constructor(auditMerchantInfo){
        this.applyTime = auditMerchantInfo.applyTime;           //  申请时间
        this.shopName = auditMerchantInfo.shopName;             //  店铺名称
        this.shopType = auditMerchantInfo.merchantType;         //  店铺属性
        this.district = auditMerchantInfo.address;              //  所在地区
        this.addressDetail = auditMerchantInfo.addressDetail;   //  详细地址
        this.serviceTel =  auditMerchantInfo.serviceTel;        //  客服电话
        this.licenseImageUrl = auditMerchantInfo.businessLicenseImageUr;    //  营业执照
        this.managerName = auditMerchantInfo.userName;          //  店长姓名
        this.managerTel = auditMerchantInfo.telePhone;          //  联系人电话
        this.managerImgUrl = auditMerchantInfo.idCardImageUrl;  //  手持身份证照片
        this.auditStatus = AuditMerchant.convertToAuditStatus(auditMerchantInfo.merchantStatus);    //  审核状态
        this.operate = this.auditStatus.operate;                //  操作

        this.shopId = auditMerchantInfo.shopId;
        let auditAjax = _h.ajax.resource('/admin/merchant/:action');
        this._getDetail = function(){
            auditAjax.query({action:'productList/'+this.shopId});
        }
    }

    /**
     * 审核状态
     * @param status
     * @returns {*}
     */
    static convertToAuditStatus(status){
        if(status === "待审核"){
            return {status:0,title:"待审核",operate:"去审核"}
        }else{
            return {status:1,title:"未通过",operate:"信息待修改"}
        }
    }

    /**
     * 获取详细信息
     */
    getDetail(){
        this._getDetail().then((merchantDetail)=>{

        })
    }
    @observable _merchantDetail;
    @computed get merchantDetail(){

    }
    //
    allow(){

    }
    notAllow(){

    }
}
module.exports = AuditMerchant;