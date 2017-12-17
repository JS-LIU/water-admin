/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react'
import { Table } from 'antd';
import {observer,inject} from 'mobx-react';


@inject (['order'])
@observer class OrderView extends Component{
    componentWillMount(){
        this.props.order.getOrderInfo();
    }
    render(){
        return (
            <div>
                i'm order
            </div>
        )
    }
}
module.exports = OrderView;