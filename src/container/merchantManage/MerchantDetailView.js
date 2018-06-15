import React, {Component} from 'react'
import {observer,inject} from 'mobx-react';
import { Table, Pagination , Button , Radio , Input , Select , Icon , Tabs } from 'antd';
const Search = Input.Search;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import {data,actions} from '../../store/merchant/merchantInterface';
import merchantAuditStyle from './css/merchantAudit.css';
import merchantAuditDataStyle from './css/merchantAuditData.css';
import merchantDetail from './css/merchantDetail.css';

@observer class MerchantDetailView extends Component{
    render(){
        return (
            <div>
                <MerchantAuditListQueryView />
                <MerchantInfo />
                <MerchantDetail />
            </div>
        )
    }
}

// 搜索
@observer class MerchantAuditListQueryView extends Component{
    render(){
        return (
            <div>
                <div className='all_search_box mb15'>
                    <div>
                        <span>店铺名称:</span>
                        <Search
                            placeholder="输入店铺名称"
                            onSearch={value => {
                                actions.queryMerchant({shopName:value});
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <span>店长姓名:</span>
                        <Search
                            placeholder="输入店长姓名"
                            onSearch={value => {
                                actions.queryMerchant({shopManagerName:value});
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                    <div>
                        <span>电话号码:</span>
                        <Search
                            placeholder="输入电话号码"
                            onSearch={value => {
                                actions.queryMerchant({shopManagerTel:value});
                            }}
                            enterButton
                            style={{ marginBottom: 16 }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

@observer class MerchantInfo extends Component{
    render(){
        let merchantPicNodes = data.merchant.shopImg.map((picItem,index)=>{
            return (
                <img className='mr15' key={index} src={picItem} alt=""/>
            )
        });
        return (
                <div className='merchant_shop_message'>
                    <h5>店主信息</h5>
                    <ul className='merchant_shop_message_list'>
                        <li>店铺编号：{data.merchant.shopAlians}</li>
                        <li>店铺名称：{data.merchant.shopName}</li>
                        <li>所在地区：{data.merchant.district}</li>
                        <li>详细地址：{data.merchant.addressDetail}</li>
                        <li>店主姓名：{data.merchant.managerName}</li>
                        <li>联系电话：{data.merchant.managerTel}</li>
                        <li>客服电话：{data.merchant.serviceTel[0]}</li>
                        <li>店铺属性：{data.merchant.shopType}</li>
                        <li>配送范围：{data.merchant.deliveryRange}</li>
                        <li>快递费用：{data.merchant.deliveryRange}</li>
                        <li>配送时间：{data.merchant.deliveryTime}</li>
                        <li></li>
                        <li>店铺头像：<img src={data.merchant.shopHeaderImg} alt=""/></li>
                        <li>营业执照：<img src={data.merchant.licenseImageUrl} alt=""/></li>
                        <li>身份证照片：<img src={data.merchant.managerImgUrl} alt=""/></li>
                        <li>店铺图片：{merchantPicNodes}</li>
                        <li>商家介绍：{data.merchant.introduce}</li>
                    </ul>
                </div>
        )
    }
}

@observer class MerchantDetail extends Component{
    render(){
        return(
                <div className='merchant_shop_message'>
                    <h5>店铺数据</h5>
                    <Tabs>
                        <TabPane tab={<div><div><Icon type="shop" />店铺商品</div>
                            <div>在售商品：<b>{data.detail.productCount}</b>(件)</div></div>} key="1">

                        </TabPane >
                        <TabPane tab={<div><div><Icon type='shopping-cart' />进货</div>
                            <div>进货金额：<b>￥{data.detail.merchantShopOrderRmb}</b>(元)</div></div>} key="2">

                        </TabPane >
                        <TabPane tab={<div><div><Icon type='bank' />销售</div>
                            <div>销售金额：<b>￥{data.detail.saleCountRmb}</b>(元)</div></div>} key="3">

                        </TabPane >
                        <TabPane tab={<div><div><Icon type='pay-circle-o' />账户余额</div>
                            <div>资金金额：<b>￥{data.detail.merchantUserBalance}</b>(元)</div>
                            <div>水票款：<b>￥{data.detail.waterTicketRmb}</b></div></div>} key="4">

                        </TabPane >
                        <TabPane tab={<div><div><Icon type='red-envelope' />水票优惠</div>
                            <div>买赠活动：<b>{data.detail.waterTicketCoupon}</b></div></div>} key="5">

                        </TabPane >
                    </Tabs>
                </div>
        )
    }
}

module.exports = MerchantDetailView;