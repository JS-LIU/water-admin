/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react';
import { Menu,Icon } from 'antd';
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
                    <Menu.Item key="/order">
                        <Link to="/order">
                            <Icon type="profile" />
                            <span>订单</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/withdraw">
                        <Link to="/withdraw">
                            <Icon type="pay-circle-o" />
                            <span>提现</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/order">
                            <Icon type="user" />
                            <span>账户</span>
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