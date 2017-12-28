/**
 * Created by LDQ on 2017/12/26
 */
import React, {Component} from 'react'
import { Button,Popconfirm } from 'antd';
import {observer,inject} from 'mobx-react';
@inject(['orderContainer'])
@observer class DispatchButtonView extends Component{
    startDelivery(){
        this.props.orderContainer.startDelivery(this.props.orderItem);

    }
    showByStatus(status){
        if (status === "待指派"){
            return  <Popconfirm title="是否已处理?" onConfirm={() => this.startDelivery()}>
                <a style={{color:"#dd7c1e"}}>{status}</a>
            </Popconfirm>
        }else{
            return  <a>{status}</a>
        }
    }

    render(){
        return (
            <div>
                {this.showByStatus(this.props.orderItem.status)}
            </div>
        )
    }
}
module.exports = DispatchButtonView;