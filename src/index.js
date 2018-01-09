/**
 * Created by LDQ on 2017/12/15
 */

const React = require('react');
const ReactDom = require('react-dom');
import {
    BrowserRouter,
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

//  Router
const App = ()=>(
    <BrowserRouter>
        <div>
            <Switch>
                <Route path='/' component={HomeView} />
            </Switch>
        </div>
    </BrowserRouter>

);

const orderContainer = new OrderContainer();
const shopOrderCondition = new ShopOrderCondition();
const withdrawOrderContainer = new WithdrawOrderContainer();
const withdrawOrderCondition = new WithdrawOrderCondition();

const stores = {
    orderContainer,
    shopOrderCondition,
    withdrawOrderContainer,
    withdrawOrderCondition
};
ReactDom.render(
    <Provider {...stores}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);