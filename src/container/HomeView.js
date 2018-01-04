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

import UserView from './UserView'
import OrderView from './OrderView';
import WithdrawInfoView from './WithdrawInfoView';

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
                                <Route path="/order" component={OrderView} />
                                <Route path="/withdraw" component={WithdrawInfoView} />
                                <Route path="/order" component={OrderView} />
                                <Route path="/order" component={OrderView} />
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
module.exports = HomeView;