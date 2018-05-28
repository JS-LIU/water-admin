/**
 * Created by LDQ on 2018/5/28
 */

import {autorun} from "mobx/lib/mobx";
import auditMerchantListContainer from './AuditMerchantListContainer';
// autorun(()=>{
//     auditMerchantListContainer.auditMerchantList.get();
//     // console.log(auditMerchantListContainer.getAuditMerchantList());
// });
//
// function getDefaultAuditMerchantList(){
//     auditMerchantListContainer.getAuditMerchantList().then(()=>{
//
//     })
// }

function auditMerchantList(){
    let onLoad = function(){
        auditMerchantListContainer.getAuditMerchantList().then(()=>{
            auditMerchantListContainer.selectMerchant(auditMerchantListContainer.auditMerchantList[0]);
        })
    };
    onLoad();

    /**
     * 拒绝开店列表
     */
    let selectRejectList = function(){
        auditMerchantListContainer.selectShopType('rejectForPermission');
        auditMerchantListContainer.getAuditMerchantList();
    };
    /**
     * 待审核店铺列表
     */

    let selectAllowList = function(){
        auditMerchantListContainer.selectShopType('rejectForPermission');
        auditMerchantListContainer.getAuditMerchantList();
    };
    return {
        selectRejectList:selectRejectList,
        selectAllowList:selectAllowList
    }
}
module.exports = auditMerchantList();
