/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react';
import { Menu,Icon } from 'antd';
import {Link} from 'react-router-dom';
import './homeMenuStyle.css';

class HomeMenuView extends Component{
    render(){
        return (
            <div>
                <div className="title">汇贝BOSS系统</div>
                <Menu theme="dark"
                      mode="inline"
                      defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/order">
                            <Icon type="profile" />
                            <span>订单</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" disabled={true}>
                        <Link to="/user">
                            <Icon type="user" />
                            <span>账户</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" disabled={true}>
                        <Link to="/user" >
                            <Icon type="user" />
                            <span>商家</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" disabled={true}>
                        <Link to="/user">
                            <Icon type="user" />
                            <span>商品</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
module.exports = HomeMenuView;