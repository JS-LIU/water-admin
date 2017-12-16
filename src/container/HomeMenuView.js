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
                <div className="title">HuiPay Admin</div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="profile" />
                        <Link to="/order" style={{display:"inline"}}>order</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="user" />
                        <Link to="/user" style={{display:"inline"}}>user</Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
module.exports = HomeMenuView;