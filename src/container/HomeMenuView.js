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
                    <SubMenu key="sub1" title={<span><Icon type="profile" /><span>用户订单</span></span>}>
                        <Menu.Item key="/clientOrder">
                            <Link to="/clientOrder">
                                <Icon type="file" />
                                <span>订单处理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/clientOrderSearch">
                            <Link to="/clientOrderSearch">
                                <Icon type="file" />
                                <span>订单查询</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/orderForms">
                            <Link to="/clientOrder">
                                <Icon type="file" />
                                <span>订单报表</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="profile" /><span>商家订单</span></span>}>
                        <Menu.Item key="/merchantOrder">
                            <Link to="/merchantOrder">
                                <Icon type="file" />
                                <span>订单处理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/merchantOrderSearch">
                            <Link to="/merchantOrderSearch">
                                <Icon type="file" />
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
                    <SubMenu key="sub3" title={<span><Icon type="pay-circle-o" /><span>财务</span></span>}>
                        <Menu.Item key="/withdraw">
                            <Link to="/withdraw">
                                <Icon type="bank" />
                                <span>提现订单</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/withdrawSearch">
                            <Link to="/withdrawSearch">
                                <Icon type="bank" />
                                <span>提现查询</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/accountList">
                            <Link to="/accountList">
                                <Icon type="solution" />
                                <span>账户列表</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/rebateDeal">
                            <Link to="/rebateDeal">
                                <Icon type="solution" />
                                <span>返利处理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/rebateSearch">
                            <Link to="/rebateSearch">
                                <Icon type="solution" />
                                <span>返利查询</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/deal">
                            <Link to="/deal">
                                <Icon type="file" />
                                <span>成交</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/expenditure">
                            <Link to="/expenditure">
                                <Icon type="file" />
                                <span>支出</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="profile" /><span>商家管理</span></span>}>
                        <Menu.Item key="/merchantAudit">
                            <Link to="/merchantAudit">
                                <Icon type="shop" />
                                <span>商家入驻</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/merchantAuditQuery">
                            <Link to="/merchantAuditQuery">
                                <Icon type="shop" />
                                <span>商家查询</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/merchantDetail">
                            <Link to="/merchantDetail">
                                <Icon type="shop" />
                                <span>商家信息</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title={<span><Icon type="profile"/><span>批发商品</span></span>}>
                        <Menu.Item key="/stockCategory">
                            <Link to="/stockCategory">
                                <Icon type="shop" />
                                <span>分类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/stockProductEdit">
                            <Link to="/stockProductEdit">
                                <Icon type="shop" />
                                <span>编辑商品</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/stockProductSearch">
                            <Link to="/stockProductSearch">
                                <Icon type="shop" />
                                <span>商品查询</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub6' title={<span><Icon type='profile'/><span>自营商品</span></span>} >
                        <Menu.Item key="/selfSaleCategory">
                            <Link to="/selfSaleCategory">
                                <Icon type="shop" />
                                <span>分类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/selfSaleEditProduct">
                            <Link to="/selfSaleEditProduct">
                                <Icon type="shop" />
                                <span>编辑商品</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/selfSaleProductSearch">
                            <Link to="/selfSaleProductSearch">
                                <Icon type="shop" />
                                <span>商品查询</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub7' title={<span><Icon type='profile'/><span>分销商品</span></span>} >
                        <Menu.Item key="/distributeCategory">
                            <Link to="/distributeCategory">
                                <Icon type="shop" />
                                <span>分类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/distributeEditProduct">
                            <Link to="/distributeEditProduct">
                                <Icon type="shop" />
                                <span>编辑商品</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/distributeProductSearch">
                            <Link to="/distributeProductSearch">
                                <Icon type="shop" />
                                <span>商品查询</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key='sub8' title={<span><Icon type='profile'/><span>生产成本</span></span>} >
                        <Menu.Item key="/manufactureCost">
                            <Link to="/manufactureCost">
                                <Icon type="shop" />
                                <span>喜腾山泉生产</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="openShop">
                        <Link to="/openShop">
                            <Icon type="user" />
                            <span>审核</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub9" title={<span><Icon type="pay-circle-o" /><span>测试</span></span>}>
                        <Menu.Item key="/auditMerchantTest">
                            <Link to="/auditMerchantTest">
                                <Icon type="bank" />
                                <span>店铺审核测试</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/accountList">
                            <Link to="/accountList">
                                <Icon type="solution" />
                                <span>账户列表</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
module.exports = HomeMenuView;