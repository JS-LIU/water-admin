/**
 * Created by LDQ on 2018/1/3
 */
import React, {Component} from 'react'
import { Button,Popconfirm,Divider  } from 'antd';
import {observer,inject} from 'mobx-react';

@inject (['withdrawOrderContainer'])
class WithdrawOperationBtnView extends Component{
    operateOrder(action){
        return ()=>{
            this.props.withdrawOrderContainer.operateOrder(action,this.props.orderItem);
        }
    }
    render(){
        return(
            <div>
                {this.props.orderItem.status === "创建提现申请"?<Popconfirm
                    title="是否通过提现申请"
                    onConfirm={this.operateOrder('allow')}
                    onCancel={this.operateOrder('reject')}
                    okText="通过"
                    cancelText="拒绝">
                    <a>{this.props.orderItem.status}</a>
                </Popconfirm>:<a>{this.props.orderItem.status}</a>}
            </div>

        )
    }
}
module.exports = WithdrawOperationBtnView;