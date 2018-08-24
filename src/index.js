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

import base from './Util/base.css';

import HomeView from './container/HomeView';

const App = ()=>(
    <HashRouter>
        <div>
            <Switch>
                <Route component={HomeView} />
            </Switch>
        </div>
    </HashRouter>

);

ReactDom.render(
    <App />,
    document.getElementById('root')
);