/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react';
import { Menu,Icon } from 'antd';
const SubMenu = Menu.SubMenu;

import {Link} from 'react-router-dom';
import './homeMenuStyle.css';

class HomeMenuView extends Component{
    render(){
        let defaultSelectedKey = this.props.location.pathname;
        return (
            <div>
                <div className="title">汇贝BOSS系统</div>
                <Menu theme="dark"
                      mode="inline"
                      defaultSelectedKeys={[defaultSelectedKey]}>
                    <SubMenu key="sub1" title={<span><Icon type="profile" /><span>订单</span></span>}>
                        <Menu.Item key="/clientOrder">
                            <Link to="/clientOrder">
                                <Icon type="file" />
                                <span>用户订单</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="/merchantOrder">
                            <Link to="/merchantOrder">
                                <Icon type="file-text" />
                                <span>进货订单</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="pay-circle-o" /><span>财务</span></span>}>
                        <Menu.Item key="/withdraw">
                            <Link to="/withdraw">
                                <Icon type="bank" />
                                <span>提现订单</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/accountList">
                            <Link to="/accountList">
                                <Icon type="solution" />
                                <span>账户列表</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="openShop">
                        <Link to="/openShop">
                            <Icon type="user" />
                            <span>审核</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/order" >
                            <Icon type="shop" />
                            <span>商家</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/order">
                            <Icon type="gift" />
                            <span>商品</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
module.exports = HomeMenuView;