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

import {observer,inject} from 'mobx-react';
import _h from '../src/Util/HB';

import HomeView from './container/HomeView';


//  Router
const App = ()=>(
    <BrowserRouter>
        <div>
            <Switch>
                <Route path='/home' component={HomeView} />

            </Switch>
        </div>
    </BrowserRouter>

);

const stores = {};
ReactDom.render(
    <Provider {...stores}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);