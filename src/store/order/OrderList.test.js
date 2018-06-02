import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import {actions,data} from './merchantOrderListInterface';
import test from './test';


@observer class OrderListTest extends Component{
    componentWillMount(){
    }
    render(){
        return (
            <div>hello</div>
        )
    }
}
module.exports = OrderListTest;