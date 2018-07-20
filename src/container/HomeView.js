
/**
 * Created by LDQ on 2017/12/15
 */
import React, {Component} from 'react';
import { Layout, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import {
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom'

import HomeMenuView from './HomeMenuView';

import WithdrawInfoView from './WithdrawInfoView';
import ClientOrderView from './order/ClientOrderView';
import ClientOrderSearchView from './order/ClientOrderSearchView';
// 商家订单
import MerchantOrderView from './order/MerchantOrderView';
import MerchantOrderSearch from './order/MerchantOrderSearchView';
import MerchantAuditView from './merchantManage/MerchantAuditView';
import MerchantAuditQueryView from './merchantManage/MerchantListSearchView';
import MerchantDetailView from './merchantManage/MerchantDetailView';
//  提现
import WithdrawView from './finance/WithdrawView';
import WithdrawSearchView from './finance/WithdrawSearchView';

//返利
import RebateDealView from './finance/RebateDealView';
import RebateSearchView from './finance/RebateSearchView';
//成交
import VolumeOfTransactionView from './finance/VolumeOfTransactionView';
// 支出
import ExpenditureView from './finance/ExpenditureView';
// 批发
import StockCategoryView from './stockProduct/StockCategoryView';
import StockProductEditView from './stockProduct/StockProductEditView';
import StockProductSearchView from './stockProduct/StockProductSearchView';
// 自营
import SelfSaleCategoryView from './selfSaleCategory/selfSaleCategoryView';
import SelfSaleEditProductView from './selfSaleCategory/selfSaleEditProductView';
import SelfSaleProductSearchView from './selfSaleCategory/selfSaleProductSearchView';
// 分销
import DistributeCategoryView from './distributeProduct/DistributeCategoryView';
import DistributeEditProductView from './distributeProduct/DistributeEditProductView';
import DistributeProductSearchView from './distributeProduct/DistributeProductSearchView';
// 成本
import ManufactureCostView from './manufactureCost/ManufactureCostView';
import OpenShopView from './OpenShopView';
import ShopListView from './ShopListView';
import './homeStyle.css';


// import RebateSearchView from './finance/RebateSearchView';

class HomeView extends Component{
    constructor(props){
        super(props);
        this.state ={
            collapsed: false
        }
    }
    toggle(){
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render(){
        return (
            <Layout className="wrap">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    style={{background:'#001529'}}
                >
                    <HomeMenuView location={this.props.location}/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle.bind(this)}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>
                        <div>
                            <Switch>
                                <Route path="/clientOrder" component={ClientOrderView} />
                                <Route path="/clientOrderSearch" component={ClientOrderSearchView}/>
                                <Route path="/merchantOrder" component={MerchantOrderView} />
                                <Route path="/merchantOrderSearch" component={MerchantOrderSearch} />

                                <Route path='/merchantAudit' component={MerchantAuditView} />
                                <Route path='/merchantAuditQuery' component={MerchantAuditQueryView} />
                                <Route path='/merchantDetail' component={MerchantDetailView} />

                                <Route path="/withdraw" component={WithdrawView} />
                                <Route path="/withdrawSearch" component={WithdrawSearchView} />
                                <Route path='/rebateDeal' component={RebateDealView}/>
                                <Route path='/rebateSearch' component={RebateSearchView}/>
                                <Route path='/expenditure' component={ExpenditureView} />
                                <Route path='/distributeCategory' component={DistributeCategoryView}/>
                                <Route path='/distributeEditProduct' component={DistributeEditProductView}/>
                                <Route path='/distributeProductSearch' component={DistributeProductSearchView}/>
                                <Route path='/manufactureCost' component={ManufactureCostView}/>

                                <Route path='/stockCategory' component={StockCategoryView} />
                                <Route path='/stockProductEdit' component={StockProductEditView} />
                                <Route path='/stockProductSearch' component={StockProductSearchView} />

                                <Route path='/selfSaleCategory' component={SelfSaleCategoryView} />
                                <Route path='/selfSaleEditProduct' component={SelfSaleEditProductView} />
                                <Route path='/selfSaleProductSearch' component={SelfSaleProductSearchView}/>

                                {/*<Route path="/merchantOrder" component={OrderListTest} />*/}
                                <Route path="/openShop" component={OpenShopView} />
                                <Route path="/shopList" component={ShopListView} />

                                <Route path="/deal" component={VolumeOfTransactionView}/>
                                {/*<Route path="/auditMerchantList" component={AuditMerchantList}/>*/}
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
module.exports = HomeView;