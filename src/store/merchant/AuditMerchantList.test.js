/**
 * Created by LDQ on 2018/5/24
 */
import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import {actions,data} from '../../store/merchant/merchantInterface';
import test from './test';


@observer class AuditMerchantList extends Component{
    componentWillMount(){
        // //  获取未审核商户列表
        // auditMerchantListContainer.getAuditMerchantList()
        // //  获取未通过商户列表
        // auditMerchantListContainer.selectShopType('rejectForPermission');
        //
        //
        // //  加载更多
        // auditMerchantListContainer.pagination.nextPage();
        // auditMerchantListContainer.getAuditMerchantList().then(()=>{
        //     console.log("doSomething");
        // });
        //
        // //  设置条件
        // auditMerchantListContainer.selectQueryMsg({shopName:"xxxx"});
        // //  按设置的条件查询
        // auditMerchantListContainer.pagination.setPage(1);
        // auditMerchantListContainer.getAuditMerchantList().then(()=>{
        //     console.log("doSomething");
        // });
        //
        // //  选择指定店铺
        // let merchant = {};
        // auditMerchantListContainer.selectMerchant(merchant);
        //
        // //  获取指定店铺的详情
        // auditMerchantListContainer.activeAuditMerchant.getDetail();
        //
        // //  通过审核
        // auditMerchantListContainer.activeAuditMerchant.allow().then(()=>{
        //     console.log("doSomething");
        // });
        // //  拒绝
        // auditMerchantListContainer.activeAuditMerchant.notAllow().then(()=>{
        //     console.log("doSomething");
        // });
        //
        // //  从了表里删除当前操作的一条
        // auditMerchantListContainer.removeActiveMerchant();
    }



    render(){
        return (
            <div>hello</div>
        )
    }
}
module.exports = AuditMerchantList;