/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react';
import { Menu,Icon } from 'antd';
const SubMenu = Menu.SubMenu;

import {Link} from 'react-router-dom';
import './homeMenuStyle.css';
import StockCategoryView from "./stockProduct/StockCategoryView";

class HomeMenuView extends Component{
    render(){
        let defaultSelectedKey = this.props.location.pathname;
        return (
            <div>
                <div className="title">汇贝BOSS系统</div>
                <Menu theme="dark"
                      mode="inline"
                      defaultSelectedKeys={[defaultSelectedKey]}>
                    <SubMenu key="sub1" title={<span><Icon type="user" /><span>用户订单</span></span>}>
                        <Menu.Item key="/clientOrder">
                            <Link to="/clientOrder">
                                <Icon type="edit" />
                                <span>订单处理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/clientOrderSearch">
                            <Link to="/clientOrderSearch">
                                <Icon type="search" />
                                <span>订单查询</span>
                            </Link>
                        </Menu.Item>
                        {/*<Menu.Item key="/orderForms">*/}
                            {/*<Link to="/clientOrder">*/}
                                {/*<Icon type="file-text" />*/}
                                {/*<span>订单报表</span>*/}
                            {/*</Link>*/}
                        {/*</Menu.Item>*/}
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="team" /><span>商家订单</span></span>}>
                        <Menu.Item key="/merchantOrder">
                            <Link to="/merchantOrder">
                                <Icon type="edit" />
                                <span>订单处理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/merchantOrderSearch">
                            <Link to="/merchantOrderSearch">
                                <Icon type="search" />
                                <span>订单查询</span>
                            </Link>
                        </Menu.Item>
                        {/*<Menu.Item key="/orderForms">*/}
                        {/*<Link to="/clientOrder">*/}
                        {/*<Icon type="file" />*/}
                        {/*<span>订单报表</span>*/}
                        {/*</Link>*/}
                        {/*</Menu.Item>*/}
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="bank" /><span>财务</span></span>}>
                        <Menu.Item key="/withdraw">
                            <Link to="/withdraw">
                                <Icon type="pay-circle-o" />
                                <span>提现订单</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/withdrawSearch">
                            <Link to="/withdrawSearch">
                                <Icon type="pay-circle-o" />
                                <span>提现查询</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/accountList">
                            <Link to="/accountList">
                                <Icon type="wallet" />
                                <span>账户列表</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/rebateDeal">
                            <Link to="/rebateDeal">
                                <Icon type="red-envelope" />
                                <span>返利处理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/rebateSearch">
                            <Link to="/rebateSearch">
                                <Icon type="red-envelope" />
                                <span>返利查询</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/deal">
                            <Link to="/deal">
                                <Icon type="login" />
                                <span>成交</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/expenditure">
                            <Link to="/expenditure">
                                <Icon type="logout" />
                                <span>支出</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="shop" /><span>商家管理</span></span>}>
                        <Menu.Item key="/merchantAudit">
                            <Link to="/merchantAudit">
                                <Icon type="usergroup-add" />
                                <span>商家入驻</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/merchantAuditQuery">
                            <Link to="/merchantAuditQuery">
                                <Icon type="search" />
                                <span>商家查询</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/merchantDetail">
                            <Link to="/merchantDetail">
                                <Icon type="solution" />
                                <span>商家信息</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title={<span><Icon type="shopping-cart" /><span>批发商品</span></span>}>
                        <Menu.Item key="/stockCategory">
                            <Link to="/stockCategory">
                                <Icon type="tags-o" />
                                <span>分类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/stockProductEdit">
                            <Link to="/stockProductEdit">
                                <Icon type="edit" />
                                <span>编辑商品</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/stockProductSearch">
                            <Link to="/stockProductSearch">
                                <Icon type="search" />
                                <span>商品查询</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub6' title={<span><Icon type="database" /><span>自营商品</span></span>} >
                        <Menu.Item key="/selfSaleCategory">
                            <Link to="/selfSaleCategory">
                                <Icon type="appstore-o" />
                                <span>分类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/selfSaleEditProduct">
                            <Link to="/selfSaleEditProduct">
                                <Icon type="edit" />
                                <span>编辑商品</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/selfSaleProductSearch">
                            <Link to="/selfSaleProductSearch">
                                <Icon type="search" />
                                <span>商品查询</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub11' title={<span><Icon type="database" /><span>用户端水票管理</span></span>} >
                        <Menu.Item key="/waterVoteUp">
                            <Link to="/waterVoteUp">
                                <Icon type="appstore-o" />
                                <span>水票回笼</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub7' title={<span><Icon type="share-alt" /><span>分销商品</span></span>} >
                        <Menu.Item key="/distributeCategory">
                            <Link to="/distributeCategory">
                                <Icon type="bar-chart" />
                                <span>分类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/distributeEditProduct">
                            <Link to="/distributeEditProduct">
                                <Icon type="edit" />
                                <span>编辑商品</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/distributeProductSearch">
                            <Link to="/distributeProductSearch">
                                <Icon type="search" />
                                <span>商品查询</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub8' title={<span><Icon type="pay-circle" /><span>生产成本</span></span>} >
                        <Menu.Item key="/manufactureCost">
                            <Link to="/manufactureCost">
                                <Icon type="heart" />
                                <span>喜腾山泉生产</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="openShop">
                        <Link to="/openShop">
                            <Icon type="laptop" />
                            <span>审核</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub9" title={<span><Icon type="hdd" /><span>测试</span></span>}>
                        <Menu.Item key="/auditMerchantTest">
                            <Link to="/auditMerchantTest">
                                <Icon type="laptop" />
                                <span>店铺审核测试</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/accountList">
                            <Link to="/accountList">
                                <Icon type="file-text" />
                                <span>账户列表</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/waterTicketActive">
                        <Link to="/waterTicketActive">
                            <Icon type="laptop" />
                            <span>水票促销</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
module.exports = HomeMenuView;