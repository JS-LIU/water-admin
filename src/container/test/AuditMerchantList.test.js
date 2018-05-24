/**
 * Created by LDQ on 2018/5/24
 */
import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import auditMerchantListContainer from '../../store/AuditMerchantListContainer';
class AuditMerchantList extends Component{
    componentWillMount(){
        //  获取未审核商户列表
        auditMerchantListContainer.getAuditMerchantList();
        //  获取未通过商户列表
        auditMerchantListContainer.selectShopType('rejectForPermission');


        //  加载更多
        auditMerchantListContainer.pagination.nextPage();
        auditMerchantListContainer.getAuditMerchantList();

        //  设置条件
        auditMerchantListContainer.selectQueryMsg({shopName:"xxxx"});
        //  按设置的条件查询
        auditMerchantListContainer.pagination.setPage(1);
        auditMerchantListContainer.getAuditMerchantList();

        //  选择指定店铺
        let merchant = {};
        auditMerchantListContainer.selectMerchant(merchant);

        //  是否可以展示详情

        auditMerchantListContainer.activeAuditMerchant.auditStatus === 1?"不展示":"展示";
        //  获取指定店铺的详情
        auditMerchantListContainer.activeAuditMerchant.getDetail();


    }



    render(){
        return (
            <div>hello</div>
        )
    }
}
module.exports = AuditMerchantList;