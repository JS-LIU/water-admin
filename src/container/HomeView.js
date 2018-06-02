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
// import ClientOrderView from './ClientOrderView';
import ClientOrderView from './order/ClientOrderView';
import MerchantOrderView from './MerchantOrderView';
import OpenShopView from './OpenShopView';
import ShopListView from './ShopListView';
import AuditMerchantList from '../store/merchant/AuditMerchantList.test';
import OrderListTest from '../store/order/OrderList.test';
import './homeStyle.css';

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
                                <Route path="/withdraw" component={WithdrawInfoView} />
                                <Route path="/merchantOrder" component={OrderListTest} />
                                <Route path="/openShop" component={OpenShopView} />
                                <Route path="/shopList" component={ShopListView} />
                                <Route path="/auditMerchantTest" component={AuditMerchantList}/>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
module.exports = HomeView;