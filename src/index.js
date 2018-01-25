/**
 * Created by LDQ on 2017/12/15
 */

const React = require('react');
const ReactDom = require('react-dom');
import {
    HashRouter,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom'
import { Provider } from 'mobx-react';

import HomeView from './container/HomeView';
import OrderContainer from './MobX/OrderContainer';
import ShopOrderCondition from './MobX/ShopOrderCondition';
import WithdrawOrderContainer from './MobX/WithdrawOrderContainer';
import WithdrawOrderCondition from './MobX/WithdrawOrderCondition';
import OpenShopContainer from './MobX/OpenShopContainer';

const App = ()=>(
    <HashRouter>
        <div>
            <Switch>
                <Route component={HomeView} />
            </Switch>
        </div>
    </HashRouter>

);

const orderContainer = new OrderContainer();
const shopOrderCondition = new ShopOrderCondition();
const withdrawOrderContainer = new WithdrawOrderContainer();
const withdrawOrderCondition = new WithdrawOrderCondition();
const openShopContainer = new OpenShopContainer();

const stores = {
    orderContainer,
    shopOrderCondition,
    withdrawOrderContainer,
    withdrawOrderCondition,
    openShopContainer
};
ReactDom.render(
    <Provider {...stores}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);