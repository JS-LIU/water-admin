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
import Order from './MobX/Order';
import ShopOrderCondition from './MobX/ShopOrderCondition';


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

const order = new Order();
const shopOrderCondition = new ShopOrderCondition();


const stores = {order,shopOrderCondition};
ReactDom.render(
    <Provider {...stores}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);